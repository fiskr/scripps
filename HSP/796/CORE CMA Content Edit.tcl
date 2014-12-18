[##############################################################################
Name:			CORE CMA Content Edit

Description:	Template to take edit request and redirect to
				the appropriate template
				This template displays nothing to the screen
				It redirects to another template

Template path:	/cr/cma/contentEdit
Cached?:		N

Dependencies:	<Explain external dependencies. If none, delete the line.>
	Templates:	Called by ????
				Calls appropriate:
				articleEdit
				imageEdit
				multimediaEdit (future)
				linkEdit (future)
				pollEdit
				articlebodyEdit
	Vars:		Passed: ctnt_type rest of oid to pass on
				Passes: rest of oid
	Files:		<Names and purposes.>
	Database:	<Names and purposes.>
	Cookies:	<Names and purposes.>
History:
	Created:	09/22/00 by Christopher G. Luttrell
	Modified:	12/04/00 by Alan Oliver
		<In order to call the reusable assetEdit template, must modify the oid to
		 pass ctnt_type for assets>
	Modified:	2/25/02 by Alan W. Oliver
		<added COMPANY>
	Modified:	2002.06.06 by Mark McIntyre
				Added Campaign to the list.
	Modified:	2002.09.27 by Jonathan Williams
				Added Sponsorship to the list.
	Modified: 	11/04/2002 by Doug Walker
				Added Chef, Recipe, and Ingredient to the list.
	Modified:	2003.09.24 by Ivo Majetic
				Added master venue/event.
	Modified:	2004.07.15 by Jonathan Bell
				Added Commerce User to the list.
	Modified:	2004.07.19 by Jonathan Bell
				Added Order (Commerce User) to the list.
	Modified:	2004.07.21 by Jonathan Bell
				Added Payment Transaction and Service Transaction to the list.
	Modified:	2004.09.09 by Jonathan Bell
				Added Notices (Commerce User) to the list.
	Modified:	2006.05.15 by Chandra Sekhar Akella
				Added Player to the list.
	Modified:	2006.05.15 by Chandra Sekhar Akella
				Added Player to the list.
	Modified: 2008.6.10 by Jonathan Williams
				Added Hub to the list.
	Modified:  2009.03.13 by Christine Jones
				Added BUNDLE and VIDEO to the the list.
	Modified:  2009.08.24 by William McKeehan
				Added MENU and QUIZ to the the list.
	Modified:  2010.06.10 by Christine Jones
				Added ENCYCLOPEDIA to the the list.				
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
	set ErrorMsg {An unexpected error has been encountered in Content Edit.}
	RETAIN ErrorMsg
}

###############################################################################
#                              Initializations                                #
###############################################################################

set Arguments [UnPackOid $ID]
set PassedContentType [lindex $Arguments 0]
set PassedOid [PackOid [lreplace $Arguments 0 0]]

###############################################################################
#                            Begin Template Logic                             #
###############################################################################

switch $PassedContentType {
	ARTICLE	{
		set wflw [lindex $Arguments 3]
		if {$wflw == "SKELETON"} then {
			set ThisCurl [CURL /cr/cma/articleSkeleton $PassedOid]
		} else {
			set ThisCurl [CURL /cr/cma/articleEdit $PassedOid]
		}
	}

	ARTICLE-BODY	{
		set ThisCurl [CURL /cr/cma/articleBodyEdit $PassedOid]
	}

	ARTICLE-NEW	{
		set ThisCurl [CURL /cr/cma/new-articleEdit $PassedOid]
	}
	BUNDLE {
		set ThisCurl [CURL /cr/cma/bundleEdit $PassedOid]
	}
	CAMPAIGN {
		set ThisCurl [CURL /cr/cma/campaignEdit $PassedOid]
	}

	CHANNEL {
		set ThisCurl [CURL /cr/cma/channelEdit $PassedOid]
	}

	CHEF {
		set ThisCurl [CURL /cr/cma/chefEdit $PassedOid]
	}

	COMPANY {
		set ThisCurl [CURL /cr/cma/companyEdit $PassedOid]
	}

  	DELIVERY-FORMAT {
    	set ThisCurl [CURL /cr/cma/deliveryEdit $PassedOid]
  	}	# MHP ~ for HGTV Portfolio 

	ENCYCLOPEDIA	{
		set ThisCurl [CURL /cr/cma/encyclopediaEdit $PassedOid]
	}
	
	EPISODE	{
		set ThisCurl [CURL /cr/cma/episodeEdit $PassedOid]
	}

	GUEST {
		set Args [UnPackOid $PassedOid]
		set Args [linsert $Args 1 $PassedContentType]
		set PassedOid [PackOid $Args]
		set ThisCurl [CURL /cr/cma/resourceEdit $PassedOid]
	}

	HUB	{
		set ThisCurl [CURL /cr/cma/hubEdit $PassedOid]
	}

  	HOWTO {
    	set ThisCurl [CURL /cr/cma/howtoBuilder $PassedOid]
  	} 

	IMAGE	{
		set ThisCurl [CURL /cr/cma/imageEdit $PassedOid]
	}

	INGREDIENT {
		set ThisCurl [CURL /cr/cma/ingredientEdit $PassedOid]
	}

	LINK	{
		set ThisCurl [CURL /cr/cma/linkEdit $PassedOid]
	}

	MENU {
		set ThisCurl [CURL /cr/cma/menuEdit $PassedOid]
	}

	MULTIMEDIA	{
		set ThisCurl [CURL /cr/cma/multimediaEdit $PassedOid]
	}

	PLAYER	{
		set Args [UnPackOid $PassedOid]
		set Args [linsert $Args 1 $PassedContentType]
		set PassedOid [PackOid $Args]
		set ThisCurl [CURL /cr/cma/playerEdit $PassedOid]
	}

	POLL	{
		set ThisCurl [CURL /cr/cma/pollEdit $PassedOid]
	}

  	PORTFOLIO -
	PORTFOLIO-GP {
		set Args [UnPackOid $PassedOid]
		set Args [linsert $Args 1 $PassedContentType]
		set PassedOid [PackOid $Args]
    	set ThisCurl [CURL /cr/cma/portfolioEdit $PassedOid]
  	} # MHP ~ for FOOD reviews 

  	PORTFOLIO-PROJECT {
    	set ThisCurl [CURL /cr/cma/portfolioProjectEdit $PassedOid]
  	}
	
  	PROJECT {
    	set ThisCurl [CURL /cr/cma/projectBuilder $PassedOid]
  	} 

	QUIZ {
		set ThisCurl [CURL /cr/cma/quizEdit $PassedOid]
	}
	
	RECIPE {
		set ThisCurl [CURL /cr/cma/recipeEdit $PassedOid]
	}

	RECIPE-BODY {
		set ThisCurl [CURL /cr/cma/recipeBodyEdit $PassedOid]
	}

  	RECIPE-REVIEW {
   		set ThisCurl [CURL /cr/cma/reviewEdit $PassedOid]
  	}

	RESOURCE {
		set Args [UnPackOid $PassedOid]
		set Args [linsert $Args 1 $PassedContentType]
		set PassedOid [PackOid $Args]
		set ThisCurl [CURL /cr/cma/resourceEdit $PassedOid]
	}

	SECTION	{
		set ThisCurl [CURL /cr/cma/sectionEdit $PassedOid]
	}

	SELECT	{
		set Args [UnPackOid $PassedOid]
		set Args [linsert $Args 1 $PassedContentType]
		set PassedOid [PackOid $Args]
		set ThisCurl [CURL /cr/cma/textEdit $PassedOid]
	}

	SERIES {
		set ThisCurl [CURL /cr/cma/seriesEdit $PassedOid]
	}

	SHOW {
		set ThisCurl [CURL /cr/cma/showEdit $PassedOid]
	}

	SITE-USER 	{
		set ThisCurl [CURL /cr/cma/siteUserEdit $PassedOid]
	}

	SOURCE 	{
		set ThisCurl [CURL /cr/cma/sourceEdit $PassedOid]
	}

	SPONSORSHIP {
		set ThisCurl [CURL /cr/cma/sponsorshipEdit $PassedOid]
	}

	TALENT	{
		set ThisCurl [CURL /cr/cma/talentEdit $PassedOid]
	}

	TEXT	{
		set Args [UnPackOid $PassedOid]
		set Args [linsert $Args 1 $PassedContentType]
		set PassedOid [PackOid $Args]
		set ThisCurl [CURL /cr/cma/textEdit $PassedOid]
	}

	TOPIC {
		set ThisCurl [CURL /cr/cma/topicEdit $PassedOid]
	}

	VIDEO	{
		set Args [UnPackOid $PassedOid]
		set Args [linsert $Args 1 $PassedContentType]
		set PassedOid [PackOid $Args]
		set ThisCurl [CURL /cr/cma/videoEdit $PassedOid]
	}
  	default {
    	set ErrorMsg {Invalid Component Type}
    	set ThisCurl [CURL /cr/cma/errorPage "$ErrorMsg" SAVE_STATE]
  	}
} ;# switch PassedContentType

NULL]



[##############################################################################
#                            Begin Display Section                            #
##############################################################################]

<HTML>
<HEAD>
<TITLE>Content Edit</TITLE>
[PAGE_EXPIRES]
<LINK REL=STYLESHEET TYPE="text/css" HREF="/cr/cma/styleMaster">
<SCRIPT language="Javascript">
<!--

function doOnLoad(thisform, theurl) {
	//alert('the url passed in is ' + theurl);
	parent.getCurCtxtVars(thisform);
	//alert('from Content Edit CurCtxtSite is ' + thisform.CurCtxtSite.value);
	thisform.action=theurl;
	thisform.submit();	
}

//-->
</SCRIPT>
</HEAD>

<BODY onload="doOnLoad(document.getElementById('FrmContentEdit'),'[SHOW ThisCurl]');">
<font class=workspace_section>Loading...</font>

<FORM id='FrmContentEdit' method='post' action=''>
	<input type='hidden' name='FrmSourceOfForm' value='contentEdit'>
	
	[AddContext]
</FORM>
</BODY>
</HTML>
