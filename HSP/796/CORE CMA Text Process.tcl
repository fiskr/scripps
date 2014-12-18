[##############################################################################
Name:			CORE CMA Text Process

Description:	Template to update text record in database
				This template displays nothing to the screen
				It redirects to the contentSaved template

Template path:	/cr/cma/textProcess
Cached?:		N

Dependencies:	<Explain external dependencies. If none, delete the line.>
	Templates:	Called by textEdit
				Calls contentSaved
	Vars:		Passed: form variables for the new or edited Text
				Passes: CtntType Headline Site TextId Wflw Delv
	Files:		<Names and purposes.>
	Database:	ff_text
	Cookies:	<Names and purposes.>
History:
	Created:	10/16/00 by Christopher G. Luttrell
	Modified: 	12/14/00 by Chris O'Neal
		Added status message display and form resubmit logic based on
		image art process template.
	Modified:	2002.07.23 by Mark McIntyre
		Added home_section field.
	Modified:	2002.08.06 by Mark McIntyre
		Added text_style and sponsorship fields.
	Modified:	2002.10.29 by Jonathan Williams
		Added Keywords and Categorization.
	Modified:	2003.01.29 by Brant Boehmann
		Added Content Role.
	Modified: 	07/02/2003 by Jonathan Bell
		Added abstract editing support.
	Modified:	5/13/2009 by Darin Swan
		Changed to standardized htmlaction menu
	Modified: 	04/22/2010 by Kevin Malone
				added code to get FrmSeoTitle and clean it up (via convertToEntities) and save it to the SEO_TITLE field
	Modified:	11/13/2012 by Kent Galbraith
				added function to allow for processing of social media override data

	Modified: 	<mm/dd/yy> by <name>
		<List important changes here. Repeat "Modified:" line for more.>

Copyright (C) 2000 E.W. Scripps Corporation. All rights reserved.
##############################################################################]
[
NEEDS COOKIE

#################################################################################
#                              Includes			                                #
#################################################################################
SOURCE "CMA Settings"

SOURCE "com.scripps CORE CMA Authorization Library"
namespace import ::com.scripps::core::cma::authorization::*

SOURCE "CORE CMA Main Include"
namespace import ::com.scripps::core::cma::*

SOURCE "com.scripps CORE CMA Notes Library"
namespace import ::com.scripps::core::cma::notes::*

SOURCE "com.scripps CORE CMA Search Library"
namespace import ::com.scripps::core::cma::search::*

SOURCE "com.scripps Core Shared Content API 1.1"
namespace import ::com.scripps::cr::cma::sharedContent::*

SOURCE "com.scripps CORE CMA Main DB Library"

#################################################################################
#                              Verify Login		                                #
#################################################################################

set loginStatus [::com.scripps::core::cma::authorization::verifyLoginStatus]
set UserId 		[::com.scripps::core::cma::authorization::getUserName]

#################################################################################
#                              Error Handling 	                                #
#################################################################################
if {[string equal [SHOW CS_DEBUG] 0]} {
	ON_ERROR {[HTTP_REDIRECT [CURL /cr/cma/errorPage "" SAVE_STATE]]} ;# set up custom error page
	set ErrorMsg {An unexpected error has been encountered in Text Process.}
	RETAIN ErrorMsg
}

###############################################################################
#                              Initializations                                #
###############################################################################

set DateFrmt ${::com.scripps::core::cma::DATE_FRMT}

###############################################################################
#                         Begin Procedure Definitions                         #
###############################################################################

#get the next Text_Id
proc getNextText_Id {TableName} {
	set NextText_Id ""
	SEARCH TABLE TextTab INTO TextRS SQL "
		select	${TableName}_seq.nextval as text_id
		from	dual"
	set TextRecord [FIRST $TextRS]
	set NextText_Id [FIELD text_id $TextRecord]
	return $NextText_Id
}


###############################################################################
#                            Begin Template Logic                             #
###############################################################################
if {$ID == ""} then {
	set ErrorMsg {Text Id and Status are required for Text Process.}
	HTTP_REDIRECT [CURL /cr/cma/errorPage "" SAVE_STATE]
}

set Mode $FrmMode

set Arguments [UnPackOid $ID]
set PassedTextId [lindex $Arguments 0]
set PassedWflwStat [lindex $Arguments 1]
set PassedDelvStat [lindex $Arguments 2]

set ConvRelease_Dt [convertToDate $FrmReleaseDate]
set ConvExpire_Dt [convertToDate $FrmExpireDate]
set ConvPurge_Dt [convertToDate $FrmPurgeDate]

#kmalone 2010_04_22 - JBE-46
set SeoTitle [convertToEntities [SHOW FrmSeoTitle]]
if { [string equal [string trim [SHOW SeoTitle]] "" ] } {
	set SeoTitle "NullData"
}	
if {[string length [SHOW SeoTitle]] > 240} {
 set SeoTitle [string range $SeoTitle 0 239]
}
if {[string length [SHOW FrmAbstract]] > 3000} {
 set FrmAbstract [string range $FrmAbstract 0 2999]
}

#these are the variables that change for each Content Type
set CtntType $FrmCtntType

set CtntId ""
set TableName ""
# The fields for id and table name must exist before the call
getCtntIdTableName $SessionSite $CtntType CtntId TableName

set TitleCtntType [string totitle $CtntType]

# Clean up high ASCII in text fields
if {[string compare [SHOW FrmLongText] ""] != 0} {
	set FrmLongText [convertToEntities $FrmLongText]
}
	
if {[string compare $Mode NEW] == 0} {
	set PassedTextId [getNextText_Id $TableName]
	set PassedWflwStat $FrmWflwStatus
	set PassedDelvStat $FrmDelvStatus
	# set the stats the same so changeArticleStatus does not fire also
	set status [ROW_INSERT ff_text COLS {
		site
		ctnt_id
		ctnt_type
		table_name
		text_id
		wflw_status
		delv_status
		wflw_status_dt
		delv_status_dt
		release_dt
		expire_dt
		purge_dt
		source
		headline
		abstract
		descr
		long_text
		create_uid
		create_dt
		assign_uid
		home_section
		text_style
		sponsorship_value
		keywords
		delv_frmt
		delv_frmt_site
		ctnt_role
		seo_title
	} VALUES {
		{[SHOW SessionSite]}
		{[SHOW CtntId]}
		{[SHOW CtntType]}
		{[SHOW TableName]}
		{[SHOW PassedTextId]}
		{[SHOW FrmWflwStatus]}
		{[SHOW FrmDelvStatus]}
		{fastfwd.ff_cr_cma_pkg.putSysdate}
		{fastfwd.ff_cr_cma_pkg.putSysdate}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvRelease_Dt],'[SHOW SessionSite]')}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvExpire_Dt],'[SHOW SessionSite]')}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvPurge_Dt],'[SHOW SessionSite]')}
		{MANUAL}
		{[SHOW FrmHeadline]}
		{[SHOW FrmAbstract]}
		{[SHOW FrmTextDescr]}
		{[SHOW FrmLongText]}
		{[SHOW UserId]}
		{fastfwd.ff_cr_cma_pkg.putSysdate}
		{[SHOW FrmAssignUid]}
		{[SHOW FrmHome_Section]}
		{[SHOW FrmTextStyle]}
		{[SHOW FrmSponsorship]}
		{[SHOW FrmKeyword]}
		{[SHOW FrmDelv_Frmt]}
		{[SHOW FrmDelv_Frmt_Site]}
		{[SHOW FrmCtntRole]}
		{[SHOW SeoTitle]}
	}]
	if {$status != 0} {
		set Message "Text Insert failed, status($status)"
	} else {
		if {[SHOW FrmCategory] != ""} {
			if {[catch {ROW_INSERT ff_ctnt_category_value COLS {	
				site
				ctnt_id
				ctnt_type
				table_name
				id
				category_site
				category_name
				value
			} VALUES {
				{[SHOW SessionSite]}
				{[SHOW CtntId]}
				{[SHOW CtntType]}
				{[SHOW TableName]}
				{[SHOW PassedTextId]}
				{[SHOW SessionSite]}
				{SELECT_TYPE}
				{[SHOW FrmCategory]}
				}
			} errText] } {
				set CatStatus 1
				set CatMessage "Error inserting Select Category record. Article [SHOW PassedArticleId] may not exist in state: [SHOW FrmWflwStatus] / [SHOW FrmDelvStatus]"
			}
		}

		set ErrorMsg [::com.scripps::core::cma::notes::setNotesDb [SHOW SessionSite] [SHOW CtntId] [SHOW CtntType] [SHOW TableName] [SHOW PassedTextId] [SHOW FrmLongNotes] [SHOW UserId]]

		if {[SHOW FrmUnsearchable] == "1"} {
			set cfstatus [::com.scripps::core::cma::search::addContentFlag $PassedTextId $SessionSite $CtntId TEXT $TableName UNSEARCHABLE]
		} else {
			set cfstatus [::com.scripps::core::cma::search::removeContentFlag $PassedTextId $SessionSite $CtntId TEXT $TableName UNSEARCHABLE]		
		}

	}
} elseif {[SHOW FrmMode] == "Copy"} {	
    set PassedTextId [getNextText_Id $TableName]
	set PassedWflwStat WIP
	set PassedDelvStat UNSCHEDULED
	set FrmWflwStatus WIP
	set FrmDelvStatus UNSCHEDULED
	set status [ROW_INSERT ff_text COLS {
		site
		ctnt_id
		ctnt_type
		table_name
		text_id
		wflw_status
		delv_status
		wflw_status_dt
		delv_status_dt
		release_dt
		expire_dt
		purge_dt
		source
		headline
		abstract
		descr
		long_text
		create_uid
		create_dt
		assign_uid
		home_section
		text_style
		sponsorship_value
		keywords
		delv_frmt
		delv_frmt_site
		ctnt_role
		seo_title
	} VALUES {
		{[SHOW SessionSite]}
		{[SHOW CtntId]}
		{[SHOW CtntType]}
		{[SHOW TableName]}
		{[SHOW PassedTextId]}
		{[SHOW PassedWflwStat]}
		{[SHOW PassedDelvStat]}
		{fastfwd.ff_cr_cma_pkg.putSysdate}
		{fastfwd.ff_cr_cma_pkg.putSysdate}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvRelease_Dt],'[SHOW SessionSite]')}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvExpire_Dt],'[SHOW SessionSite]')}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvPurge_Dt],'[SHOW SessionSite]')}
		{MANUAL}
		{[SHOW FrmHeadline]}
		{[SHOW FrmAbstract]}
		{[SHOW FrmTextDescr]}
		{[SHOW FrmLongText]}
		{[SHOW UserId]}
		{fastfwd.ff_cr_cma_pkg.putSysdate}
		{[SHOW FrmAssignUid]}
		{[SHOW FrmHome_Section]}
		{[SHOW FrmTextStyle]}
		{[SHOW FrmSponsorship]}
		{[SHOW FrmKeyword]}
		{[SHOW FrmDelv_Frmt]}
		{[SHOW FrmDelv_Frmt_Site]}
		{[SHOW FrmCtntRole]}
		{[SHOW SeoTitle]}
	}]
	if {$status != 0} {
		set Message "Text Insert failed, status($status)"
	} else {
		if {[SHOW FrmCategory] != ""} {
			if {[catch {ROW_INSERT ff_ctnt_category_value COLS {
				site
				ctnt_id
				ctnt_type
				table_name
				id
				category_site
				category_name
				value
			} VALUES {
				{[SHOW SessionSite]}
				{[SHOW CtntId]}
				{[SHOW CtntType]}
				{[SHOW TableName]}
				{[SHOW PassedTextId]}
				{[SHOW SessionSite]}
				{SELECT_TYPE}
				{[SHOW FrmCategory]}
			}
			} errText] } {
				set CatStatus 1
				set CatMessage "Error inserting Category record. Article [SHOW PassedArticleId] may not exist in state: [SHOW FrmWflwStatus] / [SHOW FrmDelvStatus]"
			}
		}
		
		set ErrorMsg [::com.scripps::core::cma::notes::setNotesDb [SHOW SessionSite] [SHOW CtntId] [SHOW CtntType] [SHOW TableName] [SHOW PassedTextId] [SHOW FrmLongNotes] [SHOW UserId]]

		if {[SHOW FrmUnsearchable] == "1"} {
			set cfstatus [::com.scripps::core::cma::search::addContentFlag $PassedTextId $SessionSite $CtntId TEXT $TableName UNSEARCHABLE]
		} else {
			set cfstatus [::com.scripps::core::cma::search::removeContentFlag $PassedTextId $SessionSite $CtntId TEXT $TableName UNSEARCHABLE]		
		}
		
	}
} else {
	# add a proc call that archives the current text asset
	set status [ROW_UPDATE ff_text COLS {
		Release_Dt
		Expire_Dt
		Purge_Dt
		Headline
		Abstract
		Descr
		Long_Text
		Wflw_Status
		Delv_Status
		Last_Updt_Uid
		Assign_Uid
		Home_Section
		text_style
		sponsorship_value
		keywords
		delv_frmt
		delv_frmt_site
		ctnt_role
		seo_title
	} VALUES {
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvRelease_Dt],'[SHOW SessionSite]')}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvExpire_Dt],'[SHOW SessionSite]')}
		{fastfwd.ff_cr_cma_pkg.putTime([SHOW ConvPurge_Dt],'[SHOW SessionSite]')}
		{[SHOW FrmHeadline]}
		{[SHOW FrmAbstract]}
		{[SHOW FrmTextDescr]}
		{[SHOW FrmLongText]}
		{[SHOW FrmWflwStatus]}
		{[SHOW FrmDelvStatus]}
		{[SHOW UserId]}
		{[SHOW FrmAssignUid]}
		{[SHOW FrmHome_Section]}
		{[SHOW FrmTextStyle]}
		{[SHOW FrmSponsorship]}
		{[SHOW FrmKeyword]}
		{[SHOW FrmDelv_Frmt]}
		{[SHOW FrmDelv_Frmt_Site]}
		{[SHOW FrmCtntRole]}
		{[SHOW SeoTitle]}
	} WHERE "text_id = [SHOW PassedTextId] and
			site = [QUOTE_SQL [SHOW SessionSite]] and
			wflw_status = [QUOTE_SQL [SHOW PassedWflwStat]] and
			delv_status = [QUOTE_SQL [SHOW PassedDelvStat]] "
	]
	if {$status != 0} {
		set Message "Text Update failed, status($status)"
	} else {
		set status [ROW_DELETE FF_CTNT_CATEGORY_VALUE WHERE "
			site = [QUOTE_SQL [SHOW SessionSite]] and
			id = [SHOW PassedTextId] and
			category_site = [QUOTE_SQL [SHOW SessionSite]] and
			category_name = 'SPONSORSHIP'"]
		
		set status [ROW_DELETE FF_CTNT_CATEGORY_VALUE WHERE "
			site = [QUOTE_SQL [SHOW SessionSite]] and
			id = [SHOW PassedTextId] and
			category_site = [QUOTE_SQL [SHOW SessionSite]] and
			category_name = 'SELECT_TYPE'"]

		if {[SHOW FrmUnsearchable] == "1"} {
			set cfstatus [::com.scripps::core::cma::search::addContentFlag $PassedTextId $SessionSite $CtntId TEXT $TableName UNSEARCHABLE]
		} else {
			set cfstatus [::com.scripps::core::cma::search::removeContentFlag $PassedTextId $SessionSite $CtntId TEXT $TableName UNSEARCHABLE]		
		}

		if {[catch {ROW_INSERT ff_ctnt_category_value COLS {
			site
			ctnt_id
			ctnt_type
			table_name
			id
			category_site
			category_name
			value
		} VALUES {
			{[SHOW SessionSite]}
			{[SHOW CtntId]}
			{[SHOW CtntType]}
			{[SHOW TableName]}
			{[SHOW PassedTextId]}
			{[SHOW SessionSite]}
			{SELECT_TYPE}
			{[SHOW FrmCategory]}
			}
			} errText] } {
				set CatStatus 1
				set CatMessage "Error inserting Category record. Article [SHOW PassedArticleId] may not exist in state: [SHOW FrmWflwStatus] / [SHOW FrmDelvStatus]"
			}

			set ErrorMsg [::com.scripps::core::cma::notes::setNotesDb [SHOW SessionSite] [SHOW CtntId] [SHOW CtntType] [SHOW TableName] [SHOW PassedTextId] [SHOW FrmLongNotes] [SHOW UserId]]
	}
}



#################################################################################################
## SEARCH TAGGING
## 06.20.2008 by Jon Williams
## Persist selected tags
#################################################################################################
if {$status == 0} {
	set status [persistTags [SHOW SessionSite] [SHOW PassedTextId] [SHOW CtntId] [SHOW CtntType] {} {} [SHOW UserId] [SHOW FrmHdnPrimaryCtntTags] [SHOW FrmHdnSecondaryCtntTags] [SHOW FrmHdnOtherCtntTags]]
	
	if {[string length [SHOW hdnRequestTag]] > 0 && $status == 0} {
		set status [persistRequestedTags [SHOW SessionSite] [SHOW PassedTextId] [SHOW CtntId] [SHOW CtntType] {} {} [SHOW hdnRequestTag] [SHOW UserId]]
	}
}


if {$status == 0} {
	if {[string compare $PassedWflwStat $FrmWflwStatus] ||
		[string compare $PassedDelvStat $FrmDelvStatus]} {
		set ChangedStatus {true}
	} else {
		set ChangedStatus {false}
	}
}

if {$status == 0} {
	set status [::com.scripps::cr::cma::sharedContent::putSocialMediaOverrideHtml [SHOW SessionSite] TEXT [SHOW PassedTextId] [SHOW FrmOgDescr] [SHOW FrmOgTitle] [SHOW FrmOgImage] [SHOW FrmTwitterMsg]]
	if {$status != 0} {
		if {$status == 128} {
			set Message "Social media image field must be an ID number."
		} else {
			set Message "Social media change failed, status($status)"
		}
	}
}

if {$status == 0} {
	set Message "Text Saved."
}

if {$status != 0} {
	set JavaScriptCmd "alert('$Message');"
} else {
	set JavaScriptCmd "top.setStatus(top.ContentStatusDiv,'$Message');document.FrmTextReload.submit();"
	#if {$Mode == {NEW} || $ChangedStatus == {true}} {
	#	append JavaScriptCmd "document.FrmTextReload.submit();"
	#}
}

NULL]


[##############################################################################
#                            Begin Display Section                            #
##############################################################################]

<html>
<body onload="[SHOW JavaScriptCmd]">
<FORM name='FrmTextReload' method='post' target='[SHOW CS_FRAME_EDIT]' action='[CURL /cr/cma/contentEdit [PackOid [list [Replace $CtntType {[ ]+} {-} {all} {}] $SessionSite $PassedTextId $FrmWflwStatus $FrmDelvStatus]]]'>
</FORM>
</body>
</html>
