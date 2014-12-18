[##############################################################################
Name:			CORE CMA Text Edit

Description:	Edit Screen for Content Type Text

Template path:	/cr/cma/textEdit
Cached?:		N

Dependencies:	<Explain external dependencies. If none, delete the line.>
	Templates:	Called from the search results or from the workspace
				Calls the textProcess template
	Vars:		OID with textid, wflw_status, delv_status, [mode]
				mode is optional value of "VIEW" for view only
	Files:		<Names and purposes.>
	Database:	<Names and purposes.>
	Cookies:	<Names and purposes.>
History:
	Created:	10/16/00 by Christopher G. Luttrell
	Modified: 	11/01/00 by Chris O'Neal
		Cancel button does a reset. No OK button in view mode.
	Modified:	06/06/01 by Lynda Gathercoal
		Add promote to core functionality.
	Modified:	2002.07.23 by Mark McIntyre
		Added home_section field.
	Modified:	2002.08.06 by Mark McIntyre
		Added text_style and sponsorship fields.
	Modified: 	09/26/2002 by Jonathan Bell
		Changed sponsorship form field to select list.
	Modified: 	01/29/2003 by Brant Boehmann
		Added content role/keyword.
		Keyword was bound with Category. I removed that association, and keyword
		Is not bound to content role.
	Modified: 	04/21/2003 by Jonathan Bell
		Reordered save/cancel buttons.
	Modified: 	07/02/2003 by Jonathan Bell
		Added abstract editing support.
	Modified:	06/29/2007 by Scott Everett Johnson
		Added call to sectionAccessRestriction.
	Modified:	10/09/2008 by Darin Swan
		Removed Description Field
	Modified: 	11/06/08 by Darin Swan
				Added Hub Id Lookup - Read only
	Modified:	5/1/2009 by William McKeehan
				SNDMAIN-558
				Added an indicator for the to the Friendly URL block to indicate if it is locked.
	Modified:	4/22/2010 by Kevin Malone
                added FrmSeoTitle field, SeoTitle field and generatedSeoTitle
                added code to get the generated SEO Title Field
                added SOURCE "com.scripps CORE CMA Text Library"
	Modified:	12/14/2010 by John Krewson
                MM-1501 - in order to get preview to work the same for text elements that are and are not set to package, 
				setting CtntRole to type 'PACKAGE' when empty.
	Modified:	11/09/2012 by Kent Galbraith
				MM-3959 - adding social media override boxes to form.
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

SOURCE "CORE Utilities 1.1"

SOURCE "CORE CMA Main Include"
namespace import ::com.scripps::core::cma::*

SOURCE "CORE CMA Edit Library"
namespace import ::com.scripps::core::cma::edit::*

SOURCE "com.scripps CORE CMA Notes Library"
namespace import ::com.scripps::core::cma::notes::*

SOURCE "com.scripps Core Shared Content API 1.1"
namespace import ::com.scripps::cr::cma::sharedContent::*

SOURCE "com.scripps CORE CMA Preview Library"
namespace import ::com.scripps::core::cma::preview::*

SOURCE "com.scripps CORE CMA Search Library"
namespace import ::com.scripps::core::cma::search::*

SOURCE "com.scripps CORE CMA Text Library"

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
	set ErrorMsg {An unexpected error has been encountered in Text Edit.}
	RETAIN ErrorMsg
}

###############################################################################
#                              Initializations                                #
###############################################################################

# routine to go get context variables if they were not passed in
if {[SHOW SessionSite] == ""} then {
	if {[SHOW FrmGetCtxtVarsState] == ""} then {
		set PassedID $ID
		set CallingTemplate textEdit
		set TargetFrame [SHOW CS_FRAME_EDIT]
		RETAIN PassedID CallingTemplate TargetFrame
		HTTP_REDIRECT [CURL /cr/cma/getCtxtVars {} SAVE_STATE]
	}
}

set DateFrmt ${::com.scripps::core::cma::DATE_FRMT}

###############################################################################
#                         Begin Procedure Definitions                         #
###############################################################################

###############################################################################
#                            Begin Template Logic                             #
###############################################################################

set Promote_Link ""

if {[SHOW SessionSite] == ""} then {
	set ErrorMsg {Could not retrieve Context Variables for Text Edit.}
	HTTP_REDIRECT [CURL /cr/cma/errorPage "" SAVE_STATE]
}

set Arguments 		[UnPackOid $ID]
set PassedSite 		[lindex $Arguments 0]
set PassedCtntType 	[lindex $Arguments 1]
set CtntType 		[Replace $PassedCtntType "-" " "]
set TitleCtntType 	[string totitle "$CtntType"]
set PassedTextId 	[lindex $Arguments 2]

# these will be set for each content type by the template
set CtntId 			""
set TableName 		"FF_TEXT"

set ImageDir 		/cr/cma/img/


# these will be set for each content type by the template
# The fields for id and table name must exist before the call
getCtntIdTableName $PassedSite $CtntType CtntId TableName


if {$PassedTextId == ""} then {
	set PassedSite 		$SessionSite
	set OrigWflwStat 	"WIP"
	set OrigDelvStat 	"UNSCHEDULED"

	set TextRecord 		""
	set Text_Id 		""
	set Release_Dt 		""
	set Expire_Dt 		""
	set Purge_Dt 		""
	set Headline 		""
	set Descr 			""
	set Abstract 		""
	set LongText 		""
	set LongNotes 		""
	set Mode 			"NEW"
	set AssignUid 		"$UserId"
	set AssignDt 		""
	set Home_Section 	""
	set TextStyle 		""
	set DelvFrmt 		""
	set DelvFrmtSite 	""
	set CtntRole 		""
	set URL 			""
	set HubId 			""
	#kmalone 2010_04_23 - JBE-46
	set GeneratedSeoTitle ""
	set SeoTitle 		""
} else {
	set OrigWflwStat 	[lindex $Arguments 3]
	set OrigDelvStat 	[lindex $Arguments 4]
	set Mode 			[string toupper [lindex $Arguments 5]]
	if {$Mode == ""} {
		set Mode 		"EDIT"
	}
}

set SelectCategory ""
if {!([string compare $Mode "NEW"] == 0)} then {
	# 2009-05-01 WJM - SNDMAIN-558 (added m.lock_url as lock_url)
	SEARCH TABLE TextTab INTO TextRS SQL "
		select	to_char(fastfwd.ff_cr_cma_pkg.getTime(t.release_dt, '$SessionSite'), '$DateFrmt') release_dt,
				to_char(fastfwd.ff_cr_cma_pkg.getTime(t.expire_dt, '$SessionSite'), '$DateFrmt') expire_dt,
				to_char(fastfwd.ff_cr_cma_pkg.getTime(t.purge_dt, '$SessionSite'), '$DateFrmt') purge_dt,
				to_char(fastfwd.ff_cr_cma_pkg.getTime(t.assign_dt, '$SessionSite'), '$DateFrmt') assign_dt,
				t.text_id, t.headline, t.abstract, t.descr, t.long_text, t.wflw_status, t.delv_status, t.assign_uid, t.home_section,
				t.text_style, t.sponsorship_value, t.keywords, t.delv_frmt, t.delv_frmt_site, t.ctnt_role,
				nvl(m.url, m.oid_url) as url, m.lock_url as lock_url, t.seo_title
		from	ff_text t, ff_urlmap m
		where	t.site = '$PassedSite'
		and		t.ctnt_id = $CtntId
		and		t.ctnt_type = '$CtntType'
		and		t.table_name = '$TableName'
		and		t.text_id = $PassedTextId
		and		t.wflw_status = '$OrigWflwStat'
		and		t.delv_status = '$OrigDelvStat'
		and 	m.site (+) = t.site
		and 	m.ctnt_id (+) = t.ctnt_id
		and		m.ctnt_type (+) = t.ctnt_type
		and 	m.cmpn_id (+) = t.text_id"

	if {[llength $TextRS] == 0} then {
		set ErrorMsg "Text $PassedTextId no longer exists in state $OrigWflwStat / $OrigDelvStat.  You may need to refresh your cart or search again to obtain the correct status?"
		HTTP_REDIRECT [CURL /cr/cma/errorPage "" SAVE_STATE]
	}

	set TextRecord 		[FIRST $TextRS]
	set Text_Id 		[FIELD text_id $TextRecord]
	set Wflw_Status 	[FIELD wflw_status $TextRecord]
	set Delv_Status 	[FIELD delv_status $TextRecord]
	set Release_Dt 		[FIELD release_dt $TextRecord]
	set Expire_Dt 		[FIELD expire_dt $TextRecord]
	set Purge_Dt 		[FIELD purge_dt $TextRecord]
	set Headline 		[HTML_ESCAPE [FIELD headline $TextRecord]]
	set Abstract 		[HTML_ESCAPE [FIELD abstract $TextRecord]]
	set TextDescr 		[HTML_ESCAPE [FIELD descr $TextRecord]]
	set LongText 		[HTML_ESCAPE [FIELD long_text $TextRecord]]
	set AssignUid 		[FIELD assign_uid $TextRecord]
	set AssignDt 		[FIELD assign_dt $TextRecord]
	set Home_Section 	[HTML_ESCAPE [FIELD home_section $TextRecord]]
	set TextStyle 		[FIELD text_style $TextRecord]
	set Sponsorship 	[FIELD sponsorship_value $TextRecord]
	set Keyword			[FIELD keywords $TextRecord]
	set DelvFrmt 		[FIELD delv_frmt $TextRecord]
	set DelvFrmtSite 	[FIELD delv_frmt_site $TextRecord]
	set CtntRole 		[FIELD ctnt_role $TextRecord]
	set Other_Links 	[AddThisToLinksMin]
	set Promote_Link 	[PromoteThisLink $PassedSite $UserId $CtntId $CtntType $Text_Id $OrigWflwStat $OrigDelvStat]
	set URL				[FIELD url $TextRecord]
	# 2009-05-01 WJM - SNDMAIN-558
	set	URL_Locked		[FIELD lock_url $TextRecord]
	set HubId 	[::com.scripps::core::cma::db::getParentHubId $PassedSite $CtntType $PassedTextId]
	#kmalone 2010_04_23 - JBE-46
	set SeoTitle 		[HTML_ESCAPE [FIELD seo_title $TextRecord]]
    set GeneratedSeoTitle [::com.scripps::core::cma::text::getGeneratedTextSeoTitle $PassedSite $PassedTextId]
	
	set Other_Links		"[createButton {copy_button} {Copy} {document.FrmTextEdit.FrmButton.value=\"Copy\";} {FrmButton2} {submit}] &nbsp;&nbsp; $Other_Links"
	#
	# SEJ 6/28/2007
	# Check of section restrictions, now that $Home_Section is available.
	#
	sectionAccessRestriction $PassedSite $Home_Section 1
	
	
	##############################################
	# Get Select Info
	##############################################
	if {$CtntType == "SELECT"} {
		SEARCH TABLE CRCMASelectCategory INTO CategoryRs SQL "
			select value
			from ff_ctnt_category_value
			where site='$PassedSite'
			and ctnt_type='$CtntType'
			and id = $Text_Id"
			
		if {[llength $CategoryRs] > 0} {
			set SelectCategory [FIELD value [FIRST $CategoryRs]]
		}
	}
	
#	SEARCH TABLE CRCMASponsorshipTab INTO SponsorshipRS SQL "
#		select  category_name, value
#		 from   ff_ctnt_category_value
#		 where 	site = '$PassedSite'
#		  and	ctnt_id = $CtntId
#		  and	ctnt_type = '$CtntType'
#		  and	table_name = '$TableName'
#		  and	id = $PassedTextId
#		  and 	category_site = '$PassedSite'
#		  and 	category_name = 'SPONSORSHIP'"
#	
#	if 	{[llength SponsorshipRS] > 0} {
#		foreach SponsorshipRecord $SponsorshipRS {
#			set Sponsorship "[FIELD value $SponsorshipRecord]"
#		}
#	} else {
#		set Sponsorship {}
#	}	
	##############################################
	# Get Sponsorship Info
	##############################################
	set SponsorshipList [list "" ""]
	foreach Sponsor [getSponsorshipList $PassedSite] {
		lappend SponsorshipList "[FIELD sponsorship_value $Sponsor]" "[FIELD sponsorship_value $Sponsor]"
	}
	set SponsorshipSelectList [::com.scripps::core::html::buildSelectList "FrmSponsorship" $SponsorshipList "[SHOW Sponsorship]" "1" "medium" {} {}]
		
} else {
	SEARCH TABLE TextTab INTO TextRS SQL "
		select	to_char(fastfwd.ff_cr_cma_pkg.getSysdate('$SessionSite'), '$DateFrmt') release_dt,
				to_char(fastfwd.ff_cr_cma_pkg.getSysdate('$SessionSite') + ff_getParameter('EXPIRE_OFFSET', '$SessionSite', '$CtntType'), '$DateFrmt') expire_dt,
				to_char(fastfwd.ff_cr_cma_pkg.getSysdate('$SessionSite') + ff_getParameter('PURGE_OFFSET', '$SessionSite', '$CtntType'), '$DateFrmt') purge_dt
		from	dual"

	set TextRecord [FIRST $TextRS]
	set Release_Dt [FIELD release_dt $TextRecord]
	set Expire_Dt [FIELD expire_dt $TextRecord]
	set Purge_Dt [FIELD purge_dt $TextRecord]
	set Wflw_Status $OrigWflwStat
	set Delv_Status $OrigDelvStat

	set SponsorshipList [list "" ""]
	foreach Sponsor [getSponsorshipList $PassedSite] {
		lappend SponsorshipList "[FIELD sponsorship_value $Sponsor]" "[FIELD sponsorship_value $Sponsor]"
	}
	set SponsorshipSelectList [::com.scripps::core::html::buildSelectList "FrmSponsorship" $SponsorshipList {} "1" "medium" {} {}]
	
	# New so no add to stuff needed
	set Other_Links ""
}

##############################################################
##	Categories - For Fine Living Selects
##############################################################
set KeywordCategoryHTML ""
set KeywordCategoryFlgView "N"

if {$CtntType == "SELECT"} {
	SEARCH TABLE CRCMATextEditKeyParam INTO KeyWordParam SQL " 
	   select value
	   from ff_site_parameter 
	   where site = '$PassedSite' 
	   and char_name = 'HAS_TEXT_KEYWORDS'"

	if {[llength $KeyWordParam]} { 
	   set KeywordCategoryFlgView [FIELD value [FIRST $KeyWordParam]]
	}

	set CategoryList [list "" ""]
	foreach Category [getSelectCategoryList $PassedSite] {
		lappend CategoryList "[FIELD value $Category]" "[FIELD value $Category]"
	}
	set CategorySelectList [::com.scripps::core::html::buildSelectList "FrmCategory" $CategoryList "[SHOW SelectCategory]" "1" "medium" {} {}]

	set KeywordCategoryHTML "
			<TR valign='top'>
				<TD  colspan='3' class='field_label'>
					Category:<br>
					[IF {[string match {VIEW*} $Mode] == 1} {
						<font class=small>[SHOW SelectCategory]</font>
					} ELSE {
					[SHOW CategorySelectList]
					}]	
				</TD>
			</TR>"	
}



##############################################################
##	Search Tagging
##############################################################
SEARCH TABLE CRCMAArticleEditTagParam7 INTO TagParam SQL " 
   select value
   from ff_site_parameter 
   where site='HGTV' 
   and char_name='HAS_SEARCH_TAGS'"

set searchTagHTML ""

if {[llength $TagParam]} { 
   set TagFlgView [FIELD value [FIRST $TagParam]]
} else { 
   set TagFlgView "N"
}

set TagFlgView Y

if {$TagFlgView != "N"} {
	set searchTagHTML	[::com.scripps::cr::cma::sharedContent::buildSearchTagHtml [SHOW PassedSite] TEXT [SHOW PassedTextId] 3]

	if {[string length [string trim $searchTagHTML]] > 0} {
		append OnLoadDo " initTagLists();"
	}
}
##############################################################
##	
##############################################################

# getting role and access from security

set UserRoleNames [::com.scripps::core::cma::authorization::getUserRoles $PassedSite $UserId $CtntId]
set WflwStatusMvmtRS [::com.scripps::core::cma::authorization::getWflwStatusMvmtList $PassedSite $UserRoleNames $CtntId $Wflw_Status {}]
set DelvStatusMvmtRS [::com.scripps::core::cma::authorization::getDelvStatusMvmtList $PassedSite $UserRoleNames $CtntId $Delv_Status {}]

set ModeReason ""
# call proc to check status and mode
# *** Note Mode and ModeReason are pass by reference and must exist ***
::com.scripps::core::cma::authorization::setModeAndReason $PassedSite $SessionSite $UserRoleNames $CtntId $Wflw_Status $Delv_Status Mode ModeReason

if {[string compare $Mode "VIEW"] == 0} then {
	set Title "$ModeReason Viewing $TitleCtntType $Text_Id"
} elseif {[string compare $Mode "NEW"] == 0} then {
	set Title "Create New $TitleCtntType"
} else {
	set Title "Editing $TitleCtntType $Text_Id"
}

##############################################################
##	Friendly URL
##############################################################
set FriendlyURL ""

if {[string compare [SHOW URL] ""] != 0} {
	set FriendlyURL "[getURLBase [SHOW PassedSite]][SHOW URL]"
} else {
	set FriendlyURL "Not Available"	
}

# 2009-05-01 WJM - SNDMAIN-558
if { [string equal "Y" [SHOW URL_Locked]] } {
	set lock_status "LOCKED"
}

set FriendlyUrlHtml "
		<TR valign='top'>
			<TD colspan='3' class='field_label'>
			URL: [SHOW lock_status]<BR>
				<font class=small>$FriendlyURL</font>
			</TD>
		</TR>"


##############################################################
##	Keywords and Content Roles 
##############################################################
SEARCH TABLE CRCMAArticleEditKeyParam INTO KeyWordParam SQL " 
   select value
   from ff_site_parameter 
   where site = '$PassedSite' 
   and char_name = 'HAS_ARTICLE_KEYWORDS'"
   
if {[llength $KeyWordParam]} { 
   set KeywordFlgView [FIELD value [FIRST $KeyWordParam]]
} else { 
   set KeywordFlgView "N"
}

set CtntRoleList [list "" ""]
foreach crole [getContentRoles $PassedSite $CtntType] {
	lappend CtntRoleList "[FIELD ctnt_role $crole]" "[FIELD ctnt_role $crole]"
}
set CtntRoleSelectList [::com.scripps::core::html::buildSelectList "FrmCtntRole" $CtntRoleList "[SHOW CtntRole]" "1" "medium" {} {}]


# Get notes if there are any
if {[string compare $Mode "NEW"] == 0} then {
	set LongNotes ""
} else {
	set LongNotes [::com.scripps::core::cma::notes::getNotesDb $PassedSite $CtntId $CtntType $TableName $PassedTextId]
}		




set Unsearchable [::com.scripps::core::cma::search::isUnSearchable $Text_Id $SessionSite $CtntId "TEXT" $TableName]
set UnsearchableHTML "&nbsp;"
append UnsearchableHTML [::com.scripps::core::cma::search::getSearchCheckbox FrmUnsearchable $Unsearchable]
append UnsearchableHTML " Unsearchable"

set KeywordHTML "
		<TR valign='top'>
			<TD  class='field_label' colspan='2'>
				<table width=100%>
					<tr>
						<td class='inner_field_label'>
							Keywords:<br>  
							[IF {[string match {VIEW*} $Mode] == 1 || $KeywordFlgView == "N"} {
								<font class=small>[SHOW Keyword]</font>
								<input type='hidden' name='FrmKeyword' value="[SHOW Keyword]">
							} ELSE {
								<INPUT type='text' name='FrmKeyword' size=[TextWidth] value="[SHOW Keyword]" class=small maxlength=240>
							}]	
							</td>
						<td class='inner_field_label'>
							[IF {[string match {VIEW*} $Mode] == 1 || $KeywordFlgView == "N"} {
								<input type='hidden' name='FrmUnsearchable' value="[SHOW Unsearchable]">
							} ELSE {
								[IF {[string match {PACKAGE} $CtntRole] == 1} {
									[SHOW UnsearchableHTML]
								} ELSE {
									<input type='hidden' name='FrmUnsearchable' value="[SHOW Unsearchable]">								
								}]
							}]	
							</td>
					</tr>
				</table>
				
			</TD>
			<TD  class='field_label'>
				Content Role:<br>  
					[IF {[string match {VIEW*} $Mode] == 1} {
						<font class=small>[SHOW CtntRole]</font>
						<input type='hidden' name='FrmCtntRole' value="[SHOW CtntRole]">
					} ELSE {
						[SHOW CtntRoleSelectList]
					}]	
			</TD>
		</TR>"		

#12/13/2010:jwk:MM-1501 - in order to get preview to work the same for text elements that are and are not set to package, setting CtntRole to type 'PACKAGE' when empty.
if {$CtntRole == ""} {
	set CtntRole PACKAGE
}

# SHOW Promote_Link
set saveBtn		""
set resetBtn	""
set previewBtn	[createPreviewLink $PassedSite $ImageDir $PassedSite $Text_Id $CtntType $DelvFrmt $Home_Section $CtntRole]

if {$Mode != "VIEW"} {
	set saveBtn		[createButton {save_button} {Save} {} {FrmButton2} {submit}]
	set resetBtn	[createButton {cancel_button} {Reset} {} {} {reset}]
} 

set ActionButtonHTML "
		<TR valign='top'>
			<TD colspan=3 align=right>
				[::com.scripps::core::cma::createEditActionRowHTML $saveBtn $resetBtn $previewBtn $Other_Links]
			</TD>
		</TR>"

##############################################################
##	Social Media Overrides
##############################################################

# 11/9/12 - kg: Added call to deliver social media override fields to form
set socialMediaHTML [::com.scripps::cr::cma::sharedContent::getSocialMediaOverrideHtml [SHOW PassedSite] TEXT [SHOW PassedTextId] [SHOW Mode]]

## new method.
set ExtraHTML ""
set EditFormName "FrmTextEdit"
set CtntType "TEXT"
set Id	$PassedTextId
set WorkflowStatus $Wflw_Status
set DeliveryStatus $Delv_Status
set ACFieldName "add_to_cart"
set WSFieldName "add_to_workspace"
set AccessMask ""
set PromoteLink ""

set ActionButtonHTML "<TR valign='top'>	<TD align=left colspan=6>"
append ActionButtonHTML [::com.scripps::core::cma::buildEditActionHtml $EditFormName $Mode $CtntType $SessionSite $ExtraHTML $previewBtn $Id $PromoteLink $WorkflowStatus $DeliveryStatus $AccessMask]
append ActionButtonHTML "</TD></TR>"

NULL]



[##############################################################################
#                            Begin Display Section                            #
##############################################################################]

<HTML>
<HEAD>
<TITLE>Text Editor</TITLE>
[PAGE_EXPIRES]
<LINK REL=STYLESHEET TYPE="text/css" HREF="/cr/cma/styleMaster">
<script language="JavaScript" src="[CURL /cr/cma/javascriptDateValidation]" ></script>
<script language="Javascript" src="[CURL /cr/cma/javascriptEditFunctions]"></script>
<script type="text/javascript" src="/cr/cma/recache.js"></script>

<SCRIPT language="JavaScript">
<!--
	function chkForm (thisForm) {
		//alert('In chkForm');
		return chkDates(thisForm.FrmReleaseDate,
		thisForm.FrmExpireDate,
		thisForm.FrmPurgeDate,
		'NA',
		'NA');
	}
	
function submitForm (thisBtn, thisForm) { 
		thisBtn.disabled = true;
	  
	   [IF {[string match {VIEW*} $Mode] == 0} {
			if (chkDates(thisForm.FrmReleaseDate,
			thisForm.FrmExpireDate,
			thisForm.FrmPurgeDate,
			'NA',
			'NA')) {
				  thisForm.submit();
		     } else {
				thisBtn.disabled = false;
				return false;
			}
		} ELSE {		 		
		  thisForm.submit();		   
		}]
	}	
	
	
	
	
//-->
</SCRIPT>
</HEAD>

<BODY onload="parent.getCurCtxtVars(document.FrmTextEdit);[SHOW OnLoadDo]">
<FORM name='FrmTextEdit' method='post' target='[SHOW CS_FRAME_DEBUG]' action='[CURL /cr/cma/textProcess [PackOid [list $PassedTextId $Wflw_Status $Delv_Status]]]' onSubmit='return chkForm(this);'>
<input type='hidden' name='FrmMode' value='[SHOW Mode]'>
<input type='hidden' name='FrmButton' id='FrmButton' value=''>
<input type='hidden' name='FrmCtntType' value='[SHOW CtntType]'>
[#AddContext below is adding blank form values, commenting for now, and adding entries required possible artifact]
<input type=hidden name=SessionLoginDt value="">	
<input type=hidden name=CurCtxtType value="">
<input type=hidden name=CurCtxtSite value="">
<input type=hidden name=CurCtxtId value="">
<input type=hidden name=CurCtxtWflwStatus value="">
<input type=hidden name=CurCtxtDelvStatus value="">
[#AddContext]

<TABLE class="field_table">
<TR>
	<TD>
		<TABLE  class="field_table">
		<TR valign='top'>
			<TD colspan='3' class=header_table>[SHOW Title] [SHOW Headline]</TD>
		</TR>
		[SHOW ActionButtonHTML]
		<TR>
			<TD class='field_label'>
				Release Date:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW Release_Dt]</font>
					<input type='hidden' name='FrmReleaseDate' value='[SHOW Release_Dt]'>
				} ELSE {
					[createDateFields [SHOW Release_Dt] FrmReleaseDate FrmTextEdit]
				}]
			</TD>
			<TD class='field_label' colspan='1'>
				<TABLE class=smallbold border='0' cellspacing='0' cellpadding='5'>
				<TR valign='top'>
					<TD class='inner_field_label' width='35%'>
						Workflow Status:<BR>
						[IF {$Mode == "VIEW"} {
							<font class=small>[SHOW Wflw_Status]</font>
							<input type='hidden' name='FrmWflwStatus' value='[SHOW Wflw_Status]'>
						} ELSE {
							[getStatusHtml $WflwStatusMvmtRS $Wflw_Status FrmWflwStatus]
						}]
					</TD>
					<TD class='inner_field_label' width='5%'></td>
					<TD class='inner_field_label' width='35%'>
						Delivery Status:<BR>
						[IF {$Mode == "VIEW"} {
							<font class=small>[SHOW Delv_Status]</font>
							<input type='hidden' name='FrmDelvStatus' value='[SHOW Delv_Status]'>
						} ELSE {
							[getStatusHtml $DelvStatusMvmtRS $Delv_Status FrmDelvStatus]
						}]
					</TD>
					<TD class='inner_field_label' width='5%'></td>
					<TD class='inner_field_label' width='20%'>
						Hub Id:<BR>
							<font class=small>[SHOW HubId]</font>
					</TD>
				</TR>
				</TABLE>
			</TD>
			<TD class='field_label'>
				Assigned To:<BR>
				[IF {$Mode == "VIEW"} {
					<nobr><font class=small>[SHOW AssignUid] [SHOW AssignDt]</font></nobr>
					<input type='hidden' name='FrmAssignUid' value='[SHOW AssignUid]'>
					<input type='hidden' name='FrmAssignDt' value='[SHOW AssignDt]'>
				} ELSE {
					<nobr>[getAssignUidHtml $PassedSite FrmAssignUid $AssignUid 1] <font class=small>[SHOW AssignDt]</font></nobr>
				}]
			</TD>
		</TR>
		<TR valign="top">
			<TD class='field_label'>
				Expire Date:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW Expire_Dt]</font>
					<input type='hidden' name='FrmExpireDate' value='[SHOW Expire_Dt]'>
				} ELSE {
					[createDateFields [SHOW Expire_Dt] FrmExpireDate FrmTextEdit]
				}]
			</TD>
			<TD class='field_label'>
				Title:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW Headline]</font>
					<input type='hidden' name='FrmHeadline' value='[SHOW Headline]'>
				} ELSE {
					<INPUT type='text' name='FrmHeadline' size=[TextWidth] value="[SHOW Headline]" class=small>
				}]
			</TD>
			<TD class='field_label'>
				Text Style:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW TextStyle]</font>
					<input type='hidden' name='FrmTextStyle' value='[SHOW TextStyle]'>
				} ELSE {
					<INPUT type='text' name='FrmTextStyle' size='40' value="[SHOW TextStyle]" class=small>
				}]
			</td>
		</TR>
		<TR valign="top">
			<TD class='field_label'>
				Purge Date:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW Purge_Dt]</font>
					<input type='hidden' name='FrmPurgeDate' value='[SHOW Purge_Dt]'>
				} ELSE {
					[createDateFields [SHOW Purge_Dt] FrmPurgeDate FrmTextEdit]
				}]
			</TD>
			<td class='field_label'>
				Sponsorship:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW Sponsorship]</font>
				} ELSE {
					[SHOW SponsorshipSelectList]
					<!--input type='text' name='FrmSponsorship' size='60' value='[SHOW Sponsorship]' class=small-->
				}]
			</TD>
			<TD class='field_label' width='50%'>
				Home Section:<BR>
				[IF {[string match {VIEW*} $Mode] == 1} {
					<font class=small>[SHOW Home_Section]</font>
				} ELSE {
					[getHomeSectionHtml "[SHOW Home_Section]" "[SHOW PassedSite]"]
				}]
		 	</td>
		</TR>

		[IF {$KeywordCategoryFlgView == "Y"} {
			<TR valign="top">
				<TD class='field_label' colspan=3>
					<TABLE class=smallbold width='100%' cellpadding='5'>
					<TR valign='top'>
						<TD class='field_label'>
							Display Template:<BR>
							[IF {[string match {VIEW*} $Mode] == 1} {
								<font class=small>[SHOW DelvFrmt]</font>
								<input type='hidden' name='FrmDelv_Frmt' value="[SHOW DelvFrmt]">
								<input type='hidden' name='FrmDelv_Frmt_Site' value="[SHOW DelvFrmtSite]">
							} ELSE {
								[getDelvFrmtHtml FrmDelv_Frmt $PassedSite SELECT $DelvFrmt "this.form.FrmDelv_Frmt_Site.value=[DQ]$PassedSite[DQ];"]
								<input type='hidden' name='FrmDelv_Frmt_Site' value="[SHOW DelvFrmtSite]">
							}]
						</TD>
					</TR>
					</TABLE>
				</TD>
	
				[SHOW KeywordCategoryHTML]
			} ELSE {
			<input type='hidden' name='FrmCategory' value="[SHOW SelectCategory]">
			<input type='hidden' name='FrmDelv_Frmt' value="[SHOW DelvFrmt]">
			<input type='hidden' name='FrmDelv_Frmt_Site' value="[SHOW DelvFrmtSite]">
		}]

		[SHOW KeywordHTML]
		
		[SHOW socialMediaHTML]
	
		[SHOW searchTagHTML]

		[SHOW FriendlyUrlHtml]

		<TR valign="top">
			<TD colspan='3' class='field_label'>
				SEO Title: <font class=small>(240 characters max)</font><BR>
				Generated: [SHOW GeneratedSeoTitle]<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW SeoTitle]</font>
					<input type='hidden' name='FrmSeoTitle' value='[SHOW SeoTitle]'>
				} ELSE {
					<TEXTAREA name='FrmSeoTitle' wrap='soft' cols=[TextAreaCols] rows=[TextAreaRows] class=small>[SHOW SeoTitle]</TEXTAREA>
				}]
			</TD>
		</TR>
		
		<TR valign="top">
			<TD colspan='3' class='field_label'>
				SEO Description: <font class=small>(3000 characters max)</font><BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW Abstract]</font>
					<input type='hidden' name='FrmAbstract' value='[SHOW Abstract]'>
				} ELSE {
					<TEXTAREA name='FrmAbstract' wrap='soft' cols=[TextAreaCols] rows=[TextAreaRows 4] class=small>[SHOW Abstract]</TEXTAREA>
				}]
			</TD>
		</TR>
		
		<TR valign="top">
			<TD colspan='3' class='field_label'>
				Text:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW LongText]</font>
					<input type='hidden' name='FrmLongText' value='[SHOW LongText]'>
				} ELSE {
					<TEXTAREA name='FrmLongText' wrap='soft' cols=[TextAreaCols] rows=[TextAreaRows 6] class=medium>[SHOW LongText]</TEXTAREA>
				}]
			</TD>
		</TR>

		<TR valign="top">
			<TD colspan='3' class='field_label'>
				Internal Notes:<BR>
				[IF {$Mode == "VIEW"} {
					<font class=small>[SHOW LongNotes]</font>
					<input type='hidden' name='FrmLongNotes' value='[SHOW LongNotes]'>
				} ELSE {
					<TEXTAREA name='FrmLongNotes' wrap='soft' cols=[TextAreaCols] rows=[TextAreaRows 6] class=medium>[SHOW LongNotes]</TEXTAREA>
				}]
			</TD>
		</TR>

		[SHOW ActionButtonHTML]
		</TABLE>
	</TD>
</TR>
</TABLE>

<!--Other fields that need to be passed-->
<input type='hidden' name='SessionSite' value='[SHOW SessionSite]'>

</FORM>

[# If New no "add to" stuff needed]
[IF {$Mode != "NEW"} {
<FORM name=AddThisForm action="[CURL /cr/cma/addItem $PassedSite]" method=post target="[SHOW CS_FRAME_DEBUG]">
	<!-- additional variables needed by /cr/cma/addItem to add an item to the current workspace or cart -->
	<input type=hidden name="AddThisTo" value="">
	<input type=hidden name="AddThisCtntType" value="[SHOW CtntType]">
	<input type=hidden name="AddThisSite" value= "[SHOW PassedSite]">
	<input type=hidden name="AddThisID" value="[SHOW PassedTextId]">
	<input type=hidden name="AddThisDescr" value="[SHOW Headline]">
[AddContext]
</FORM>

<FORM name=PromoteThisForm action="[CURL /cr/cma/promoteItem]" method=post target="[SHOW CS_FRAME_DEBUG]">
	<!-- additional variables needed by /cr/cma/promteItem to promote an item to Core -->
	<input type=hidden name="PromoteThisCtntType" value="[SHOW CtntType]">
	<input type=hidden name="PromoteSite" value= "[SHOW PassedSite]">
	<input type=hidden name="PromoteThisID" value="[SHOW PassedTextId]">
	<input type=hidden name="PromoteCtntID" value = "[SHOW CtntId]">
	<input type=hidden name="PromoteWflwStatus" value="[SHOW Wflw_Status]">
	<input type=hidden name="PromoteDelvStatus" value="[SHOW Delv_Status]">
</FORM>

}]
</BODY>
</HTML>
