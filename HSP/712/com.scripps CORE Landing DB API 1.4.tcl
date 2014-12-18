#*****
# com_scripps CORE Landing DB API 1.4
#<p>
# Template path: 	None as this is a Library 
# Cached?:			N/A
#<p>
#<pre>History:
#	Created:	06/30/2009 by Christine Jones</pre>
#<p>
#<pre>Modified: 	<mm/dd/yy> by <name>
#		<List important changes here. Repeat 'Modified:' line for more></pre>
#<p>
# Copyright (C) 2009 Scripps Networks Interactive. All rights reserved.
#
#@author	Christine Jones
#
#*****
namespace eval ::com.scripps::cr::cda::landing::db {

	proc getCtntBySection { Site SectionId CtntType StartNumber EndNumber CmpnCtntType DelvFrmts } {
		set CtntResultsInfo ""
		set cmpn_table_name ""
		
		set ctntTypeDetails [getCtntTypeDetails $Site $CtntType]
		set SectionInfo [::com.scripps::cr::cda::section::db::getSectionForSctnIdDb $Site $SectionId]
		set Section ""
		
		if {[llength $SectionInfo] > 0} {
			set Section [FIELD sctn_name $SectionInfo]
		}
		
		if {[llength $ctntTypeDetails] > 0} {
			set ctntTypeDetailsRow [FIRST $ctntTypeDetails]
			set ctnt_type				[FIELD ctnt_type	$ctntTypeDetailsRow]
			set table_name				[FIELD table_name	$ctntTypeDetailsRow]
			set title_column			[FIELD primary_title	$ctntTypeDetailsRow]
			set id_column				[FIELD id_name		$ctntTypeDetailsRow]
			set featured_image_source	[FIELD featured_image_source $ctntTypeDetailsRow]
			set image_column_name		[FIELD image_column_name $ctntTypeDetailsRow]
		
			if {![string equal $table_name ""]} {
				set cmpn_table_name $table_name
				append cmpn_table_name "_cmpn"
			}
		 	
			switch -exact --  $featured_image_source {
				"COMPONENT" {
					set featuredImage "image_id"
				}
				"COLUMN" {
					if {[string equal $image_column_name "" ]} {
						set featuredImage "null as image_id"						
					} else {
						set featuredImage "a.$image_column_name as image_id"
					}
				}		
				default {
					set featuredImage "null as image_id"
				}
			}
			
		} else {
			return ""
		}
 
		set delvFrmtString "("
		set comma_string ""
		
		foreach d $DelvFrmts {
			append delvFrmtString "$comma_string [QUOTE_SQL $d]"
			set comma_string ","
		}
		 
		append delvFrmtString ")"


		set countSelect "(select count(*) from $table_name
			where site=[QUOTE_SQL $Site]"
			
		if {![string equal $DelvFrmts ""]} {
			append countSelect "and delv_frmt in $delvFrmtString
								"
		}			
		append countSelect "
			and delv_status='LIVE' and wflw_status='APPROVED'
			and home_section='$Section')"

		set SqlStatement "select image_number, $id_column, $title_column  as title_column, url, site, image_id, $countSelect as number_of_results from
		(
		select $featuredImage, imageCmpns.count as image_number, u.url, a.$id_column, a.$title_column, a.site, rownum as rnum from $table_name a
					INNER JOIN ff_urlmap u
					  ON u.cmpn_id = a.$id_column
					  AND u.ctnt_type = a.ctnt_type
		        AND u.other_info is null
				AND u.site=a.site		        
      LEFT OUTER JOIN (select $id_column, site, count(*) as count from $cmpn_table_name where cmpn_ctnt_type=[QUOTE_SQL $CmpnCtntType] group by $id_column, site) imageCmpns on imageCmpns.$id_column=a.$id_column AND imageCmpns.site=a.site
	  "
	  

	  if {[string equal $featured_image_source "COMPONENT"]} {	  
		  append SqlStatement "
		  LEFT OUTER JOIN (select b.$id_column, b.site, b.cmpn_id as image_id, b.rank_order from $cmpn_table_name b where b.cmpn_ctnt_type='IMAGE'
	      						and b.rank_order =(select min(rank_order) from $cmpn_table_name where cmpn_ctnt_type='IMAGE' and $id_column=b.$id_column) ) featuredImageTbl on featuredImageTbl.$id_column=a.$id_column AND featuredImageTbl.site=a.site		
			"
		
	   }

	  append SqlStatement "
		where a.site=[QUOTE_SQL $Site]
		and a.wflw_status='APPROVED'
		and a.delv_status='LIVE'
		and a.home_section='$Section'
		"
	 
		if {![string equal $DelvFrmts ""]} {
			append SqlStatement "and a.delv_frmt in $delvFrmtString
								"
		}					
  
		append SqlStatement "
		order by a.release_dt )
		where rnum>=[QUOTE_SQL $StartNumber] and rnum<=[QUOTE_SQL $EndNumber]	
		"
		
		SEARCH TABLE CtntResultsInfoDb INTO CtntResultsInfo SQL $SqlStatement

		if {[llength $CtntResultsInfo] == 0} { 
			return "" 
		} else {
			return $CtntResultsInfo
		}			
	}
	 
	proc getSectionsForLanding { Site CtntType DelvFrmts } {
		set retHtml ""
		set SectionInfo ""

		set ctntTypeDetails [getCtntTypeDetails $Site $CtntType]

		if {[llength $ctntTypeDetails] > 0} {
			set ctntTypeDetailsRow [FIRST $ctntTypeDetails]
			set ctnt_type		[FIELD ctnt_type	$ctntTypeDetailsRow]
			set table_name		[FIELD table_name	$ctntTypeDetailsRow]
			set title_column	[FIELD primary_title	$ctntTypeDetailsRow]
			set id_column		[FIELD id_name		$ctntTypeDetailsRow]
		} else {
			return ""
		}
		
		set delvFrmtString "("
		set comma_string ""
		
		foreach d $DelvFrmts {
			append delvFrmtString "$comma_string [QUOTE_SQL $d]"
			set comma_string ","
		}
		
		append delvFrmtString ")"
		
		set SqlStatement "
			select s.dsp_name, s.sctn_id, count(*) as count from $table_name ct, ff_sctn s
			where ct.site=[QUOTE_SQL $Site]
      		and s.site=ct.site			
			and ct.wflw_status='APPROVED'
			and ct.delv_status='LIVE'
			and ct.home_section=s.sctn_name
			"
	
		if {![string equal $DelvFrmts ""]} {
			append SqlStatement "and ct.delv_frmt in $delvFrmtString
								"
		}					

		append SqlStatement "
			group by s.dsp_name, s.sctn_id
			order by s.dsp_name, s.sctn_id asc
			"	

		SEARCH TABLE SectionInfoDb INTO SectionInfo SQL $SqlStatement
					
		if {[llength $SectionInfo] == 0} { 
			return "" 
		} else {
			return $SectionInfo
		}
	}

	proc getSectionsForLandingJSON { Site CtntType {DelvFrmts ""} } {
		set retHtml ""
		
		set SectionInfo [getSectionsForLanding $Site $CtntType $DelvFrmts]

		append retHtml "var sections = {"
		set index 1
		set comma_string ""
		
		foreach row $SectionInfo {
			append retHtml "$comma_string '$index': '[FIELD dsp_name $row]'"
			set comma_string ","
			incr index
		}
  
		append retHtml "};"
				
		return $retHtml	
	}

	proc getCtntTypeDetails {CtntSite CtntType} {
		SEARCH TABLE GetCtntType INTO CtntStuff SQL "
			select	ctm.ctnt_type, ctm.table_name, ctm.id_name, ctm.primary_title, ctm.ctnt_id, ctm.featured_image_source, ctm.image_column_name
			from	ff_ctnt_type_map ctm
			where	ctm.site = '$CtntSite'
			and		ctm.ctnt_type = '$CtntType'"

		return $CtntStuff
	}


	proc getPhotoGalleriesInTentpole {Site TentpoleId {OrderBy "ALPHA"}} {

		set sqlString ""
		set sqlString "select t2.headline, t2.last_updt_dt, t2.create_dt, t2.image_id, t2.ctnt_type, t2.table_name, t2.cmpn_id, t2.site, t2.delv_status, t2.wflw_status, t2.url, count 
from (
select a.headline, a.last_updt_dt, a.create_dt, ac.cmpn_id as image_id, tp.cmpn_ctnt_type as ctnt_type, tp.cmpn_table_name as table_name, tp.cmpn_id, tp.site, a.delv_status, a.wflw_status as wflw_status, u.url as url
from (
			select level, hc1.site, hc1.hub_id, hc1.cmpn_ctnt_id, hc1.cmpn_ctnt_type, hc1.cmpn_table_name, hc1.cmpn_id, hc1.delv_frmt
			         from ff_hub_cmpn hc1
			         join ff_hub h1 on h1.site=hc1.site
			            and h1.ctnt_id = hc1.ctnt_id
			            and h1.ctnt_type=hc1.ctnt_type
			            and h1.table_name=hc1.table_name
			            and h1.hub_id=hc1.hub_id
			         start with hc1.site = '$Site'
			            and hc1.ctnt_type = 'HUB'
			            and hc1.hub_id = '$TentpoleId'
			         connect by prior hc1.site=hc1.site
			            and prior hc1.cmpn_ctnt_id = hc1.ctnt_id
			            and prior hc1.cmpn_ctnt_type=hc1.ctnt_type
			            and prior hc1.cmpn_table_name=hc1.table_name
			            and prior hc1.cmpn_id=hc1.hub_id
			            and h1.wflw_status='APPROVED'
			            and h1.delv_status='LIVE') tp, ff_article a, ff_urlmap u, ff_article_cmpn ac
			            where tp.cmpn_ctnt_type='ARTICLE' and tp.cmpn_id=a.article_id
			            and a.delv_status='LIVE'
						and a.wflw_status='APPROVED'
						and ac.article_id=a.article_id
			            and ac.cmpn_ctnt_type='IMAGE'
			            and ac.rank_order='10'
						and ac.delv_status='LIVE' and ac.wflw_status='APPROVED'
			            and u.cmpn_id=tp.cmpn_id
			            and u.ctnt_type=tp.cmpn_ctnt_type
			            and u.other_info is null
			            and u.lifecycle='PUBLISHED'
			            and a.delv_frmt='ARTICLE_BUILDER_PHOTOGALLERY' ) t2
LEFT OUTER JOIN (select article_id, site, count(*) as count from ff_article_cmpn where cmpn_ctnt_type='IMAGE' and wflw_status='APPROVED' and delv_status='LIVE' group by article_id, site) imageCmpns on imageCmpns.article_id=t2.cmpn_id AND imageCmpns.site=t2.site
    "				
		switch -- $OrderBy {
			"ALPHA" {
				append sqlString "order by headline"					
			 }
			 "LAST_UPDATE" -
			 "LAST-UPDATE" {
			 	append sqlString "order by last_updt_dt desc"	
			 }
			 "NEW_TO_OLD" -
			 "NEW-TO-OLD" {
			 	append sqlString "order by create_dt desc"
			 }
			default {				
			}
		}
		
		SEARCH TABLE PhotosInfoDb INTO PhotosInfo SQL $sqlString
					
		if {[llength $PhotosInfo] == 0} { 
			return "" 
		} else {
			return $PhotosInfo
		}		
				
	}
# end namespace
}