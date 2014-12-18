SNI.DIY.Photogallery3 = {

    cbackHotSpotJSON: function() {
	if (SNI.DIY.Photogallery3.ImageData[ITMCUR].bhs) { SNI.DIY.Photogallery3.doHotSpots(ITMCUR); }
	SNI.DIY.Photogallery3.insertProdsTab();
	SNI.DIY.Photogallery3.createProdList();
	return;
    },
    
    // Data: look up hotspots for current image
    doHotSpots: function (itmSel) {
	if (typeof SNI.DIY.Photogallery3.Hotspots == "undefined") { return; }
	imgId = $("#pgallery3 .pglnks li").eq(itmSel).find("a").attr("rel");
	for (i = 0; i < SNI.DIY.Photogallery3.Hotspots.images.length; ++i) {
	    if (imgId == SNI.DIY.Photogallery3.Hotspots.images[i].id) {
		SNI.DIY.Photogallery3.applyHotSpots(SNI.DIY.Photogallery3.Hotspots.images[i], itmSel);	
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
	    //make div, not span
	    sHS = '<div class="hs' + vc + '" id="' + hsID + '"><a href="' + oHS.hotspots[i].url + '" rel="' + hsRel + '">click</a><span class="pg-hotspot-name">' + oHS.hotspots[i].name + '</span></div>';
	    $imgCont.append(sHS);
	    // position the button
	    $jBtn = $imgCont.find("#" + hsID + " a");

	    if (typeof wBtn == "undefined") { 				
		wBtn = parseInt($jBtn.css("width"));
		hBtn = parseInt($jBtn.css("height"));
	    }
	    xBtn = Math.round(wImg * oHS.hotspots[i].hotspotXPercent/100 - wBtn/2, 0);
	    yBtn = Math.round(hImg * oHS.hotspots[i].hotspotYPercent/100 - hBtn/2, 0);
	    
	    $ePop = $jBtn.parent();
	    $ePop.css("visibility","visible");
	    
	    // measure and position the pop-up:
	    var popOffsetY = 30,
	    popOffsetX = 10;
	    wPop = $ePop.find("span").width() + parseInt($ePop.css("padding-left")) +	parseInt($ePop.css("padding-right"));
	    hPop = $ePop.find("span").height() + parseInt($ePop.css("padding-top")) +	parseInt($ePop.css("padding-bottom"));
	    yPop = 0*yBtn - hPop -hPop/2;
	    if (yBtn + yPop < 7) {

		// to left or right of button
		if (xBtn + wBtn/2 > wImg/2) {
		    xPop = 0*xBtn - 4 - wPop;
		} else {
		    xPop = 0*xBtn + wBtn + 4;
		}						
	    } else {
		// above button
		xPop = 0*xBtn + (wBtn - wPop) / 2; 
	    }

	    $ePop.css({"left": xBtn, "top": yBtn}).hover(
		function() { $(this).find("span").addClass("on"); },
		function() { $(this).find("span").removeClass("on"); }
	    ).bind( "click", {oHSthis: oHS.hotspots[i]}, function(e) { 		
		e.preventDefault();
		SNI.DIY.Omniture.HotSpotClick(e.data.oHSthis,"c");
		return SNI.DIY.Photogallery3.showProd($(this))
	    }
		    
		  ).parent().find("span.pg-hotspot-name").css({"left": xPop, "top": yPop});
	}
	return;
    },

    // DOM: show product detail screen (when hotspot clicked)
    showProd:	function ($hsLink) {
	//aID =  $hsLink.parent().attr("id").split("-");
	aID =  $hsLink.attr("id").split("-");
	imgNum = parseInt(aID[1]);  // image seq no 0, 1, 2
	hsNum = parseInt(aID[2]);  // HS seq no 0, 1, 2
	aRel = $hsLink.find('a').attr("rel").split("-");
	imgCMA = aRel[1];  // image CMA id
	hsCMA = aRel[2];  // hotspot tool id
	imgSel =  "#pgallery3 #img-" + imgNum;
	prodSel = "#pgallery3 #prod-" + imgNum;
	bNew = false;

	if ($(prodSel).length == 0) {
	    for (i = 0; i < SNI.DIY.Photogallery3.Hotspots.images.length; ++i) {
		if (imgCMA == SNI.DIY.Photogallery3.Hotspots.images[i].id) {
		    oHS = SNI.DIY.Photogallery3.Hotspots.images[i].hotspots;
		    hTabs = '<h4>Products from This Photo:</h4>\n<div class="tab-wrap">\n<ul class="tabs">\n';
		    hCont = '<ul class="cont">';
		    bMkt = true;
		    for (j = 0; j < oHS.length; ++j) {
			hTabs += '<li><a href="' + oHS[j].url + '">' + oHS[j].name + '</a></li>\n';
			
			hCont += '<li>\n<h4>'
			hCont +='<a target="_blank" href="' + oHS[j].url + '">' + SNI.Util.truncate(oHS[j].name, 42) + '</a>';
			hCont +='</h4>\n';
			hCont += '<a class="pframe" target="_blank" href="' + oHS[j].url + '"><img width="266" height="200" src="' + oHS[j].imageURL + '"></a>';
			hCont += '<p>' + SNI.Util.truncate(oHS[j].description, 180) + '</p>';
			hCont += '<a target="_blank" href="' + oHS[j].url + '"> <div class="pframe btn"  >'; 
			hCont += '<div class="lf-cap"></div>';
			hCont += '<div class="text">More Info</div>';
			hCont += '<div class="rt-cap"></div>';
			hCont += '</div></a>';
						
			hCont += '\n</li>';
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
	    hOut += '<p><a class="close" href="#">Back to This Photo</a></p>'
	    hOut += hTabs;
	    hOut += '</div>\n';
	    hOut += '<div class="r">';
	    hOut += '<a href="#" class="close">Close</a>\n';
	    hOut += hCont;
	    // "You May Also Like" products only if all hotspots on image are Marketplace products (SE-530)
	    if (bMkt) { hOut += SNI.DIY.Photogallery3.getProdYMAL(); }
	    hOut += '</div>\n';
	    $("#pgallery3 .pglnkmask").before(hOut);
	    bNew = true;
	    
	    // Omniture tracking for click-through to marketplace
	    $(prodSel + " .r ul.cont li").each( function (i) { $(this).find("a").bind( "click", {oHSthis: oHS[i]}, function(e) { 
		SNI.DIY.Omniture.HotSpotClick(e.data.oHSthis,"l"); 
		e.stopPropagation(); //prevent new pageview for main page
		return true;}); });

	    // tabbed browsing of HS products
	    $(prodSel + " .l .tabs li a").click( function () {
		if ($(this).parent().hasClass("sel")) { return false; };
		$(prodSel).find(".l .tabs li").removeClass("sel");
		$(prodSel).find(".r .cont li").removeClass("sel");
		$(this).parent().addClass("sel");
		$(prodSel).find(".r .cont li").eq($(prodSel).find(".l .tabs li").index($(prodSel).find(".l .tabs li.sel"))).addClass("sel");
		if ($(prodSel).find(".r .relProd").length > 0) {
		    $(prodSel).find(".r .relProd").replaceWith(SNI.DIY.Photogallery3.getProdYMAL());
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
	if (typeof SNI.DIY.ProductIdeas == "undefined") { return hRet; }
	iSrcLen = SNI.DIY.ProductIdeas.length;
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
	    with (SNI.DIY.ProductIdeas[aDrawn[i]]) {
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
	if (typeof SNI.DIY.Photogallery3.Hotspots == "undefined") { return; }
	hRet = "<ul>\n<h4>Products From This Gallery</h4>";
	for (i = 0; i < SNI.DIY.Photogallery3.Hotspots.images.length; ++i) {
	    oHS = SNI.DIY.Photogallery3.Hotspots.images[i].hotspots;;
	    for (j = 0; j < oHS.length; ++j) {
		hRet += '<li><a target="_blank" href="' + oHS[j].url + '"><img src="' + oHS[j].imageURL + '" alt="' + oHS[j].name + '" />';
		hRet += '<p class="first"><a target="_blank" href="' + oHS[j].url + '">' + oHS[j].name + '</a></p></li>\n'; 
	    }
	}
	hRet += "</ul>\n";
	$("#pgallery3 .endframe .tab.shop").append(hRet);
	$("#pgallery3 .endframe .nav .shop").show();
	
    },
    //create the Products List for show hide feature of DIY slideshow
    createProdList: function () {
	if (typeof SNI.DIY.Photogallery3.Hotspots == "undefined") { return; }
	prodListHtml = '<div class="view-all-products-container"><div class="close-view"></div><ul>';

	//traverse through hot spots and create the link list
	for (i = 0; i < SNI.DIY.Photogallery3.Hotspots.images.length; i++) {
	    prodListHS = SNI.DIY.Photogallery3.Hotspots.images[i].hotspots;
	    for (j = 0; j < prodListHS.length; j++) {
		prodListHtml += '<li class="hs-product"><div class="va-product-img"><a target="_blank" href="' + prodListHS[j].url + '">' + '<img src="' + prodListHS[j].imageURL + '"></a></div><p><a target="_blank" href="' + prodListHS[j].url + '">' + prodListHS[j].name + '</a></p></li>';
	    }
	}
	prodListHtml += "</ul></div>";
	
	$('#pgallery3').append(prodListHtml);

	//create toggle for view all (show and hide)
	$('#pgallery3 .view-all-products').toggle(function(e){
	    e.preventDefault();
            var products_height = $('#pgallery3').height() - 130;
	    $('.view-all-products-container').css('height', products_height).show();
	    $('.view-all-products a').html('Hide All Products');
	}, function(e){
	    e.preventDefault();
            SNI.DIY.Photogallery3.hideAllProductsOverlay();
	})
        
	//close view all products
	$('.view-all-products-container .close-view').click(function(){
	    $('#pgallery3 .view-all-products').trigger('click');
	})
	
	//call paginate prod list with (number of items per page, original list, container for original list)
	SNI.DIY.Photogallery3.paginateProdList(8, '.view-all-products-container ul');
    },

    hideAllProductsOverlay: function() {
        if ( $('.view-all-products-container').is(":visible") ) {
            $('.view-all-products-container').hide();
	    $('.view-all-products a').css('height', 'auto').html('View All Products');
        }       
    },

    //paginate the created products List
    paginateProdList: function(showNumber, list) {
	
	var showAmount = showNumber; //number of items per page
	var itemArray = $(list).children(); //array of DOM elements to be paginated
	var itemCount = itemArray.size(); //size of array
	var theList = $(list);
	var theContainer = $(list).parent(); //the container of the list elements
	var paginationHolder = "";
	var newListHolder = "";
	var totalPages = Math.ceil(itemCount/showAmount); //total pages that will be paginated
	var count = 0; //used as external count to loop through items in itemArray
	var currentPage = 1; //tracks current page

	//if there is less than the amount per page return because no need to paginate
	if (itemCount < showAmount){return;}

	for (i=1; i <= totalPages; i++){ //each loop creates a page
	    newListHolder += "<ul class='page page" + i + "'>";
	    for (j=0; j < showAmount; j++){ //loop the number of times equal to the amount of items shown per page
		if (itemArray[count]){
		    newListHolder += itemArray[count].outerHTML;
		    count++;
		}
	    }
	    newListHolder += "</ul>"

	}

	//replace original list with new paginated list separated in <ul>'s
	theList.replaceWith(newListHolder);

	//creating pagination - the first page will always be selected by default so it's included in the first string with the class current
	paginationHolder += '<div class="pagination-container"><div class="pagination"><div class="prev no-more"><a href="javascript:;">&larr; Prev Page</a></div><div class="pages"><a href ="javascript:;" class="current page1">1</a>'

	//first is already created so starting with the second
	for(i=2; i <= totalPages; i++) {
	    paginationHolder += '<a href ="javascript:;" class="page'+ i + '">' + i + '</a>';
	    
	}

	//closing everything out
	paginationHolder += '</div><div class="next"><a href="javascript:;">Next Page &rarr;</a></div></div></div>';

	//adding created pagination to the end of the container
	theContainer.append(paginationHolder);

	//change slides based on page number clicks
	$('.pagination .pages a').click(function(){
	    $this = $(this);
	    
	    //if already selected don't do anything
	    if($this.hasClass('current')){return;}

	    currentPage = ($('.pagination .pages a').index($this)) + 1; //finds the order of the link clicked and assigns that as current page
	    showPage(currentPage);

	    //controls highlighting of pagination
	    paginationHighlight(currentPage);

	})

	//change slides based on prev click
	$('.pagination .prev').click(function(){
		//Remove omniture referrer
		removeOmniReferrer();
	    if (currentPage === 1){return;}

	    currentPage -= 1;
	    showPage(currentPage);

	    paginationHighlight(currentPage);
	})

	//change slides based on next click
	$('.pagination .next').click(function(){
		//Remove omniture referrer
		removeOmniReferrer();
	    if (currentPage === totalPages){return;}

	    currentPage += 1;
	    showPage(currentPage);

	    paginationHighlight(currentPage);
	})

	//controls the highlighting of the pagination
	function paginationHighlight(currentPage){
	    if(currentPage === 1){
		$('.pagination .prev').addClass('no-more');
	    }
	    else if (currentPage > 1){
		$('.pagination .prev').removeClass('no-more');
	    }
	    
	    if(currentPage === totalPages){
		$('.pagination .next').addClass('no-more');
	    }
	    else if(currentPage != totalPages){
		$('.pagination .next').removeClass('no-more');
	    }

	    //creating allPagination global after pagination is created
	    $('.pagination .pages a').removeClass('current');
	    $('.pagination .pages .page' + currentPage).addClass('current');

	};

	function showPage(currentPage){
	    $('.view-all-products-container .page').hide();
	    $('.view-all-products-container .page.page' + currentPage).css('display', 'inline');
	};

    },

	clean_url: 'http://www.diynetwork.com' + window.location.pathname,
	portf_photo: '.imgwrap a.bigimg img',
	portf_photo_href: 'imgwrap a.bigimg',

	refreshSocial: function(itmCrr) {

		var imgTitle = ($(SNI.DIY.Photogallery3.ImageData[itmCrr].ititle).text() === '') ? $('div.intro h1').text() : $(SNI.DIY.Photogallery3.ImageData[itmCrr].ititle).text();

		SNI.IS.Pinterest.updateButton({
			element: '#tb-pinit iframe',
			url: SNI.DIY.Photogallery3.clean_url,
			imgUrl: SNI.DIY.Photogallery3.portf_photo_href,
			desc: imgTitle + ": " + SNI.DIY.Photogallery3.ImageData[itmCrr].icap,
			fromMsg: " From DIYnetwork.com's Garden Galleries"
		});

		SNI.IS.FB.updateButton({
			element: '#tb-facebook iframe',
			url: SNI.DIY.Photogallery3.clean_url
		});

		SNI.IS.Twitter.updateButton({
			'element': '#tb-twitter',
			'url': SNI.DIY.Photogallery3.clean_url + '?soc=sharingtw',
			'text': imgTitle + " - See more inspiration like this at DIYnetwork.com's Photo Galleries."
		});

		SNI.IS.GP.updateButton({
			element: '#tb-gplus iframe',
			url: SNI.DIY.Photogallery3.clean_url
		});
		
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
	ITMWIDTH = $("#pgallery3 .pglnks li").outerWidth();
	newwidth = (ITMLAST + 1 ) * ITMWIDTH;
	if (ITMLAST > ITMPERPANEL) { ++newwidth; }
	$("#pgallery3 .pglnks").css("width", newwidth);
	
	// Event: click: rotate pagination left (earlier pages)
	$("#pgallery3 .pglnkmask .leftctrl a").click( function () {
	    if ($(this).hasClass("dis")) { return false; }
	    itmBaseCur = Math.round((XBASE - $("#pgallery3 .pglnks").position().left) / ITMWIDTH);
	    itmBaseNew = Math.max(0, itmBaseCur - ITMPERPANEL); 
	    if (itmBaseCur == ITMLAST - ITMPERPANEL) {$("#pgallery3 .pglnkmask .rightctrl a").removeClass("dis");}
	    $("#pgallery3 .pglnks").animate({left: (XBASE-itmBaseNew*ITMWIDTH)+"px"}, SNI.DIY.ANIMATION_SPEED );
	    if (itmBaseNew == 0) {$("#pgallery3 .pglnkmask .leftctrl a").addClass("dis");}
	    return false;
	});

	// Event: click: rotate pagination right (later pages)
	$("#pgallery3 .pglnkmask .rightctrl a").click( function () {
	    if ($(this).hasClass("dis")) { return false; }
	    itmBaseCur = Math.round((XBASE - $("#pgallery3 .pglnks").position().left) / ITMWIDTH);
	    itmBaseNew = Math.min(ITMLAST - ITMPERPANEL, itmBaseCur + ITMPERPANEL); 
	    if (itmBaseCur == 0) {$("#pgallery3 .pglnkmask .leftctrl a").removeClass("dis");}
	    $("#pgallery3 .pglnks").animate({left: (XBASE-itmBaseNew*ITMWIDTH + 5)  +"px"}, SNI.DIY.ANIMATION_SPEED );
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
		//Remove omniture referrer
		removeOmniReferrer();
	    if ($(this).data("block") != "yes") {
		setImg((ITMCUR + ITMLAST) % (ITMLAST + 1));
	    }
	    //if product overlay visible hide
	    if($('.view-all-products-container').is(":visible")){
		$('#pgallery3 .view-all-products').trigger('click');
	    }
	    return false;
	});

	// Event: click:  next links (thumbnail above main image AND NOW link on main image itself)
	$("#pgallery3 .photonav .nextlnk a, #pgallery3 .largeImage a.bigimg").click( function () {
		//Remove omniture referrer
		removeOmniReferrer();
	    if ($(this).data("block") != "yes") {
		setImg((ITMCUR + 1) % (ITMLAST + 1));
	    }
	    //if product overlay visible hide
	    SNI.DIY.Photogallery3.hideAllProductsOverlay();
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
		SNI.DIY.Photogallery3.doHotSpots(parseInt($(this).parents(".largeImage").attr("id").split("-")[1]))
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

	if ($("#pgallery3 span.lgbtn.show").length > 0) {
	    $("#pgallery3 cite").css({"width": "460px"});	
	}
	
	if ($("#pgallery3 .largeImage .imgpanel h2").html()) {
	    $("#pgallery3 .largeImage .imgpanel .lgbtn").css({"left": "0px"}); 
	}
	
	// change main image to selected: main line w/ all housekeeping
	function setImg(itmSel) {
            SNI.DIY.Photogallery3.hideAllProductsOverlay();
	    if (itmSel == ITMCUR) { return; }

	    // Omniture page tracking:
	    //doDynOmni(itmSel);		
	    newImgCont = "#pgallery3 #img-" + itmSel;
	    // if large image div already exists, show it
	    if ($(newImgCont).length > 0) {
		$("#pgallery3 .largeImage, #pgallery3 .prod").hide();
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
		    if (SNI.DIY.Photogallery3.ImageData[itmSel].bhs) {
			SNI.DIY.Photogallery3.doHotSpots(itmSel);
		    }
		    $("#pgallery3 .largeImage.loading").hide(); 
		} );
		setImgData(SNI.DIY.Photogallery3.ImageData[itmSel], $(newImgCont));
	    }
	    // override by-line with image creator if any, else revert to article by-line
	    // 2010-12-10 CLewis believed obsolete DIY
            //			fixByLine(itmSel);
	    // 2010-12-10 CLewis new, to update "author" from creator field
	    fixCreator(itmSel);		
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
	    SNI.DIY.DynamicAds.refresh();		
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
	    SNI.DIY.Nielsen.trackNSE();
	    return;
	}
	
	function removeOmniReferrer(){
	     if (s.referrer !== undefined) {s.referrer = "";}
	     if (s.referrer) { s.referrer = "";}
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
	    if (typeof s == "object") {
		s.t();
	    }
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
	// 2010-12-10 CLewis believed obsolete in DIY:
	function fixByLine(itmSel) {
	    iCreator = "";
	    if (itmSel < SNI.DIY.Photogallery3.ImageData.length) {
		iCreator = SNI.DIY.Photogallery3.ImageData[itmSel].creator;
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
	
	// 2010-12-10 CLewis : new, to update "creator" line on image change
	function fixCreator(itmSel) {
	    iCreator = "";
	    if (itmSel < SNI.DIY.Photogallery3.ImageData.length) {
		iCreator = SNI.DIY.Photogallery3.ImageData[itmSel].creator;
	    }
	    if (iCreator != "") {
		if ($("#pgallery3 .author").length == 0) {
		    $("#pgallery3").append("<p class=\"author\"></p>");
		}
		$("#pgallery3 .author").text(iCreator);
	    } else if ($("#pgallery3 .author").length > 0) {
		$("#pgallery3 .author").remove();
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
	    if (typeof SNI.DIY.Photogallery3.hsJSON == "undefined") { return; }
	    myJSONurl ="http://"+location.hostname+SNI.DIY.Photogallery3.hsJSON;
	    $.ajax( { url: myJSONurl,	dataType: "script", cache: true, timeout: 10000, success: successHotSpotJSON, error: errorHotSpotJSON, complete: completeHotSpotJSON } );
	    return;					
	}
	
	function errorHotSpotJSON(oXHTTP, stat, oExc) {
	    return;
	}
	
	function successHotSpotJSON(dta, stat) {			
	    $("#pgallery3").append('<script type="text/javascript">' + dta + '\n SNI.DIY.Photogallery3.cbackHotSpotJSON();</script>');
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
	for ( i = 0; i < SNI.DIY.Photogallery3.ImageData.length; i++  ) { bHS = bHS || SNI.DIY.Photogallery3.ImageData[i].bhs; }
	// conditional for  AJAX HS ver:

	if (bHS) { 	if (typeof SNI.DIY.Photogallery3.hsJSON != "undefined") { loadHotSpotJSON() } };
	
	if (ITMCUR < SNI.DIY.Photogallery3.ImageData.length) {
	    // remove conditional for AJAX HS ver:
	    if (typeof SNI.DIY.Photogallery3.hsJSON == "undefined") {
		if (SNI.DIY.Photogallery3.ImageData[ITMCUR].bhs) { SNI.DIY.Photogallery3.doHotSpots(ITMCUR); }
		if (bHS) { SNI.DIY.Photogallery3.insertProdsTab(); }
	    }
	    // remove ABOVE TWO LINES AJAX HS VER
	    // 2010-12-10 CLewis believed obsolete DIY
	    //	fixByLine(ITMCUR);
	}
	$("#pgallery3 .photowrap").append('<div class="largeImage loading"><span></span><p>loading</p></div>');

	var imgTitle = ($(SNI.DIY.Photogallery3.ImageData[ITMCUR].ititle).text() === '') ? $('div.intro h1').text() : $(SNI.DIY.Photogallery3.ImageData[ITMCUR].ititle).text();

	
    SNI.DIY.DynamicAds.init({ container: "#pgallery3", 
				  insert_tgt: "#pgallery3 .photowrap", 
				  dismiss_elts: ["#pgallery3 .photonav .prevlnk a", "#pgallery3 .photonav .nextlnk a"] });

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

