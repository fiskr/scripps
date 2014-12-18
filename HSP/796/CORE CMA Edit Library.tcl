##############################################################################
#Name:			CORE CMA Edit Library
#
#Description:	Defines common procedures used by multiple edit pages.
#
#Template path:	None. Library
#Cached?:		N/A
#
#Contents:		<procedure name>	<procedure description>
#
#History:
#	Created:	09/29/00 by Christopher G. Luttrell
#	Modified: 	<mm/dd/yy> by <name>
#		<List important changes here. Repeat "Modified:" line for more.>
#		10/03/00 by Alan Oliver - added JS OnChange to getStatusHtml.
#		05/10/01 by Lynda Gathercoal - added PromoteThisLink for promote
#			to core functionality
#		06/06/01 by Lynda Gathercoal - added promote to core for text
#		2001.12.10 by Mark McIntyre - changed the getHomeSectionHtml to provide a
#			default value based on a FF_SITE_PARAMETER called HOME_SECTION_DEFAULT.
#		2002.01.17 by Mark McIntyre - added a couple of procs for FINE mods
#		2002.02.12 by Bill Stone - added getNameForValue proc to get the name for a value from a list of name value pairs
#		2002.06.20 by Mark McIntyre - changed the getHomeSectionHtml to exclude sections w/o sctn_types
#		2003.04.21 by Jonathan Bell - converted cart/workspace/promote links to buttons
#		2008.10.02 by Darin Swan - Edited getShowAbbr, to not error out when show isn't found
#		2008.11.19 by Darin Swan - Reskinning, edited PromoteThisLink,AddThisToLinks to show new buttons
#		2009.01.04 by John Krewson - Added getCategoryHtml
#		2009.01.04 by John Krewson - Added getProviderHtml
#		2009.02.09 by John Krewson - Added getCategoryHtml,getRightsUsageHtml,getImageAttributeSelectList
#		2009.05.14 by Darin Swan - Edited getDelvFrmtHtml, exclude ARTICLE_BIO from Delivery format for Articles with AB BIO active.
#		2009.07.09 by Darin Swan - Edited getSourceHtml, added check to only get active Sources.
#		2010.03.23 by John Krewson - Edited getRightsUsageHtml, limited the width of the form field.
#		2010.10.21 by Kevin Malone - Edited getHomeSectionHtml, added code to filter out section types listed in CS_HOMESECTION_EXCLUDE_TYPES 
#		2011.02.21 by John Krewson - MM-1632 - edited getAssignUidHtml, revised query to work with Jitterbug security model
#		2012.10.02 by Robert Seeger - SE-5337 Mediastream Phase 1B - adding namespace and command for image size category information
#
#Copyright (C) 2000 E.W. Scripps Corporation. All rights reserved.
##############################################################################


# each edit template in the cma should source this library!!

namespace eval ::com.scripps::core::cma::edit {

###############################################################################
#                            Exported Procedures                              #
###############################################################################
namespace export getParentShowSelectList getCategoryHtml getPresentationFrmtHtml getDisplayFrmtHtml AddThisToLinksMin getRightsUsageHtml getImageAttributeSelectList getProviderHtml getCategoryHtml getSourceHtml getResourceTypeHtml getStatusHtml getDelvFrmtHtml setModeAndReason getAssignUidHtml TextWidth TextAreaCols TextAreaRows getCopyrightListHtml getHomeSectionHtml getSponsorshipListHtml getOtherSectionHtml AddThisToLinks PromoteThisLink hasPromoteAccess textBox getShowSelectList getSeriesSelectList getShowAbbr getSeriesName getEpisodeNo getNameForValue getCopyrightHolder getNewDelvFrmtHtml

###############################################################################
#                       Private Procedures Definitions                        #
###############################################################################

##############################################################################
## DQ:
##		Return " character.
##
## Synopsis:
## DQ
##
## Arguments:
## none.
##
## Returns:		Double quotes.
##
## Examples:
## 1. DQ
##

proc DQ { } {
	return [format %c 34]
}

###############################################################################
#                       Public Procedures Definitions                         #
###############################################################################

proc TextWidth {} {
	return 68
}

proc TextAreaCols {} {
	return 120
}

proc TextAreaRows {{Multiplier 1}} {
	return [expr (3 * $Multiplier)]
}

proc AddThisToLinks {} {
#	return "
#		<TD align=right><A href=[DQ]javascript:AddThisTo('CART');[DQ] class=smallbold>Add to Cart</A></TD>
#		<TD align=right><A href=[DQ]javascript:AddThisTo('WORKSPACE');[DQ] class=smallbold>Add to Workspace</A></TD>"

# before reskinning
#	return "
#		<TD align=right>
#		<input type=button value=[DQ]Add to Cart[DQ] onclick=[DQ]AddThisTo('CART');[DQ]>
#		</TD>
#		<TD align=right><input type=button value=[DQ]Add to Workspace[DQ] onclick=[DQ]AddThisTo('WORKSPACE');[DQ]>
#		</TD>"

	set WSFieldName "add_to_workspace"
	set ACFieldName "add_to_cart"
	return "
		<TD align=right>
		[::com.scripps::core::cma::createButton {add_to_cart_button} {Add to Cart} "AddThisTo([DQ]CART[DQ]);" {$ACFieldName} {button}]
		</TD>
		<TD align=right>
		[::com.scripps::core::cma::createButton {add_to_workspace_button} {Add to Workspace} "AddThisTo([DQ]WORKSPACE[DQ]);" {$WSFieldName} {button}]
		</TD>		"
}

proc AddThisToLinksMin {} {
	set WSFieldName "add_to_workspace"
	set ACFieldName "add_to_cart"
	return "
		<button class='add_to_cart_button' type='button' onclick=[DQ]AddThisTo('CART');[DQ] name='$ACFieldName' id='$ACFieldName'></button>
		&nbsp;
		<button class='add_to_workspace_button' type='button' onclick=[DQ]AddThisTo('WORKSPACE');[DQ] name='$WSFieldName' id='$WSFieldName'></button>"
}

proc PromoteThisLink {SiteId UserId CtntID CtntType ItemId WflwStatus DelvStatus} {
	set checkPromoteAccess [hasPromoteAccess $SiteId $UserId $CtntID $CtntType $ItemId $WflwStatus $DelvStatus]
	if {$checkPromoteAccess == "OK"} {
#		return "
#			<TD align=right><A href=[DQ]javascript:PromoteToCore();[DQ] class=smallbold>Promote to Core</A></TD>"
#
# before reskinning
#		return "
#			<TD align=right>
#			<input type=button value=[DQ]Promote to Core[DQ] onclick=[DQ]PromoteToCore();[DQ]>
#			</TD>"
		return "
			<TD align=right>
			[::com.scripps::core::cma::createButton {promote_to_core_button} {Promote to Core} {PromoteToCore();} {PromoteToCore} {button}]
			</TD>"

		set FieldName "promote_to_core"

#		return "
#			<TD align=right>
#			<button class='promote_to_core_button' type='submit' onclick=[DQ]PromoteToCore();[DQ] name='$FieldName' id='$FieldName'></button>
#			</TD>"
 	} else {
		return ""
	}
}


#Added 2/11/09
proc getCategoryHtml { Site FieldName {CurrentCategories {}} {Size "1"} {Class "medium"} {Multiple ""} {JS {}} } {
	
	set CategoryList [list]
	
	SEARCH TABLE CORECMAEditLibraryCategoryTab INTO CategoryRS SQL "	
	select value
	from ff_attribute_list
	where attribute_name = 'IMAGE CATEGORY'
	"
				
	# make sure show records exist
	if {[llength $CategoryRS] > 0} {
	
		#When building a list, not sure if this behaviour is needed
		# default to first item on the list if one is not supplied
		#if {$CurrentCategory == ""} {
		#	set Category [FIELD value [FIRST $CategoryRS]]
		#}
		
		# get the list of values for building html
		foreach CategoryRecord $CategoryRS {
			lappend CategoryList "[FIELD value $CategoryRecord]" "[FIELD value $CategoryRecord]"
		}
				
		# default field name if none is supplied
		if {$FieldName == ""} {
			set FieldName "Category"
		}
		
		# set CategorySelectList [# ::com.scripps::core::html::buildMultiSelectedSelectList "$FieldName" $CategoryList $CurrentCategories $Size $Class $Multiple "$JS"]		
		set SelectListHTML "
		<select name='$FieldName' size='$Size' $Multiple class='$Class' $JS>"				
		foreach {n v} $CategoryList {						
			if {[string first $v $CurrentCategories] >= 0} {
				append SelectListHTML "
				<option value='$v' selected>$n</option>"
			} else {
				append SelectListHTML "
				<option value='$v'>$n</option>"
			}
		}
		append SelectListHTML "
		</select>"
	}
	
	return $SelectListHTML	
}

#Added 2/9/09
proc getRightsUsageHtml { Site FieldName {CurrentRights {}} {Size "1"} {Class "medium"} {Multiple ""} {JS {}} } {
	
	set RightsList [list]
	
	SEARCH TABLE CORECMAEditLibraryRightsTab INTO RightsRS SQL "	
	select value
	from ff_attribute_list
	where attribute_name = 'RIGHTS USAGE TERMS'
	"
				
	# make sure show records exist
	if {[llength $RightsRS] > 0} {
	
		# Not sure if this behaviour is needed for a list
		# default to first item on the list if one is not supplied
		#if {$CurrentRights == ""} {
		#	set ShowAbbr [FIELD value [FIRST $RightsRS]]
		#}
		
		# get the list of values for building html
		foreach RightsRecord $RightsRS {
			lappend RightsList "[FIELD value $RightsRecord]" "[FIELD value $RightsRecord]"
		}
				
		# default field name if none is supplied
		if {$FieldName == ""} {
			set FieldName "Rights Usage Term"
		}

		# set  RightsSelectList # ::com.scripps::core::html::buildMultiSelectedSelectList "$FieldName" $RightsList $CurrentRights $Size $Class $Multiple "$JS"
		set SelectListHTML "
		<select name='$FieldName' size='$Size' $Multiple class='$Class' $JS style='width:100%';>
		<option value=''>Select a Right Usage Term ...</option>"				
		foreach {n v} $RightsList {						
			if {[string first $v $CurrentRights] >= 0} {
				append SelectListHTML "
				<option value='$v' selected>$n</option>"
			} else {
				append SelectListHTML "
				<option value='$v'>$n</option>"
			}
		}
		append SelectListHTML "
		</select>"
	}
	
	return $SelectListHTML			
	
}

#Added 2/5/09
proc getProviderHtml { Site FieldName {CurrentProvider {}} {Size "1"} {Class "medium"} {Multiple ""} {JS {}} {EmptyFirstRow {}}} {
	SEARCH TABLE CORECMAEditLibraryProviderTab INTO ProviderRS SQL "	
	select value
	from ff_attribute_list
	where attribute_name = 'PROVIDER'
	order by value
	"

	set ProviderList ""
	# make sure show records exist
	if {[llength $ProviderRS] > 0} {
	
		# default to first item on the list if one is not supplied
		if {$EmptyFirstRow == ""} {
			if {$CurrentProvider == ""} {
				set CurrentProvider [FIELD value [FIRST $ShowRecords]]
			}
		} else {
			lappend ProviderList {} {}
		}	
	
		# get the list of values for building html
		foreach ProviderRecord $ProviderRS {
			lappend ProviderList "[FIELD value $ProviderRecord]" "[FIELD value $ProviderRecord]"
		}
		
		# default field name if none is supplied
		if {$FieldName == ""} {
			set FieldName "Provider"
		}

		set ProviderSelectList [::com.scripps::core::html::buildReformedSelectList "$FieldName" $ProviderList "$CurrentProvider" $Size $Class $Multiple "$JS"]

	}

	return $ProviderSelectList
	
}


proc getSourceHtml {CurrSource CurrSite {Size "1"} {Class "smallselect"} {Multiple ""} {Javascript ""}} {

	set tsql "select distinct source, source_desc descr from ff_source"
	if {[string equal [SHOW CS_ENABLE_SOURCE] 1]} {		
		append tsql " where source_status='ACTIVE'"
		append tsql " or source='$CurrSource'"
	}
	#append tsql "where site in ('CORE', '$CurrSite')"

	SEARCH TABLE CORECMAEditLibrarySourceTab INTO SourceRS SQL $tsql


	set SourceList {}
	set NotFound {true}

	foreach SrcRec $SourceRS {
		set Src [FIELD source $SrcRec]
		set Descr [FIELD descr $SrcRec]
		if { $Src == $CurrSource } {
			set NotFound {false}
		}
		lappend SourceList "$Descr" "$Src"
	}
	if {$NotFound} {
		lappend SourceList "$CurrSource" "$CurrSource"
	}

	return [::com.scripps::core::html::buildSelectList "FrmSource" $SourceList [list "$CurrSource"] $Size $Class $Multiple $Javascript]
}

proc getResourceTypeHtml {CurrSource CurrSite {Size "1"} {Class "smallselect"} {Multiple ""} {Javascript ""}} {
	SEARCH TABLE CORECMAEditLibraryResourceTypeTab INTO ResourceRS SQL "
		select distinct resource_type, descr
		from ff_resource_type"
		#where site in ('CORE', '$CurrSite')"

	set ResourceTypeList {}
	set NotFound {true}

	foreach RTRec $ResourceRS {
		set RT [FIELD resource_type $RTRec]
		set Descr [FIELD descr $RTRec]
		if { $RT == $CurrSource } {
			set NotFound {false}
		}
		lappend ResourceTypeList "$Descr" "$RT"
	}
	if {$NotFound} {
		lappend ResourceTypeList "$CurrSource" "$CurrSource"
	}

	return [::com.scripps::core::html::buildSelectList "FrmResourceType" $ResourceTypeList [list "$CurrSource"] $Size $Class $Multiple $Javascript]
}

proc getCopyrightListHtml {CurrCopyrightFlg CurrSite} {
    set CopyrightList {}
	
	SEARCH TABLE CoreCMAEditLibraryCopyrightList INTO CopyrightRS SQL "
		select value, dsp_name
		from ff_static_vldt
		where site = '$CurrSite' and char_name = 'COPYRIGHT_HOLDER' and status = 'ACTIVE'
		order by rank_order
	"	
	
	if {[llength $CopyrightRS] > 0} {
#		lappend CopyrightList "Y" "Y" "N" "N"
		foreach Holder $CopyrightRS {
			lappend CopyrightList "[FIELD dsp_name $Holder]" "[FIELD value $Holder]"
		}
		return [::com.scripps::core::html::buildSelectList "FrmCopyrightFlg" $CopyrightList [list "$CurrCopyrightFlg"] "1" "smallselect" {} {}]
	} else {
		return ""
	}
}

proc getCopyrightHolder {CurrCopyrightFlg CurrSite} {

	SEARCH TABLE CoreCMAEditLibraryCopyrightHolder INTO CopyrightHolderRS SQL "
		select value, dsp_name
		from ff_static_vldt
		where site = '$CurrSite' and char_name = 'COPYRIGHT_HOLDER' and status = 'ACTIVE'
		  and value = '$CurrCopyrightFlg'
	" ROWCOUNT 1
	
	if {[llength $CopyrightHolderRS] == 1} {
		return "[FIELD dsp_name [FIRST $CopyrightHolderRS]]"
	} else {
		return ""
	}	
}

proc PotentialNew_getHomeSectionHtml {CurrHomeSection CurrSite {CurrCtntType ""}} {

	# get the section hierarchy site parameter
	SEARCH TABLE CoreCmaworkspaceNavigation26 INTO DisplayHierarchy SQL "
		select value
		from ff_site_parameter
		where char_name = 'SCTN_HIERARCHY_DISPLAY' and site = '$CurrSite'"
	
	if {[llength $DisplayHierarchy] == 0} {
		set DisplayHierarchyValue "NO"
	} else {
		set DisplayHierarchyValue [FIELD value [FIRST $DisplayHierarchy]]
	}
	
	# get the list of sections for the pick list
	# not sure where this proc came from but it is currently unused and this query gives error as UserId is unkown
	# if you switch to this proc this query needs to add where clause based no CS_HOMESECTION_EXCLUDE_TYPES, see current getHomeSectionHtml
	SEARCH TABLE CoreCmaworkspaceNavigation22 INTO CtntTypeSections SQL "
		select distinct parent_sctn_id, initcap(parent_sctn_name) as parent_sctn_name
		from ff_user_ctnt_type
		where site = '$CurrSite'
		and userid in (select userid from ff_user_id where userid='$UserId' 
			  	union select user_group as userid from ff_security_map where userid='$UserId')
		and parent_sctn_id is not null
		and parent_sctn_name is not null
		group by parent_sctn_id, parent_sctn_name
		order by parent_sctn_name"
		
	
	# Build the section pick list.
	
	set SectionList {}
	#{{} {}}
	
	#set errorString ""
	# Is there anyway to only build this once, then just set the selected one each time
	foreach CtntTypeSection $CtntTypeSections {
		# build each sections hierarchial structure
		# need to test with multiple sites to see if connect by works!!!
		if {$DisplayHierarchyValue != "NO"} {
			# build section hierarchy into list
			set oldSql "
			select sctn_id, initcap(sctn_name) as sctn_name, 
				 child_sctn_id, initcap(child_sctn_name) as child_sctn_name, level
				from ff_sctn_strc
				where child_site = '$CurrSite'
				start with child_sctn_id = [FIELD parent_sctn_id $CtntTypeSection]
				connect by prior sctn_id = child_sctn_id
				order by level"
				
			SEARCH TABLE CoreCmaworkspaceNavigation23 INTO Sections SQL "
				select parentSection.sctn_id, initcap(parentSection.sctn_name) as sctn_name, parentSection.dsp_name,
				 childSection.sctn_id as child_sctn_id, initcap(childSection.sctn_name) as child_sctn_name, childSection.dsp_name as child_dsp_name, level
				from ff_sctn_strc strc
				join ff_sctn parentSection
				  on parentSection.sctn_id = strc.sctn_id
				  and parentSection.site = strc.site
				join ff_sctn childSection
				  on childSection.sctn_id = strc.child_sctn_id
				  and childSection.site = strc.child_site
				where strc.child_site = '$CurrSite'
				start with strc.child_sctn_id = [FIELD parent_sctn_id $CtntTypeSection]
				connect by prior strc.sctn_id = strc.child_sctn_id
				order by level"
									
			set LevelNames(0) "$CurrSite"
			set ChildStartSctnName ""
			set ChildStartSctnId ""
			set ChildSectionName ""
			set Level 0
		
			#append errorString "  parent = [FIELD parent_sctn_id $CtntTypeSection] - "
		
			foreach SectionRec $Sections {
				set Level [FIELD level $SectionRec]
				set ChildSectionName [FIELD child_sctn_name $SectionRec]
		
				#append errorString "$Level "
		
				if {$Level == 1} {
					set ChildStartSctnName [FIELD child_sctn_name $SectionRec]
					set ChildStartSctnId [FIELD child_sctn_id $SectionRec]
				}
				set LevelNames($Level) $ChildSectionName
			}
				
			if {$Level > 0} {
				set SectionName ""
		
				for {set i $Level} {$i > 1} {incr i -1} {
					append SectionName "$LevelNames($i): "
				}
		
				append SectionName $ChildStartSctnName
				set newSection {}
				lappend newSection "$SectionName" "$ChildStartSctnId"
				lappend SectionList $newSection
	
			}
		} else {
			set SectionName [FIELD parent_sctn_name $CtntTypeSection]
			set SectionId [FIELD parent_sctn_id $CtntTypeSection]
			if {$SectionName != $CurrSite} {
				set newSection {}
				lappend newSection "$SectionName" "$SectionId"
				lappend SectionList $newSection
			}
		}
	}
	set SectionList [lsort -index 0 $SectionList]
	set SortedSectionList {{} {}}
	foreach section $SectionList {
		foreach element $section {
			lappend SortedSectionList $element
		}
	}
	if {$CurrCtntType != ""} {
		set WhereClause " and nvl(ctnt_type, '$CurrCtntType') = '$CurrCtntType'"
	} else {
		set WhereClause ""
	}
	SEARCH TABLE CORECMASiteParams INTO SiteParams SQL "
		select 	char_name, value
		from	ff_site_parameter
		where	site = '$CurrSite' and
				char_name = 'HOME_SECTION_DEFAULT'
				$WhereClause
				order by ctnt_type"
				
	set HomeSecList {}
	set NotFound {false}

	if {[llength $CurrHomeSection] == 0} {
		if {[llength $SiteParams] > 0} {
			set FirstSiteParam [FIRST $SiteParams]
			set CurrSelectedValues [FIELD value $FirstSiteParam]
		} else {
			set CurrSelectedValues [list "$CurrHomeSection"]
		}
	} else {
		set CurrSelectedValues [list "$CurrHomeSection"]
	}
	
	return [::com.scripps::core::html::buildSelectList "FrmHome_Section" $SortedSectionList $CurrSelectedValues "1" "smallselect" {} {}]
}

proc getHomeSectionHtml {CurrHomeSection CurrSite {CurrCtntType ""}} {

	if {$CurrCtntType != ""} {
		set WhereClause " and nvl(ctnt_type, '$CurrCtntType') = '$CurrCtntType'"
	} else {
		set WhereClause ""
	}

	#pull list of section types to exclude from the home section dropdown - CS_HOMESECTION_EXCLUDE_TYPES
	#for each sctn type add an item to the list then join the list with commas to get a where clause compatible string
	set filterSctnList ""
	set sctnWhereClause ""
	foreach sctnType [SHOW CS_HOMESECTION_EXCLUDE_TYPES] {			
		lappend filterSctnList "'$sctnType'"
	}
	set filterHomeSctnTypes [join $filterSctnList ","]
	if {![string equal $filterHomeSctnTypes ""]} {
		set sctnWhereClause " and sctn_type not in ( $filterHomeSctnTypes )"
	}

	SEARCH TABLE CORECMAEditLibraryHomeSecTab INTO HomeSectionRS SQL "
		select distinct sctn_name, sctn_name descr
		from ff_sctn
		where site = '$CurrSite'
		 and  sctn_type is not null
		 $sctnWhereClause"

	SEARCH TABLE CORECMASiteParams INTO SiteParams SQL "
		select 	char_name, value
		from	ff_site_parameter
		where	site = '$CurrSite' and
				char_name = 'HOME_SECTION_DEFAULT'
				$WhereClause
				order by ctnt_type"
				
	set HomeSecList {}
	set NotFound {true}

	if {[llength $CurrHomeSection] == 0} {
		if {[llength $SiteParams] > 0} {
			set FirstSiteParam [FIRST $SiteParams]
			set CurrSelectedValues [FIELD value $FirstSiteParam]
		} else {
			set CurrSelectedValues [list "$CurrHomeSection"]
		}
	} else {
		set CurrSelectedValues [list "$CurrHomeSection"]
	}

	foreach HSRec $HomeSectionRS {
		set HomeSec [FIELD sctn_name $HSRec]
		set Descr [FIELD descr $HSRec]
		lappend HomeSecList "$Descr" "$HomeSec"
		if {[string equal $HomeSec $CurrHomeSection]} {
			set NotFound false
		}
	}

	if {$NotFound} {
		lappend HomeSecList "$CurrHomeSection" "$CurrHomeSection"
	}

	return [::com.scripps::core::html::buildSelectList "FrmHome_Section" $HomeSecList $CurrSelectedValues "1" "smallselect" {} {}]
}

proc getSponsorshipListHtml {CurrSponsorship CurrSite {Size "1"} {Class "smallselect"} {Multiple ""} {Javascript ""}} {
	set SponsorshipCtntType "SPONSORSHIP"
	set SponsorshipCtntId ""
	set SponsorshipTableName ""
	::com.scripps::core::cma::getCtntIdTableName $CurrSite $SponsorshipCtntType SponsorshipCtntId SponsorshipTableName
	
	SEARCH TABLE CRCMASponsorhipSel INTO SponsorshipListRS SQL "
		select	sponsorship_id, sponsorship_value
		from 	ff_sponsorship
		where	site = '$CurrSite'
		  and	ctnt_id = $SponsorshipCtntId
		  and	ctnt_type = '$SponsorshipCtntType'
		  and	table_name = '$SponsorshipTableName'"
	
	return [::com.scripps::core::html::buildSelectList "FrmSponsorship" $SponsorshipListRS $CurrSponsorship]
}

proc getOtherSectionHtml {CurrOtherSection CurrSite} {
	SEARCH TABLE CORECMAEditLibraryOtherSecTab INTO OtherSectionRS SQL "
		select distinct sctn_name, sctn_name descr
		from ff_sctn
		where site = '$CurrSite'
		 and  sctn_type is not null"
		 
	set OtherSecList {}
	set CurrSelectedValues $CurrOtherSection
	if {[llength $OtherSectionRS] > 0} {
		foreach OSRec $OtherSectionRS {
			set OtherSec [::com.scripps::core::cma::Replace "[FIELD sctn_name $OSRec]" " " "-" "all" "nocase"]
			set OtherDescr [FIELD descr $OSRec]
			lappend OtherSecList "$OtherDescr" "$OtherSec"
		}
	} else {
		set OtherSecList {}
	}
	
	return [::com.scripps::core::html::buildSelectList "FrmOther_Section" "$OtherSecList" "$CurrSelectedValues" "6" "medium" "multiple" {}]
}

proc getStatusHtml {StatusRecs CurrStatus FormItemName {JSOnChange ""} } {
	set StatusList {}

	foreach Status "$StatusRecs" {
		lappend StatusList "[FIELD child_status $Status]" "[FIELD child_status $Status]"
	}

	if {[lsearch -exact $StatusList $CurrStatus] == -1} {
		#linsert $StatusList 0 "$CurrStatus $CurrStatus"
		set StatusList "$CurrStatus $CurrStatus $StatusList"
	}

	return [::com.scripps::core::html::buildSelectList "$FormItemName" "$StatusList" "$CurrStatus" "1" "smallselect" {} "onChange='$JSOnChange'"]
}


proc getDelvFrmtHtml {FormItemName Site CtntType {CurDelvFrmt ""} {JSOnChange ""} {CmpnCtntType ""} {appContext ""}} {
	set DelvFrmtHtml ""
	set DelvFrmtRs {}
	# get the current content type row
	SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab0 INTO CtntTypeRs SQL "
		select *
		from ff_ctnt_type
		where ctnt_type = '$CtntType'
		  and site = '$Site'"

	set Category [FIELD category [FIRST $CtntTypeRs]]
	set CtntId [FIELD ctnt_id [FIRST $CtntTypeRs]]

	if {[string equal -nocase $Category "DISPLAY"] == 1 || [string equal -nocase $Category "AUTOPILOT"] == 1} {
		# get parent ctnt_type -
		# determine if delv_frmt comes from ctnt_pkg_cmpn or sctn_area_xref
		SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab1 INTO ParentRs SQL "
			select * from ff_ctnt_type_rule
			  where child_ctnt_type = '$CtntType'
			    and child_site = '$Site'
		"

		set ParentCtntType [FIELD ctnt_type [FIRST $ParentRs]]

		set ParentDelvFrmtsRs {}
		# if the parent content type = master content type (should be site name)
		if {[string equal -nocase $ParentCtntType $Site] == 1} {
			# delv_frmt is in sctn_area_xref
			SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab2 INTO ParentDelvFrmtRs SQL "
				select delv_frmt
				  from ff_sctn_area_xref
				  where ctnt_type = '$CtntType'
				    and site = '$Site'
					and page_type in ('SECTION', 'COLUMNIST-SUBSECTION', 'OBITUARY-SUBSECTION')
			"
	
			if {[llength $ParentDelvFrmtRs] == 0} {
			# still no delv_frmt get it from sctn_area_xref_redesign
			SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab2 INTO ParentDelvFrmtRs SQL "
				select delv_frmt
				  from ff_sctn_area_xref_redesign
				  where ctnt_type = '$CtntType'
				    and site = '$Site'
					and page_type in ('SECTION', 'COLUMNIST-SUBSECTION', 'OBITUARY-SUBSECTION')
			"
			}
		} else {
			# delv_frmt is in ctnt_pkg
			SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab3 INTO ParentDelvFrmtRs SQL "
				select delv_frmt
				  from ff_ctnt_pkg_cmpn
				  where ctnt_type = '$ParentCtntType'
				    and site = '$Site'
					and cmpn_id = $CtntId
					and delv_frmt is not null
					and rownum = 1
			"
		}
		# make sure you have a parent
		if {[llength $ParentDelvFrmtRs] > 0} {
			set ParentDelvFrmt [FIELD delv_frmt [FIRST $ParentDelvFrmtRs]]

			# use the ParentDelvFrmt to get the list of eligible delivery formats for the component ctnt type
			SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab4 INTO DelvFrmtRs SQL "
				select df.delv_frmt, df.descr, df.restricted_ind, df.dsp_name
			  	  from ff_delv_frmt_rule dfr, ff_delv_frmt df
			  	  where dfr.delv_frmt = '$ParentDelvFrmt'
			        and dfr.site = '$Site'
				    and dfr.child_delv_frmt = df.delv_frmt
				    and dfr.child_site = df.site
					and df.ctnt_type = '$CmpnCtntType'
			"
		}
	} elseif {[string equal -nocase $Category "CONTENT"] == 1} {
		# get the delivery format last for the "CONTENT" content type
		SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab5 INTO DelvFrmtRs SQL "
			select df.delv_frmt, df.descr, df.restricted_ind, df.dsp_name
			  from ff_delv_frmt_rule dfr, ff_delv_frmt df
			  where df.ctnt_type = '$CtntType'
			    and df.site = '$Site'
			    and df.delv_frmt = dfr.child_delv_frmt
				and df.site = dfr.child_site
				and dfr.delv_frmt = '$Site'
				and dfr.site = '$Site'
			  order by df.dsp_name"
	}


	set DelvFrmtList {{} {}}

	#2010-06-14 WJM Changes for SE-897
	if {[llength $DelvFrmtRs] > 0} {
		foreach DF $DelvFrmtRs {
			set DelvFrmt		[FIELD delv_frmt $DF]
			set Description		[FIELD dsp_name $DF]
			set RestrictedInd	[FIELD restricted_ind $DF]
			if {$RestrictedInd == "1"} {
				set Description "Restricted-$Description"
			}
			# if this is not a builder format, then include it in the list
			if {!($CtntType == "ARTICLE" && ![string equal $appContext SEARCH]  &&
				(	($DelvFrmt == "ARTICLE_BIO"						&& [lsearch [SHOW CS_ARTICLE_BUILDER_BIO_SITES] $Site] >= 0 ) ||
					($DelvFrmt == "ARTICLE_BUILDER_SIMPLE"			&& [lsearch [SHOW CS_ARTICLE_BUILDER_SIMPLE_SITES] $Site] >= 0 ) ||
					($DelvFrmt == "ARTICLE_BUILDER_STEPBYSTEP"		&& [lsearch [SHOW CS_ARTICLE_BUILDER_STEPBYSTEP_SITES] $Site] >= 0 ) ||
					($DelvFrmt == "ARTICLE_BUILDER_PHOTOGALLERY"	&& [lsearch [SHOW CS_ARTICLE_BUILDER_PHOTO_GALLERY_SITES] $Site] >= 0 ) ||
					($DelvFrmt == "ARTICLE_BUILDER_MULTI_IMAGE"		&& [lsearch [SHOW CS_ARTICLE_BUILDER_STEPBYSTEP_SITES] $Site] >= 0 ) ||
					($DelvFrmt == "ARTICLE_BUILDER_UBER"			&& [lsearch [SHOW CS_ARTICLE_BUILDER_UBER_SITES] $Site] >= 0 )
				))} {
				#HGTV has some special stuff, so if the site is hgtv, we need to jump through more hoops
				if {![string equal "HGTV" $Site] ||
					[string equal $appContext SEARCH] ||
					![string equal $CtntType "ARTICLE"] ||
				 	([string equal "HGTV" $Site]
					 && [string equal $CtntType "ARTICLE"]
					 && ( [lsearch [SHOW CS_HGTV_VALID_ARTICLE_DELV_FRMTS] $DelvFrmt] >= 0 || [string equal $DelvFrmt $CurDelvFrmt]) )} {
					lappend DelvFrmtList $Description $DelvFrmt
				}
			}
		}
	}
	return [::com.scripps::core::html::buildSelectList "$FormItemName" "$DelvFrmtList" "$CurDelvFrmt" "1" "smallselect" {} "onChange='$JSOnChange'"]
}

##############################################################################
## getPresentationFmtHtml:
##		Return the DelvFrmt List character.
##
## Synopsis:
## getPresentationFmtHtml
##
## Arguments:
## none.
##
## Returns:		A select list of secondary delv frmts
##
## Examples:
## 1. getPresentationFmtHtml
##
proc getPresentationFrmtHtml {FormItemName Site CtntType ParentDelvFrmt {CurDelvFrmt ""} {JSOnChange ""} {CmpnCtntType ""} {appContext ""}} {
	set DelvFrmtHtml ""
	set DelvFrmtRs {}

	# get the current content type row
	SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab0 INTO CtntTypeRs SQL "
		select *
		from ff_ctnt_type
		where ctnt_type = '$CtntType'
		  and site = '$Site'"

	set Category [FIELD category [FIRST $CtntTypeRs]]
	set CtntId [FIELD ctnt_id [FIRST $CtntTypeRs]]

	# get the delivery format last for the "CONTENT" content type
	set DelvFrmtSql "
		select df.delv_frmt, df.descr, df.restricted_ind, df.dsp_name
		from ff_delv_frmt_rule dfr, ff_delv_frmt df
		where df.ctnt_type = '$CtntType'
			and df.site = '$Site'
			and df.delv_frmt = dfr.child_delv_frmt
			and df.site = dfr.child_site
			and dfr.site = '$Site'
			and dfr.delv_frmt = '$ParentDelvFrmt'
		order by df.dsp_name"

	SEARCH TABLE CORECMAEditLibraryDelvFrmtHtmlTab5 INTO DelvFrmtRs SQL $DelvFrmtSql
	
	set DelvFrmtList {{} {}}
	
	if {[llength $DelvFrmtRs] > 0} {
		foreach DF $DelvFrmtRs {
			set RestrictedInd [FIELD restricted_ind $DF]
			if {$RestrictedInd == "1"} {
				set Description "Restricted-[FIELD dsp_name $DF]"
			} else {
				set Description "[FIELD dsp_name $DF]"
			}

			lappend DelvFrmtList "$Description" "[FIELD delv_frmt $DF]"
		}
	}
	return [::com.scripps::core::html::buildSelectList "$FormItemName" "$DelvFrmtList" "$CurDelvFrmt" "1" "smallselect" {} "onChange='$JSOnChange'"]

}


###############################################################
##
## FrmNew_Delv_Frmt $PassedSite ARTICLE $New_Delv_Frmt "this.form.FrmNew_Delv_Frmt_Site.value=[DQ]$PassedSite[DQ];"]
###############################################################
proc getNewDelvFrmtHtml {FormItemName Site {CurDelvFrmt ""} {JSOnChange ""} {CmpnCtntType ""}} {

   set NewDelvFrmtLst {{} {}}
    lappend  NewDelvFrmtLst         "Top Left Standard" "Top Left Standard"
    lappend  NewDelvFrmtLst         "Beauty" "Beauty"
    lappend  NewDelvFrmtLst 		"Photo Gallery" "Photo Gallery"  
	lappend  NewDelvFrmtLst         "Step-by-Step Standard" "Step-by-Step Standard"
    lappend  NewDelvFrmtLst         "Step-by-Step Beauty" "Step-by-Step Beauty"
    lappend  NewDelvFrmtLst 		"Step-by-Step Simple" "Step-by-Step Simple"  
    lappend  NewDelvFrmtLst         "Multi-Image" "Multi-Image"
    lappend  NewDelvFrmtLst         "Bio" "Bio"
    lappend  NewDelvFrmtLst 		"Simple" "Simple"  

   
   if {[lsearch -exact $NewDelvFrmtLst $CurDelvFrmt] == -1} {
	
		set NewDelvFrmtLst "$CurDelvFrmt $CurDelvFrmt $NewDelvFrmtLst"
	}
	   
   	return [::com.scripps::core::html::buildNewDelvFrmtSelectList "$FormItemName" "$NewDelvFrmtLst" "$CurDelvFrmt" "1" "smallselect" {} "onChange='$JSOnChange'"]					 

}
###############################################################

# proc to determine if status affects the access mode and reason
# *** notice that Mode and ModeReason are pass by reference ***
proc Deprecated-setModeAndReason {CtntSite SessionSite UserRoleName CtntId Wflw_Status Delv_Status ModeVarRef ModeReasonVarRef {StatusChk {}} } {
	upvar  $ModeVarRef Mode
	upvar  $ModeReasonVarRef ModeReason

	set WflwAccessMask [::com.scripps::core::cma::getUserAccess $CtntSite $UserRoleName $CtntId $Wflw_Status WFLW]
	# we are not using delv to determine access, at least for now
	#set DelvAccessMask [::com.scripps::core::cma::getUserAccess $CtntSite $UserRoleName $CtntId $Delv_Status DELV]

	set ModeReason ""
	if {$Mode != "VIEW" && $CtntSite != $SessionSite} {
		set Mode "VIEW"
		set ModeReason "$CtntSite:"
	}

	if {$Mode == "NEW"} {
		set WflwCreateOK [::com.scripps::core::cma::hasUserAccessForValue $WflwAccessMask C]
		#set DelvCreateOK [::com.scripps::core::cma::hasUserAccessForValue $DelvAccessMask C]
		#if {!($WflwCreateOK && $DelvCreateOK)}
		if {!($WflwCreateOK == "true")} {
			set Mode "VIEW"
			set ModeReason "Security:"
		}
	}

	if {$Mode == "EDIT"} {
		set WflwUpdateOK [::com.scripps::core::cma::hasUserAccessForValue $WflwAccessMask U]
		#set DelvUpdateOK [::com.scripps::core::cma::hasUserAccessForValue $DelvAccessMask U]
		#if {!($WflwUpdateOK && $DelvUpdateOK)}
		if {!($WflwUpdateOK == "true")} {
			set Mode "VIEW"
			set ModeReason "Security:"
		} elseif {$StatusChk == "Y"} {
			if {$Wflw_Status == "APPROVED" && $Delv_Status == "LIVE"} {
				set Mode "VIEWSTATUSONLY"
				set ModeReason "Live Record"
			}
		}
	}
}

proc getAssignUidHtml {Site ElementName SelectedValue Size {Class "smallselect"} {Multiple ""} {Javascript ""}} {
	
	##Old query, removed 3/18/2011 - leaving around because this is an example of a query that filters against new security model only -jwk
	#if {[string first JITTERBUG [SHOW CS_PLATFORM]] >= 0  || [string first DEVELOPMENT [SHOW CS_PLATFORM_LEVEL]] >= 0} {
	#	SEARCH TABLE getAssignUidHtml1 INTO UserRes SQL "
	#		select distinct u.userid, u.first_name, u.last_name from ff_security_map sm, ff_user_id u 
	#		where u.userid = sm.userid and u.user_status = 'ACTIVE' and u.userid not in (select user_group from ff_security_map)
	#		and sm.user_group in (select userid from ff_user_role_ctnt_type where site = '$Site')
	#		order by u.last_name"
	#}
	
	##Old query, removed 2/21/2011 -jwk
	##SEARCH TABLE getAssignUidHtml1 INTO UserRes SQL "
		##select distinct a.userid, a.first_name, a.last_name
		##from ff_user_id a, ff_user_role_ctnt_type b
		##where b.site='$Site'
		##and a.userid = b.userid
		##order by last_name"

	# Old user query. It only considered users who had this site as their default site.
	#	select userid, last_name, first_name from ff_user_id
	#	where site = '$Site'
	#	order by last_name"
	
	# Implemented 3/18/2011 - Grab all users and don't worry about filtering
	# Not using authorization library because the list needs to provide id, and last/first name - this could be added to the library -jwk
	if {[string first JITTERBUG [SHOW CS_PLATFORM]] >= 0  || [string first DEVELOPMENT [SHOW CS_PLATFORM_LEVEL]] >= 0} {
		SEARCH TABLE getAssignUidHtml1 INTO UserRes SQL "
		select userid, last_name, first_name
		from ff_user_id
		order by last_name"
	}

set UserList [list Any ANY]
foreach UserIdRecord $UserRes {
	lappend UserList "[FIELD last_name $UserIdRecord], [FIELD first_name $UserIdRecord]" "[FIELD userid $UserIdRecord]"
}
	
	

	set UserList {{} {}}
	foreach UserIdRecord $UserRes {
		lappend UserList "[FIELD last_name $UserIdRecord], [FIELD first_name $UserIdRecord]" "[FIELD userid $UserIdRecord]"
	}
 	
	set AssignedToSelectList [::com.scripps::core::html::buildSelectList "$ElementName" $UserList "$SelectedValue" "$Size" "$Class" "$Multiple" "$Javascript"]
	return $AssignedToSelectList
}



proc hasPromoteAccess {SiteId UserId CtntId CtntType ItemId WflwStatus DelvStatus} {
	set allowAccess "OK"
	
	# Do not promote if currently in core
	if {$SiteId == "CORE"} {set allowAccess "NO"}
	
	# Do not promote unless LIVE and APPROVED
	if {$WflwStatus != "APPROVED" || $DelvStatus != "LIVE"} {set allowAccess "NO"}

	SEARCH TABLE tblAccess INTO accessRS SQL "
	select ff_cr_cma_pkg.getAccessMask('CORE', '$UserId', $CtntId, '$WflwStatus') as access_mask
	from dual "
	
	if {[llength $accessRS] == 0} {
		set allowAccess "NO"
	} else {	
		if {[::com.scripps::core::cma::authorization::hasUserAccessForValue [FIELD access_mask [FIRST $accessRS]] "C"] == "false"} {set allowAccess "NO"}

	}
	
	return $allowAccess
}

proc textBox { FrmField Value Size Mode } {
	set html ""
	if {$Mode == "VIEW"} {
		set html "
				$Value
				<input type='hidden' name='$FrmField' value='$Value'>"
	} else {
		set html "
				<INPUT type='text' name='$FrmField' size=$Size value='$Value'>"
	}
	return $html
}

proc getShowSelectList { Site FieldName {ShowAbbr {}} {Size "1"} {Class "medium"} {Multiple ""} {JS {}} {EmptyFirstRow {}}} {

	# build the select list for shows
	#  Site			req; used in query
	#  FieldName	req; passed off to buildSelectList proc for the name of the html control name
	#  ShowAbbr		opt; used to choose item from list to default select
	#  Size			opt; (numeric) passed off to buildSelectList proc for size of control
	#  Class		opt; passed off to buildSelectList proc for the CSS type/font
	#  Multiple		opt; passed off to buildSelectList proc to denote single or multiple choices in the control
	#  JS			opt; javascript to pass on to the buildSelectList proc
	#  EmptyFirstRow opt; insert an empty first row
	
	set ShowList ""
	set ShowSelectList ""
	
	SEARCH TABLE ShowSelectListBuild INTO ShowRecords SQL "
		select	show_id, show_abbr,	title
		from	ff_show
		where	site = '$Site'
		order by	title"

 	# make sure show records exist
	if {[llength $ShowRecords] > 0} {
	
		# default to first item on the list if one is not supplied
		if {$EmptyFirstRow == ""} {
			if {$ShowAbbr == ""} {
				set ShowAbbr [FIELD show_abbr [FIRST $ShowRecords]]
			}
		} else {
			lappend ShowList {} {}
		}
		
		# get the list of values for building html
		foreach ShowRecord $ShowRecords {
			lappend ShowList "[FIELD title $ShowRecord]" "[FIELD show_abbr $ShowRecord]"
		}
		
		# default field name if none is supplied
		if {$FieldName == ""} {
			set FieldName "ShowAbbr"
		}
	
		set ShowSelectList [::com.scripps::core::html::buildReformedSelectList "$FieldName" $ShowList "$ShowAbbr" $Size $Class $Multiple "$JS"]
		
	}

	return $ShowSelectList
	
}

##############################################################################
## getParentShowList:
##		Returnt a Parent Show List --> Similar to Show list but is optional and keys on Show Id.
##
## Synopsis:
## getParentShowList
##
## Arguments:
##  Site			req; used in query
##  FieldName		req; passed off to buildSelectList proc for the name of the html control name
##  ShowId			opt; used to choose item from list to default select
##  Size			opt; (numeric) passed off to buildSelectList proc for size of control
##  Class			opt; passed off to buildSelectList proc for the CSS type/font
##  Multiple		opt; passed off to buildSelectList proc to denote single or multiple choices in the control
##  JS				opt; javascript to pass on to the buildSelectList proc
##  EmptyFirstRow 	opt; insert an empty first row
##
## Returns:		A list of Shows
##
## Examples:
## 1. getParentShowList	HGTV ParentShow 47 
##
proc getParentShowSelectList { Site {FieldName {}} {ShowId {}} {Size "1"} {Class "medium"} {Multiple ""} {JS {}} {EmptyFirstRow {1}}} {

	# build the select list for shows
	
	set ShowList 		""
	set ShowSelectList 	""
	
	SEARCH TABLE ShowSelectListBuild INTO ShowRecords SQL "
		select	show_id, show_abbr,	title
		from	ff_show
		where	site = '$Site'
		order by	title"

 	# make sure show records exist
	if {[llength $ShowRecords] > 0} {
	
		# default to first item on the list if one is not supplied
		lappend ShowList {} {}
		
		# get the list of values for building html
		foreach ShowRecord $ShowRecords {
			lappend ShowList "[FIELD title $ShowRecord]" "[FIELD show_id $ShowRecord]"
		}
		
		# default field name if none is supplied
		if {$FieldName == ""} {
			set FieldName "ParentShow"
		}
	
		set ShowSelectList [::com.scripps::core::html::buildReformedSelectList "$FieldName" $ShowList "$ShowId" $Size $Class $Multiple "$JS"]		
	}

	return $ShowSelectList
}

proc oldGetShowSelectList { Site FieldName {ShowAbbr {}} {Size "1"} {Class "medium"} {Multiple ""} {JS {}} } {

	# build the select list for shows
	#  Site			req; used in query
	#  FieldName	req; passed off to buildSelectList proc for the name of the html control name
	#  ShowAbbr		opt; used to choose item from list to default select
	#  Size			opt; (numeric) passed off to buildSelectList proc for size of control
	#  Class		opt; passed off to buildSelectList proc for the CSS type/font
	#  Multiple		opt; passed off to buildSelectList proc to denote single or multiple choices in the control
	#  JS			opt; javascript to pass on to the buildSelectList proc
	
	set ShowList {{} {}}
	set ShowSelectList ""
	
	SEARCH TABLE ShowSelectListBuild INTO ShowRecords SQL "
		select	show_id, show_abbr,	title
		from	ff_show
		where	site = '$Site'
		order by	title"

 	# make sure show records exist
	if {[llength $ShowRecords] > 0} {
	
		# default to first item on the list if one is not supplied
		if {$ShowAbbr == ""} {
			set ShowAbbr [FIELD show_abbr [FIRST $ShowRecords]]
		}
		
		# get the list of values for building html
		foreach ShowRecord $ShowRecords {
			lappend ShowList "[FIELD title $ShowRecord]" "[FIELD show_abbr $ShowRecord]"
		}
		
		# default field name if none is supplied
		if {$FieldName == ""} {
			set FieldName "ShowAbbr"
		}
	
		set ShowSelectList [::com.scripps::core::html::buildReformedSelectList "$FieldName" $ShowList "$ShowAbbr" $Size $Class $Multiple "$JS"]
		
	}

	return $ShowSelectList
	
}


proc getSeriesName { Site SeriesId } {

	set SeriesName ""

	SEARCH TABLE SeriesNameFetch INTO SeriesRecord SQL "
		select	title
		from	ff_series
		where	site = '$Site' and
				series_id = '$SeriesId'"
				
	if {[llength $SeriesRecord] > 0} {
		set SeriesName [FIELD title [FIRST $SeriesRecord]]
	}
	
	return $SeriesName

}


proc getSeriesSelectList { Site ShowAbbr FieldName {SeriesId {}} {Size {}} {Class {medium}} {Multiple {}} {JS {}} } {

	# build the select list for series
	#  Site			req; used in query
	#  ShowAbbr		req; used in query
	#  FieldName	req; passed off to buildSelectList proc
	#  SeriesId		opt; which is default
	#  Size			opt; (numeric) passed off to buildSelectList proc for size of control
	#  Class		opt; passed off to buildSelectList proc for the CSS type/font
	#  Multiple		opt; passed off to buildSelectList proc to denote single or multiple choices in the control
		
	
	set SeriesList ""
	set SeriesSelectList ""
	
	set SearchSQL "
		select	series_id,	title || ' - ' || series_no as title
		from	ff_series
		where	site = '$Site' and
				show_abbr in ('[join [string toupper $ShowAbbr] {','}]')
		order by	title desc"
	
	SEARCH TABLE SeriesSelectListBuild INTO SeriesRecords SQL $SearchSQL

	# make sure series records exist
	if {[llength $SeriesRecords] > 0} {

		# default to first item on the list if one is not supplied
		if {$SeriesId == ""} {
			set SeriesId [FIELD series_id [FIRST $SeriesRecords]]
		}
		
		# get the list of values for building html
		foreach SeriesRecord $SeriesRecords {
			lappend SeriesList "[FIELD title $SeriesRecord]" "[FIELD series_id $SeriesRecord]"
		}
		
		# default field name if none is supplied
		if {$FieldName == ""} {
			set FieldName "SeriesId"
		}
		
		if {$SeriesList != ""} {
			set SeriesSelectList [::com.scripps::core::html::buildSelectList $FieldName $SeriesList $SeriesId $Size $Class $Multiple $JS]
		}
		
	}

	return $SeriesSelectList
	
}

proc getShowAbbr { Site { SeriesId {} } } {

	set SearchSQL "
		select	se.show_abbr, se.title
		from	ff_series se,
				ff_show sh
		where	se.site = '$Site'"
	
	if {$SeriesId != ""} {
		append SearchSQL " and se.series_id = $SeriesId"
	}

	append SearchSQL "	and se.site = sh.site
						and se.show_abbr = sh.show_abbr (+)
						order by	sh.title "

	SEARCH TABLE ShowAbbrFromSeriesId INTO ShowAbbrRec SQL $SearchSQL
	
	if {[llength $ShowAbbrRec] > 0} {
		set ShowAbbr [FIELD show_abbr [FIRST $ShowAbbrRec]]
	} else {
		set ShowAbbr {}
	}
	
	return $ShowAbbr
}

proc getEpisodeNo { Site EpisodeId } {

	set EpisodeNo ""

	set SearchSQL "
		select	episode_no
		from	ff_episode
		where	site = '$Site' and
				episode_id = $EpisodeId"
	
	SEARCH TABLE FindEpisodeNo INTO EpisodeNoRecords SQL $SearchSQL
	
	if {[llength $EpisodeNoRecords] > 0} {
		set EpisodeNo [FIELD episode_no [FIRST $EpisodeNoRecords]]
	}
	
	return $EpisodeNo

}

# 04-09-2009 WJM found while working on SND-465
# This proc breaks when $value does not exist.
# I modified it to return the name for uppercase $value if $value is not found.
# If neither is found, it will return an empty string.
proc getNameForValue { list value } {
	foreach { n v } $list { set tmp($v) $n }
	if { [info exists tmp($value)] } {
		return $tmp($value)
	} elseif { [info exists tmp([string toupper $value])] } {
		return $tmp([string toupper $value])
	} else {
		return ""
	}
}

#Added 02/05/2009 -jk
proc getImageAttributeSelectList { Site Image_Id FieldName AttributeName {Size "1"} {Class "medium"} {Multiple ""} {JS {}} } {
	#on hold for now, because you can't get around the fact that multiple elements are coming in
	#Note:  This could be turned into a more generic proc, but for now it is specifically for images and this is new stuff -jk
	# build the select list for image attributes
	#  Site				req; 	used in query
	#  ImageId			req:  	the image id
	#  FieldName		req; 	passed off to buildSelectList proc for the name of the html control name
	#  AttributeName 	req; 	used to determine which attributes to pull
	#  Size				opt; 	(numeric) passed off to buildSelectList proc for size of control
	#  Class			opt; 	passed off to buildSelectList proc for the CSS type/font
	#  Multiple			opt; 	passed off to buildSelectList proc to denote single or multiple choices in the control
	#  JS				opt; 	javascript to pass on to the getAttributeSelectList proc
	
	set ImageAttributeList ""
	set ImageAttributeSelectList ""
	
	SEARCH TABLE ImageAttributeTab INTO ImageAttrRS SQL "
		select i.image_id, i.name,  x.attribute_name, x.value, a.dsp_name, a.allow_multiple_flg, 
		a.list_available_flg
		from ff_image i, ff_image_attribute_xref x, ff_attribute a
		where i.image_id= '$Image_Id'
		and i.image_id = x.image_id
		and x.attribute_name = '$AttributeName'
		and x.attribute_name = a.attribute_name
	"

 	# make sure show records exist
	if {[llength $ImageAttrRS] > 0} {
		
		# determine if the multiple items can be selected
		
		# default to first item on the list if one is not supplied
		##if {$ShowAbbr == ""} {
		##	set ShowAbbr [FIELD show_abbr [FIRST $ShowRecords]]
		##}
		
		# get the list of values for building html
		##foreach ShowRecord $ShowRecords {
		##	lappend ShowList "[FIELD title $ShowRecord]" "[FIELD show_abbr $ShowRecord]"
		##}
		
		# default field name if none is supplied
		##if {$FieldName == ""} {
		##	set FieldName "ShowAbbr"
		##}
		
		set ImageAttributeSelectList "hi - I am being returned"
		#set ImageSelectList [::com.scripps::core::html::buildReformedSelectList "$FieldName" $ShowList "$ShowAbbr" $Size $Class $Multiple "$JS"]
		
	}

	return $ImageAttributeSelectList
	
	
}
# End getAttributeSelectList

	proc getImageSizeCategory {w h} {
		set categories {
			{ "iPad3" 2048 1536 }
			{ "iPad2/Android" 1024 768 }
			{ "Web Only" 616 462 }
			{ "Below Standard" 0 0 }
		}

		foreach category $categories {
			if { $w > $h } {
				foreach {name width height} $category {break}
			} else {
				foreach {name height width} $category {break}
			}
			if { $w >= $width && $h >= $height } {
				return $name
			}
		}
		# Should never get here, but just in case
		return "Below Standard"
	}

} ;# End ::com.scripps::core::cma::edit
