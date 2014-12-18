SNI.HGTV.Photogallery3 = {


	cbackHotSpotJSON: function() {
		if (SNI.HGTV.Photogallery3.ImageData[ITMCUR].bhs) { SNI.HGTV.Photogallery3.doHotSpots(ITMCUR); }
		SNI.HGTV.Photogallery3.insertProdsTab();
		return;
	},
	
		// Data: look up hotspots for current image
	doHotSpots: function (itmSel) {
		if (typeof SNI.HGTV.Photogallery3.Hotspots == "undefined") { return; }
		imgId = $("#pgallery3 .pglnks li").eq(itmSel).find("a").attr("rel");
		for (i = 0; i < SNI.HGTV.Photogallery3.Hotspots.images.length; ++i) {
			if (imgId == SNI.HGTV.Photogallery3.Hotspots.images[i].id) {
				SNI.HGTV.Photogallery3.applyHotSpots(SNI.HGTV.Photogallery3.Hotspots.images[i], itmSel);	
				break;
			}
		}
		return;
	},

	// DOM: create hotspot markup for current image
	applyHotSpots: function (oHS, itmSel) {
		$imgCont = $("#pgallery3 #img-" + (itmSel));
		vi = ''; vc = '';
		if ($imgCont.hasClass("vert-enl")) { vi = "-v"; vc = " v"; }
		$imgCont = $imgCont.find(".imgwrap");
		wImg = parseInt($imgCont.css("width"));
		hImg = parseInt($imgCont.css("height"));
		for (i = 0; i < oHS.hotspots.length; ++i) {
			// create and insert the HS markup
		  hsID = "hs-" + itmSel + '-' + i + vi;
		  hsRel = "hs-" + oHS.id  + '-' + oHS.hotspots[i].id;
			sHS = '<span class="hs' + vc + '" id="' + hsID + '"><a href="' + oHS.hotspots[i].url + '" rel="' + hsRel + '">click</a><span>' + oHS.hotspots[i].name + '</span></span>';
			$imgCont.append(sHS);
			// position the button
			$jBtn = $imgCont.find("#" + hsID + " a");
			if (typeof wBtn == "undefined") { 				
				wBtn = parseInt($jBtn.css("width"));
				hBtn = parseInt($jBtn.css("height"));
			}
			xBtn = Math.round(wImg * oHS.hotspots[i].hotspotXPercent/100 - wBtn/2, 0);
			yBtn = Math.round(hImg * oHS.hotspots[i].hotspotYPercent/100 - hBtn/2, 0);
			$ePop = $jBtn.next();
			// measure and position the pop-up:
			wPop = $ePop.width() + parseInt($ePop.css("padding-left")) +	parseInt($ePop.css("padding-right"));
			hPop = $ePop.height() + parseInt($ePop.css("padding-top")) +	parseInt($ePop.css("padding-bottom"));
			yPop = yBtn - 4 - hPop;
			if (yPop < 7) {
				// to left or right of button
				yPop = Math.max(yBtn + (hBtn - hPop) / 2, 7) ;
				if (xBtn + wBtn/2 > wImg/2) {
					xPop = xBtn - 4 - wPop;
				} else {
					xPop = xBtn + wBtn + 4;
				}						
			} else {
				// above button
				xPop = xBtn + (wBtn - wPop) / 2; 
				xPop = Math.min( Math.max(7, xPop), wImg - 7 - wPop );
			}
			$jBtn.css({"left": xBtn, "top": yBtn}).hover(
				function() { $(this).parent().find("span").addClass("on"); },
				function() { $(this).parent().find("span").removeClass("on"); }
			).bind( "click", {oHSthis: oHS.hotspots[i]}, function(e) { SNI.HGTV.Omniture.HotSpotClick(e.data.oHSthis,"c"); return SNI.HGTV.Photogallery3.showProd($(this))}
			).parent().find("span").css({"left": xPop, "top": yPop});
		}
		return;
	},

	// DOM: show product detail screen (when hotspot clicked)
	showProd:	function ($hsLink) {
		aID =  $hsLink.parent().attr("id").split("-");
		imgNum = parseInt(aID[1]);  // image seq no 0, 1, 2
		hsNum = parseInt(aID[2]);  // HS seq no 0, 1, 2
		aRel = $hsLink.attr("rel").split("-");
		imgCMA = aRel[1];  // image CMA id
		hsCMA = aRel[2];  // hotspot tool id
		imgSel =  "#pgallery3 #img-" + imgNum;
		prodSel = "#pgallery3 #prod-" + imgNum;
		bNew = false;
		if ($(prodSel).length == 0) {
			for (i = 0; i < SNI.HGTV.Photogallery3.Hotspots.images.length; ++i) {
				if (imgCMA == SNI.HGTV.Photogallery3.Hotspots.images[i].id) {
					oHS = SNI.HGTV.Photogallery3.Hotspots.images[i].hotspots;
					hTabs = '<h4>Products From this Photo:</h4>\n<div class="tab-wrap">\n<ul class="tabs">\n';
					hCont = '<ul class="cont">';
					bMkt = true;
					for (j = 0; j < oHS.length; ++j) {
						hTabs += '<li><a href="' + oHS[j].url + '">' + oHS[j].name + '</a></li>\n';
						hCont += '<li>\n<h4><a target="_blank" href="' + oHS[j].url + '">' + SNI.Util.strTrimEllips(oHS[j].name, 42) + '</a></h4>\n';
						hCont += '<a class="pframe" target="_blank" href="' + oHS[j].url + '"><img width="266" height="200" src="' + oHS[j].imageURL + '"><span>More Info</span></a>';
						hCont += '<p>' + SNI.Util.strTrimEllips(oHS[j].description, 180) + '</p>\n</li>';
						bMkt = bMkt && (oHS[j].marketplaceId != "");
					}
					hTabs += "</ul>\n</div>\n";
					hCont += "</ul>\n";
					break;
				}
			}
			hOut = '<div class="prod clrfix" id="prod-' + imgNum + '">\n';
			hOut += '<div class="l clrfix">';
			hOut += '<a class="close" href="#"><img width="160" src="' + $(imgSel).find("img").attr("src") + '"></a>\n';
			hOut += '<p><a class="close" href="#">Back to Photo</a></p>'
			hOut += hTabs;
			hOut += '</div>\n';
			hOut += '<div class="r">';
			hOut += '<a href="#" class="close">Close</a>\n';
			hOut += hCont;
			// "You May Also Like" products only if all hotspots on image are Marketplace products (SE-530)
			if (bMkt) { hOut += SNI.HGTV.Photogallery3.getProdYMAL(); }
			hOut += '</div>\n';
			$("#pgallery3 .pglnkmask").before(hOut);
			bNew = true;
			
			// Omniture tracking for click-through to marketplace
			$(prodSel + " .r ul.cont li").each( function (i) { $(this).find("a").bind( "click", {oHSthis: oHS[i]}, function(e) { SNI.HGTV.Omniture.HotSpotClick(e.data.oHSthis,"l"); return true;}); });

			// tabbed browsing of HS products
			$(prodSel + " .l .tabs li a").click( function () {
				if ($(this).parent().hasClass("sel")) { return false; };
				$(prodSel).find(".l .tabs li").removeClass("sel");
				$(prodSel).find(".r .cont li").removeClass("sel");
				$(this).parent().addClass("sel");
				$(prodSel).find(".r .cont li").eq($(prodSel).find(".l .tabs li").index($(prodSel).find(".l .tabs li.sel"))).addClass("sel");
				if ($(prodSel).find(".r .relProd").length > 0) {
					$(prodSel).find(".r .relProd").replaceWith(SNI.HGTV.Photogallery3.getProdYMAL());
				}
				return false;
			});
			// close products detail
			$(prodSel + " a.close").click( function () {
				var $prodCont = $(this).parents(".prod");
				var aID = $prodCont.attr("id").split("-");
				var imgNum = parseInt(aID[1]);  // image seq no 0, 1, 2
				var imgSel =  "#pgallery3 #img-" + imgNum;
				$prodCont.hide();
				$(imgSel).show();
				return false;
			});
			
		}
		$(prodSel + " .l .tabs li").removeClass("sel").eq(hsNum).addClass("sel");
		$(prodSel + " .r .cont li").removeClass("sel").eq(hsNum).addClass("sel");
		$(imgSel).hide();
		$(prodSel).show();
		if (bNew) {
			// height-constrain overflow mask for product list (will scroll)
			$(prodSel + " .tab-wrap").height( $(prodSel).offset().top + $(prodSel).innerHeight() - parseInt($(prodSel).css("padding-bottom")) - $(prodSel + " .tab-wrap").offset().top );
		}
		return false;
	},
	
	// DOM: get and format (up to) 3 Endeca related products for hostpot product detail page
	getProdYMAL: function () {
		hRet = '';
		if (typeof SNI.HGTV.ProductIdeas == "undefined") { return hRet; }
		iSrcLen = SNI.HGTV.ProductIdeas.length;
		if (iSrcLen == 0) { return hRet; }
		aSrc = new Array(iSrcLen);
		for (i = 0; i < iSrcLen; ++i) { aSrc[i] = i; }
		iDrawnLen = Math.min(iSrcLen, 3);
		aDrawn = new Array(iDrawnLen);
		for ( i = 0; i < iDrawnLen; ++i) {
			j = Math.floor(Math.random() * aSrc.length);
			aDrawn[i] = aSrc[j];		
			aSrc.splice(j, 1);
		}
		hRet = '<div class="relProd clrfix">\n';
		hRet += '<a class="more" href="http://marketplace.hgtv.com/">More Products</a><h4>You Might Also Like:</h4>\n';
		hRet += '<ul class="clrfix">\n';			
		itmClass = '';
		for ( i = 0; i < iDrawnLen; ++i) {
			with (SNI.HGTV.ProductIdeas[aDrawn[i]]) {
				if (i == iDrawnLen - 1) { itmClass = ' class="last"'; }
				hRet += '<li'+ itmClass +'><a target="_blank" href="' + pURL + '"><img width="92" height="69" src="' + iURL + '" alt="'+ iAlt +'" /><span>' + pName + '</span></a></li>\n';
			}
		}
		hRet += '</ul>\n';			
		hRet += '</div>\n';			
		return hRet;
	},

		// insert recap of hot-spotted products in end fram tab
	insertProdsTab: function () {
		if (typeof SNI.HGTV.Photogallery3.Hotspots == "undefined") { return; }
		hRet = "<ul>\n<h4>Products From This Gallery</h4>";
		for (i = 0; i < SNI.HGTV.Photogallery3.Hotspots.images.length; ++i) {
			oHS = SNI.HGTV.Photogallery3.Hotspots.images[i].hotspots;;
			for (j = 0; j < oHS.length; ++j) {
				hRet += '<li><a target="_blank" href="' + oHS[j].url + '"><img src="' + oHS[j].imageURL + '" alt="' + oHS[j].name + '" />';
				hRet += '<p class="first"><a target="_blank" href="' + oHS[j].url + '">' + oHS[j].name + '</a></p></li>\n'; 
			}
		}
		hRet += "</ul>\n";
		$("#pgallery3 .endframe .tab.shop").append(hRet);
		$("#pgallery3 .endframe .nav .shop").show();
	
	},

	init: function() {

		EF_IMG_HTML = '<img width="92" height="69" src="http://web.hgtv.com/webhgtv/hg20/imgs/email-share_sm.jpg" alt="Share or Email this Photo Gallery" />';

		// get current image index from markup:
		ITMCUR = $("#pgallery3 .pglnks li").index($("#pgallery3 .pglnks li.sel"));
		
		// save article byline if any to under item override
		BYLINE = "";
		if ($("#hg-w > .intro p.byline").length > 0) { BYLINE = $("#hg-w > .intro p.byline").text(); }

		// bottom nav panel calculatons
		ITMPERPANEL = 9;
		XBASE = $("#pgallery3 .pglnks").position().left;
		ITMLAST = $("#pgallery3 .pglnks li").length - 1;
		ITMWIDTH = $("#pgallery3 .pglnks li").innerWidth() + parseInt($("#pgallery3 .pglnks li").css("margin-left")) + parseInt($("#pgallery3 .pglnks li").css("margin-right"));
		newwidth = (ITMLAST + 1 ) * ITMWIDTH;
		if (ITMLAST > ITMPERPANEL) { ++newwidth; }
		$("#pgallery3 .pglnks").css("width", newwidth);
			
		// Event: click: rotate pagination left (earlier pages)
		$("#pgallery3 .pglnkmask .leftctrl a").click( function () {
			if ($(this).hasClass("dis")) { return false; }
			itmBaseCur = Math.round((XBASE - $("#pgallery3 .pglnks").position().left) / ITMWIDTH);
			itmBaseNew = Math.max(0, itmBaseCur - ITMPERPANEL); 
			if (itmBaseCur == ITMLAST - ITMPERPANEL) {$("#pgallery3 .pglnkmask .rightctrl a").removeClass("dis");}
			$("#pgallery3 .pglnks").animate({left: (XBASE-itmBaseNew*ITMWIDTH)+"px"}, SNI.HGTV.ANIMATION_SPEED );
			if (itmBaseNew == 0) {$("#pgallery3 .pglnkmask .leftctrl a").addClass("dis");}
			return false;
		});

		// Event: click: rotate pagination right (later pages)
		$("#pgallery3 .pglnkmask .rightctrl a").click( function () {
			if ($(this).hasClass("dis")) { return false; }
			itmBaseCur = Math.round((XBASE - $("#pgallery3 .pglnks").position().left) / ITMWIDTH);
			itmBaseNew = Math.min(ITMLAST - ITMPERPANEL, itmBaseCur + ITMPERPANEL); 
			if (itmBaseCur == 0) {$("#pgallery3 .pglnkmask .leftctrl a").removeClass("dis");}
			$("#pgallery3 .pglnks").animate({left: (XBASE-itmBaseNew*ITMWIDTH)+"px"}, SNI.HGTV.ANIMATION_SPEED );
			if (itmBaseNew == ITMLAST - ITMPERPANEL) {$("#pgallery3 .pglnkmask .rightctrl a").addClass("dis");}
			return false;
		});

		// Event: hover: show thumbnail on hover over page tab:		
		$("#pgallery3 .pglnks li a").bind("mouseenter", function() {
				if ($(this).parent().hasClass("sel")) { return false; }
				$(this).parent().find(".tnframe").show();
				$(this).parents(".pglnkmask").addClass("popactive");
			}).bind("mouseleave", function() {
				$(this).parent().find(".tnframe").hide();
				$(this).parents(".pglnkmask").removeClass("popactive");
			});

		// Event: click:  previous link (thumbnail above main image)
		$("#pgallery3 .photonav .prevlnk a").click( function () {
				setImg((ITMCUR + ITMLAST) % (ITMLAST + 1));
				return false;
			});

		// Event: click:  next links (thumbnail above main image AND NOW link on main image itself)
		$("#pgallery3 .photonav .nextlnk a, #pgallery3 .largeImage a.bigimg").click( function () {
				setImg((ITMCUR + 1) % (ITMLAST + 1));
				return false;
			});

		// Event: click:  select new image from bottom nav
		$("#pgallery3 .pglnks a").click( function () {
				if (!$(this).parent().hasClass("sel")) { 
					$(this).parent().find(".tnframe").hide();
					setImg($(this).text()-1); 
				}	
				return false;
			});
			
		// Event: click:  expand vertical image to full size	
		$("#pgallery3 .largeImage a.vtoggle.enl").click( function () {
				$myImgCont = $(this).parents(".largeImage");
				$myImgCont.removeClass("vert-shr").addClass("vert-enl");
				if ($myImgCont.find(" .hs.v").length == 0) {
					SNI.HGTV.Photogallery3.doHotSpots(parseInt($(this).parents(".largeImage").attr("id").split("-")[1]))
				}
				return false;
			});

		// Event: click:  shrink vertical image to standard height
		$("#pgallery3 .largeImage a.vtoggle.shr").click( function () {
				$myImgCont = $(this).parents(".largeImage");
				$myImgCont.removeClass("vert-enl").addClass("vert-shr");
				return false;
			});

	// Event: click:  expand caption panel w/ animation
		$("#pgallery3 .largeImage .imgpanel a.open").click( function () {
				$myPanel = $(this).parent();
				$myPanel.find("a.open").hide();
				$myPanel.animate({bottom: "0"});
				$myPanel.find("a.close").show();
				return false;
			});

	// Event: click:  hide caption panel w/ animation
		$("#pgallery3 .largeImage .imgpanel a.close").click( function () {
				$myPanel = $(this).parent();
				myCollapseHt = parseInt(Math.max($myPanel.find("h2").outerHeight(),$myPanel.find("a.cap-lnk.close").outerHeight()) + parseInt($myPanel.css("padding-top")) - $myPanel.innerHeight()) + "px";
				$myPanel.find("a.close").hide();
				$myPanel.animate({bottom: myCollapseHt});
				$myPanel.find("a.open").show();
				return false;
			});

	// change main image to selected: main line w/ all housekeeping
		function setImg(itmSel) {
			if (itmSel == ITMCUR) { return; }
		// Omniture page tracking:
			doDynOmni(itmSel);		
			newImgCont = "#pgallery3 #img-" + itmSel;
		// if large image div already exists, show it
			if ($(newImgCont).length > 0) {
				$("#pgallery3 .largeImage, #pgallery3 .prod").hide();
			// set up hotspots if needed (maybe waiting for async load? edge case)
////				if ((SNI.HGTV.Photogallery3.ImageData[itmSel].bhs) && ($(newImgCont).find(".hs").///length > 0)) {
////					SNI.HGTV.Photogallery3.doHotSpots(itmSel);
////				}
				$(newImgCont).show();
			}	else {
			// else create it and show it:
				$("#pgallery3 .largeImage").eq(0).clone(true).attr("id", "img-" + itmSel).insertAfter("#pgallery3 .largeImage:last");
				$(newImgCont).hide();
				$("#pgallery3 .largeImage.loading").show();
				$(newImgCont).find(".hs").remove();
				$(newImgCont + " img").remove();
				myImg = new Image();
				if ($(newImgCont + " a.bigimg").length > 0) {
					$(myImg).appendTo(newImgCont + " a.bigimg");
				} else {
					$(myImg).appendTo(newImgCont + " .imgwrap");
				}
				$(myImg).load( function() {
					 $("#pgallery3 .largeImage, #pgallery3 .prod").hide(); 
					 $(newImgCont).show(); 
					// set up hotspots if flagged in CMA	
						if (SNI.HGTV.Photogallery3.ImageData[itmSel].bhs) {
							SNI.HGTV.Photogallery3.doHotSpots(itmSel);
						}
					 $("#pgallery3 .largeImage.loading").hide(); 
				} );
				setImgData(SNI.HGTV.Photogallery3.ImageData[itmSel], $(newImgCont));
			}
		// override by-line with image creator if any, else revert to article by-line
			fixByLine(itmSel);
		// hide "previous" thumbnail if moving to 1st image; show if moving off 1st image
			if (itmSel == 0) { $("#pgallery3 .photonav .prevlnk").css("visibility", "hidden"); }
			else if (ITMCUR == 0)  { $("#pgallery3 .photonav .prevlnk").css("visibility", "visible"); }
		// update page number in top nav
			$("#pgallery3 .photonav .pagen span").text(itmSel + 1);
		// update "previous" thumbnail
			topPrev = "#pgallery3 .photonav .prevlnk";
			$(topPrev + " img").remove();
			$pgItmPrev = $("#pgallery3 .pglnks li").eq((itmSel + ITMLAST) %  (ITMLAST + 1));
			if ($pgItmPrev.find("img").length > 0) {
				$pgItmPrev.find("img").clone().prependTo(topPrev + " a");
			}
			$(topPrev + " a").attr("href", $pgItmPrev.find("a").attr("href"));
		// update "next" thumbnail:
			topNext = "#pgallery3 .photonav .nextlnk";
			$(topNext + " img").remove();
			$pgItmNext = $("#pgallery3 .pglnks li").eq((itmSel + 1) %  (ITMLAST + 1));
			if ($pgItmNext.find("img").length > 0) {
				$pgItmNext.find("img").clone().prependTo(topNext + " a");
			} 			
			$(topNext + " a").attr("href", $pgItmNext.find("a").attr("href"));
		// update link on main image (ck for backward compat w/ cached pages where it doesn't exist)	
			if ($(newImgCont + " a.bigimg").length > 0) {
				$(newImgCont + " a.bigimg").attr("href", $pgItmNext.find("a").attr("href"));
			}			
		// change selected numbered page link
			$("#pgallery3 .pglnks li").eq(ITMCUR).removeClass("sel");
			$("#pgallery3 .pglnks li").eq(itmSel).addClass("sel");
		// new item is now currently selected	
			ITMCUR = itmSel;
		// check/refresh ad:
			SNI.HGTV.DynAds.refresh();		
		// fix link for printing current page:
			if ($("#print-select a.this").length > 0) {
				plink = $("#print-select a.this").attr("href");
				i = itmSel + 1;
				if (i < 10) { i = '0' + parseInt(itmSel+1); }
				plink = $("#print-select a.this").attr("href");
				plink = plink.replace(/(.*ARTICLE-PRINT-PHOTO-GALLERY-CURRENT).*?(,00.html)$/, "$1_"+i+"$2");
				$("#print-select a.this").attr("href", plink);
			}
		// rotate page nav if necessary:
			setPanel();
		// Nielson hit count: load dummy html into hidden iframe
			SNI.Util.hitCount();		
			return;
		}
		

	// force Omniture page tracking with modified metadata (url w/ query string)
		function doDynOmni(i) {		
			++i;
			if (mdManager.getParameterString("oUrl") == "") {
				mdManager.setParameter("oUrl", mdManager.getParameterString("Url"))
			}
			mdManager.setParameter("Url", mdManager.getParameter("oUrl")+"?i=" + parseInt(i));
			if (i < 10) { i = '0' + parseInt(i); }
			mdManager.setParameter("UniqueId", mdManager.getParameterString("UniqueId").replace(/(.*?)-([0-9]{1,2})$/, "$1-"+i));
			if (typeof s == "object") { s.t(); }
			return;
		}
		
	// fill in cloned layout for big image with data from JSON
		function setImgData(imgData, $inImgCont) {
			if (imgData.bvert) { 
				$inImgCont.removeClass("vert-enl").addClass("vert-shr");
			} else {
				$inImgCont.removeClass("vert-shr vert-enl");
			}
			$inImgCont.find("img").attr("src", imgData.iurl).attr("alt", imgData.ialt);
			$myPanel = $inImgCont.find(".imgpanel");
			$myPanel.find("h2").html(imgData.ititle);
			$myPanel.find("cite").html(imgData.icap);
			if ( (imgData.rurl != "") && (imgData.rtxt != "")) {
				$myPanel.find(".lgbtn a").attr("href", imgData.rurl);
				$myPanel.find(".lgbtn .lgbtn-text").text(imgData.rtxt);
				$myPanel.find(".lgbtn").removeClass("hide");
			} else {
				$myPanel.find(".lgbtn").addClass("hide");
			}	
			if ((imgData.ititle == "") && (imgData.icap == "") && (imgData.rurl == "") && (imgData.rtxt == "")) {
				$myPanel.addClass("hide");			
			} else {
				$myPanel.find("a.open").hide();
				$myPanel.find("a.close").show();
				$myPanel.css({bottom: "0"});
				$myPanel.removeClass("hide");			
			}
			return;		
		}		
		
		// maintain by line on image change
		// -- if image has creator, it is by line
		// -- if image does not have creator and markup shows image creator:
		//    -- remove if no article by-line
		//    -- else revert to article by-line
		function fixByLine(itmSel) {
			iCreator = "";
			if (itmSel < SNI.HGTV.Photogallery3.ImageData.length) {
				iCreator = SNI.HGTV.Photogallery3.ImageData[itmSel].creator;
			}
			if (iCreator != "") {
				if ($("#hg-w > .intro p.byline").length == 0) {
					$("#hg-w > .intro").append("<p class=\"byline\"></p>");
				}
				$("#hg-w > .intro p.byline").addClass("pic").text("By " + iCreator);
			} else if ($("#hg-w > .intro p.byline.pic").length > 0) {
				if (BYLINE != "") {
					$("#hg-w > .intro p.byline").removeClass("pic").text(BYLINE);
				} else {
					$("#hg-w > .intro p.byline").remove();
				}
			}
			return;
		}

		// Event: click:  navigate tabs in end frame
		$("#pgallery3 .endframe .nav a").click( function () {
			$("#pgallery3 .endframe .nav li.sel").removeClass("sel");
			$(".endframe .tab").hide();
			$(".endframe .tab." + $(this).parent().parent().attr("class")).show();
			$(this).parent().parent().addClass("sel"); // because closest("li") requires jQ 1.3 damn
			return false;
		});

		// Event: click:  copy link (share tab in end frame)
		$("#pgallery3 .endframe div.share p#copylink a").click( function () {
			$("#embed_code").select();
			return false;
		});

		// Event: click:  links to post to social networks:

		$("#pgallery3 .endframe .share .digg a").click( function () {
				window.open('http://digg.com/submit?url=' + encodeURIComponent(location.href) + '&title=' + encodeURIComponent(mdManager.getParameter('Title')));
				return false; 
		});

		$("#pgallery3 .endframe .share .fb a").click( function () {
			window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(location.href)+'&t='+encodeURIComponent(mdManager.getParameter('Title')),'sharer','toolbar=0,status=0,width=626,height=436,resizable=yes');
			return false; 
		});

		$("#pgallery3 .endframe .share .mysp a").click( function () {
			window.open('http://www.myspace.com/index.cfm?fuseaction=postto&' + 't=' + encodeURIComponent(mdManager.getParameter('Title')) + '&u=' + encodeURIComponent(location.href));
			return false; 
		});

		$("#pgallery3 .endframe .share .deli a").click( function () {
			window.open('http://delicious.com/save?v=5&amp;noui&amp;jump=close&amp;url='+encodeURIComponent(location.href)+'&amp;title='+encodeURIComponent(mdManager.getParameter('Title')), 'delicious','toolbar=no,width=550,height=550,resizable=yes');
			return false; 
		});


		function loadHotSpotJSON() {
			if (typeof SNI.HGTV.Photogallery3.hsJSON == "undefined") { return; }
			myJSONurl ="http://"+location.hostname+SNI.HGTV.Photogallery3.hsJSON;
			$.ajax( { url: myJSONurl,	dataType: "script", cache: true, timeout: 10000, success: successHotSpotJSON, error: errorHotSpotJSON, complete: completeHotSpotJSON } );
			return;					
		}
		
		function errorHotSpotJSON(oXHTTP, stat, oExc) {
			return;
		}
		
		function successHotSpotJSON(dta, stat) {
			$("#pgallery3").append('<script type="text/javascript">' + dta + '\n SNI.HGTV.Photogallery3.cbackHotSpotJSON();</script>');
			return;
		}

		function completeHotSpotJSON(oXHTTP, stat) {
			if (stat == "success") {
			}
			return;
		}

		
		// rotate nav to include panel with currently selected link
		function setPanel() {
			itmBaseCur = Math.round((XBASE - $("#pgallery3 .pglnks").position().left) / ITMWIDTH);
			itmBaseNew = Math.max(0, Math.min(ITMLAST - ITMPERPANEL, Math.floor((ITMCUR - 1) / ITMPERPANEL) * ITMPERPANEL));
			if (itmBaseCur != itmBaseNew)
			{
				itmBaseNew = Math.max(0, Math.min(ITMLAST - ITMPERPANEL, Math.floor((ITMCUR - 1) / ITMPERPANEL) * ITMPERPANEL));
				$("#pgallery3 .pglnks").css("left",(XBASE-itmBaseNew*ITMWIDTH)+"px");
				if (itmBaseCur == 0) { $("#pgallery3 .pglnkmask .leftctrl a").removeClass("dis"); }
				if (itmBaseNew == 0) { $("#pgallery3 .pglnkmask .leftctrl a").addClass("dis"); }
				if (itmBaseCur == ITMLAST - ITMPERPANEL) { $("#pgallery3 .pglnkmask .rightctrl a").removeClass("dis"); } 
				if (itmBaseNew == ITMLAST - ITMPERPANEL) { $("#pgallery3 .pglnkmask .rightctrl a").addClass("dis"); } 
			}
		}
		
		// hide unused tabs on End Frame (corresponding to empty panels,  if no YMAL or products data)
		function fixEndFrame() {
			if ($("#pgallery3 .endframe .tab.shop img").length == 0) { $("#pgallery3 .endframe .nav .shop").hide(); }
			if ($("#pgallery3 .endframe .tab.ymal img").length == 0) { 
				$("#pgallery3 .endframe .nav .ymal").hide(); 
				$("#pgallery3 .endframe .nav .email").addClass("sel"); 
				$("#pgallery3 .endframe .tab.email").show();
			}
			if ($("#pgallery3 .pglnks li:last img").length == 0) {
				$("#pgallery3 .pglnks li:last .tnframe").append(EF_IMG_HTML);
				if ((ITMCUR == ITMLAST) && ($("#pgallery3 .photonav .nextlnk img").length == 0)) {
					$("#pgallery3 .photonav .nextlnk").prepend(EF_IMG_HTML);
				}
			}
			return;
		}
	
		// main line of page-load initialization
		bHS = false;
		for ( i = 0; i < SNI.HGTV.Photogallery3.ImageData.length; i++  ) { bHS = bHS || SNI.HGTV.Photogallery3.ImageData[i].bhs; }
		// conditional for  AJAX HS ver:

		if (bHS) { 	if (typeof SNI.HGTV.Photogallery3.hsJSON != "undefined") { loadHotSpotJSON() } };
	
		if (ITMCUR < SNI.HGTV.Photogallery3.ImageData.length) {
		// remove conditional for AJAX HS ver:
			if (typeof SNI.HGTV.Photogallery3.hsJSON == "undefined") {
				if (SNI.HGTV.Photogallery3.ImageData[ITMCUR].bhs) { SNI.HGTV.Photogallery3.doHotSpots(ITMCUR); }
				if (bHS) { SNI.HGTV.Photogallery3.insertProdsTab(); }
			}
		// remove ABOVE TWO LINES AJAX HS VER
			fixByLine(ITMCUR);
		}
		$("#pgallery3 .photowrap").append('<div class="largeImage loading"><span></span><p>loading</p></div>');
		SNI.HGTV.DynAds.init();

		var itmSel = ITMCUR;
		if ($.query.has('i')) {
			itmSel = parseInt($.query.get('i'));
			if (isNaN(itmSel) || (itmSel < 1) || (itmSel > ITMLAST+1))  { itmSel = ITMCUR; } else { --itmSel; }
		} 
		
		if (itmSel != ITMCUR) {
			setImg(itmSel); 
		}

		setPanel();
		fixEndFrame();

		return;

	}
};
	
SNI.HGTV.DynAds = {
	
	// ad descriptor parameters with default values:
	descr : { active: true, refreshRate: 3, interstitial: false },
	
	// interstitial descriptor parameters with default values:
	iparm : { iURL: "", iFmt: "", iHREF: "", iHeight: "", iWidth: "", iTrackURL: "", bURL: "" },

	// initial impression count is 1 (page load)
	impressionCt: 1,

	// load and set the ad descriptor (on page load):
	init :	function() {
		myJSON =  getDartEnterpriseUrl("PHOTO_DESCRIPTOR",1);
		myJSON += "&params.styles=photoGallery&callback=?";
		$.getJSON(myJSON, SNI.HGTV.DynAds.cback_descrJSON);
		return;
	},

	// process the ad descriptor (mainly validation)
	cback_descrJSON : function(oJSON) {
		if (typeof oJSON != "object") { return false; }
		if (oJSON.photo_descriptor == undefined) { return false; }
		oJSON = oJSON.photo_descriptor;
		if (oJSON.active == undefined) { return false; }
		if (oJSON.refreshRate == undefined) { return false; }
		if (oJSON.active != "true") { return false; }
		tmp = parseInt(oJSON.refreshRate);
		if (isNaN(tmp)) { return false; }
		if (tmp < 1 || tmp > 100) { return false; }
		SNI.HGTV.DynAds.descr.active = true;
		SNI.HGTV.DynAds.descr.refreshRate = tmp;
		if (oJSON.interstitial == undefined) { return false; }
		if (oJSON.interstitial == "true") { SNI.HGTV.DynAds.descr.interstitial = true; }
		return true;
	},

	// ad refresh: called for each image navigation event
	refresh : function() {
		if (!this.descr.active) { return; }
		// delete interstitial (if any), then increment impression count
		$("#pgallery3 .interwrap").remove(); 
		this.impressionCt++;
		if (this.impressionCt == this.descr.refreshRate) {
			this.impressionCt = 0;
			if (this.descr.interstitial) {
				// show interstitial and refresh big box:
// test:
//			myJSON = "http://frontend.scrippsnetworks.com/~clewis/interstitial.js?foo=foo";
				myJSON =  getDartEnterpriseUrl("PHOTO_INTERSTITIAL",1);
				myJSON += "&params.styles=photoGallery&callback=?";
				$.getJSON(myJSON, SNI.HGTV.DynAds.cback_interJSON);
				return;
			} else {
				// refresh big box only (no interstitial):
				setDartEnterpriseBanner("BIGBOX",getDartEnterpriseUrl("BIGBOX",5));
			}
		}
		return;
	},

	cback_interJSON : function(oJSON) {
		// reset interstitial parameters:
		$.each(SNI.HGTV.DynAds.iparm, function(key, val) { SNI.HGTV.DynAds.iparm[key] = ""; });
		if (typeof oJSON != "object") { return false; }
		if (typeof oJSON.scrippsads != "object") { return false; }
		if (typeof oJSON.scrippsads.ad != "object") { return false; }
		for ( i = 0; i < oJSON.scrippsads.ad.length; ++i) {
			if (typeof oJSON.scrippsads.ad[i].position != "object") { return false; }
			with (oJSON.scrippsads.ad[i].position) {
			with (SNI.HGTV.DynAds) {
				if ((iparm.iURL == "") && (id == "interstitial")) {
					iparm.iURL = media.src;
					iparm.iFmt = media.format;
					iparm.iHREF = media.href;
					iparm.iHeight = media.height;
					iparm.iWidth = media.width;
					if (typeof media.tracking.audit == "object") { iparm.iTrackURL = media.tracking.audit.src; }
				}
				if ((iparm.bURL == "") && (id == "300syncBanner")) {
					iparm.bURL = media.src;
				}
			}}
		}
		with (SNI.HGTV.DynAds) {
			// bale out if key parameters not set:
			if (iparm.iURL == "" || iparm.iFmt == "" || iparm.bURL == "") { return false; } 
		}
		// insert interstitial markup:
		SNI.HGTV.DynAds.gen_interstitial();
		return true;
	},
		
	gen_interstitial : function() {
		hRet = "";
		with (SNI.HGTV.DynAds) {
			hRet += '<div class="interwrap">';
			hRet += '<a href="#" class="close"><span></span>Next Photo</a>';				
			hRet += '<h6>Advertisement</h6>';
			if (iparm.iFmt.toLowerCase() == "swf") {
				hRet += '<div id="interad"></div>';
			} else {
				if (iHREF != "") {
					hRet += '<a href="' + iparm.iHREF + '">';
				}
				hRet += '<img src ="' + iparm.iURL + '" />';
				if (iHREF != "") {
					hRet += '</a>';
				}
			}
			hRet += '<iframe class="tracker" width="0" height="0" frameborder="0"></iframe>';
			hRet += '</div>';
			//gotcha: if vertical image is expanded, shrink it (so interstitial covers all)
			$myImgCont = $("#pgallery3 #img-" + ITMCUR);
			if ($myImgCont.hasClass("vert-enl")) { $myImgCont.removeClass("vert-enl").addClass("vert-shr"); }
			$("#pgallery3 .photowrap").append(hRet);
			$("#pgallery3 .interwrap .close").click(function() { $("#pgallery3 .interwrap").remove(); return false; });				
			if (iparm.iFmt.toLowerCase() == "swf") {
				swfobject.embedSWF(iparm.iURL, "interad", iparm.iWidth, iparm.iHeight, "9",	"http://common.scrippsnetworks.com/common/flash-express-install/expressInstall.swf","",{ wmode: "opaque", allowScriptAccess: "always", quality: "high" });
			}
			setDartEnterpriseBanner("BIGBOX",iparm.bURL);
			$("#pgallery3 .interwrap .tracker").attr("src", iparm.iTrackURL);
		}
		return;
	}

}; 	
