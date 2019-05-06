// JavaScript Document
var demoUser="demo";
var demoPassword="123";
var remoteEnabled=true;
var scrollbarWidth;
//var msgSearching=false;
var clickEvent;
var messageSearchTimer;
var msgLeftItems;
var pressEvent;
var degree = {};
var loc = window.location;
var gridVar = {};
var gridFun = {};
var workListLength = undefined;
var msFooterButtonState = false;

degree.GetTwoPointDegree =  function(cx, cy, ex, ey) {
	var dy = ey - cy;
	var dx = ex - cx;
	var theta = Math.atan2(dy, dx); // range (-PI, PI]
	theta *=180 / Math.PI; // rads to degs, range (-180, 180]

	theta = (theta<0) ? 360+theta : theta;
	return theta;
}


$(document).ready(function(){
	//localStorage.setItem('ResponseState',"");    
     demo2();
   
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		clickEvent = "touchstart";
		pressEvent="touchstart";
		$("body").removeClass("touch-device").addClass("touch-device");
	} else {
		clickEvent = "click";
		pressEvent="mousedown";
	}
	var BrowserDetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "Other";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                this.versionSearchString = data[i].subString;

                if (dataString.indexOf(data[i].subString) !== -1) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) {
                return;
            }

            var rv = dataString.indexOf("rv:");
            if (this.versionSearchString === "Trident" && rv !== -1) {
                return parseFloat(dataString.substring(rv + 3));
            } else {
                return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
            }
        },

        dataBrowser: [
            {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
            {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
            {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
            {string: navigator.userAgent, subString: "Opera", identity: "Opera"},  
            {string: navigator.userAgent, subString: "OPR", identity: "Opera"},  

            {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"}, 
            {string: navigator.userAgent, subString: "Safari", identity: "Safari"}       
        ]
    };

    BrowserDetect.init();
    //document.write("You are using <b>" + BrowserDetect.browser + "</b> with version <b>" + BrowserDetect.version + "</b>");

    //Change event for Uploading Image
       

    var bv= BrowserDetect.browser;
    if( bv == "Chrome"){
        $("body").addClass("Chrome");
    }
    else if(bv == "MS Edge"){
     $("body").addClass("Edge");
    }
    else if(bv == "Explorer"){
     $("body").addClass("IE");
    }
    else if(bv == "Firefox"){
     $("body").addClass("Firefox");
    }

    
	
	$(".msg-search-wrap .close-link").on("click",function(){
		$(".msg-search-input").val("");
		$(".msg-search-input").keyup();
	});
	$(".msg-search-input").on("keyup",function(){
		///if(!msgSearching){
			//msgSearching=true;
			if($(this).val()!=""){
			
				msgLeftItems=$(".msg-listing:contains("+$(".msg-search-input").val()+")");
				
				//$(".msg-listing").html("");
				
				$(".msg-search-wrap.search-complete").removeClass("search-complete");
				$(".msg-search-wrap:not(.loading)").addClass("loading");
				//$(".msg-listing-wrap").css("visibility","hidden");
				clearTimeout(messageSearchTimer);
				
				messageSearchTimer=setTimeout(function(){				
					$(".msg-search-wrap.loading").removeClass("loading");
					$(".msg-search-wrap").removeClass("search-complete").addClass("search-complete");
					$(".msg-search-wrap .searching-txt .bolder").text($(".msg-search-input").val()+"...");
					$(".msg-listing-wrap").css("visibility","visible");				
					//$(".msg-listing").html(msgLeftItems);
					$(".msg-item").each(function(i,e){
						if(!$(e).is(":contains("+$(".msg-search-input").val()+")")){
							$(e).addClass("hide");
						}
						else{
							$(e).removeClass("hide");
						}
					});
					msgLeftItems.parents(".msg-item");
					//console.log(msgLeftItems.length);
					//msgSearching=false;			
				},2000);
			}
			else{
				$(".msg-item.hide").removeClass("hide");
				$(".msg-search-wrap.loading").removeClass("loading");
				$(".msg-search-wrap.search-complete").removeClass("search-complete");	
			}
		//}
	});

	//initHSlide(5000);
	initRadialProgress();	
	
	 /* Provisory for UI dev environment: */ localStorage.clear(); 
	
	if(location.href.indexOf("dt160ga2")!==-1 && remoteEnabled==false){
		$(".container").remove();	
	}
	/*$(".table-body-wrap").bind("scroll",function(){				
			if($(this).scrollTop()>0){
				$(".work-list-grid").removeClass("v-scrolled").addClass("v-scrolled");				
			}
			else{
				$(".work-list-grid").removeClass("v-scrolled");
			}
			
			if($(this).scrollLeft()>0){
				$(".work-list-grid").removeClass("h-scrolled").addClass("h-scrolled");				
			}
			else{
				$(".work-list-grid").removeClass("h-scrolled");
			}
		});*/
			
	
	$(document).bind(pressEvent,function(event) { 
		/*Close dropdown when click outside*/
		var currentDropdown,currentDropdownMenu,currentDropdownButton, overlayClickedDropdown="";
		currentDropdown=$(event.target).closest(".dropdown-wrap");
		currentDropdownMenu=currentDropdown.find(">.menu");
		currentDropdownButton=currentDropdown.find(">.menu-button");
		
		if($(event.target).hasClass("overlay") ||$(event.target).parents(".menu-close").length!==0  ){
   			overlayClickedDropdown=$(event.target).closest(".dropdown-wrap");
		}
		$('.dropdown-wrap.open').each(function(){			
			var menu=$(this).find(">.menu");
			if($(this)[0]===overlayClickedDropdown[0]|| (currentDropdownMenu[0]!==menu[0] && jQuery.inArray(menu[0],currentDropdown.parents(".dropdown-wrap>.menu")) ===-1)){
				$(this).removeClass("open close").addClass("close");
			}
			
		});
		/*Close dropdown when click outside*/ 
		/*Add shading whie scrolling teh content*/
		
		
			
		/*Add shading whie scrolling teh content*/
	});
	
	
	$(".mrk-note-icon .menu-button").bind(clickEvent,function(){ 
		$(".comment-list-holder .comment-lists").css("max-height",($(window).height()-$(".mrk-note-icon ")[0].getBoundingClientRect().top - 225)+ "px");
		
	});
	
	$(".menu-close").bind(clickEvent,function(){
		$(this).closest(".dropdown-wrap").removeClass("close open").addClass("close");	
	});
	
	$(".dropdown-wrap>.menu-button, .dropdown-wrap>.menu-arrow-icon,a[data-dropdownwrap-menubutton]").bind(clickEvent,function(){
		var dropdownWrap;
		var atr=$(this).attr('data-dropdownwrap-menubutton');
		
		if (typeof atr !== typeof undefined && atr !== false) {			
			var dropdownId=$(this).data("dropdownwrap-menubutton");
			dropdownWrap=$("#"+dropdownId);	
			dropdownWrap.css({"top":$(this).offset().top+"px"});
//			$(">.menu",dropdownWrap).css("max-height","calc(100vh - " + $(this).offset().top + "px)");
			$(">.menu",dropdownWrap).css("max-height","calc(100vh - " + ($(this).offset().top+10) + "px)"); 
		}
		else{			
			dropdownWrap=$(this).closest(".dropdown-wrap");
		}
		if(dropdownWrap.hasClass("open")){
			dropdownWrap.removeClass("close open").addClass("close");
		}
		else{
			dropdownWrap.removeClass("open close").addClass("open");
			if(dropdownWrap.find('.qig-menu').length > 0){
				dropdownWrap.removeClass("no-close").addClass("no-close");	
			}
			dropdownWrap.find(".dropdown-wrap.close,.dropdown-wrap.open").removeClass("close open");
		}
	});
	
	$(".close-button").bind(clickEvent,function(e){
		var clickedElement=$(e.target);
		var closeButton=$(this);
		var popup=closeButton.closest(".popup");
		
		if(clickedElement[0]===closeButton[0] && !closeButton.hasClass("popup")){
			closePopup(popup);
		}
	});
	$(".show-cookie-page").bind(clickEvent,function(e){
		$('.cookie-wrapper').addClass('open');
	});
	$(".close-cookie-page").bind(clickEvent,function(e){
		$('.cookie-wrapper').removeClass('open');
	});
	$(".hide-cookie-msg").bind(clickEvent,function(e){
		$('.cookie-wrapper').hide();
	});
	
	
	$(".popup-nav").bind(clickEvent,function(){
		openPopup($("#"+$(this).data("popup")));		
	});
	
	$(".popup.close-button").bind("click.popupClick",function(e){
		var clickedElement=$(e.target);
		if(clickedElement[0]===$(this)[0]){
			closePopup($(this));				
		}
	});
		
	$( ".switch-view" ).bind(clickEvent,function() {
		/*if(!$(this).hasClass("active")){
	  		switchView($(".grid-holder").hasClass("grid-view")?"tile-view":"grid-view");
		}*/
	});
	
	$( ".toggle-left-panel" ).bind(clickEvent,function() {
	  toggleLeftPanel();
		$("#completeSetupMessage").toggle();
	});
	
	$( ".user-info-holder .email-link-holder" ).bind(clickEvent,function() {
		var emailHolder=$(this).parents(".user-email-holder");
	 	emailHolder.addClass("edit");
		emailHolder.find(".text-underline").val($(".email-address").text());
		emailHolder.find(".text-underline").focus();
	});
	
	$( "#cancelEditEmail" ).bind(clickEvent,function() {
		var emailHolder=$(this).parents(".user-email-holder");
	 	emailHolder.removeClass("edit");
	});
	
	/*tab*/
		$(".tab-nav li a").bind(clickEvent,function(){
			var activeTabContent=$("#"+$(this).data("tab-nav"));
//			alert(activeTabContent);
//			console.log("#"+$(this).data("tab-nav"));
			$(this).parents(".tab-nav-holder").find("li").removeClass("active");
			$(this).parents(".tab-nav>li").removeClass("active").addClass("active");
			
			$(this).parents(".tab-holder").find(".tab-content.active").removeClass("active");
			activeTabContent.find(".dropdown-wrap.close,.dropdown-wrap.open").removeClass("close open"); //removing close animation of dropdown
			activeTabContent.removeClass("active").addClass("active");
			//alert($(this).data("tab-nav"))
			// if($(this).data("tab-nav") == "responseTab2"){
			// 	gridSetWidth(2);
			// }
			renderGridTable();

		});
	
	/*tab*/
	
	
	/*User menu*/
		$(".edit-settings-nav-holder a").bind(clickEvent,function(){
			$(this).parents(".menu").toggleClass("expanded");
		});
	/*User menu*/
	/*panel*/
		$(".panel-link").bind(clickEvent,function(){
			var panel=$(this).closest(".panel");
			var panelGroup=$(this).closest(".panel-group");
			
			if(!panel.hasClass("disabled") && !panel.hasClass("freeze")){
				panelGroup.find(".panel.open").removeClass("open").addClass("close");
				if(panel.hasClass("open")){
					panel.removeClass("open close").addClass("close");
				}
				else{
					panel.removeClass("open close").addClass("open");
				}
			}
		});

	$(".qig-col5 .panel-link").bind(clickEvent,function(){
		var panel=$(this).closest(".panel");
		var qigWrapperHeight=90;
		var qigWrapperCount= panel.find(".qig-wrapper").length;
		panel.find(".panel-content").css("max-height",qigWrapperHeight*qigWrapperCount+"px");		
	});
		
	/*panel*/
	
	
	/*Marking tool bar expand*/
	$(".exp-colp-mrking-tary a").bind(clickEvent,function(){
		$( ".tool-panel" ).toggleClass("expanded collapsed");
		$(this).find(".exp-collapse-arrow" ).toggleClass("left right");
	});
	
	/*Init Demo*/
	
	 //setTimeout(function(){setGridScrollbar();},1);
	
	/*$(".table-scroll-holder").on("touchstart",function(e){
		//alert("touch moving");
		$("body").attr("style","-webkit-overflow-scrolling:auto;overflow:hidden; width:100vw; height:100vh;");
		//$(this).css("-webkit-overflow-scrolling","touch");
	});
	$(".table-scroll-holder").on("touchend",function(e){
		$("body").attr("style","");
	});*/
	var scrolling=false;
	var timer;
	$(".table-scroll-holder").on("scroll",function(e){	
		//if(!$(this).hasClass("scrolling")){	
			var scroller=$(this);
			//var grid=$(".work-list-grid");
			
			var sl=scroller.scrollLeft();
			var st=scroller.scrollTop();
			
			var leftTable=$(".table-wrap-l .table-scroll-l");
			var rightTable=$(".table-scroll-holder");
			var topTable=$(".header-scroll-holder");
			
			 if (!scrolling) {
				clearTimeout(timer);
				 
				timer = setTimeout(function () {
					scrolling = true;					
					leftTable.scrollTop(st);						
					scrolling=false;
				},10);
			}			
			
			topTable.scrollLeft(sl);					
			setScrolled(scroller);			
		//}
	});
	
	
	$(".table-scroll-l").on("scroll",function(e){	
		//if(!$(this).hasClass("scrolling")){	
			var scroller=$(this);			
			
			var sl=scroller.scrollLeft();
			var st=scroller.scrollTop();
			
			var leftTable=$(".table-wrap-l .table-scroll-l");
			var rightTable=$(".table-scroll-holder");
			//var topTable=$(".header-scroll-holder");
			
			 if (!scrolling) {
				clearTimeout(timer);
				 
				timer = setTimeout(function () {
					scrolling = true;
					rightTable.scrollTop(st);								
					scrolling=false;
				},10);
			}			
		//}
	});
	
	
	/*worklist table scrolling*/
	
	 demo();
	/*Demo*/
	
	/*$(document).bind("keydown",function(ev){
		var keycode= ev.keyCode || ev.which;
		
		if(keycode==13){
			alert($(ev.target).html());
		}
	})*/
	
	
	/*Tree view*/
	$('.tree-view .parent-node').click(function() {
		if($(this).parent().hasClass('expanded')){
			$(this).parent().removeClass('expanded').addClass('collapsed');
		}else if($(this).parent().hasClass('collapsed')){
			$(this).parent().removeClass('collapsed').addClass('expanded');
		}else{
			$(this).parent().addClass('expanded');
		}
		var treeNode = $(this).parent().find('.sub-items li').length;
		$(this).parent().find('.sub-items').css('max-height', treeNode * 33);
    });
	
	
	$('.column-left .lock-btn').click(function() {
		$(this).next('.change-sts-btn').removeClass('hide');
		$(this).addClass('hide');
		$('.online-status-bubble').addClass('locked sprite-icon');
	});
	
	$('.send-message-holder a').click(function() {
		$('#composeMessage').addClass('open');
	});
	
	$('.exp-col-media-panel').click(function() {
		$( ".tool-panel" ).toggleClass("media-collapsed media-expanded");
	});
	

$('.file-list-anchor').click(function() {
		$('.media-file-item').removeClass('active unread');
		$(this).parent('.media-file-item').addClass('active');
		$(".response-file-name").removeClass("show");
		var that=$(this);
		if($(this).siblings().find('.file-meta-inner').innerHeight()>129){
				$('.meta-view-controll').removeClass('hide');
		}else{
				$('.meta-view-controll').addClass('hide');
		}
		setTimeout(function(){
			$(".response-file-name .pn-line2").text($(that).find(".file-name").text());
			
			$(".response-file-name").addClass("show");
		},0);
	});
	
	$('.meta-change-view').on("click",function(){
		var metaWrap = $(this).parents('.file-meta-wrapper');
		$(metaWrap).toggleClass('more less');
		if($(metaWrap).hasClass("less")){
			$(this).html('Show less..');
			
			
			/*if($(this).offset().top>$('.file-list').height()+100){
				
			}*/
		}else{
			$(this).html('Show more..');
			$('.file-list').animate({
				scrollTop: $(metaWrap).position().top - 48
			}, '300');
		}
	});
	
$('.file-meta-inner').bind( 'transitionend', function() {
	if($('.file-meta-wrapper').innerHeight()>$('.file-list').innerHeight()){
		$('.meta-change-view').addClass('fixed');
	}else{
		$('.meta-change-view').removeClass('fixed');
	}
});
	
$('.file-list').scroll(function() {
	if($('.meta-view-controll').position().top +90>$('.file-list').innerHeight()+$('.file-list').scrollTop()){
		$('.meta-change-view').addClass('fixed');
	}else{
		$('.meta-change-view').removeClass('fixed');
	}
});
	
	$(".tag-menu-item-link").on("click",function(){
		var tagClass=$(this).find(".tag-icon").attr("class");
		var tagTitle=$(this).attr("title")=="No tag"?"Add tag":$(this).attr("title");
		$(this).closest(".tag.dropdown-wrap").find(".menu-button .tag-icon").attr("class",tagClass);
		$(this).closest(".tag.dropdown-wrap").find(".menu-button").attr("title",tagTitle);
		$(this).parents(".tag-menu").find(".current").removeClass("current");
		$(this).addClass("current");
		
		$(this).parents(".tag.dropdown-wrap").removeClass("open").addClass("Close");
	});
	$("#markingInstructionLink").bind(clickEvent,function(){
		var scrollbarWidth=$(".column-left")[0].offsetWidth-$(".column-left")[0].clientWidth;		
		$("#markingInstructionMenu").css("margin-left",-1*scrollbarWidth+"px");
	});
	
	$(".comment-row,.add-comment-link").on("click",function(){
		$(".enhanced.offpage-comment-container").removeClass("detail-view").addClass("detail-view");
		if($(this).hasClass("comment-row")){
			$("#deleteCommentRow").removeClass("hide");
			$(".offpage-comment-editor").text($(this).find(".col3").text());
			if($(this).find(".col1").text()!==""){
				//$(".comment-item-dropdown .menu-button span:first-child").text($(this).find(".col1").text());
			}
			else{
					$(".comment-item-dropdown .menu-button span:first-child").text("---");
			}
			
			if($(this).find(".col2").text()!==""){
				$(".comment-file-dropdown .menu-button span:first-child").text($(this).find(".col2").text());
			}
			else{
				$(".comment-file-dropdown .menu-button span:first-child").text("---");
			}
		}
		else{
			$("#deleteCommentRow").removeClass("hide").addClass("hide");
			$(".offpage-comment-editor").text("");	
		}
		
		});
	$("#cancelCommmentDetailView").on(clickEvent,function(){
		$(".enhanced.offpage-comment-container").removeClass("detail-view");
	});
	$("#commentToggle").on("change",function(){
		$(".offpage-comment-container").toggleClass("hide");
		$(this).parents(".toggle-button").attr("title","Show comments panel");
	});
	
	$(".shared-menu-item input[type=checkbox]").on("change",function(){
		$(this).parents(".context-menu").toggleClass("share-on");
		$(".overlay-wrap.selected").toggleClass("shared-overlay");		
		$(this).parents(".toggle-button").attr("title","Show comments panel");
	});
	
	//color list panel
		//$(".color-list-panel").on("change",function(){
			//alert('test');
		//$(this).parents(".context-list").toggleClass("selected");
		//$(".overlay-wrap.selected").toggleClass("shared-overlay");		
		//$(this).parents(".toggle-button").attr("title","Show comments panel");
	//});
	
	$(".context-menu.selectable .context-link,.context-menu.color-list-panel .context-link").on(clickEvent,function(){
		$(".context-menu.selectable .selected.context-list,.context-menu.color-list-panel .selected.context-list").removeClass("selected");
		$(this).parent().addClass("selected");
	})
	
	
		$(".context-menu.color-list-panel .context-link").on(clickEvent,function(){
		$(".context-menu.color-list-panel .selected.context-list").removeClass("selected");
		$(this).parent().addClass("selected");
		var overlay = $(this).attr('class').trim().replace(/context-link/g,"");
		
		$(".selected-path:not(.overlay-hit-area-line)").parent().attr('class',overlay);
		})
	
	
	
	
	$(".line-style-menu .context-link").on(clickEvent,function(){
		var lineStyle=$(".label-text",$(this)).text().toLowerCase();
		var oldClassStr="",classStr="";
		$(".selected-path").each(function(i,o){
			oldClassStr=$(o).attr("class");
			classStr=oldClassStr;
			if(lineStyle!="hidden"){
				classStr=classStr.replace(/straight/g,"");
				classStr=classStr.replace(/curved/g,"");				
			}
			classStr=classStr.replace(/hidden/g,"");
			classStr=classStr.trim();
			classStr+=" "+lineStyle;
			
			$(o).attr("class",classStr);
			//removeClass(".curved straight hidden").addClass(lineStyle);
		})
		
		var pathArea=$(".selected-path.overlay-hit-area-line");
		var path=$(".selected-path.overlay-element");
		var d=path.attr("d");
		var commands = d.split(/(?=[LMC])/);
		
		switch(lineStyle){
			case "straight":{
				//alert("straight");
				if(oldClassStr.indexOf("straight")==-1){
					
					var pathD="";
					var pointArrays = commands.map(function(d){
						var cmd=d.slice(0,1);
						d=d.trim();	
						
						if(cmd=="M"){
							pathD+="M"+d.slice(1,d.length)+"L";
						}
						if(cmd=="C"){
							var cPoint=d.split(" ");
							//var xyPoints=cPoint.split(",");
							
							pathD+=cPoint[2]+" ";
						}						
					});
					pathD=pathD.trim();
					
					//console.log(pathD);
					path.attr("d",pathD);
					pathArea.attr("d",pathD);
					
				}
				break;
			}
			case "curved":{
				//alert(oldClassStr.indexOf("curved"));
				if(oldClassStr.indexOf("curved")==-1){				
					
					var pointArrays = commands.map(function(d){
						d=d.trim();						
						var pointsArray = d.slice(1, d.length).split(' ');
						//console.log(d);
						var pairsArray = [];
						//console.log(pointsArray);
						for(var i = 0; i < pointsArray.length; i++){
							var xp=parseFloat(pointsArray[i].split(",")[0]);
							var yp=parseFloat(pointsArray[i].split(",")[1]);
							
							if(!isNaN(xp)){
								pairsArray.push(+pointsArray[i].split(",")[0]);
							}
							if(!isNaN(yp)){
								pairsArray.push(+pointsArray[i].split(",")[1]);							
							}
							
							//console.log(isNaN(xp))
							/*pairsArray.push(+pointsArray[i]);
							pairsArray.push(+pointsArray[i+1]);*/
						}
						
						return pairsArray;
					});
					
					//console.log(pointArrays);
					var mergedPointArray=[].concat.apply([],pointArrays);
					
					var curvD=curvePath(mergedPointArray,1);
					
					path.attr("d",curvD);
					pathArea.attr("d",curvD);
					//console.log(curvD);
					//alert(path.attr("d"));
				}
				break;
			}			
				
		}
		
	});
	
	$(".playback").on("click",function(){
		$(this).toggleClass("play pause");
		if($(this).hasClass('pause')){
			playMedia();
		}else{
			pauseMedia();
		}
	});
	$(".volume-mute").on("click",function(){
		$(this).toggleClass("mute unmute");
		if($(this).hasClass('mute')){
			unmuteAudio();
		}else{
			muteAudio();
		}
	});
	$(".view-fullscreen").on("click",function(){
		$(this).parents('.mediaplayer').toggleClass("normal-screen full-screen");
	});
	$('.elapsed-time').text('0.00');
	if($(".media-file").get(0)!==undefined){
		$(".media-file").get(0).addEventListener('loadedmetadata', function() {
			$('.total-duration').text(($(".media-file").get(0).duration/60).toFixed(2));
		});
		
		$(".media-file").get(0).addEventListener("timeupdate",function(){
			curreTime=$(this).get(0).currentTime;
			audDuration=$(this).get(0).duration;
			percentagePlayed=Math.round(curreTime/audDuration*100, 2);
			$(".time .slider-progress").css('width', percentagePlayed+"%");
			$('.elapsed-time').text((curreTime/60).toFixed(2));
		});
	}
	
	$( ".slider-input" ).each(function(){
		$(this).next(".slider-progress").css('width',$(this).val()+"%");
	});
	
	
	$('.media-file').mousedown(function(event) {
      if(event.which === 3) {
         $('.media-file').bind('contextmenu',function () { return false; });
       }
       else {
         $('.media-file').unbind('contextmenu');
       }
   });

	$('.zoom-level').click(function() {
	  $(this).addClass('edit');
	$(".fit-width-button").removeClass("active");
	  $(this).find("input")[0].select();		
	});
	
	$('.zoom-level input').on("blur",function(evt) {
		//alert($(this).val());
	  $(this).parents(".zoom-level").find(".zoom-label").text(String($(this).val())+ "%");
	  $(this).parents(".zoom-level").removeClass('edit');		
	});
	
	
	$('.zoom-level input').on("keypress",function(evt) {
		 evt = (evt) ? evt : window.event;
		var charCode = (evt.which) ? evt.which : evt.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		else if(charCode ==13){
			$(this).blur();
		}
		return true;	
	});
	//var hoverTimeout;
	$('.annotation-helper-wrapper').addClass('hide');
	var currentAnnotation=$('.annotation-wrap.dynamic.hover');
	$('.annotation-wrap.dynamic:not(.inactive)').mouseenter(function() {
		//clearTimeout(hoverTimeout);
		currentAnnotation=$('.annotation-wrap.dynamic.hover');
		//console.log(currentAnnotation);
		updateHelperPosition(currentAnnotation);
		if($('body:not(.touch)')){
			$('.annotation-helper-wrapper').removeClass('hide delay');
		}
	}).mouseleave(function() {
		$('.annotation-helper-wrapper').addClass('hide delay');
		//var $self = $(this);
		/*if($('body:not(.touch)')){
			hoverTimeout = setTimeout(function() {
				$('.annotation-helper-wrapper').removeClass('helper-delay');
			}, 1000);
		}else{
			hoverTimeout = setTimeout(function() {
				$('.annotation-helper-wrapper').removeClass('helper-delay');
			}, 100);
		}*/
	});
	
	$('.annotation-helper-icon').mouseenter(function() {
		$('.annotation-helper-wrapper').removeClass('hide delay');
	}).mouseleave(function() {
		$('.annotation-helper-wrapper').addClass('hide delay');
	});
	//var hoverDelayTimeout;
	$(".marksheet-zoom-holder").on("mousemove",function(e) {
		var marksheets=$(this).parent().find(".marksheet-img.stitched");
			//clearTimeout(hoverDelayTimeout);
			//$(marksheets).find('.expand-zone').removeClass('expand-delay');
		marksheets.each(function() {
		   var mouseX = e.pageX;
		   var mouseY = e.pageY;
		   var width = $(this).innerWidth()-5;
		   var height = $(this).innerHeight()-5;
		   if (mouseX > $(this).offset().left && mouseX < $(this).offset().left+width && mouseY > $(this).offset().top && mouseY < $(this).offset().top+height){
			    marksheets.not(this).find('.expand-zone').removeClass('expand-delay');
			  	$(this).find('.expand-zone').addClass('expand-delay');
				//$(this).hover(); // force hover event
				//return true;
		   }else{
			  	$(this).find('.expand-zone').removeClass('expand-delay');
		   }
		});
	});
	
	    
   $(".rotate-left-icon").on("click",function(){
	   var currentRotation;
	   var outputPage;
	   var pages=$(".active .marksheet-holder");
	   var pg;
	   var activePg;
	   
	   for(var i=pages.length-1; i>=0;i--){
		   pg=$(pages[i]);
		   var pgPosition=pg.offset().top;
		   if(pgPosition<($(".content-wrapper").offset().top+$(".content-wrapper").height()/2)){
			break;	
		   }
	   }
	   
	  
	  currentRotation=(pg.hasClass("rotate-90")?90:(pg.hasClass("rotate-180")?180:pg.hasClass("rotate-270")?270:0));
	  // alert(currentRotation);
	  
	  var newRotation=currentRotation<360?currentRotation+90:0;
	  pg.removeClass("rotate-90 rotate-180 rotate-270").addClass("rotate-"+(newRotation));	
	  var wrapper=pg.find(".marksheet-wrapper");
	  
	  if(pg.hasClass("rotate-90") || pg.hasClass("rotate-270")){
	  	pg.find(".scaler-wrapper").css("padding-top",(100*wrapper.width()/wrapper.height()) + "%");
	  }
	  else{
	  	pg.find(".scaler-wrapper").css("padding-top",(100*wrapper.height()/wrapper.width()) + "%");
	  }
	   
   });
   $(".rotate-right-icon").on("click",function(){
	   var currentRotation;
	   var outputPage;
	   var pages=$(".marksheet-holder");
	   var pg;
	   var activePg;

	   for(var i=pages.length-1; i>=0;i--){
		   pg=$(pages[i]);
		   var pgPosition=pg.offset().top;
		   if(pgPosition<($(".content-wrapper").offset().top+$(".content-wrapper").height()/2)){
			break;	
		   }
	   }

	  currentRotation=(pg.hasClass("rotate-90")?90:(pg.hasClass("rotate-180")?180:pg.hasClass("rotate-270")?270:0));
	  // alert(currentRotation);
	  var newRotation=currentRotation>0?currentRotation-90:270;
	  pg.removeClass("rotate-90 rotate-180 rotate-270").addClass("rotate-"+(newRotation));
	   
	   var wrapper=pg.find(".marksheet-wrapper");
	  
	  if(pg.hasClass("rotate-90") || pg.hasClass("rotate-270")){
	  	pg.find(".scaler-wrapper").css("padding-top",(100*wrapper.width()/wrapper.height()) + "%");
	  }
	  else{
	  	pg.find(".scaler-wrapper").css("padding-top",(100*wrapper.height()/wrapper.width()) + "%");
	  }
   });
	
	//File list callout
	$('.media-file-item').hover(function(){
		var fileItem= $(this);
		var metaWrapper = fileItem.find('.file-meta-wrapper');
		var menuCallout = fileItem.find('.menu-callout');
		if($('.tool-panel').hasClass('media-expanded')){
			//if(fileItem.not('.active')){
				metaWrapper.css('top',(fileItem.position().top+fileItem.innerHeight()/2)-30);//Not relative to parent. Relative to viewport
				menuCallout.css('top',fileItem.position().top+((fileItem.height()/2)-14));//Expanded view callout is not relative to parent, so we need top position
			//}
		}else{
			metaWrapper.css('top',"-"+fileItem.height()/2+"px");//Relative to parent.
			//menuCallout.removeAttr("style");//Collapased view callout is relative to parent, so we don't need top position
		}
	});
	
	$(".overlay-icons .tool-link").on(clickEvent,function(){
		$(".tool-wrap.selected,.tool-link.selected").removeClass("selected");
		var that=$(this);
		setTimeout(function(){
			that.parents(".tool-wrap").addClass("selected");
		},0);
	});
	
	$(".overlay-hit-area").on("mouseover",function(){		
		$(this).parents(".overlay-wrap").removeClass("hover").addClass("hover");
	});
	
	$(".overlay-hit-area").on("mouseout",function(){
		$(this).parents(".overlay-wrap").removeClass("hover");
	});
	$('.panel-view-contol .switch-view').on("click",function(){
		$(this).find('.sprite-icon').toggleClass('grid-view-icon tile-view-icon');
		var viewText = $(this).find('.view-text');
		if (viewText.text() == "List view"){
		   viewText.text("Thumbnail view");
		}else{
			viewText.text("List view");
		}
		   
		$('.media-panel').toggleClass('thumbnail-view list-view');
	});
	
	//Page options centre in visible area of marksheet
	var optionBtn = {};
	var frvHoverEvent="mouseover";
	var frvHoverOutEvent="mouseout";
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		frvHoverEvent="touchstart";
		frvHoverOutEvent="tocuhend";
	}

	$('.thumb-view .marksheet-holder').on(frvHoverEvent,function(){	 //Set buttons position in mouse out
		$('.marksheet-holder').removeClass('pageoption-fixed');
		$('.marksheet-holder').find(".page-options").removeClass('hovered');
		$(this).addClass('pageoption-fixed');
		$(this).find(".page-options").addClass('hovered');
		optionBtn.target = $(this).find(".option-button-wrapper")[0];
		optionBtn.width = optionBtn.target.getBoundingClientRect().width;
		optionBtn.height = optionBtn.target.getBoundingClientRect().height;
		$(this).find(".option-button-wrapper").css({
			"marginLeft" : "-" + (optionBtn.width/2) + "px"
		});
		setCenterPoint();
		// // $('.marksheet-holder').find('.option-button-wrapper').removeAttr("style");
		// var pageOptionWrapper=$(this).find('.page-options');
		// var windowHeight=$(window).height();
		// var buttonWrapper=pageOptionWrapper.find('.option-button-wrapper');
		// if(pageOptionWrapper.length > 0){
		// 	var pageOptionBoundings=pageOptionWrapper[0].getBoundingClientRect();
		// }
		// //if($(pageOptionWrapper).innerHeight()>windowHeight-92){//Only if the marksheet height > windowheight - heder nav height
		
		// var pageOptionHeight=((Math.min(windowHeight-92,Math.min(pageOptionBoundings.bottom,windowHeight)-Math.max(pageOptionBoundings.top,92))/2));
		// var pageOptionTop=Math.round(buttonWrapper.height()<pageOptionHeight?pageOptionHeight+Math.max(92,pageOptionBoundings.top): pageOptionBoundings.bottom - (buttonWrapper.height()));
		// pageOptionTop=pageOptionTop-buttonWrapper.height()/2;
		// var pageOptionleft=Math.round(pageOptionBoundings.left+pageOptionBoundings.width/2-(buttonWrapper.width()/2));
		// $('.pageoption-fixed').find('.option-button-wrapper').css('top',pageOptionTop);
		// $('.pageoption-fixed').find('.option-button-wrapper').css('left',pageOptionleft);
		//}
	});


	$('.thumb-view .marksheet-holder').on(frvHoverOutEvent,function(){//Remove buttons position in mouse out
		$('.marksheet-holder').removeClass('pageoption-fixed');
		$("marksheet-holder").find(".page-options").removeClass("hovered");
		// $('.marksheet-holder').find('.option-button-wrapper').removeAttr("style");
	});
	
	$('.thumb-view .marksheet-container').on("scroll",function(){//Set buttons position in scroll
		if($('.pageoption-fixed')[0]!== undefined){
			// console.log($(window).height());
			setCenterPoint();
			if(optionBtn.h <= optionBtn.height){
				console.log("size Reached to button :"+ optionBtn.h +"=" + optionBtn.height);
				$(this).find(".option-button-wrapper").css({
					"top" : "-" + 999 +"px"
				});
			}
		}
		
    });

    
	function setCenterPoint(){
		var marksheetHolder=$('.pageoption-fixed');
		optionBtn.windowHeight= $(window).height();
		optionBtn.markSheetHolder= marksheetHolder[0].getBoundingClientRect();
		optionBtn.topSpot=Math.max(92,optionBtn.markSheetHolder.top+10);
		optionBtn.botSpot=Math.min(optionBtn.windowHeight,optionBtn.markSheetHolder.bottom -25);
		optionBtn.h= optionBtn.botSpot-optionBtn.topSpot;
		optionBtn.topPortion=optionBtn.topSpot-optionBtn.markSheetHolder.top;
		optionBtn.centerPoint = ((optionBtn.h/2)+optionBtn.topPortion)- (optionBtn.height/2);
		console.log("MArsheet holder height" + optionBtn.markSheetHolder);
		console.log("button height = " + optionBtn.height);
		console.log("button height = " + optionBtn.width);
		console.log("Height = " + optionBtn.botSpot + "-" + optionBtn.topSpot + "=" + optionBtn.h) ;
		// console.log(optionBtn.topSpot + "-"  + optionBtn.markSheetHolder.top + "=" +optionBtn.topPortion);
		// console.log("optionBtn.topSpot:"+optionBtn.topSpot);
		// console.log("optionBtn.botSpot:"+optionBtn.botSpot);
		// console.log("cemterpoint:"+optionBtn.centerPoint);
		console.log("##############");
		marksheetHolder.find(".option-button-wrapper").css({
			"top" : optionBtn.centerPoint+"px"
		});
	}
	$('.thumb-view .marksheet-container').on("mousewheel",function(event) {//To get current element hovered in scroll
		var x = event.pageX, y = event.pageY,
    	elementMouseIsOver = document.elementFromPoint(x, y);
		if($(elementMouseIsOver).height()>$(window).height()-92){//Only if the marksheet height > windowheight - heder nav height
			// $('.marksheet-holder').removeClass('pageoption-fixed');
		//    $(elementMouseIsOver).parents('.marksheet-holder').addClass('pageoption-fixed');
		 }
	});

	//Support environment login start
	$("#loginLiveEnv").click(function(){
		$("#env-login-btn").removeClass("disabled");
		$(".search-box-wrap input").attr("disabled",true);
		$(".grid-holder.selectable-grid").addClass("disabled");
	});
	$("#loginsupportEnv").click(function(){
		$("#env-login-btn").addClass("disabled");
		$(".search-box-wrap input").attr("disabled",false);
		$(".grid-holder.selectable-grid").removeClass("disabled");
		if($(".grid-holder.selectable-grid .row.selected").length>0){
			$("#env-login-btn").removeClass("disabled");
		}
	});
	//Support environment login end
	//Page options End
	//Render grid table for firsttime load
	renderGridTable();
	
//Worklist grid table
/*worklist table scrolling*/
if($(".grid-view .work-list-grid").length>0){
	setGridScrollbar();
}
	
	$(".help-close-link").on(clickEvent,function(){
		hideHelpVideo();
		
	})
		
});
// var gridTable = (function(){
	// if($(".work-list-grid").length>0){
		
		
// 		return {
// 			p : gridVar,
// 			gridSetWidth : gridSetWidth
// 		};
// 	// }
// })();


// gridSetWidth(0);

//Grid Table Dynamic Width function

function hideHelpVideo(){
	//$("#trainingVideo")[0].stop();	
	//var videoHtml=$("#helpContainer .mediaplayer").html();
	//$("#helpContainer .mediaplayer").html(" ");
	//$("#helpContainer .mediaplayer").html(videoHtml);
	$("#trainingVideo")[0].pause();
	$(".playback").removeClass("pause").addClass("play");
	$("#helpContainer").removeClass("open close").addClass("close");
	$("#trainingVideo")[0].currentTime=0;
}
function showHelpVideo(src,w){
	var ext=["mp4","webm","ogg"];
	var path="content/video/";
	
	for(var i =0; i<ext.length;i++){
		$($("#trainingVideo source")[i]).attr("src",path+src+"."+ext[i]);
	}
	
	$("#helpContainer .mediaplayer").css("width",w+"px");
	
	$("#trainingVideo")[0].load();
	$(".helper-menu").removeClass("open").addClass("close");
	$("#helpContainer").removeClass("open close").addClass("open");
}
function renderGridTable(){
	workListLength =  $(".work-list-grid ").length;
	for(var i = 0; i<workListLength; i++){
		console.log("loop value:"+i);
		gridSetWidth(i);
	}
}
//Array declaration
gridVar.getFirstTableData = new Array;
gridVar.getSecondTableData = new Array;
gridVar.getThirdTableData = new Array;
gridVar.getFourthTableData = new Array;
gridVar.comparedArray1 = new Array;
gridVar.comparedArray2 = new Array;

		//Function For get client width of element

gridFun.getClientWidth = function(element, p ){
	return result =$(element)[p].clientWidth;
}

gridFun.emptyObjArray = function(obj) {	
	for (var pro in obj) {
		gridVar[pro] = [0];			
	}
}

var gridSetWidth = function(tableNo){
	gridFun.emptyObjArray(gridVar);
	var firstColumnTable =$($(".work-list-grid")[tableNo]).find(".table-wrap-lt");
	var secondColumnTable =$($(".work-list-grid")[tableNo]).find(".table-wrap-t");
	var thirdColumnTable = $($(".work-list-grid")[tableNo]).find(".table-wrap-l");
	var fourthColumnTable = $($(".work-list-grid")[tableNo]).find(".table-body-wrap");
	$($(".work-list-grid")[tableNo]).find(".header-data").css("min-width", "");
	$($(".work-list-grid")[tableNo]).find(".cell-data").css("min-width", "");
	//Get and Set Left side table Width
	firstColumnTable.find("th").each(function(index){
		gridVar.getFirstTableData[index] = this.clientWidth;
	});
	thirdColumnTable.find("td").each(function(index){
		gridVar.getThirdTableData[index]= this.clientWidth;
	});

	$.each(gridVar.getFirstTableData, function(index,value){
		(value >= gridVar.getThirdTableData[index]) 
		? gridVar.comparedArray1[index] = value 
		: gridVar.comparedArray1[index] = gridVar.getThirdTableData[index];
	});

	$.each(gridVar.comparedArray1, function(index,value){
		(gridVar.comparedArray1[index] < 33) 
		? gridVar.comparedArray1[index] = 33
		:"";
	})

	firstColumnTable.find("th .header-data").each(function(index){
		$(this).css({
			"min-width": (gridVar.comparedArray1[index]+20 )+"px"
		})	
	});

	thirdColumnTable.find("td .cell-data").each(function(index){
		$(this).css({
			"min-width": (gridVar.comparedArray1[index]+20 )+"px"
		})	
	});


	//Get and Set Right side table Width
	//Get top single th width
	secondColumnTable.find(".table-view .row:first-child th:not(:last-child)").each(function(index){
		gridVar.getSecondTableData[index] = this.clientWidth;
		// console.log(this);
	});

	//Get body first row td width
	$(fourthColumnTable.find(".table-view .row:not(.classify-items-row)")[0]).find("td:not(:last-child)").each(function(index){
		gridVar.getFourthTableData[index] = this.clientWidth;	
	});

	$.each(gridVar.getSecondTableData, function(index,value){
		(value >= gridVar.getFourthTableData[index]) 
		? gridVar.comparedArray2[index] = value
		: gridVar.comparedArray2[index] = gridVar.getFourthTableData[index];
	});


	$.each(gridVar.comparedArray2, function(index,value){
		//console.log(this);
		(gridVar.comparedArray2[index] < 33) 
		? gridVar.comparedArray2[index] = 33
		:"";
		//console.log("ComparredArray2 Value" + [index]+ "=" + gridVar.comparedArray1[index])
	})

	// // if(i == 1){
		//console.log(secondColumnTable);
		console.log(gridVar.getFirstTableData);
		console.log(gridVar.getThirdTableData);
		console.log(gridVar.comparedArray1);
	// // }
	secondColumnTable.find(".table-view .row:first-child th:not(:last-child) .header-data").each(function(index){
		$(this).css({
			"min-width": gridVar.comparedArray2[index]+20 + "px"
		})
		//$(this).css("min-width", gridVar.comparedArray2[index]+20 + "px");
		// console.log(this);
	})
	$(fourthColumnTable.find(".table-view .row:not(.classify-items-row)")[0]).find("td:not(:last-child) .cell-data").each(function(index){
		$(this).css({
			"min-width": gridVar.comparedArray2[index]+20 + "px"
		})	
		//$(this).css("min-width",gridVar.comparedArray2[index]+20 + "px");
		
	})
}



function setPageNumber(){
	var x=$(window).width()/2;
	var y=$(window).height()/2;
	
	var marksheetHolder=$(document.elementFromPoint(x,y)).closest(".marksheet-holder");
	var pn=marksheetHolder.index(".marksheet-container.active .marksheet-holder");
	
	$(".pn-line1 .pn").text(pn+1);
	$(".pn-line2 .pn-actual").text(pn+1);		
}

function updateHelperPosition(currentAnnotation){
	//console.log(currentAnnotation);
		$('.annotation-helper-wrapper').css('left',currentAnnotation.position().left+currentAnnotation.width()+20);
		$('.annotation-helper-wrapper').css('top',currentAnnotation.position().top);
}

$(document).on('input change', '.slider-input.time', function() {
	curreTime=$(".media-file").get(0).currentTime;
	audDuration=$(".media-file").get(0).duration;
	var sliderSeeked=$(this).val();
	$(this).next(".slider-progress").css('width',sliderSeeked+"%");
	$(".media-file").get(0).currentTime= sliderSeeked*audDuration/100;
	$('.elapsed-time').text((curreTime/60).toFixed(2));
});

$(document).on('input change', '.slider-input.volume', function() {
	var sliderSeeked=$(this).val();
	$(this).next(".slider-progress").css('width',sliderSeeked+"%");
	$(".media-file").get(0).volume= sliderSeeked/100;
});

function setScrollMedia(){
		//console.log("t");
			
}


function playMedia(){
	$('.media-file').trigger('play');
}

function pauseMedia(){
	$('.media-file').trigger('pause');
}

function muteAudio(){
	$('.media-file').get(0).muted=true;
	$('.media-file').get(0).volume=0;
	$(".volume .slider-progress").css('width','0'+"%");
	//$(".volume .slider-input").val(0);
}

function unmuteAudio(){
	$('.media-file').get(0).muted=false;
	$(".volume .slider-progress").css('width',$(".volume .slider-input").val()+"%");
	$('.media-file').get(0).volume=$(".volume .slider-input").val()/100;
}

function setScrolled(scrollObj){
	var scroller=scrollObj;
	var grid=$(".work-list-grid");
	
	var sl=scroller.scrollLeft();
	var st=scroller.scrollTop();
	if(sl<=0 || (sl+scroller.innerWidth())>=scroller[0].scrollWidth){	
		if(sl<=0 && (sl+scroller.innerWidth())>=scroller[0].scrollWidth){
			$(".work-list-grid:not(.scrolled-left)").addClass("scrolled-left");
			$(".work-list-grid:not(.scrolled-right)").addClass("scrolled-right");
		}
		else if(sl<=0){			
			$(".work-list-grid:not(.scrolled-left)").addClass("scrolled-left");
			
			if(grid.hasClass("scrolled-right")){
				grid.removeClass("scrolled-right");
			}
		}
		else if((sl+scroller.innerWidth())>=scroller[0].scrollWidth){
			$(".work-list-grid:not(.scrolled-right)").addClass("scrolled-right");
			
			if(grid.hasClass("scrolled-left")){
				grid.removeClass("scrolled-left");
			}
		}
		
	}
	else {
		if(grid.hasClass("scrolled-left")){
			grid.removeClass("scrolled-left");
		}
		if(grid.hasClass("scrolled-right")){
			grid.removeClass("scrolled-right");
		}	
	}
	//console.log(sl)	
}

function setGridScrollbar(){
	//scrollbarWidth=(scrollbarWidth=="undefined")?($(".table-body-wrap").innerWidth()-$(".table-content-holder").innerWidth()):scrollbarWidth;
	
	var hScrollbarWidth=$(".table-scroll-holder")[0].offsetWidth-$(".table-content-holder")[0].clientWidth;
	var vScrollbarWidth=$(".table-scroll-holder")[0].offsetHeight-$(".table-scroll-holder")[0].clientHeight;
	//var sl=$(".table-body-wrap").scrollLeft();
	//;var st=$(".table-body-wrap").scrollTop();		
		
	//console.log(vScrollbarWidth);
	$(".table-scroll-holder").css("right",-hScrollbarWidth);
	$(".table-header-wrap").css({"margin-right":hScrollbarWidth});	
	$(".table-scroll-l").css({"margin-right":-hScrollbarWidth});
	
	$(".table-scroll-holder").css("bottom",-vScrollbarWidth);
	$(".table-content-wrap").css({"padding-bottom":vScrollbarWidth,"padding-right":hScrollbarWidth});
	
	$(".work-list-grid").css("margin-right",-hScrollbarWidth);
	
	setScrolled($(".table-scroll-holder"));			
	//$(".drop-shadow").css({left:sl,top:st});
}

function openPopup(popup){
	$("body").removeClass("popup-open").addClass("popup-open");
	popup.removeClass("open close").addClass("open");
	popup.scrollTop(0);
}
function closePopup(popup){
	popup.removeClass("open").addClass("close");
	$("body").removeClass("popup-open");
}

function initRadialProgress(){
	$(".radial-progress").each(function(){
		var rotation = ((360*$(this).data('progress'))/100)/2;
		var pointRotation=360*$(this).find('.circle-point-holder').data('progress')/100;
		var fill_rotation = rotation;
		var transform_styles = ['-webkit-transform', '-ms-transform', 'transform'];
		
		var fix_rotation = rotation * 2;
		for(var i in transform_styles) {
			$(this).find('.circle .fill, .circle .mask.full').css(transform_styles[i], 'rotate(' + fill_rotation + 'deg)');
			$(this).find('.circle .fill.fix').css(transform_styles[i], 'rotate(' + fix_rotation + 'deg)');
			$(this).find('.circle-point-holder').css(transform_styles[i], 'rotate(' + pointRotation + 'deg)');
		}	
	});
}

function switchView(view){
	var gridHolder=$('.switch-view-btn').parents().find('.grid-holder');
	var viewClass=view;
	
	$(".switch-view-btn .switch-view.active").removeClass("active");
	$(".switch-view-btn").find("."+viewClass+"-icon").parents(".switch-view").addClass("active");
	
	gridHolder.removeClass('grid-view tile-view');
	setTimeout(function(){		
		gridHolder.addClass(viewClass);
	},0);
}
function toggleLeftPanel(){
	$('.worklist-wrapper,.team-wrapper,.std-setup-wrapper, .awarding-wrapper').toggleClass("hide-left");
}


function demo(){
	var loginForm=$("#loginFormDemo");
	var loginInputs=loginForm.find(".text-underline");
	var markingButton=$("#markingButtonDemo");
	var loginButton=loginForm.find("button.primary");
	var loginError=loginForm.find(".error-messages .error-alert");
	var loadingTime=1000;
	var loginPage="login.html";
	var loginLandingPage="qig.html";
	var userNameField = $('#usernameBox');
	var passwordField = $('#passwordBox');
	var userNameFieldValue;
	var passwordFieldValue;
	var errorMsg="";
	detectPlatform();
	
	loginInputs.bind("keydown",function(e){		//Submitting while pressing enter button
		if(e.which==13){
			loginButton.trigger(clickEvent);
		}
	});
	loginInputs.bind("blur",function(e){
		userNameFieldValue = $.trim(userNameField.val());	
		passwordFieldValue = $.trim(passwordField.val());
				
		var thisValue=$.trim($(this).val());
		
		
		if(thisValue.length===0){
			$(this).removeClass("loading");
			$(this).addClass('error');
			if($(this)[0]===userNameField[0]){
				
				errorMsg="Please enter a username";
			}
			else if($(this)[0]===passwordField[0]){
				errorMsg="Please enter password";
			}
				
			loginError.addClass('show').html(errorMsg);			
		}
		else{
			$(this).removeClass("error");				
		}
	});
	
	loginButton.bind(clickEvent,function(){
		var btn=$(this);
		btn.addClass("loading");
		setTimeout(function(){			
			if(userNameFieldValue !== demoUser && passwordFieldValue !== demoPassword){
				loginError.addClass('show').html("The username or password that you've entered is incorrect. Please try again.");
			}else{
				location.href=loginLandingPage;
				btn.removeClass("loading");
			}
		},loadingTime);
	});
	
	$(".wl-status button").bind(clickEvent,function(){
		$(this).closest(".row").removeClass("submitted").addClass("submitted");	
	});
	
	$(".grid-nav button.primary").bind(clickEvent,function(){
		$(".wl-status button").closest(".row").each(function(){
			$(this).removeClass("submitted").addClass("submitted");
		});
	});
	
	
	/*Marking screen*/
		$(".question-item:not(.question-list.has-sub>.question-item)").bind("click",function(){
			markFeedback($(this).find(".mark-version.cur .mark").text());
			activateMarkingPanel($(this).closest(".question-list"));
		});
		$(".question-list.has-sub>.question-item").bind(clickEvent,function(){
			var panel=$(this).closest(".question-list");
			
			// expandCollapseMarkingPanel(panel,true);	
			
		});
		
		$(".question-nav").bind(clickEvent,function(){
			var currentIndex=$(".question-list.current").index(".question-group-container .question-list:not(.has-sub)");
			var mark;
			var btn=$(this);
			var timing=String($(".active-question-mark").val())==0?0:200;
			
			setTimeout(function(){
				if(btn.hasClass("prev-question-btn")){				
					navigateQuestion(currentIndex-1);
				}
				else{
					navigateQuestion(currentIndex+1);
				}
			},timing);
			
			mark=String($(".active-question-mark").val());
			markFeedback(mark);
		});
		
		
		$(".marking-wrapper").parents("body").bind("keydown",function(e){
			var currentIndex=$(".question-list.current").index(".question-group-container .question-list:not(.has-sub)");
			if(e.keyCode==38){//if up key 
				navigateQuestion(currentIndex-1);
			}
			else if(e.keyCode==40 || e.keyCode==13){ //if down key or enter key
				if(e.target.nodeName!="TEXTAREA" && $(e.target).attr("contenteditable")!="true"){
					navigateQuestion(currentIndex+1);
				}
			}
			if(e.keyCode==38 || e.keyCode40){
				  //e.stopPropagation();
				  e.preventDefault();
			}
			
		});
		
		var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x		
		
		$(".ms-footer-menu").hover(function(){
			msFooterButtonState = true;
			// console.log(msFooterButtonState);
		},function(){
			msFooterButtonState = false;
		});
		
		$(".marking-question-panel").bind(mousewheelevt,function(e){
			if($(".active-question").length>0){
				if(msFooterButtonState != true){
					var currentIndex=$(".question-list.current").index(".question-group-container .question-list:not(.has-sub)");
					var evt=window.event || e.originalEvent;
					var wheelDel=-1*(evt.detail? evt.detail/3*(-120) : evt.wheelDelta)/120; //check for detail first so Opera uses that instead of wheelDelta
					//alert(wheelDel);
					//console.log(wheelDel)
					navigateQuestion(currentIndex+wheelDel);
				}
			}
			else{				
				var current_pull = parseInt($('.question-group-container').css('transform').split(',')[5]);
				var evt=window.event || e.originalEvent;
				var wheelDel=-1*(evt.detail? evt.detail/3*(-120) : evt.wheelDelta)/120;
				//console.log("wheelDel:"+ wheelDel);
				var itemHeight=32*5;
				var yPosition=-1*(wheelDel*itemHeight)+current_pull;
				
				var heightDifference=$(".question-group-align-holder").height()-$(".question-panel").height();
				//console.log("heightDifference"+heightDifference);
				//console.log("current_pull: "+current_pull);
				if(yPosition>0){
					yPosition=0;					
				}
				if(yPosition<-heightDifference){
					yPosition=-heightDifference;
				}
				if(heightDifference<0){
					yPosition=0;
				}
				$('.question-group-container').css('transform',"translateY("+(yPosition)+"px)");
				//console.log("wd: "+wheelDel*itemHeight)
			}
		}); 
		$(".mark-button-holder").on(clickEvent,".mark-button",function(){
			if(!$(this).hasClass("group-start")){
				var currentIndex=$(".question-list.current").index(".question-group-container .question-list:not(.has-sub)");	
				var feedbackText=$(this).text();
				
				if($(this).hasClass("group")){					
					var groupText=$(this).nextAll(".group-start:first").text();
					feedbackText=groupText + " - " + feedbackText;
				}
				
				markFeedback(feedbackText);
				setTimeout(function(){
					navigateQuestion(currentIndex+1);					
				},200);
			}
			
			
		});
		
		var currentIndex,currentPull;
		if($(".question-panel").length>0){
			var mc = new Hammer($(".question-panel")[0]);
			mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
			mc.on("panstart",function(ev){
				currentIndex=$(".question-group-container .question-list.current").index(".question-group-container .question-list:not(.has-sub)");
				currentPull = parseInt($('.question-group-container').css('transform').split(',')[5]);
				//console.log("panstart");
				$(".question-group-container").removeClass("no-animation").addClass("no-animation");
			});
			mc.on("panmove",function(ev){
				var itemHeight=32;
				//var delta=dirProp(this.direction, ev.deltaX, ev.deltaY);
				var deltaYIndex=ev.deltaY/itemHeight;	
				var listIndex=Math.round(currentIndex-deltaYIndex);							
				//console.log(listIndex);
				navigateQuestion(listIndex);
				/*switch(ev.direction){				
					case Hammer.DIRECTION_UP:{
						navigateQuestion(listIndex);
						break;
					}
					case Hammer.DIRECTION_DOWN:{
						navigateQuestion(currentIndex);
						break;
					}
				}*/
				
				//$(".question-group-container").css("transform","translateY("+(currentPull+ev.deltaY)+"px)");
				//currentTop=currentTop+ev.deltaY;
				//var swipeIndex=-1*Math.round(ev.deltaY/itemHeight);
				//navigateQuestion(swipeIndex);
			});
			mc.on("panend",function(ev){
				var itemHeight=32;
				var deltaYIndex=ev.deltaY/itemHeight;	
				var listIndex=-1*Math.round(currentIndex+deltaYIndex);	
				$(".question-group-container").removeClass("no-animation");			
				//navigateQuestion(listIndex);
				
				//alert(listIndex);
			});
		}
		/*var itemHeight=39;
		var currentPull=parseInt($('.question-group-container').css('transform').split(',')[5]);
		var additionalPull=-1*$(".question-list.current").index(".question-group-container .question-list")*itemHeight;		
		$(".question-group-container").css("transform","translateY("+(currentPull+additionalPull)+"px)");*/
		$(".marksheets").on("mouseover mousemove",".annotation-wrap, .context-menu",function(ev){			
			$(".marksheets").removeClass("hover annotating");
			$(".cursor svg").css({"left":0,"top":0});
			//ev.stopPropagation();
		});
		
		$(".marksheet-container").on(clickEvent,function(ev){
			if($(".context-menu").hasClass("show")){
				$(".context-menu").removeClass("show");
				$(".annotation-wrap.selected,.overlay-wrap.selected").removeClass("selected");			
				
				if($(".selected-path").length>0){
					$(".selected-path").each(function(i,o){
						var classStr=$(o).attr("class");
						classStr=classStr.replace(/selected-path/g,"");
						$(o).attr("class",classStr);						
						
					});
					//$(".selected-path").removeClass("selected-path");
				}
			
			}
			
		});
		$(".annotation-wrap.dynamic:not(.ellipse):not(.inactive):not(.previous)").on("mouseover",function(){
			$(this).removeClass("hover").addClass("hover");
		});
		$(".annotation-wrap.dynamic:not(.ellipse):not(.inactive):not(.previous)").on("mouseout",function(){
			$(this).removeClass("hover");
		});
		
		$(".annotation-wrap.ellipse .ellipse-area,.annotation-wrap.ellipse [class^='resize-']").on("mouseover",function(){
			$(this).parents(".annotation-wrap").removeClass("hover").addClass("hover");
		});
		$(".annotation-wrap.ellipse .ellipse-area,.annotation-wrap.ellipse [class^='resize-']").on("mouseout",function(){
			$(this).parents(".annotation-wrap").removeClass("hover");
		});
		
		$(".annotation-holder .annotation-wrap:not(.inactive):not(.previous),.overlay-holder .overlay-hit-area,.book-m-ico").on("contextmenu",function(ev) {
			var x=ev.pageX;
			var y=ev.pageY;
			//console.log(y)
			
			var currentHoverElement=$(document.elementFromPoint(x,y));
			var annotationWrap=currentHoverElement.closest(".annotation-wrap,.overlay-wrap,.book-m-ico");
			
			
			
			if(annotationWrap.length>0){	
				var contextMenu;
				
				if(annotationWrap.hasClass("annotation-wrap")){
					contextMenu=$(".annotation-context-menu");
				}
				if(annotationWrap.hasClass("overlay-wrap ruler")){
					contextMenu=$(".ruler-context-menu");
				}
				if(annotationWrap.hasClass("overlay-wrap protractor")){
					contextMenu=$(".protractor-context-menu");
				}
				
				if(annotationWrap.hasClass("overlay-wrap multiline")){
					contextMenu=$(".multiline-context-menu");
					var elementClicked=document.elementFromPoint(x,y);
					if(elementClicked.nodeName=="path"){ //if clicked on path					

						var actualPath = $(elementClicked).attr('id').replace(/Area/g,"");
//						console.log(actualPath);
						var pathContent = document.getElementById(actualPath);
						var pathName = $(pathContent).parent().attr("class").trim();
//						console.log(pathName);
//						console.log($(".context-menu.color-list-panel").find(PathName).parent(".context-list"));
						$(".context-menu.color-list-panel .context-list.selected").removeClass("selected");
						//debugger;
//						alert(pathName.indexOf(" "))
						$(".context-menu.color-list-panel .context-link."+pathName).parent().addClass("selected");
						
						var elementIndex=$(elementClicked).index(); //getting index
						
						//alert(elementIndex);
						var pathArea=document.getElementById("multLinePathArea"+elementIndex);
						var path=document.getElementById("multLinePath"+elementIndex);
						
						$(".selected-path").each(function(i,o){
							//console.log(o);
							var oClass=$(o).attr("class");
							var classStr=oClass.replace(/selected-path/g,"");
							$(o).attr("class",classStr);
						});
						
						
						pathArea.setAttribute("class",pathArea.getAttribute("class")+" selected-path");
						path.setAttribute("class", path.getAttribute("class") +" selected-path");
						
						var pathClass=$(pathArea).attr("class");
						
						pathType=pathClass.indexOf("straight")!=-1?"straight":pathClass.indexOf("curved")!=-1?"curved":"hidden";
						
						var menuItem=$(".line-style-menu").find("."+pathType+"-menu-item");
						$(".line-style-menu .menu-item.selected").removeClass("selected");
						//debugger;
						menuItem.addClass("selected");
						
					}
					
				}
				
				if(annotationWrap.hasClass("book-m-ico")){
					contextMenu=$(".bookmark-context-menu");
				}
				
				//console.log(contextMenu);
				$(".context-menu").removeClass("show");
				
				$(".annotation-wrap.selected,.overlay-wrap.selected").removeClass("selected");
				annotationWrap.removeClass("selected").addClass("selected");
				if(annotationWrap.length==0){
					$(".context-link",contextMenu).removeClass("disabled").addClass("disabled");
				}
				else{
					$(".context-link",contextMenu).removeClass("disabled")	
				}
								
				//console.log(contextMenu);
				contextMenu.css({"left":x,"top":y});
				contextMenu.removeClass("show").addClass("show");
			}
			
			return false;
		});
		/*
		$(".response-nav").bind(clickEvent,function(){
			
			//alert(responses[0])
			if(!$(this).hasClass("disabled")){	
				if($(this).hasClass("response-nav-prev")){										
					navigateResponse(-1);		
				}
				if($(this).hasClass("response-nav-next")){					
					navigateResponse(1);
				}
			}
			
		});
		*/
		function navigateResponse(navigateIndex){
			
			var container=$(".marksheets .marksheet-container");
			var responses=$(".marksheet-container");
			var currentIndex=$(".marksheet-container.active").index(".marksheet-container");
			var responseTitle=$(".response-title-holder");
			//alert(currentIndex);
			$(".marksheets .marksheet-container.active").removeClass("active");
			$(".response-title-holder.active").removeClass("active");
			
			container.eq(currentIndex+navigateIndex).addClass("active");
			responseTitle.eq(currentIndex+navigateIndex).addClass("active");
			//$(".response-title .response-id").text(responses[currentIndex+navigateIndex]);	
			
			/*disabling navigate buttons*/
			index = $(".marksheets .marksheet-container.active").index(".marksheets .marksheet-container");
			
			$(".response-nav").removeClass("disabled");
		
			
			//$(".response-position").html((currentIndex+navigateIndex+1)+" of "+responses.length);
			//resetQuestionPanel();
			
			if(currentIndex+navigateIndex<=0){
				$(".response-nav-prev").addClass("disabled");
			}
			if(currentIndex+navigateIndex>=responses.length-1){					
				$(".response-nav-next").addClass("disabled");	
			}
			
		}
		
		/*full response view change view*/
			$(".page-view-icon-holder .page-view-link").bind(clickEvent,function(){				
				var index=$(this).parents(".page-view-icon-holder li").index(".page-view-icon-holder li");
				var views=[1,2,4];
				$(".page-view-icon-holder li.active").removeClass("active");
				$(this).parents(".page-view-icon-holder li").addClass("active");
				
				$(".marksheets-inner").removeClass("page-view-1").removeClass("page-view-2").removeClass("page-view-4").addClass("page-view-"+views[index]);
				
				
			});
			
		if($('.marking-question-panel').length>0){
			// navigateQuestion(5);
		}
		
		if($(".marksheets:not(.thumb-view)").parents(".container").length>0){			
			var resizing=false;
			var resizeDirection;
			var annotationWrap=null;
			var annotationHolder=null;
			var annotationWrapWidth,annotationWrapLeft,annotationWrapTop;
			var draggingTarget=null;
			var dx,dy;
			var commentBox=null,xInCommentBox,yInCommentBox;
			var markingPanelWidth,startX,startY;
			//updateHelperPosition($('.annotation-wrap.dynamic.hover'));
			
			
			var mcMarksheet = new Hammer($(".marksheets:not(.thumb-view)").parents(".container")[0], {
                touchAction: "pan-y tap"
            });
			
			mcMarksheet.get('pan').set({ direction: Hammer.DIRECTION_ALL,threshold:0 });			
			
			mcMarksheet.on("panstart",function(evt){
				var x=evt.center.x;
				var y=evt.center.y;
				
				var xPosition;
				var yPosition;	
				
				var currentHoverElement=$(document.elementFromPoint(x,y));
				draggingTarget=currentHoverElement;
				if(draggingTarget.closest(".panel-resizer").length>0){
					var panel;
					if(draggingTarget.closest(".marking-question-panel").length>0){						
						panel=$(".marking-question-panel");
					}
					else if(draggingTarget.closest(".messaging-panel").length>0){	
						panel=$(".messaging-panel");
					}
					else if(draggingTarget.closest(".offpage-comment-container").length>0){	
						panel=$(".offpage-comment-container");
					}
					markingPanelWidth=parseInt(panel.css("width"));
					panelHeight=parseInt(panel.css("height"));
					panel.removeClass("resizing").addClass("resizing");
					$(".cbt-response-container .marksheet-container").removeClass("response-resizing").addClass("response-resizing");
					startX=evt.center.x;
					startY=evt.center.y;
				}
				if(currentHoverElement.closest(".annotation-wrap:not(.inactive):not(.previous),.overlay-wrap").length>0){
					
					annotationWrap=currentHoverElement.closest(".annotation-wrap,.overlay-wrap");
					annotationHolder=annotationWrap.parents(".annotation-holder,.overlay-holder")
					 
					xPosition=x-annotationHolder.offset().left;
					yPosition=y-annotationHolder.offset().top;
					
					annotationWrapWidth=parseInt(annotationWrap.css("width"));
					annotationWrapLeft=parseInt(annotationWrap.css("left"));
					annotationWrapTop=parseInt(annotationWrap.css("top"));
					
					dx=xPosition-annotationWrapLeft;
					dy=yPosition-annotationWrapTop;
					
				}
				
				if(currentHoverElement.closest(".resizer").length>0){
					resizing=true; //Flag- started resizing
					
					if(currentHoverElement.closest(".resize-r").length>0){
						resizeDirection="right";
					}
					if(currentHoverElement.closest(".resize-l").length>0){
						resizeDirection="left";
					}	
					
					
					
					
					/*pattern.removeAttr("patternUnits");
					pattern.removeAttr("patternContentUnits");*/
					
					/*pattern[0].setAttribute("patternUnits","userSpaceOnUse");
					pattern[0].setAttribute("patternContentUnits","userSpaceOnUse");
					*/
					var pattern=annotationWrap.find("pattern");
					var patternWidth=0.9*$(".annotation-holder").width()/100;
					if(pattern.length>0){
						pattern.attr("width",patternWidth);
						
						//var strokeWidth=20*patternWidth/100;
						var vPadding=20*annotationWrap.innerHeight()/100;
						
						$(pattern.find("line")[0]).attr("x1",0);
						$(pattern.find("line")[0]).attr("x2",patternWidth/2);
						$(pattern.find("line")[0]).attr("y1",vPadding);
						$(pattern.find("line")[0]).attr("y2",annotationWrap.innerHeight()-vPadding);
						
						$(pattern.find("line")[1]).attr("x1",patternWidth/2);						
						$(pattern.find("line")[1]).attr("x2",patternWidth);
						$(pattern.find("line")[1]).attr("y1",annotationWrap.innerHeight()-vPadding);
						$(pattern.find("line")[1]).attr("y2",vPadding);
						
						//$(pattern.find("line")).css("stroke-width",strokeWidth);
					}
					
				}
				else{
					$(".cursor-holder").removeClass("annotating").addClass("annotating");
					if(annotationWrap!=null ){
						if(draggingTarget.closest(".comment-box").length==0){
							annotationWrap.removeClass("dragging").addClass("dragging");
						}						
					}
					
					commentBox=draggingTarget.closest(".comment-box");
					
					if(commentBox.length!=0){		//console.log(draggingTarget.parents(".comment-box"));				
						xInCommentBox =commentBox.offset().left-x;
						yInCommentBox=commentBox.offset().top-y;	
						
					}
					
				}
			});
			mcMarksheet.on("panend",function(evt){	
				if(draggingTarget!=null){
					if(draggingTarget.closest(".panel-resizer").length>0){					
						var panel;
						if(draggingTarget.closest(".marking-question-panel").length>0){						
							panel=$(".marking-question-panel");
						}
						else if(draggingTarget.closest(".messaging-panel").length>0){	
							panel=$(".messaging-panel");
						}
						else if(draggingTarget.closest(".offpage-comment-container").length>0){	
							panel=$(".offpage-comment-container");
						}
						panel.removeClass("resizing");
						$(".cbt-response-container .marksheet-container").removeClass("response-resizing");
						startX=0;
						startY=0;
					}
				}
				
							
				if(resizing){ //resizing annotation
					var pattern=annotationWrap.find("pattern");
					var patternWidthPx=(0.9*$(".annotation-holder").width()/100);
					var patternWidth=patternWidthPx/annotationWrap.width();
					var patternWidthPercentage=100*patternWidth;
					
					
					/*pattern[0].setAttribute("patternUnits","objectBoundingBox");
					pattern[0].setAttribute("patternContentUnits","objectBoundingBox");*/
					/*
					if(pattern.length>0){
						//var newWidth=(100*patternWidth/annotationWrap.width())+"%";
						var strokeWidth=(24*(patternWidthPx/100))/annotationWrap.width();
						pattern.attr("width",patternWidth);
						$(pattern.find("line")[0]).attr("x1",0);
						$(pattern.find("line")[0]).attr("x2",patternWidth/2);
						$(pattern.find("line")[0]).attr("y1",0);
						$(pattern.find("line")[0]).attr("y2",1);
						
						$(pattern.find("line")[1]).attr("x1",patternWidth/2);
						$(pattern.find("line")[1]).attr("x2",patternWidth);						
						$(pattern.find("line")[1]).attr("y1",1);
						$(pattern.find("line")[1]).attr("y2",0);												
						
						$(pattern.find("line")).css("stroke-width","0.008px");
					}*/
					/*pattern[0].setAttribute("patternUnits","userSpaceOnUse");
					pattern[0].setAttribute("patternContentUnits","userSpaceOnUse");
					*/
					if(pattern.length>0){
						//var newWidth=(100*patternWidth/annotationWrap.width())+"%";
						//var strokeWidth=(24*(patternWidthPx/100))/annotationWrap.width();
						pattern.attr("width",patternWidthPercentage+"%");
						$(pattern.find("line")[0]).attr("x1","0%");
						$(pattern.find("line")[0]).attr("x2",patternWidthPercentage/2+"%");
						$(pattern.find("line")[0]).attr("y1","20%");
						$(pattern.find("line")[0]).attr("y2","80%");
						
						$(pattern.find("line")[1]).attr("x1",patternWidthPercentage/2+"%");						
						$(pattern.find("line")[1]).attr("x2",patternWidthPercentage+"%");
						$(pattern.find("line")[1]).attr("y1","80%");
						$(pattern.find("line")[1]).attr("y2","20%");
						
						//$(pattern.find("line")).css("stroke-width",strokeWidth);
					}
					resizeDirection="";
					resizing=false;	  //Flag- stoped resizing
				}
				else{
					setTimeout(function(){
						$(".cursor-holder").removeClass("annotating");
						if(annotationWrap!=null){
							var clickOnPoint=/(^|\s)overlay-mover-area(\s|$)/.test(draggingTarget.attr("class"));
							if(draggingTarget.closest(".overlay-wrap").length!=0 &&  !clickOnPoint){
								var scriptWidth=210;
								var scriptHeight=297;
								
								var overlayHolder=annotationHolder;
								var overlayWrap=annotationWrap;
								var overlayGroup=overlayWrap.find(".overlay-wrap-group");								
								var ovelayPoints=overlayWrap.find(".overlay-node-svg");								
								var deltaXPercentage=100*evt.deltaX/overlayHolder.width();
								var deltaYPercentage=100*evt.deltaY/overlayHolder.height();
								
								if(overlayWrap.hasClass("ruler")){
									var rulerLine=overlayWrap.find(".ruler-line");
									var hitAreaLine=overlayWrap.find(".overlay-hit-area-line");
									
									var overlayWidth=overlayHolder[0].getBoundingClientRect().width;
									var overlayHeight=overlayHolder[0].getBoundingClientRect().height;
									
									var curX1=parseFloat(rulerLine.attr("x1"));
									var curX2=parseFloat(rulerLine.attr("x2"));
									var curY1=parseFloat(rulerLine.attr("y1"));
									var curY2=parseFloat(rulerLine.attr("y2"));									
									
									var x1=curX1+deltaXPercentage;
									var x2=curX2+deltaXPercentage;
									var y1=curY1+deltaYPercentage;
									var y2=curY2+deltaYPercentage;
									
									rulerLine.attr("x1",x1+"%");
									rulerLine.attr("x2",x2+"%");
									rulerLine.attr("y1",y1+"%");
									rulerLine.attr("y2",y2+"%");
									
									hitAreaLine.attr("x1",x1+"%");
									hitAreaLine.attr("x2",x2+"%");
									hitAreaLine.attr("y1",y1+"%");
									hitAreaLine.attr("y2",y2+"%");

									var currentTextX=parseFloat(overlayWrap.find(".overlay-text")[0].style.left);
									var currentTextY=parseFloat(overlayWrap.find(".overlay-text")[0].style.top);

									overlayWrap.find(".overlay-text").css("left",(currentTextX+deltaXPercentage)+"%");
									overlayWrap.find(".overlay-text").css("top",(currentTextY+deltaYPercentage)+"%");
									//console.log(currentTextX)
									//console.log(currentTextY)


									//overlayWrap.find(".overlay-text").css("left",(x1+x2)/2+"%");
									//overlayWrap.find(".overlay-text").css("top",(y1+y2)/2+"%");								
									
									
									/*var adj=scriptWidth*(y2-y1)/100;
									var opp=scriptHeight*(x2-x1)/100;

									var hyp=Math.sqrt(adj*adj + opp*opp);

									overlayWrap.find(".overlay-text").text(Math.round(hyp)+ "mm");
									*/
									//rulerLine.hide();
									//console.log(rulerLine.attr("x1"))
									
									//console.log(100*(curX1+evt.deltaX)/overlayHolder.width()+"%");
									
									//console.log(100*(curX1+evt.deltaX)/overlayHolder.width())
								}
								if(overlayWrap.hasClass("protractor")){
									var protractorLine1=overlayWrap.find(".protractor-line.l1");
									var protractorLine2=overlayWrap.find(".protractor-line.l2");
									var protractorHitArea1=overlayWrap.find(".overlay-hit-area-line.l1");
									var protractorHitArea2=overlayWrap.find(".overlay-hit-area-line.l2");
									
									var curX1=parseFloat(protractorLine1.attr("x1"));
									var curX2=parseFloat(protractorLine1.attr("x2"));
									var curX3=parseFloat(protractorLine2.attr("x2"));
									var curY1=parseFloat(protractorLine1.attr("y1"));
									var curY2=parseFloat(protractorLine1.attr("y2"));
									var curY3=parseFloat(protractorLine2.attr("y2"));
									
									var x1=curX1+deltaXPercentage;
									var x2=curX2+deltaXPercentage;
									var x3=curX3+deltaXPercentage;
									var y1=curY1+deltaYPercentage;
									var y2=curY2+deltaYPercentage;
									var y3=curY3+deltaYPercentage;									
									
									protractorLine1.attr("x1",x1+"%");
									protractorLine1.attr("x2",x2+"%");
									protractorLine2.attr("x1",x2+"%");
									protractorLine2.attr("x2",x3+"%");
									protractorLine1.attr("x2",x2+"%");
									protractorLine1.attr("y1",y1+"%");
									protractorLine1.attr("y2",y2+"%");
									protractorLine2.attr("y1",y2+"%");
									protractorLine2.attr("y2",y3+"%");
									
									protractorHitArea1.attr("x1",x1+"%");
									protractorHitArea1.attr("x2",x2+"%");
									protractorHitArea2.attr("x1",x2+"%");
									protractorHitArea2.attr("x2",x3+"%");
									protractorHitArea1.attr("x2",x2+"%");
									protractorHitArea1.attr("y1",y1+"%");
									protractorHitArea1.attr("y2",y2+"%");
									protractorHitArea2.attr("y1",y2+"%");
									protractorHitArea2.attr("y2",y3+"%");									
									
									
									var currentTextX=parseFloat(overlayWrap.find(".overlay-text").prop('style')['left']);
									var currentTextY=parseFloat(overlayWrap.find(".overlay-text").prop('style')['top']);
									
									//alert(currentTextX);
									overlayWrap.find(".overlay-text").css("left",(currentTextX+deltaXPercentage)+"%");
									overlayWrap.find(".overlay-text").css("top",(currentTextY+deltaYPercentage)+"%");
									
								}
								
								if(overlayWrap.hasClass("multiline")){
									var multLineHitArea=overlayWrap.find(".overlay-hit-area-line");
									var multiLine=overlayWrap.find(".overlay-element");
									//console.log(evt.deltaX+ ", " + deltaXPercentage);
									var viewBox=overlayWrap.find(".overlay-element-svg")[0].getAttribute('viewBox').split(/\s+|,/);
									
									for(var i=0; i<multiLine.length;i++){
										var eachMultiLine=$(multiLine[i]);
										var eachHitArea=$($(multLineHitArea)[i]);
										var currentPoints=eachMultiLine.attr("d").trim().split(/[mM]/)[1].split(/[Ll]/);
										//console.log(currentPoints);
										var commands = eachMultiLine.attr("d").trim().split(/(?=[LMC])/);
										//console.log(commands);
										var xMove= evt.deltaX*parseFloat(viewBox[2])/overlayWrap.width();
										var yMove=evt.deltaY*parseFloat(viewBox[3])/overlayWrap.height();
										var pathD="";
										var pointMoved = commands.map(function(cmdStr){
											var cmdPoints=cmdStr.slice(1,cmdStr.length);
											var cmd=cmdStr.slice(0,1);
											var cmdPointsArray=cmdPoints.split(" ");
											//console.log(cmdPointsArray.length);
											var cmdStrUpdated=cmd;
											
											cmdPointsArray.forEach(function(item,index){
												var xUpdated,yUpdated;
												xUpdated=parseFloat(item.split(",")[0])+xMove;
												yUpdated=parseFloat(item.split(",")[1])+yMove;
												
												//console.log(item);
												
												cmdStrUpdated+=xUpdated+","+yUpdated+" ";												
											});
											cmdStrUpdated=cmdStrUpdated.trim().trim();
											pathD+=cmdStrUpdated;
											//console.log(cmdStrUpdated+"test");
											return cmdStrUpdated;
											//return String(+cmdPointsArray.split(",")[0]+xMove) + "," + String(+cmdPointsArray.split(",")[1]+yMove);
											
										});
										
										//console.log(pointMoved)
										/*pointMoved.forEach(function(item){											
											pathD+=item;
										});*/
										
										console.log(pathD);
										
										eachMultiLine.attr("d",pathD);
										eachHitArea.attr("d",pathD);
										
										//console.log(pointMoved);
					/*var pointArrays = commands.map(function(d){
						d=d.trim();
						
						var pointsArray = d.slice(1, d.length).split(' ');
						
						var pairsArray = [];
						//console.log(pointsArray);
						for(var i = 0; i < pointsArray.length; i++){
							pairsArray.push(+pointsArray[i].split(",")[0]);
							pairsArray.push(+pointsArray[i].split(",")[1]);
						}
						
						return pairsArray;
					});
					*/
										//console.log(ViewBox[2]);
									/*	;
										for(var j=0;j<currentPoints.length;j++){
											var ptX=parseFloat(currentPoints[j].trim().split(" ")[0]);
											var ptY=parseFloat(currentPoints[j].trim().split(" ")[1]);
											
											var cmd="L";
											var xMove= evt.deltaX*parseFloat(viewBox[2])/overlayWrap.width();
											var yMove=evt.deltaY*parseFloat(viewBox[3])/overlayWrap.height();
											
											if(j==0){
												cmd="M";												
											}
											
											currentPoints[j]=String(cmd+(ptX+xMove)+","+(ptY+yMove));
											pathD+=currentPoints[j]+" ";
										}
										
										eachMultiLine.attr("d",pathD);
										eachHitArea.attr("d",pathD);									
										*/
										//console.log(pathD);
										//eachMultiLine.attr("d","")
										
									}
									
								}
								
								
								for(var i=0;i<ovelayPoints.length;i++){
									var point=$(ovelayPoints[i]);
									
									var curX=overlayHolder.width()* parseFloat(point.attr("x"))/100;
									var curY=overlayHolder.height()* parseFloat(point.attr("y"))/100;
									
									var x=100*(curX+evt.deltaX)/overlayHolder.width()+"%";
									var y=100*(curY+evt.deltaY)/overlayHolder.height()+"%";
									
									point.attr("x",x);
									point.attr("y",y);									
								}
								
								
								
								overlayWrap.css("transform","translate(0,0)");	
								//$(".overlay-wrap-group").html($(".overlay-wrap-group").html());
								//$(".overlay-wrap-group").html("");
								
								
								
								//alert(overlayGroup.length);
							}
							
							var annotationBin=$(".annotation-bin.open");
							if(annotationBin.length>0){
								if($(".annotation-bin").hasClass("open")){							
									$(".selected.annotation-wrap").remove();
									annotationBin.removeClass("open");
									$(".marksheets.positioning").removeClass("positioning");
								}	
							}
							annotationWrap.removeClass("dragging");	
							$("header.fixed").removeClass("deleting-annotation");
						}
						
						annotationWrap=null;
						draggingTarget=null;
						commentBox=null;
					});
				}
				
				
			});
			
			mcMarksheet.on("panmove",function(evt){	
				
				var x=evt.center.x;				
				var y=evt.center.y;		
				
				if(draggingTarget.closest(".comment-box").length==0){
					$(".annotation-wrap.comment.open").removeClass("close open");
					$(".comment-box-holder.open").removeClass("close open");	
				}
		
	
				
			    if(annotationWrap!=null){	
					//console.log("dragging");
					var xPosition=x-annotationHolder.offset().left;
					var yPosition=y-annotationHolder.offset().top;
						
					var newWidth,newLeft,newTop;
					
					var currentHoverElement=$(document.elementFromPoint(x,y));

					if(resizing){
						//console.log("resizing");							
							//if(resizing){ //resizing annotation
								/*var pattern=annotationWrap.find("pattern");
								var patternWidth=(0.9*$(".annotation-holder").width()/100)/annotationWrap.width();
								
								if(pattern.length>0){
									//var newWidth=(100*patternWidth/annotationWrap.width())+"%";
									var strokeWidth=2/annotationWrap.width();
									pattern.attr("width",patternWidth);
									$(pattern.find("line")[0]).attr("x2",patternWidth/2);
									$(pattern.find("line")[1]).attr("x1",patternWidth/2);
									$(pattern.find("line")[1]).attr("x2",patternWidth);
									
									$(pattern.find("line")).css("stroke-width",strokeWidth);
									
									*/
								//}
								
								//resizeDirection="";
								//resizing=false;	  //Flag- stoped resizing
							//}
							if(resizeDirection=="right"){  //if resize direction is right
								newWidth=xPosition-parseInt(annotationWrap.css("left")); /* new Width of annotationWrap */ 
								newWidth=100*newWidth/$(".annotation-holder").width();  /* Changing new width from px to percentage */
								
								annotationWrap.css("width",newWidth+"%");
							}
							
							
							if(resizeDirection=="left"){  //if resize direction is left							
								newLeft=100*xPosition/$(".annotation-holder").width() /*Getting  left in percentage*/
	
								newWidth=annotationWrapWidth+(annotationWrapLeft - xPosition); /* New Width of annotationWrap */ 							
								newWidth=100*newWidth/$(".annotation-holder").width();  /* Changing  px width into percentage */
								
								annotationWrap.css({"left":newLeft+"%","width":newWidth+"%"});							
								
							}
																
					}
					else{
						//console.log(annotationWrapLeft);
						//console.log(xPosition-(xPosition-parseInt(annotationWrap.css("left"))));
						//console.log(dx);
						newLeft=100*(xPosition-dx)/annotationHolder.width();
						newTop=100*(yPosition-dy)/annotationHolder.height();	
						//console.log(xPosition-(xPosition-annotationWrapLeft));
						
						//positionCommentLine($(".on-page .comment-box-holder.open")),annotation,commentBox);
						
						$(".open.comment-box-holder").removeClass("open close").addClass("close");
					
						//console.log(draggingTarget.closest(".annotation-wrap").length);
						if(draggingTarget.closest(".comment-box").length==0 && draggingTarget.closest(".annotation-wrap").length!=0){
							annotationWrap.css({"left":newLeft+"%","top":newTop+"%"});
							//annotationWrap.css({"margin-left":(xPosition-dx)+"px","top":(yPosition-dy)+"px"});
							//annotationWrap.css({"transform":"translate("+(xPosition-dx)+"px,"+(yPosition-dy)+"px"});
						}
						var annotationBin=$(".annotation-bin");
						if(x<$(".marksheets").offset().left || x>($(".marksheets").offset().left+$(".marksheets").width()) || y<$(".marksheets").offset().top || y>$(".marksheets").offset().top+$(".marksheets").width() || x<($(".marking-tools-panel").offset().left+$(".marking-tools-panel").width()) && y>$(".marking-tools-panel").offset().top){
							//console.log("ok");
							$(".annotation-bin").css({"left":x+"px","top":y+"px"});
							$("header.fixed").removeClass("deleting-annotation").addClass("deleting-annotation");
							annotationBin.removeClass("open").addClass("open");
						}
						else{
							//console.log(currentHoverElement.attr("class"));
							$("header.fixed").removeClass("deleting-annotation");
							$(".annotation-bin.open").removeClass("open");
						}
						//console.log(draggingTarget.attr("class")+ draggingTarget.closest(".overlay-mover-area").length);
						//console.log(draggingTarget[0]);
						
						/*console.log(annotationBin.length);
						if(	annotationBin.length>0){
							annotationBin.removeClass("open").addClass("open");
						}
						else{
							$(".annotation-bin.open").removeClass("open");
						}*/
						
						var clickOnPoint=/(^|\s)overlay-mover-area(\s|$)/.test(draggingTarget.attr("class"));
						
						if(draggingTarget.closest(".overlay-wrap").length!=0 && !clickOnPoint){
							var overlayWrap=annotationWrap;
							var overlayGroup=overlayWrap.find(".overlay-wrap-group");
							//console.log(evt.deltaX);
							overlayWrap.css("transform","translate("+evt.deltaX+"px,"+evt.deltaY+"px)");
						}
						
						if(clickOnPoint){
							var overlayWrap=annotationWrap;
							var overlayHolder= annotationHolder;
							
							var x=100*(evt.center.x-overlayHolder.offset().left)/overlayHolder.width();
							var y=100*(evt.center.y-overlayHolder.offset().top)/overlayHolder.height();
							
							$(draggingTarget[0].parentNode).attr("x",x+"%");
							$(draggingTarget[0].parentNode).attr("y",y+"%");
							
							
							
							if(overlayWrap.hasClass("ruler")){
								var rulerLine=overlayWrap.find(".ruler-line");
								var rulerHitArea=overlayWrap.find(".overlay-hit-area-line");
								
								//console.log(overlayWrap.find(".ruler-line"));
								//console.log($(draggingTarget[0].parentNode));
								var x1=parseFloat(rulerLine.attr("x1"));
								var x2=parseFloat(rulerLine.attr("x2"));
								var y1=parseFloat(rulerLine.attr("y1"));
								var y2=parseFloat(rulerLine.attr("y2"));
								
								if(/(^|\s)p1(\s|$)/.test($(draggingTarget[0].parentNode).attr("class"))){
									x1=x;
									y1=y;
									
									rulerLine.attr("x1",x1+"%");
									rulerLine.attr("y1",y1+"%");
									
									rulerHitArea.attr("x1",x1+"%");
									rulerHitArea.attr("y1",y1+"%");
								}
								if(/(^|\s)p2(\s|$)/.test($(draggingTarget[0].parentNode).attr("class"))){
									x2=x;
									y2=y;
									
									rulerLine.attr("x2",x2+"%");
									rulerLine.attr("y2",y2+"%");
									
									rulerHitArea.attr("x2",x2+"%");
									rulerHitArea.attr("y2",y2+"%");
								}
								
								//console.log((x1+(x2-x1)/2));
								degree.value = degree.GetTwoPointDegree(x1, y1,x2, y2);
								degree.valueReverse = degree.GetTwoPointDegree(x2, y2,x1, y1);
								//Math.atan2(y1 - y2, x1 - x2) - Math.atan2(y3 - y2, x3 - x2)
								//degree.value = Math.atan2(y1 - y1, x1 - x2) - Math.atan2(y2 - y1, x2 - x2)*180/Math.PI;
								// degree.GetAdjacentPoints = function(arcLength){
								// 	degree.radius = arcLength / degree.value;
								// 	console.log(degree.radius);
								// }
								var scriptWidth=210;
								var scriptHeight=297;
								var adj=scriptWidth*(y2-y1)/100;
								var opp=scriptHeight*(x2-x1)/100;
								var adjustDegree= degree.value-10;
								var adjustDegreeReverse= degree.valueReverse + 14;
								var hyp = Math.sqrt(adj*adj + opp*opp);

								// var radius = Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
								var radius = 14;
								var adjecentx1 = x1+ radius* Math.cos(adjustDegree*Math.PI/180);
								var adjecenty1 = y1+ radius* Math.sin(adjustDegree*Math.PI/180);
								var adjecentx2 = x2+ radius* Math.cos(adjustDegreeReverse*Math.PI/180);
								var adjecenty2 = y2+ radius* Math.sin(adjustDegreeReverse*Math.PI/180);

								// $("#testPoint").attr("x",1620*adjecentx1/100);
								// $("#testPoint").attr("y",2350*adjecenty1/100);
								// $("#testPoint2").attr("x",1620*adjecentx2/100);
								// $("#testPoint2").attr("y",2350*adjecenty2/100);
								overlayWrap.find(".overlay-text").text(Math.round(hyp)+ "mm");
								overlayWrap.find(".overlay-text").css("left",((adjecentx1 + adjecentx2)/2)+"%");
								overlayWrap.find(".overlay-text").css("top",((adjecenty1 + adjecenty2)/2)+"%");
							}
							
							
							if(overlayWrap.hasClass("protractor")){
								var scriptWidth=210;
								var scriptHeight=297;
								
								var protractorLine1=overlayWrap.find(".protractor-line.l1");
								var protractorLine2=overlayWrap.find(".protractor-line.l2");
								var protractorHitArea1=overlayWrap.find(".overlay-hit-area-line.l1");
								var protractorHitArea2=overlayWrap.find(".overlay-hit-area-line.l2");
								
								var x1=parseFloat(protractorLine1.attr("x1"));
								var x2=parseFloat(protractorLine1.attr("x2"));
								var x3=parseFloat(protractorLine2.attr("x2"));
								var y1=parseFloat(protractorLine1.attr("y1"));
								var y2=parseFloat(protractorLine1.attr("y2"));
								var y3=parseFloat(protractorLine2.attr("y2"));
								
								if(/(^|\s)p1(\s|$)/.test($(draggingTarget[0].parentNode).attr("class"))){									
									protractorLine1.attr("x1",x+"%");
									protractorLine1.attr("y1",y+"%");
									
									protractorHitArea1.attr("x1",x+"%");
									protractorHitArea1.attr("y1",y+"%");
									
								}
								if(/(^|\s)p2(\s|$)/.test($(draggingTarget[0].parentNode).attr("class"))){									
									protractorLine1.attr("x2",x+"%");
									protractorLine1.attr("y2",y+"%");
									protractorLine2.attr("x1",x+"%");
									protractorLine2.attr("y1",y+"%");
									
									protractorHitArea1.attr("x2",x+"%");
									protractorHitArea1.attr("y2",y+"%");
									protractorHitArea2.attr("x1",x+"%");
									protractorHitArea2.attr("y1",y+"%");
								}
								if(/(^|\s)p3(\s|$)/.test($(draggingTarget[0].parentNode).attr("class"))){									
									protractorLine2.attr("x2",x+"%");
									protractorLine2.attr("y2",y+"%");
									
									protractorHitArea2.attr("x2",x+"%");
									protractorHitArea2.attr("y2",y+"%");
								}
								
								//var radian=find_angle({ 'x': x1, 'y': y1 },{ 'x': x3, 'y': y3 },{ 'x': x2, 'y': y2 });
								//var radian=
								//var angle=(radian*180)/Math.PI;
								//var angle=find_angle({ 'x': x1*(scriptWidth/100), 'y': y1*(scriptHeight/100) },{ 'x': x3*(scriptWidth/100), 'y': y3*(scriptHeight/100) },{ 'x': x2*(scriptWidth/100), 'y': y2 * (scriptHeight/100)});
								
								//var angle=Math.atan2(y2*(scriptHeight/100) - y1*(scriptHeight/100) , x2*(scriptWidth/100)  - x1*(scriptWidth/100) ) - Math.atan2(y3*(scriptHeight/100)  - y1*(scriptHeight/100) , x3*(scriptWidth/100) - x1*(scriptWidth/100));
								//var angle=(Math.atan2(y2 - y1 , x2 - x1) - Math.atan2(y3- y1, x3- x1));
								var radian=Math.atan2(y1 - y2, x1 - x2) - Math.atan2(y3 - y2, x3 - x2)
								//console.log(2*Math.PI - radian);
								var angle=(360-radian*180/Math.PI) % 360;
								
								var angleText=angle>180?360-angle:angle;
								var overlayText=overlayWrap.find(".overlay-text");
								
								//console.log(radian);
								//console.log((radian));
								overlayText.css("left",x2+"%");
								overlayText.css("top",y2+"%");
								
								overlayWrap.find(".overlay-text").prop('textContent',Math.round(angleText)+"\u00B0");
								
								var angleL1=Math.atan2((y1-y2)*overlayHolder.height()/100, (x1-x2)*overlayHolder.width()/100) % Math.PI;								
								var angleL2=Math.atan2((y3-y2)*overlayHolder.height()/100, (x3-x2)*overlayHolder.width()/100) % Math.PI;
								
								if(angleL2==0){
									angleL2=Math.PI;
								}
								
								//console.log(angleL2*180/Math.PI);
								
								var angleMiddle=angleL2 - ((angle/2)*Math.PI/180);
								
								var txPx,tyPx;
								//console.log(angleText);
								//console.log(angle);
								
								//console.log(angleL1+ ", " + angleL2 + "=" + angleMiddle);
								
								var angleTextDistance=40;
								
								//txPx = x2*overlayWrap.width()/100 + angleTextDistance * Math.cos(angleMiddle);
									//tyPx = y2*overlayWrap.height()/100 + angleTextDistance * Math.sin(angleMiddle);
								
								if(angle>270){
									txPx = x2*overlayWrap.width()/100 + angleTextDistance * Math.cos(angleMiddle);
									tyPx = y2*overlayWrap.height()/100 + angleTextDistance * Math.sin(angleMiddle);
								}
								else if(angle>180){
									txPx = x2*overlayWrap.width()/100 + angleTextDistance * Math.cos(angleMiddle-Math.PI);
									tyPx = y2*overlayWrap.height()/100 + angleTextDistance * Math.sin(angleMiddle-Math.PI);
								}
								else if(angle>90){
									txPx = x2*overlayWrap.width()/100 + angleTextDistance * Math.cos(angleMiddle);
									tyPx = y2*overlayWrap.height()/100 + angleTextDistance * Math.sin(angleMiddle);
								}
								else{
									txPx = x2*overlayWrap.width()/100 + angleTextDistance * Math.cos(angleMiddle-Math.PI);
									tyPx = y2*overlayWrap.height()/100 + angleTextDistance * Math.sin(angleMiddle-Math.PI);
								}
								
								overlayText.css("left",100*txPx/overlayHolder.width()+"%");		
								overlayText.css("top",100*tyPx/overlayHolder.height()+"%");
								
							}
							if(overlayWrap.hasClass("multiline")){
								var pathData=draggingTarget.data("targetPath").trim().split("-")
								var pathN=pathData[0];
								var pathPoint=pathData[1];
								var multiLinePath=$("#multLinePath"+pathN);
								var multiLineArea=$("#multLinePathArea"+pathN);
								var viewBox=overlayWrap.find(".overlay-element-svg")[0].getAttribute('viewBox').split(/\s+|,/);
								var d="";
								var pointElements=$(".overlay-mover-area[data-target-path^='"+pathN+"-']");
								var pointArray=[];
								
								pointElements.each(function(i,o){									
									var xVal=(parseFloat($(o).parent().attr("x"))*overlayWrap.width()/100)*viewBox[2]/overlayWrap.width();
									var yVal=(parseFloat($(o).parent().attr("y"))*overlayWrap.height()/100)*viewBox[3]/overlayWrap.height();									
									
									pointArray.push(xVal);
									pointArray.push(yVal);									
								});
								//debugger;
								if(multiLineArea.attr("class").indexOf("curved")!=-1){
									d= curvePath(pointArray, 1);									
								}
								else{							
									d="M"+pointArray[0]+","+pointArray[1]+"L";

									for(var i=2;i<pointArray.length;i+=2){
										d+=pointArray[i]+","+pointArray[i+1]+" ";									
									}
									
									d=d.trim();
								}
								
								//d= curvePath(pointArray, 1);
								
								//var pathPoints= multiLinePath.attr("d").trim().split(/[mM]/)[1].split(/[Ll]/);
								
								
								/*var currentPoints=pathPoints[pathPoint].split(" ");
								var xVal=(parseFloat(draggingTarget.parent().attr("x"))*overlayWrap.width()/100)*viewBox[2]/overlayWrap.width();
								var yVal=(parseFloat(draggingTarget.parent().attr("y"))*overlayWrap.height()/100)*viewBox[3]/overlayWrap.height();
								
								
								
								//console.log(draggingTarget.parent().attr("x"));
								
								pathPoints[pathPoint]= xVal+" "+ yVal;								
								var str="";
								var cmd="";
								
								for(var i=0;i<pathPoints.length;i++){
									cmd = (i==0)?"M":"L"; 									
									str+=String(cmd)+String(pathPoints[i])+" ";									
								}
								*/
								multiLinePath.attr("d",d);
								multiLineArea.attr("d",d);
													
								
							}
							//console.log(draggingTarget[0].parentNode)
						}
					}
				}
				if(commentBox!=null){
					if(commentBox.length!=0 && draggingTarget.closest("textarea").length==0){
						
						var commentHolder=commentBox.parents(".comment-holder");
						var commentWrapper=commentBox.parents(".comment-wrapper");
						//console.log(commentHolder.length);
						var xPosition=x-commentWrapper.offset().left;
						var yPosition=y-commentWrapper.offset().top;
						
						var commentLeft=100*(xPosition+(xInCommentBox))/commentWrapper.innerWidth();
						var commentTop=100*(yPosition+(yInCommentBox))/commentWrapper.innerHeight();
						var commentBoxHolder=commentBox.parents(".comment-box-holder");
						var annotation=$("[data-commentbox='"+commentBoxHolder.attr("id")+"']");
						
						/*if(x>(x - commentBox.offset().left)){
							commentLeft=0;
						}
						if(x< $(window).width()-(commentBox.width()-(x - commentBox.offset().left))){
							commentLeft=$(window).width()-commentBox.width();	
						}*/
						
						commentBox.css({"left":commentLeft+"%","top":commentTop+"%"});
						//console.log(commentBox.length)			
						positionCommentLine(commentBoxHolder.find(".comment-line-holder .comment-connector"),annotation,commentBox);	
						//evt.preventDefault();
					}
				}
				//console.log(draggingTarget.closest(".marking-panel-resizer").attr("class"));
				if(draggingTarget.closest(".panel-resizer").length>0){
					var resizeProperty="width";
					var panelAlign="right";
						
					var dist;					
					var newMarkingPanelWidth;						
					
					//resizeMarginStart=evt.center.x;
					var panel;
					
					if(draggingTarget.closest(".marking-question-panel").length>0){						
						panel=$(".marking-question-panel .panel-scaler");
					}
					else if(draggingTarget.closest(".messaging-panel").length>0){	
						panel=$(".messaging-panel");
					}
					else if(draggingTarget.closest(".offpage-comment-container").length>0){	
						panel=$(".offpage-comment-container");
						resizeProperty="height";
						
						if(panel.hasClass("enhanced")){
							panelAlign="top";							
						}
						else{
							panelAlign="bottom";
						}
					}
					
					//alert(panel.length)
					
					if(resizeProperty=="width"){
						dist=startX-evt.center.x
						newMarkingPanelWidth=markingPanelWidth+dist;
						panel.css(resizeProperty,(newMarkingPanelWidth)+"px");
					}
					else if(resizeProperty=="height"){
						dist=startY-evt.center.y;
						
						if(panelAlign=="top"){
							newPanelSize=panelHeight-dist;
						}
						else if(panelAlign=="bottom"){
							newPanelSize=panelHeight+dist;
						}
						
						//console.log(evt);
						//newPanelSize=panelHeight+dist;
						
						if(panel.hasClass("enhanced")){
							//console.log($(".annotation-panel-holder").offset().top);
							if(evt.center.y>$(".annotation-panel-holder").offset().top-5){
								panel.removeClass("tool-panel-space").addClass("tool-panel-space");
							}
							else{								
								panel.removeClass("tool-panel-space");
							}
						}
						panel.css(resizeProperty,(newPanelSize+"px"));
					}
					
					/*
					console.log(currentMargin);
					if(parseInt(newMarkingPanelWidth)>minWidth && !(currentMargin<0) ){
						$(".marking-question-panel").css("width",newMarkingPanelWidth);
						$(".marking-question-panel").css("margin-right","auto");
						resizeMarginStart=evt.center.x;						
					}
					else{							
						newMarginRight=currentMargin+(resizeMarginStart-evt.center.x);								
						
						
						$(".marking-question-panel").css("width",minWidth);
						
						if(newMarginRight>minMargin){
							$(".marking-question-panel").css("margin-right",newMarginRight+"px");
						}
						
					}*/
					
					$(".cursor").css("width","calc(4% - 4px - (4 * ("+newMarkingPanelWidth+" + 60px + 84px) / 100))");
					$(".cursor-drag").css("width","calc(4% - 4px - (4 * ("+newMarkingPanelWidth+" + 60px + 84px) / 100))");
					
					createDynamicStyle();
					
				}
			});
			
			mcMarksheet.on("tap",function(evt){
				var x=evt.center.x;
				var y=evt.center.y;
				
				var currentHoverElement=$(document.elementFromPoint(x,y));
				if(currentHoverElement.closest(".comment-box").length==0 && currentHoverElement.closest(".annotation-wrap.comment").length==0 ){
					if($(".content-wrapper").hasClass("commenting") && !$(".content-wrapper").hasClass("side-page") ){
						$(".comment-box-holder.open").removeClass("open close").addClass("close");
						$(".content-wrapper").removeClass("commenting on-page");
						$(".annotation-wrap.comment.open").removeClass("open");
					}
				}
			});
		}
		
		
		$(".minimize-message-link").bind(clickEvent,function(){
			$(".content-wrapper.messaging,.popup.open.messaging").toggleClass("minimized");
			//$(".offpage-comment-container").removeClass("hide");
			 
		});
		
		$(".maximize-message-link").bind(clickEvent,function(){
			$(".content-wrapper.messaging,.popup.messaging").removeClass("minimized");
			//$(".offpage-comment-container").addClass("hide");
		});
		$(".close-message-link").bind(clickEvent,function(){				 
			$(".content-wrapper.messaging").removeClass("messaging minimized");
		});
		
		$(".close-message-link").bind(clickEvent,function(){				 
			$(".popup.messaging").removeClass("open");
		});
		
		var commentWrapper=$(".comment-wrapper");
		//alert(commentWrapper.length)
		var widthDifference=$(".marksheets").width()-$(".marksheet-content-holder").width();
		//$(".comment-container").css({"width":"calc(100% - "+ (widthDifference)+"px)"});
		
		commentWrapper.each(function(index, element) {
			var an=$(this).parents(".comment-holder").data("annotation");
			//console.log+($(this).parents(".comment-holder").length);
			var annotationHolder=$("#"+an +" .annotation-holder");
			var ratio=annotationHolder.height()/annotationHolder.width();
			widthDifference=$(window).width()-annotationHolder.width();
			var commentBoxes=$(this).find(".comment-box");
			//alert(ratio);
			
            $(this).css({"width":"calc(100% - "+ (widthDifference + 10)+"px)","padding-top":"calc("+ ratio + " * (100% - 255px))"});
        });
		
		$(".annotation-wrap.comment .svg-icon").bind(clickEvent,function(){
			var annotationWrap=$(this).parents(".annotation-wrap");
			var annotationHolder=annotationWrap.parents(".annotation-holder");
			var marksheetContainer=annotationWrap.parents(".marksheet-container");
			var commentHolder,commentWrapper,commentBoxHolder,commentBox;
			var commentLeft,commentTop;
			var widthDifference;
			var marksheetWrapper=annotationWrap.parents(".marksheet-wrapper");
			var currentRotation=getRotationDegrees(marksheetWrapper),ratio;
			var maskSvg,connectorLine;
			var maskBg;
			
			if(!annotationWrap.hasClass("dragging") && !$(".content-wrapper").hasClass("side-page")){
				
				commentBoxHolder=$("#"+annotationWrap.data("commentbox"));
				commentWrapper=commentBoxHolder.parents(".comment-wrapper");
				commentBox=commentBoxHolder.find(".comment-box");
				commentHolder=commentBoxHolder.parents(".comment-holder");
				
				maskSvg=commentBox.parents(".comment-wrapper").find(".mask-svg");
				
				connectorLine=commentBox.parents(".comment-box-holder").find(".comment-connector");
				
				connectorLine.attr("x1",0);
				connectorLine.attr("y1",0);
				connectorLine.attr("x2",0);
				connectorLine.attr("y2",0);				
				
				if(currentRotation%180==0){
					widthDifference=$(window).width()-annotationHolder.width();
					ratio=annotationHolder.height()/annotationHolder.width();
					maskSvg.attr("width","2.5%");
					maskSvg.attr("height",10000);
				}
				else{
					widthDifference=$(window).width()-annotationHolder.height();
					ratio=annotationHolder.width()/annotationHolder.height();
					maskSvg.attr("height","4%");
					maskSvg.attr("width",10000);
				}
				
				//commentWrapper.css({"width":"calc(100% - "+ widthDifference+"px)", "padding-top":"calc("+ratio+"*(100% - "+widthDifference+"px))"});
				//commentWrapper.css({"width":"calc(100% - "+ widthDifference+"px)"});
				//changeCommentView("onpage");
				commentLeft=100*(annotationWrap.offset().left-58+annotationWrap.outerWidth())/commentWrapper.innerWidth();
				commentTop=100*(annotationWrap.offset().top-60)/commentWrapper.innerHeight();
				
				maskBg=commentHolder.find(".line-svg .mask-reveal");
				//console.log(commentWrapper.innerHeight());
				//console.log($(window).height());
				maskBg.attr("width",100*$(window).width()/commentWrapper.innerWidth()+"%");
				maskBg.attr("height",100*$(window).height()/commentWrapper.innerHeight()+"%");
				
				//alert(annotationWrap.offset().top-60);
				
				commentBox.css({"left":commentLeft+"%","top":commentTop+"%"});
				
				//alert(commentHolder.height());
				commentBoxHolder.css("color",annotationWrap.css("color"));
				
				$(".content-wrapper").removeClass("commenting").addClass("commenting on-page");				
				
				annotationWrap.removeClass("close open").addClass("open");
				$(".comment-box-holder").removeClass("close open");
				commentBoxHolder.addClass("open");
				
				
				positionCommentLine(commentBoxHolder.find(".comment-line-holder .comment-connector"),annotationWrap,commentBox);
			}
		});
		
		$(".marksheet-container").bind("scroll",function(){
			var annotationWrap,commentBoxHolder,commentBox;
			if($(".content-wrapper").hasClass("commenting on-page")){
				annotationWrap=$(this).find(".annotation-wrap.comment.open");
				commentBoxHolder=$("#"+annotationWrap.data("commentbox"));
				commentBox=commentBoxHolder.find(".comment-box");
				
				/*alert(annotationWrap.length);
				alert(commentBoxHolder.length);
				alert(commentBox.length);*/
								
				positionCommentLine(commentBoxHolder.find(".comment-line-holder .comment-connector"),annotationWrap,commentBox);
			}
			else if($(".content-wrapper").hasClass("commenting side-page")){
				//annotationWrap=$(this).find(".annotation-wrap.comment");
				$(".comment-container").css("right",-1*$(this).scrollLeft());
				//$("#boxStyle").html(".side-page .comment-box-holder .comment-box{left:"+$(this).scrollLeft()+"px !important;}");
				/*annotationWrap.each(function(){
					commentBoxHolder=$("#"+$(this).data("commentbox"));
					commentBox=commentBoxHolder.find(".comment-box");									
					positionCommentLine(commentBoxHolder.find(".comment-line-holder .comment-connector"),$(this),commentBox);
				});*/
				
				//$(".comment-container").scrollTop(Math.round($(".marksheet-container").scrollTop()));
				//$(".comment-holder").css("transform","translateY(-"+$(".marksheet-container").scrollTop()+"px)");
			}
			/*$(".page-number-marksheet").removeClass("hide");
			setTimeout(function(){$(".page-number-marksheet").addClass("hide")},0);*/
		});
		
	/*Marking screen*/
	
	$("#unannotatedPages").on("change",function(){
		$(".marksheets-inner").toggleClass("all-annotated");
	});
	$("#unzoneViewAll").on("change",function(){
		$(".marksheets-inner").toggleClass("show-unzoned filtered-view");
	});
	
	
		setTimeout(function(){setToolbarCol(); ;},0);//setMarkBubbleView()
		
		$(window).on("resize",function(){
			setToolbarCol();
			//setMarkBubbleView();
			if($(".table-scroll-holder").length>0){
				setGridScrollbar();
			}
		});
		
		
		var mousewheelevt=(/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel"; //FF doesn't recognize mousewheel as of FF3.x		
		
		$(".mark-button-container").bind(mousewheelevt,function(e){
			var buttonWrapper=$(".mark-button-wrapper");
			var buttonExclude=$(".mark-button.close",buttonWrapper).nextUntil(".mark-button.group-start").add(".mark-button.close",buttonWrapper);
			//alert(buttonExclude.length);
			var button=$(".mark-button",buttonWrapper).not(buttonExclude);
			//var button=$(".mark-button",buttonWrapper);
			//alert(button.length);
			var startButton=$(".start-view.mark-button",buttonWrapper);
			var endButton=$(".end-view.mark-button",buttonWrapper);
			var startButtonIndex=Math.max(button.index(startButton),1);
			var endButtonIndex=Math.max(button.index(endButton),1);
			
			var evt=window.event || e.originalEvent;
			var wheelDel=-1*(evt.detail? evt.detail/3*(-120) : evt.wheelDelta)/120; //check for detail first so Opera uses that instead of wheelDelta
//			console.log(wheelDel);
			
			console.log(endButtonIndex);
			if((wheelDel<0 && (endButtonIndex>0) && !$(".mark-button-nav.up").hasClass("disabled")) || (wheelDel>0 && (startButtonIndex<=button.length-2))){
				startButton.removeClass("start-view");
				$(button[startButtonIndex+wheelDel]).addClass("start-view");
			}
			
			/*if(wheelDel>0 && (startButtonIndex<=button.length-2) ){
				startButton.removeClass("start-view");
				$(button[startButtonIndex+wheelDel]).addClass("start-view");
			}*/
			
			
			//var elm=button[startButtonIndex+wheelDel];
			//console.log($(button[startButtonIndex+wheelDel]));
			
			//console.log($(".mark-button",buttonWrapper)[1]);
			//console.log($(".mark-button",buttonWrapper).not(buttonExclude)[1]);
			//console.log(button[0])
			/*
			
			var buttonWrapper=$(".mark-button-wrapper");
			var button=$(".mark-button",buttonWrapper);
			var startButton=$(".start-view.mark-button",buttonWrapper);
			var endButton=$(".end-view.mark-button",buttonWrapper);
			var startButtonIndex=startButton.index(".mark-button-wrapper .mark-button");
			
			var evt=window.event || e.originalEvent;
			var wheelDel=-1*(evt.detail? evt.detail/3*(-120) : evt.wheelDelta)/120; //check for detail first so Opera uses that instead of wheelDelta
			//alert(wheelDel);
			
			if(wheelDel<0 && (endButton.index(".mark-button-wrapper .mark-button")>0) && !$(".mark-button-nav.up").hasClass("disabled")){
				startButton.removeClass("start-view");
				button.eq(startButtonIndex+wheelDel).addClass("start-view");
			}
			
			if(wheelDel>0 && (startButton.index(".mark-button-wrapper .mark-button")<=button.length-2) ){
				startButton.removeClass("start-view");
				button.eq(startButtonIndex+wheelDel).addClass("start-view");
			}
			
			*/
			
			//setMarkBubbleView();
			
		});
		
		
		$(".mark-button-nav").bind(clickEvent,function(){
			if(!$(this).hasClass("disabled")){
				
				var buttonWrapper=$(".mark-button-wrapper");
				var button=$(".mark-button",buttonWrapper);
				var startButton=$(".start-view.mark-button",buttonWrapper);
				var endButton=$(".end-view.mark-button",buttonWrapper);
				//debugger;
				startButton.removeClass("start-view");			
				if($(this).hasClass("up")){
					if(endButton.index(".mark-button-wrapper .mark-button")>0){					
						startButton.prev().addClass("start-view");
						//debugger;
					}
				}
				else if($(this).hasClass("down")){
					if(startButton.index(".mark-button-wrapper .mark-button")<=button.length-2){
						startButton.next().addClass("start-view");
					}
				}
				
				//setMarkBubbleView();
			}
		});
		if($(".mark-button-mask").length>0){
			var panStartButton;
			var panStartIndex;		
			
			var mcMark = new Hammer($(".mark-button-mask")[0]);
			mcMark.get('pan').set({ direction: Hammer.DIRECTION_ALL });	
			mcMark.on("panstart",function(ev){
				var buttonWrapper=$(".mark-button-wrapper");
				panStartButton=$(".start-view.mark-button",buttonWrapper);
				panStartIndex=panStartButton.index(".mark-button-wrapper .mark-button");
			});
			
			mcMark.on("panmove",function(ev){
				var buttonWrapper=$(".mark-button-wrapper");
				var button=$(".mark-button",buttonWrapper);
				var startButton=$(".start-view.mark-button",buttonWrapper);
				var endButton=$(".end-view.mark-button",buttonWrapper);
				
				var d=-Math.round(ev.distance/66);
				
				
				if(ev.direction==16 && (endButton.index(".mark-button-wrapper .mark-button")>0) && !$(".mark-button-nav.up").hasClass("disabled")){ //if up
					startButton.removeClass("start-view");
					button.eq(panStartIndex+d).addClass("start-view");				
				}
				
				if(ev.direction==8 && (startButton.index(".mark-button-wrapper .mark-button")<=button.length-2)){ //if up				
					
					startButton.removeClass("start-view");
					button.eq(panStartIndex-d).addClass("start-view");				
				}
				//setMarkBubbleView();
			});
		}
	
	$(".thumb-view .marksheet-holder").on("mouseover",function(){
		$(this).find(".page-options").removeClass("hovered").addClass("hovered");
	});
	$(".msg-to-expand-toggler").on(clickEvent,function(){
		$(this).parents(".msg-to").toggleClass("expanded");
	});
	
	$(".marksheets-inner").on(clickEvent,".offpage-comment-link",function(){
		if($(".content-wrapper").hasClass("on-page")){
			$(".content-wrapper").removeClass("on-page").addClass("side-page");
			
			
			/*var commentHTML = $(".marksheets-inner>.comment-container").html();
			$(".marksheets-inner>.comment-container").html("")
			$(".marksheet-container>.comment-container").html(commentHTML);*/
			$(".marksheets-inner>.comment-container").appendTo($(".marksheet-container"));
			
			var annotationWrap=$(".annotation-wrap.comment");
			annotationWrap.each(function(){
				var commentBoxHolder=$("#"+$(this).data("commentbox"));
				var commentBox=commentBoxHolder.find(".comment-box");				
				commentBoxHolder.css("color",annotationWrap.css("color"));
				positionCommentLine(commentBoxHolder.find(".comment-line-holder .comment-connector"),$(this),commentBox);				
			});		
			
			$(".comment-wrapper").each(function(){
				var minH=0;
				var marksheetHolder;
				var annotationHolder=$("#"+$(this).parents(".comment-holder").data("annotation"));
				var ratio=annotationHolder.width()/annotationHolder.height();
				
				
				$(".comment-box",$(this)).each(function(index, element) {
					var marginT=parseInt($(this).css("margin-top"));
					var borderTB=parseInt($(this).css("border-top-width"))+parseInt($(this).css("border-bottom-width"));
					
                    minH+=$(this).parents(".comment-box-holder").height();
                });
				//minH+=2;
				if($(this).parents(".comment-holder").index(".comment-container .comment-holder")==0){
						minH+=52;
				}
				
				$(this).parents(".comment-holder").css("min-height",minH+"px");
				marksheetHolder=$("#"+$(this).parents(".comment-holder").data("annotation"));
				marksheetHolder.css("min-height",(minH)+"px");
				
			});
			
			
		}
		
	});
	$(".hide-comment-link").on(clickEvent,function(){
		//var commentHTML;
		if($(".content-wrapper").hasClass("side-page")){
			$(".content-wrapper").removeClass("side-page").addClass("on-page");
			
			var annotationWrap=$(".annotation-wrap.comment");
			annotationWrap.each(function(){
				var commentBoxHolder=$("#"+$(this).data("commentbox"));
				var commentBox=commentBoxHolder.find(".comment-box");
				//console.log("ss- "+commentBox.innerHeight());
				/*alert(annotationWrap.length);
				alert(commentBoxHolder.length);
				alert(commentBox.length);*/
				commentBoxHolder.css("color",annotationWrap.css("color"));
				positionCommentLine(commentBoxHolder.find(".comment-line-holder .comment-connector"),$(this),commentBox);
			});
			
			/*commentHTML = $(".marksheet-container>.comment-container").html();
			$(".marksheet-container>.comment-container").html("");
			$(".marksheets-inner>.comment-container").html(commentHTML);*/
			$(".marksheet-container>.comment-container").appendTo($(".marksheets-inner"));
			
		}
	});
	
   $(".team-wrapper .left-menu-holder .panel").on(clickEvent,function(){
	 $(this).parents(".panel-group").find(".panel.open").removeClass("open");
	 $(this).removeClass("open").addClass("open");
	 $(this).parents(".panel-group").find(".selected").removeClass("selected");
	 $(this).removeClass("selected").addClass("selected");
  })
  
  $(".btn-my-marking").on(clickEvent,function(){	
	//location.href="worklist-tile.html";
   });
    $(".btn-team-management").on(clickEvent,function(){	
	//location.href="team.html";
   });
   
}

function demo2(){
	var qigSession;
	var quigComponent;
	var selectedScriptID;
	var selectedRespID;
	var selectedCandidateID;
	var responseStste;
	var defMarkingSts;
	var classifiedSts;
	var currentPage = loc.pathname.substring(loc.pathname.lastIndexOf('/')+1);
	
	$(".group-start").on("click",function(){
		var groupEnd=$(this).prevAll(".group-end:first");
		
		
		//debugger;
		var groupStart=$(this);
		var buttonWrapper=$(".mark-button-mask");
		var allButton=$(".mark-button",buttonWrapper);
		var buttonExclude=$(".mark-button.close",buttonWrapper).nextUntil(".mark-button.group-start").add(".mark-button.close",buttonWrapper);
		var button=$(".mark-button",buttonWrapper).not(buttonExclude);
		var childCount=allButton.index(groupStart) - allButton.index(groupEnd);
		
		var startView=$(".mark-button.start-view");
		var endView=$(".mark-button.end-view");
		var startViewIndex=button.index(startView);
		var endViewIndex=button.index(endView);
		
		var groupEndIndex=button.index(groupEnd);
		var groupStartIndex=button.index(groupStart);
		
		var availableButtonSpace=groupEnd.hasClass("open")?groupEndIndex-endViewIndex:groupStartIndex-endViewIndex;
		
		//debugger;
		//alert(availableButtonSpace);
		//var availableButtonSpace=groupEndIndex-endViewIndex;
		var newStartViewIndex,newEndViewIndex;
		//alert(availableButtonSpace);
		
		//alert(button.index(endView));
		//alert(childCount);
						
		newStartViewIndex=groupEnd.hasClass("open")? startViewIndex:startViewIndex+(availableButtonSpace - Math.max(childCount,availableButtonSpace));
		//newStartViewIndex=startViewIndex+(availableButtonSpace -childCount);
		//alert(availableButtonSpace);
		//newStartViewIndex=startViewIndex-childCount-1;
		//newEndViewIndex=endViewIndex-childCount-1;
		
		$(".mark-button.start-view").removeClass("start-view");
		$(button[newStartViewIndex]).addClass("start-view");
		//console.log(startViewIndex,newStartViewIndex)
		/*$(".mark-button.end-view").removeClass("end-view");
		$(button[newEndViewIndex]).addClass("end-view");*/
		
		
		if(!groupEnd.hasClass("open")){
			$(".mark-button.open").removeClass("open close").addClass("close");
			groupEnd.removeClass("open close").addClass("open");
		}
		else{
			groupEnd.removeClass("open close").addClass("close");
		}			
		
		//setMarkBubbleView();
	});
	$('.logout-btn').on('click',function(){
		location.href="login.html";
	});
	//localStorage.setItem('ResponseState','');
	$('.btn-standardisation').on('click',function(){
		quigComponent=$(this).closest(".qig-group-holder").find('.qig-component > h6').text()
		qigSession= $(this).closest(".qig-group-holder").find('.qig-session').text();
		localStorage.setItem('qigId', qigSession+': '+quigComponent);
		location.href="std-sel-response.html";
		//console.log(currentPage, localStorage.getItem('qigSessionId'));
	});
	//console.log(currentPage, localStorage.getItem('qigId'));
	var componentID= localStorage.getItem('qigId');
	if(currentPage == "std-sel-response.html"||"std-provisional-marking.html" && componentID!==null){
		$('.breadcrumb-item > .nav-text > #topNavText').html("Qualification setup for "+componentID);
	}	
	if(currentPage == "std-sel-response.html"){
			if(!responseStste){
				localStorage.setItem('ResponseState','readOnly');
			}
	}
	/* Left panel links*/
	$('.left-menu-link:not(.disabled)').on('click', function(){
		var leftMenuItem = $(this).parent('.panel').attr('class').replace(/panel /g, '').replace(/ open/g, '');
		switch (leftMenuItem) { 
			case 'select-response': 
				location.href="std-sel-response.html";
				break;
			case 'provisional': 
				location.href="std-provisional-marking-total-mark.html";
				break;
			case 'unclassified': 
				location.href="std-unclassified-marks-total-mark.html";
				break;		
			case 'classified': 
				location.href="std-classified-marks-total-mark.html";
				break;
		}
	});
	
	/* Grid Selection*/
	var centerId = localStorage.getItem('CenterID');
	$('.selectable-grid .row').on('click', function(){
		$('.selectable-grid tr').removeClass('selected');
		$(this).closest('tr').addClass('selected');
		// gridTable.gridSetWidth("1");
		$('.std-response-grid').removeClass('hide').addClass('open');
		renderGridTable();
		var centre = $(this).find('.col-centre > div').text();
		$('.centerId').html(centre);
		localStorage.setItem('CenterID',centre);
		if($(".grid-holder.selectable-grid .row.selected").length>0){
		 
			$("#env-login-btn,#env-cancel-btn").removeClass("disabled");
		}
	});
	
	selectedScriptID = localStorage.getItem('ScriptID');
	selectedRespID = localStorage.getItem('RespID');
	selectedCandidateID = localStorage.getItem('CandidateID');
	responseStste = localStorage.getItem('ResponseState');
	$('.col-script-id a').on('click', function(){
		if(currentPage =="std-sel-response.html" && $('.resp-open').hasClass('active')){
			if(!responseStste){
				localStorage.setItem('ResponseState','readOnly');
			}
			localStorage.setItem('ScriptID', $(this).text());
			var scptIndx=$(this).closest('.row').index();
			var canRowIndx=$($(this).parents(".grid-wrapper").find(".table-body-wrap tr")[scptIndx]).find(".col-candidate .cell-data").text().trim();
			localStorage.setItem('CandidateID', canRowIndx);
			location.href="std-response.html";
		}else if(currentPage =="std-sel-response.html" && $('.resp-closed').hasClass('active')){
			if(!responseStste){
				localStorage.setItem('ResponseState','readOnly');
			}
			var rowIndex = $(this).closest('.row').index();
			var rowSelR =$($('#responseTab2 .table-content-holder tr')[rowIndex]);
			var centre = rowSelR.find('.col-centre .txt-val').text();
			var candidate = rowSelR.find('.col-candidate .txt-val').text();
			localStorage.setItem('ScriptID', $(this).text());
			localStorage.setItem('row-count',$(this).parents('.table-wrap-l').find('.col-script-id').length);
			localStorage.setItem('curr-row-index',rowIndex+1);
			localStorage.setItem('CenterID',centre);
			localStorage.setItem('CandidateID',candidate);
			location.href="std-reuse-response.html";
		}
	});
	
	$('.reusebtn').on('click', function(){
		if(currentPage =="std-sel-response.html" && $('.resp-closed').hasClass('active')){
			var seleRow = $(this).closest('.row');
			var seltdIndex = seleRow.index();
			var rowSelR =$($('#responseTab2 .table-content-holder tr')[seltdIndex]);
			$('#reusescriptID').html(seleRow.find('.col-script-id a').text());
			$('#reuseCentre').html(rowSelR.find('.col-centre .txt-val').text());
			$('#reuseCand').html(rowSelR.find('.col-candidate .txt-val').text());
		}else if(currentPage =="std-reuse-response.html"){
			$('#reusescriptID').html(localStorage.getItem('ScriptID'));
			$('#reuseCentre').html(localStorage.getItem('CenterID'));
			$('#reuseCand').html(localStorage.getItem('CandidateID'));
		}
	});
	
	manageResp(selectedScriptID);
	
//	$('.col-response .header-data a').on('click', function(){
//		if(currentPage =="std-provisional-marking-total-mark.html" || currentPage =="std-provisional-marking-by-question.html"){
//			location.href="std-response.html";
//		}else if(currentPage =="std-unclassified-marks-total-mark.html"){
//			location.href="std-unclassified-def-response.html";
//			localStorage.setItem('Defmarking','notEnabled');
//		}
//		else if(currentPage=="std-unclassified-marks-by-question.html" || currentPage=="std-classified-marks-total-mark.html" || currentPage=="std-classified-marks-by-question.html"){
//			location.href="std-unclassified-def-response.html";
//			localStorage.setItem('Defmarking','enabled');
//		}
//		localStorage.setItem('RespID', $(this).text());
//		manageResp(selectedScriptID);
//	});
	
	$('#stdSelRespPopup .button').on('click', function(){
		switch ($(this).attr('id')) { 
			case 'selRespYes': 
				localStorage.setItem('ResponseState','ProvisionalMarking');
				manageResp(selectedScriptID);
				break;
			case 'selRespNo': 
				location.href="std-sel-response.html";
				break;
			case 'selRespCancel': 
				$('.std-slct-to-mrk .message-box').removeClass('hide');
				break;		
		}
	});
	
	//manageResp();
	
	$('.message-box .close').on('click',function(){
		$(this).parents('.message-box').addClass('hide');
	})
	$('.std-slct-to-mrk-btn').on('click', function(){
		$('.respID').html(selectedScriptID);
		$('.centreID').html(centerId);
		$('.candID').html(selectedCandidateID);
		$('.std-slct-to-mrk .message-box').addClass('hide');		
		
	});
	
	classifiedSts = localStorage.getItem('ClsifyStatus','classified');
	$('#ProvisionalTotalMarkShareShare,#ProvisionalTotalMarkShareOptionShare').on('click', function(){
		location.href="std-unclassified-marks-total-mark.html";
		
	});
	$('.resp-closed a').on('click', function(){
		showhideHiddenResp();
	});
	
	$("#hiddenResponse").on("change", function (e) {
		showhideHiddenResp();
		// setTimeout(function(){
		// },500);
	});
	function showhideHiddenResp(){
		if($('#hiddenResponse').is(':checked')){
			$(".show-hidden-response").removeClass("hidden").addClass("shown");
			console.log("checked");
		}else{
			$(".show-hidden-response").removeClass("shown").addClass("hidden");
		}
	}
	
	$('.col-hide-response .toggle-button > input').on('change', function(){
		var rowInxed=$(this).closest('.row').index();
		console.log(rowInxed);
		var curreSlected=$($(this).parents(".grid-wrapper").find('.table-wrap-l tr')[rowInxed]);
		console.log(curreSlected);
		if($(this).is(':checked')){
			console.log("cehcked");
			$(curreSlected).find('.shareProv:enabled').addClass('hide-row');
			$(curreSlected).addClass('hide-row');
			$(this).closest('.row').addClass('hide-row');
			showhideHiddenResp();
			// setTimeout(function(){
				
			// },500);
		}else{
			$(curreSlected).find('.shareProv').removeClass('hide-row');
			$(curreSlected).removeClass('hide-row');
			$(this).closest('.row').removeClass('hide-row');
		}
	});
	
	manageClassified();
	classifiedSts=localStorage.getItem('ClsifyStatus');
	$('#unclassifiedClassifyResponseOk').on('click', function(){
		if(currentPage=="std-unclassified-def-response.html"){
			localStorage.setItem('ClsifyStatus','classified');
		}
		$('#unclassifiedClassifyResponsePopup').removeClass('open');
		if(currentPage=="std-unclassified-def-response.html"){
			location.href="std-unclassified-marks-total-mark.html";
		}
		manageClassified();
	});
	
	 $('#DefMarkOk').on('click',function(){
		 localStorage.setItem('Defmarking','enabled');
		 $('#stdMarkDefOptionPopup').removeClass('open').addClass('close');
		 manageResp(selectedScriptID);
	 });
	
	$('.shareProv').on('click',function(){
		var selectedIndx=$(this).closest('.row').index();
		var respIndex=$($(this).parents(".grid-wrapper").find(".table-wrap-l .table-view tr")[selectedIndx]).find(".col-response .header-data a").text().trim();
		localStorage.setItem('RespID',respIndex);
		$('#rspnsID').html(respIndex);
	});
	
//	$('.notes-editor').focus(function(){
//		$(this).next('.note-placehokder').addClass('hide');
//		if($(this).val()==''){
//			
//		}
//	});
	var note;
	$('.notes-editor').focusout(function(){
//		if($(this).val()==''){
//			$(this).next('.note-placehokder').removeClass('hide');
//			
//		}
		localStorage.setItem('Note',$(this).val());
		note = localStorage.getItem('Note');
		if(note){
			$('.note-icon').addClass('exsist');
			$('.note-exsist-indication').removeClass('hide');
			//debugger;
			//console.log($('.addNoteIcon').attr('class'));
		}
	});
	
	note = localStorage.getItem('Note');
	if(note){
		$('.note-icon').addClass('exsist');
		$('.note-exsist-indication').removeClass('hide');
		//debugger;
		//console.log($('.addNoteIcon').attr('class'));
	}else{
		$('.note-exsist-indication').addClass('hide');
	}
	$('.mrk-note-icon .menu-button').on('click', function(){
		if(note){
			$('.note-placehokder').addClass('hide');
			$('.notes-editor').val(note);
		}
	});
	
	var dragging=false;
	var dragStartTimer;
	var dragStartTime;
	var rowIndex;
	var leftRowHtml;
	var rightRowHtml;
	
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		dragStartTime=300;
	}
	else{
		dragStartTime=0;
	}
	
	$(".work-list-grid.row-draggable").on("mousedown touchstart","tbody .row",function(){
		var that=$(this);
		//console.log("start")
		//alert($(this).index());
		dragStartTimer=setTimeout(function(){			
			$(".row.draggable").removeClass("draggable");
			
			if(!that.hasClass("classify-items-row") && !that.hasClass("placeholder-row")){
				rowIndex=that.index();
				$(".work-list-grid.row-draggable").addClass("allow-dragging");
				$(".table-wrap-l .row:eq("+rowIndex+"),.table-content-holder .row:eq("+rowIndex+")").addClass("draggable");				
			}
			//alert(rowIndex);
			
		},dragStartTime);
		
	});
	
	
	
	$(window).on("mouseup touchend touchcancel",function(){	
		
		/*if($(".work-list-grid.row-draggable.allow-dragging").length==0){
			console.log($(".work-list-grid.allow-dragging").length);
			
		}*/
		clearTimeout(dragStartTimer);
		if(!$("#classifiedConfirmReclassificationMarksByQnPopup").hasClass("open")){
			gridDragReset();
		}
		
	});
	$(window).on("touchmove",function(){
		clearTimeout(dragStartTimer);
		if(!$("#classifiedConfirmReclassificationMarksByQnPopup").hasClass("open") && $(".work-list-grid.row-draggable.allow-dragging").length==0){
			gridDragReset();
		}
	});
	
	
	if($(".work-list-grid.row-draggable").length>0){
		var mcRow = new Hammer($(".work-list-grid.row-draggable")[0], {
			//touchAction: "none"
		});


		//mcRow.get('tap').set({event: 'startDrag',threshold:0,time:holdTime });			
		mcRow.get('pan').set({threshold:0});			

		/*mcRow.on("tap",function(evt){
			console.log("press");
		});*/
		mcRow.on("panstart",function(evt){
			var row=$(".table-wrap-l tr.draggable");
			var tbl=$(evt.target).closest("table");
			var rowHtml;
			var hScrollbarWidth=$(".table-scroll-holder")[0].offsetWidth-$(".table-content-holder")[0].clientWidth;

			if(!row.hasClass("classify-items-row") && $(".row.draggable").length>0 && !row.hasClass("placeholder-row")){
				var l= $(".table-wrap-l .row:eq("+rowIndex+")").offset().left - $(".work-list-grid").offset().left;
				var t= $(".table-wrap-l .row:eq("+rowIndex+")").offset().top - $(".work-list-grid").offset().top;

				leftRowHtml=$(".table-wrap-l .row:eq("+rowIndex+")").html();
				rightRowHtml=$(".table-content-holder .row:eq("+rowIndex+")").html();

				rowHtml="<div class='drag-row-left-col'><table cellspacing='0' cellpadding='0' border='0' width='100%'><tr class='row'>"+leftRowHtml+"</tr></table></div><div class='drag-row-right-col'><div class='drag-row-r-inner'><table cellspacing='0' cellpadding='0' border='0' width='100%'><tr class='row'>"+rightRowHtml+"</div></div>";




				$(".dragging-row-holder").html(rowHtml);
				$(".dragging-row-holder tr td").each(function(i,obj){
					var colClass="."+$(obj).attr("class");
					colClass=colClass.replace(/\s+/g,'.');

					var w=$(".table-wrap-l .row:eq("+rowIndex+"),.table-content-holder .row:eq("+rowIndex+")").find(colClass).width();

					$(obj).css("width",w);					
				});

				$(".dragging-row-holder").css({left:l+"px",top:t+"px",maxWidth:"calc(100% - "+hScrollbarWidth+"px)"});
				$(".work-list-grid").removeClass("row-dragging").addClass("row-dragging");
			}


			//var tblContainer=$(evt.target).closest(".table-wrap-l").length>0?"table-wrap-l":"table-content-holder";

			//rowIndex=row.index();

			//console.log()

		});

		mcRow.on("panmove",function(evt){
			var obj=document.elementFromPoint(evt.center.x,evt.center.y);
			var row=$(obj).closest(".row");
			var dropIndex=row.index();
			
			//console.log($(".row.draggable").length);
			if(!row.hasClass("classify-items-row") && $(".row.draggable").length>0 && dropIndex!=-1){
				//alert("test");
				var l= $(".table-wrap-l .row:eq("+rowIndex+")").offset().left - $(".work-list-grid").offset().left;
				var t=evt.deltaY + $(".table-wrap-l .row:eq("+rowIndex+")").offset().top - $(".work-list-grid").offset().top;
				$(".dragging-row-holder").css({left:l+"px",top:(t)+"px"});
				
				//console.log(row[0])dropIndex			
				$(".row.droping").removeClass("droping after before");
				row.addClass("droping");
				$(".table-wrap-l .row:eq("+dropIndex+"),.table-content-holder .row:eq("+dropIndex+")").addClass("droping");
				//alert($(".table-wrap-l .row:eq("+dropIndex+"),.table-content-holder .row:eq("+dropIndex+")").length)
				//console.log(dropIndex);
				//debugger;
				if($(".row.droping").length>0){
					var dropingRowHeight=$(".row.droping").height();
					var dropPoint=evt.center.y-$(".row.droping").offset().top;
					//console.log(dropPoint>dropingRowHeight/2);
					if(dropPoint>dropingRowHeight/2){
						$(".row.droping").removeClass("after before").addClass("after");
					}
					else{
						$(".row.droping").removeClass("after before").addClass("before");
					}
				}
				evt.preventDefault();
				//evt.stopPropagation();
			}
		});

		mcRow.on("panend",function(evt){
			
			//alert($(".row.droping").length)
			if($(".row.droping").length>0 && !$(".row.droping").hasClass("draggable")){
				var dragGroupFrom="";
				var dragGroupTo="";
				var responseId=$(".row.draggable .col-response .header-data").text();
				var totalMark=$(".row.draggable .col-mark-obt .cell-data").text();
				var i,j;
				for(i=rowIndex; i>0; i--){					
					if($($(".table-wrap-l .row")[i]).hasClass("classify-items-row")){
						break;
					}
					
				}
				for(j=$(".table-wrap-l .row.droping").index(); j>0; j--){					
					if($($(".table-wrap-l .row")[j]).hasClass("classify-items-row")){
						break;
					}					
				}
				
				if(i>0){
					dragGroupFrom=$($(".table-wrap-l .row")[i]).find(".classify-item-text").text();
				}
				else{
					dragGroupFrom="Practice";
				}
				
				if(j>0){
					dragGroupTo=$($(".table-wrap-l .row")[j]).find(".classify-item-text").text();
				}
				else{
					dragGroupTo="Practice";
				}
				
				
				$("#classifiedConfirmReclassificationMarksByQnPopup #selResId").text(responseId);
				$("#classifiedConfirmReclassificationMarksByQnPopup #respTotalMark").text(totalMark);
				$("#classifiedConfirmReclassificationMarksByQnPopup #respGroupFrom").text(dragGroupFrom);
				$("#classifiedConfirmReclassificationMarksByQnPopup #respGroupTo").text(dragGroupTo);	
				
				if(dragGroupFrom!=dragGroupTo){
					$("#classifiedConfirmReclassificationMarksByQnPopup").removeClass("open close").addClass("open");				
				}
				else{
					dragFinished();
				}
				
			}

			/*$(".row.droping").each(function(i,obj){
				$(".row.droping").before()

			})*/
			
			

		});
		
		$("#classifiedConfirmReclassificationMarksByQnYes").on("click",function(){			
			dragFinished();
		});
		
		
		$("#classifiedConfirmReclassificationMarksByQnNo").on("click",function(){			
			$("#classifiedConfirmReclassificationMarksByQnPopup").removeClass("open").addClass("close");
			gridDragReset();
			
		});
	
	}
	
	
	function dragFinished(){
	$(".table-content-holder .row.draggable").addClass("hide");
			$(".table-wrap-l .row.draggable").addClass("hide");
			
			var leftRowToRemove=$(".table-content-holder .row.hide");
			var rightRowToRemove=$(".table-wrap-l .row.hide");
			var remainingRows=-1;
			var indx=1;
			var groupIndex=0;
			var groupMax=[2,5,5,10,5];
			
			if((rowIndex==0 || leftRowToRemove.prev().hasClass("classify-items-row") )&&(leftRowToRemove.next().hasClass("classify-items-row")||rowIndex==$(".table-wrap-l .row").length-1 )){
				remainingRows=0;
			}
			
			if($(".table-wrap-l .row.droping").hasClass("before")){
				$(".table-wrap-l .row.droping").before("<tr class='row dragabble added'>"+leftRowHtml+"</tr>");
				$(".table-content-holder .row.droping").before("<tr class='row dragabble added'>"+rightRowHtml+"</tr>");
			}
			if($(".table-wrap-l .row.droping").hasClass("after")){
				$(".table-wrap-l .row.droping").after("<tr class='row dragabble added'>"+leftRowHtml+"</tr>");
				$(".table-content-holder .row.droping").after("<tr class='row dragabble added'>"+rightRowHtml+"</tr>");
			}
			if($(".table-wrap-l .row.droping").hasClass("placeholder-row")){
				$(".table-wrap-l .row.droping").remove();
				$(".table-content-holder .row.droping").remove();
			}
			
			
			
			
			//alert($(".table-wrap-l .row").length-2)
			
				
				//alert(rowIndex)
			
			//alert(remainingRows);
			if(remainingRows==0){
				leftRowToRemove.removeClass("placeholder-row hide").addClass("placeholder-row");
				rightRowToRemove.removeClass("placeholder-row hide").addClass("placeholder-row");
			}
			else{
				leftRowToRemove.remove();
				rightRowToRemove.remove();
			}
			
			
			$(".row.droping").removeClass("droping");
			$(".row.dragabble").removeClass("dragabble");
			
			setTimeout(function(){
				$(".added.row").removeClass("added");					
				
				
				$(".table-wrap-l .row:not(.placeholder-row):not(:first-child)").each(function(i,obj){
					if($(obj).hasClass("classify-items-row") || i==$(".table-wrap-l .row:not(.placeholder-row)").length-1){
						//debugger;
						var progressRow;
						
						rowGroupName=$(obj).find(".classify-item-text").text();
						
						if(i==$(".table-wrap-l .row:not(.placeholder-row)").length-1){
							rowGroupName="end";
							if(!$($(".table-wrap-l .row")[i]).hasClass("classify-items-row")){
								indx++;							
							}
						}
						
						progressRow=$($(".std-progress-holder .bottom-menu-group .std-progress-item")[groupIndex]);						
						progressRow.find(".classification-progress").text((indx-1) + "/" + groupMax[groupIndex]);
						
						//console.log((indx-1) + "-" + groupMax[groupIndex]);
						if((indx-1)>=groupMax[groupIndex]){
							 
							progressRow.find(".menu-count").html("").removeClass("menu-count").addClass("sprite-icon tick-circle-icon classification-progress-indicator");
						}
						
							if((indx-1)>groupMax[groupIndex]){
							 
							progressRow.find(".tick-circle-icon").html("").removeClass("menu-count").addClass("sprite-icon tick-circle-waring-icon classification-progress-indicator");
						}
						
						if((indx-1)<groupMax[groupIndex]){
							 
							progressRow.find(".tick-circle-icon").removeClass("tick-circle-icon sprite-icon ").addClass("menu-count ").html('<span class="sprite-icon classification-progress-indicator dot-dot-dot-icon">0</span>');
						}
						
						
						if(rowGroupName=="end"){
							progressRow=$($(".std-progress-holder .bottom-menu-group .std-progress-item")[groupIndex+1]);							
							progressRow.find(".classification-progress").text(0 + "/" + groupMax[groupIndex+1]);
							
							if((indx+1)>=groupMax[groupIndex+1]){
								 
								progressRow.find(".menu-count").html("").removeClass("menu-count").addClass("sprite-icon tick-circle-icon classification-progress-indicator");
							}
							if((indx+1)<groupMax[groupIndex+1]){
						 
								progressRow.find(".tick-circle-icon").removeClass("tick-circle-icon sprite-icon ").addClass("menu-count ").html('<span class="sprite-icon classification-progress-indicator dot-dot-dot-icon">0</span>');
							}
						}
						
						
						if($(".std-progress-holder .bottom-menu-group .std-progress-item .tick-circle-icon").length>=3){
							$(".classification-complete-button").removeAttr("disabled");
						}
						else{
							$(".classification-complete-button").attr("disabled","disabled");
						}
						indx=1;
						groupIndex++;
					}
					else{
						if(rowGroupName=="Seed" || rowGroupName=="STM Seed"){							
							$(obj).find(".classify-index").text(rowGroupName);
						}
						else{
							$(obj).find(".classify-index").text(indx);
						}
						indx++;
					}
				});	
				
			},300);
			
			
			
			$("#classifiedConfirmReclassificationMarksByQnPopup").removeClass("open").addClass("close");				
			
			var rowGroupName="Practice";
			
			gridDragReset();
}
	
}

function gridDragReset(){	
	$(".work-list-grid.row-draggable").removeClass("allow-dragging");
	$(".work-list-grid.row-dragging").removeClass("row-dragging")
	$(".row.draggable").removeClass("draggable");	
}
function manageClassified(){
	var currentPage = loc.pathname.substring(loc.pathname.lastIndexOf('/')+1);
	var classifiedSts=localStorage.getItem('ClsifyStatus');
	if(classifiedSts=="classified"){
		//$('.clasify-ready').addClass('hide');
		$('.qulCount').html(3);
		$('.seedCount').html(1);
	}
}

function manageResp(cid){
	var responseStste = localStorage.getItem('ResponseState');
	
	var defMarkingSts=localStorage.getItem('Defmarking');
	var currentPage = loc.pathname.substring(loc.pathname.lastIndexOf('/')+1);
	var rspid=localStorage.getItem('RespID');
	
	if(responseStste =="readOnly" && currentPage=="std-response.html"){
		$('.content-wrapper').addClass('closed-response');
		$('.active-question-button-holder, .active-question-mark, .marking-tools-panel, .question-panel-header, .exception-icons, .new-msg-icons, .tag.dropdown-wrap, .mark-percentage-holder, .total-mark-holder, .note-icon, .discard-icon').addClass('hide');
		$(':not(.header-dropdown) > .breadcrumb-anchor').html("Std setup worklist").attr('href','std-sel-response.html');
		$('.reponse-id-label#responseIdNum').html("Script "+cid );
		$('.resp-pos-label').html("centre");
	}else if(responseStste =="readOnly" && currentPage=="std-reuse-response.html"){
		$('.reponse-id-label#responseIdNum').html("Script "+cid );
		$('.content-wrapper').addClass('closed-response');
		$('.script-pos').html(localStorage.getItem('curr-row-index')+" of "+localStorage.getItem('row-count'));
		$(':not(.header-dropdown) > .breadcrumb-anchor').html("Select responses").attr('href','std-sel-response.html');
		//1 of 8 in 
	}else if(responseStste =="ProvisionalMarking" && currentPage=="std-response.html"){
		$('.content-wrapper').removeClass('closed-response');
		$('.active-question-button-holder, .active-question-mark, .marking-tools-panel, .question-panel-header, .exception-icons, .new-msg-icons, .tag.dropdown-wrap, .mark-percentage-holder, .total-mark-holder, .note-icon, .discard-icon').removeClass('hide');
		$(':not(.header-dropdown) > .breadcrumb-anchor').html("Provisional").attr('href','std-provisional-marking-total-mark.html');
		if(rspid){
			$('.reponse-id-label').html("Response "+rspid);
		}else{
			$('.reponse-id-label').html("Response 6902049");
			localStorage.setItem('RespID','6902049');
		}
		$('.resp-pos-label').html("worklist");
		$('#stdSelRespPopup').addClass('close').removeClass('open');
		$('.std-slct-to-mrk').addClass('hide');
		
	}else if(currentPage=="std-unclassified-def-response.html"){
		$(':not(.header-dropdown) > .breadcrumb-anchor').html("Unclassified").attr('href','std-unclassified-marks-total-mark.html');
		if(rspid){
//			$('.reponse-id-label').html("Response "+rspid);
		}else{
//			$('.reponse-id-label').html("Response 6902049");
//			localStorage.setItem('RespID','6902049');
		}
		if(defMarkingSts =="notEnabled"){
		 	$('.content-wrapper').addClass('closed-response');
			$('.active-question-button-holder, input.active-question-mark, .marking-tools-panel, .question-panel-header, .tag.dropdown-wrap, .mark-percentage-holder').addClass('hide');
			$('label.active-question-mark').removeClass('hide');
		}else if(defMarkingSts =="enabled"){
			$('.content-wrapper').removeClass('closed-response');
			$('.active-question-button-holder, input.active-question-mark, .marking-tools-panel, .question-panel-header, .tag.dropdown-wrap, .mark-percentage-holder, #mrk-DefClassifyBtn').removeClass('hide');
			$('label.active-question-mark').addClass('hide');
			$('#mrk-Def, .def-mark .message-box').addClass('hide');
		}
		
	}
	//alert(currentPage)
	if((currentPage=="std-response.html")){		
		$(".mark-version.cur .mark").each(function(i,obj){
			$(this).attr("data-mark-entered",$(this).text());
		});
		$(".mark-version.cur .mark").text("");
		
		if($('.marking-question-panel').length>0){
			navigateQuestion(0);
		}
	}
	else{
		
		$(".mark-version.cur .mark").each(function(i,obj){
			$(this).text($(this).attr("data-mark-entered"));
		});
		if($('.marking-question-panel').length>0 && $(".active-question").length>0){
			navigateQuestion(5);
			/*if(defMarkingSts =="eEnabled"){
				$('#active-question-mark-selector').val("");
			}*/
		}
	}
	if(responseStste && responseStste!="readOnly"){
		//if(responseStste!="readOnly"){
			var dNow = new Date();
			var hours = dNow.getHours();
			var minutes = dNow.getMinutes();
			var ampm = hours >= 12 ? 'AM' : 'PM';
			hours = hours % 12;
			hours = hours ? hours : 12;
			minutes = minutes < 10 ? '0'+minutes : minutes;
			var localdate= "<span class='dim-text txt-val small-text'>"+(dNow.getMonth()+1) + '/' + dNow.getDate() + '/' + dNow.getFullYear() + ', ' + hours + ':' + minutes+'&nbsp;'+ampm+"</span>";
			$('#currentDate').text(localdate);
			$('#provNewRow-r, #provNewRow-l').removeClass('hide');
			$('.panel.provisional .menu-count').html(5);
			$('#provNewRow-r .col-modified .cell-data').html(localdate);
		
			//alert("k")
		//}
	}
}


function curvePath(data, k) {

  if (k == null) k = 1;
  
  var size = data.length;
  var last = size - 4;    

  var path = "M" + [data[0], data[1]];

  for (var i = 0; i < size - 2; i +=2) {

    var x0 = i ? data[i - 2] : data[0];
    var y0 = i ? data[i - 1] : data[1];

    var x1 = data[i + 0];
    var y1 = data[i + 1];

    var x2 = data[i + 2];
    var y2 = data[i + 3];

    var x3 = i !== last ? data[i + 4] : x2;
    var y3 = i !== last ? data[i + 5] : y2;
    
    var cp1x = x1 + (x2 - x0) / 6 * k;
    var cp1y = y1 + (y2 - y0) / 6 * k;

    var cp2x = x2 - (x3 - x1) / 6 * k;
    var cp2y = y2 - (y3 - y1) / 6 * k;
   
    path += "C" + String(cp1x)+","+String(cp1y)+ " "+String(cp2x)+","+String(cp2y)+" "+String(x2)+","+String(y2);
  } 

  return path;
}

function find_angle(p0,p1,c) {
    var p0c = Math.sqrt(Math.pow(c.x-p0.x,2)+
                        Math.pow(c.y-p0.y,2)); // p0->c (b)   
    var p1c = Math.sqrt(Math.pow(c.x-p1.x,2)+
                        Math.pow(c.y-p1.y,2)); // p1->c (a)
    var p0p1 = Math.sqrt(Math.pow(p1.x-p0.x,2)+
                         Math.pow(p1.y-p0.y,2)); // p0->p1 (c)
    return Math.acos((p1c*p1c+p0c*p0c-p0p1*p0p1)/(2*p1c*p0c));
}

function createDynamicStyle(){
	var currentZoomValue=700;
	var cssDef=".marksheet-holder{font-size:"+(36/700)*currentZoomValue+"px; width:"+currentZoomValue+"px;}";
		cssDef+="@media screen and (max-width: "+((currentZoomValue*2)-1  + ($(window).width() - $('.marksheet-content-holder').width())+20)+"px){";
			cssDef+=".marksheet-view-holder{width:"+currentZoomValue+"px;}";
		cssDef+="}";
		cssDef+="@media screen and (min-width:"+((currentZoomValue*2)-1  + ($(window).width() - $('.marksheet-content-holder').width())+20+1)+"px){";
			cssDef+=".marksheet-view-holder{width:"+currentZoomValue*2+"px;}";
			cssDef+=".marksheet-holder.suppressed{display:block;}";
			cssDef+=".marksheet-holder:first-child{margin-left: "+currentZoomValue+"px;}";
		cssDef+="}";
		
	$("#dynamicCSS").html(cssDef);
}

function positionCommentLine(line,annotationElm,commentBox){
	var x1,y1,x2,y2;
	var container=commentBox.parents(".comment-wrapper");
	var marksheetContainer=$(".marksheet-container");
	var fg=commentBox.parents(".comment-box-holder").find("#fg");
	var lineHolder=line.closest(".comment-line-holder");
	//var maskSvg=commentBox.parents(".comment-wrapper").find(".mask-svg");
	var maskObjStr=commentBox.parents(".comment-box-holder").find(".comment-connector").attr("mask");
	maskObjStr=maskObjStr.replace(/['"]+/g, ''); //removing double quote in IE
	
	maskObjStr=String(maskObjStr.slice(5,maskObjStr.length-1));
	var marksheetHolder=annotationElm.parents(".marksheet-holder");
	//alert(maskObjStr);
	var hideAreaId=$("#"+maskObjStr).find("use").attr("xlink:href");
	var maskSvg=$(hideAreaId).find(".mask-svg");
	var xx,yy;
	
	if($(".content-wrapper").hasClass("on-page")){
	xx=(100*(annotationElm.offset().left-58)/container.innerWidth());
	yy=(100*(annotationElm.offset().top-55)/container.innerHeight());
	
	}
	else if($(".content-wrapper").hasClass("side-page")){
		xx=(100*(annotationElm.position().left)/marksheetHolder.innerWidth());
		yy=(100*(annotationElm.position().top-marksheetContainer.scrollTop())/marksheetHolder.innerHeight());		
	}
	
	if($(".content-wrapper").hasClass("on-page")){
		x1=100*(annotationElm.offset().left-58+annotationElm.width()/2)/container.innerWidth()+"%";
		y1=100*(annotationElm.offset().top-60+annotationElm.height()/2)/container.innerHeight()+"%";
		
		x2=100*(commentBox.offset().left-58+commentBox.width()/2)/container.innerWidth()+"%";
		y2=100*(commentBox.offset().top-60+commentBox.height()/2)/container.innerHeight()+"%";		
	}
	else if($(".content-wrapper").hasClass("side-page")){	
		
		svgX=100*(annotationElm.position().left+annotationElm.width()/2)/marksheetHolder.innerWidth()+"%";
		x1=0;
		y1=100*(annotationElm.position().top-marksheetContainer.scrollTop()+annotationElm.height()/2)/marksheetHolder.innerHeight()+"%";
		
		x2=100+"%";
		y2=commentBox.position().top+commentBox.height()/2;	
		
		lineHolder.css("left",svgX);
	}
	/*else if($(".content-wrapper").hasClass("side-page")){
		x1=100*(annotationElm.offset().left-marksheetHolder.offset().left-58+annotationElm.width()/2)/container.innerWidth();
		y1=100*(annotationElm.offset().top-marksheetHolder.offset().top-60+annotationElm.height()/2)/container.innerHeight();
		
		x2=100*(commentBox.offset().left-marksheetHolder.offset().left+commentBox.width()/2)/container.innerWidth();
		y2=100*(commentBox.offset().top-marksheetHolder.offset().top-60+commentBox.height()/2)/container.innerHeight();
	}
	*/
	
//console.log("aa-"+ commentBox.parents(".comment-wrapper").innerHeight());
	//line.css({"x1":x1+"%","x2":x2+"%","y1":y1+"%","y2":y2+"%"});
	
	
	line.attr("x1",x1);
	line.attr("y1",y1);
	line.attr("x2",x2);
	line.attr("y2",y2);
	
	//alert(fg.length);
	
	maskSvg.attr("x",(xx+0.8)+"%");
	maskSvg.attr("y",+(yy+0.8)+"%");
	
	
	
	//alert(container.length);
}

function getRotationDegrees(obj) {
    var matrix = obj.css("-webkit-transform") ||
    obj.css("-moz-transform")    ||
    obj.css("-ms-transform")     ||
    obj.css("-o-transform")      ||
    obj.css("transform");
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    } else { var angle = 0; }
    return (angle < 0) ? angle + 360 : angle;
}

function expandCollapseMarkingPanel(panel,autoNavigate){
	if(autoNavigate === undefined) {
		  autoNavigate = false;
	   }
	//alert(panel.hasClass("freeze"));
	if(!panel.hasClass("freeze") && panel.hasClass("expandable")){
			var markPanelHeight=$(".question-panel")[0].offsetHeight;
			var listHeight=$(".question-group-container")[0].offsetHeight;
			var animationTime;			
			
			var itemHeight=32;
			var topValuePx=markPanelHeight/2;
			var bottomValuePx=(listHeight-topValuePx);
			
			var clickedIndex=panel.index(".question-group-container li");
			var currentIndex=$(".question-group-container .question-list.current").index(".question-group-container li");
			var current_pull = parseInt($('.question-group-container').css('transform').split(',')[5]);
			
			var listCount=$(">.question-group>.question-list,>.question-group .question-list>.question-group>.question-list",panel).length;
			var panelHeight=(listCount*itemHeight)+1;	
			var previousOpenedPanel=$(".question-list.expandable:not(.close)");
		
			if(autoNavigate){
				animationTime=0;
			}
			else{
				animationTime=300;
			}
		
			$(">.question-group",panel).css({"max-height":panelHeight+"px"});
			//debugger;
			//console.log(panelHeight);
			if(clickedIndex<currentIndex){ //if above									
				$(".question-group-align-holder").css({"top":"auto","bottom":-bottomValuePx+"px"});
				
				setTimeout(function(){
					$(".question-group-align-holder").css({"top":"50%","bottom":"auto"});
					$(".question-group-container").addClass("no-animation");
					
					if(panel.hasClass("open")){																	
						$(".question-group-container").css("transform","translateY("+(current_pull-panelHeight)+"px)");
					}
					else{											
						 $(".question-group-container").css("transform","translateY("+(current_pull+panelHeight)+"px)");
					}
					setTimeout(function(){
						$(".question-group-container").removeClass("no-animation");
					},animationTime);
				},animationTime);
			}
			
			
			if(!panel.hasClass("close")){					
				panel.removeClass("open").addClass("close");				
			}
			else{
				
				panel.removeClass("close").addClass("open");
				
				setTimeout(function(){					
					$(">.question-group",panel).css({"max-height":"none"});	
					//console.log("done");
					var questionActivate=$($(".question-group-container .question-list")[clickedIndex+2]);
					//alert(clickedIndex);
					//alert(questionActivate.text())
					//alert(clickedIndex+2)
					var questionListQuery=".question-group-container .question-list:not(.has-sub)";
					//console.log(questionActivate.length);
					//var questionIndex=$()
					//alert($(".question-group-container").css("transition"));
					
					setTimeout(function(){						
						//alert(questionActivate.index(questionListQuery));
						if(autoNavigate){
							navigateQuestion(questionActivate.index(questionListQuery));
							setTimeout(function(){
								//alert(previousOpenedPanel.length);
								expandCollapseMarkingPanel(previousOpenedPanel,false);			   
							},animationTime);
						}
						else{
							expandCollapseMarkingPanel(previousOpenedPanel);
						}
						
						//alert(panel.hasClass("freeze"));
					},animationTime);
					//expandCollapseMarkingPanel($(".question-list.open"));
					//alert(clickedIndex);
					//console.log(panel[0]);
				},animationTime);
			}
	}
				
}
function activateMarkingPanel(li){
	var listQuery=".question-group-container .question-list:not(.has-sub)";
	var disabled=false;
	if(li.index(listQuery)<=-1 || li.index(listQuery)>=$(listQuery).length){
		disabled=true;
	}
	//console.log(disabled);
	//console.log("activateMarkingPanel")
	if(!disabled && li.parents(".popup").length==0){
		var itemHeight=32;
		var activeHeight;	
		//debugger;
		var listIndex=li.index(".question-group-container>li,.question-group-container>li:not(.close) ul>li")-1;
		var mark;
		//console.log(li.index(".question-group-container li:not(.close)>ul>li"));
		//alert(li[0]);
		console.log(listIndex);
		if(li.parents(".closed-response").length!=0 || li.parents(".messaging").length!=0){
			activeHeight=106-40;
		}
		else{
			activeHeight=106;
		}
		/*var listCount=$(".question-group-container>li,.question-group-container li.open li").length;*/
		
		var marginTop=-((activeHeight/2)+itemHeight+listIndex*itemHeight);
		
		$(".question-group-container").css({"transform":"translateY("+marginTop+"px)","-webkit-transform":"translateY("+marginTop+"px)"});
		
		$(".question-group-container .freeze").removeClass("freeze");
		li.parents(".question-list").removeClass("freeze").addClass("freeze");
		
		$(".question-group-container li.current").removeClass("current");
		li.addClass("current"); 
		
		mark=li.find(".question-mark .mark-version.cur").text().split("/");
		$(".active-question-text").text(li.find(".question-text").text());
		
		if(mark[0]!="-"){			
			$(".active-question-mark").text(mark[0]).val(mark[0]);
		}
		else{
			$(".active-question-mark").text("").val("");
		}
		$(".active-question-total-mark").text(mark[1]);
		if($(".active-question-mark").length>0){
			$(".active-question-mark")[0].focus();
		}
		
		$(".question-nav.disabled").removeClass("disabled");
				//alert(parseInt(li.find(".mark-total").text(),10));
//		generateMarkingBubble(parseInt(li.find(".mark-total").text(),10));
	}
	
	//console.log(li.index(listQuery))
	if(li.index(listQuery)<=0){
		$(".prev-question-btn").removeClass("disabled").addClass("disabled");			
	}
	else if(li.index(listQuery)>=$(listQuery).length-1){
		$(".next-question-btn").removeClass("disabled").addClass("disabled");	
	}	
}

function navigateQuestion(index){
	var listQuery=".question-group-container .question-list:not(.has-sub)";
	/*var currentIndex=$(".question-list.current").index(listQuery);*/
	var li=$($(listQuery)[index]);
	var expandDuration=300;
	//console.log(li.text());
	var parentPanel=li.closest(".question-list.has-sub");
	var disabled=false;
	var previousOpenedPanel=$(".question-list.expandable:not(.close)");
	var previousIndex=previousOpenedPanel.index(".question-list.expandable");
	
	if(li.index(listQuery)<=-1 || li.index(listQuery)>=$(listQuery).length){
		disabled=true;
	}
   // console.log(disabled)
	
	if(!disabled){
		var enterPanel=false;
		var prevPanel;
		
		//console.log(parentPanel.parents(".expandable")[0]);
		prevPanel=$(".question-list.expandable:not(.close)").not(parentPanel.closest(".expandable")[0]);		
		//console.log(prevPanel.length)
		/*if(prevPanel.length>0){	
			//console.log(parentPanel.closest(".close")[0])
			enterPanel=true;
			//prevPanel=$(".question-list.expandable:not(.close)");
			//alert(prevPanel.length)
			setTimeout(function(){
				//parentPanel.parents(".question-list.has-sub").removeClass("close").addClass("open");
				expandCollapseMarkingPanel(parentPanel);
				setTimeout(function(){
					expandCollapseMarkingPanel(prevPanel);
				},expandDuration);
			},expandDuration);
			
		}*/
		//alert(enterPanel)
		
		if(li.closest(".question-list.close").length>0){
			expandCollapseMarkingPanel(li.closest(".question-list.close"),false);
			/*li.closest(".question-list.expandable.close>.question-group").css({"max-height":"none"});
			li.closest(".question-list.expandable.close").removeClass("close").addClass("open");
			
			currentPanelIndex=li.closest(".question-list.expandable").index(".question-list.expandable")
			console.log(currentPanelIndex);
			if(previousIndex<currentPanelIndex){ //if above	
				//alert("ok");
				
			}
			previousOpenedPanel.removeClass("open").addClass("close");
			previousOpenedPanel.find(">.question-group").css({"max-height":0});			
			*/
			
			setTimeout(function(){
				activateMarkingPanel(li);
			},expandDuration);
			
		}
		else{
			activateMarkingPanel(li);
		}
		/*if(parentPanel.hasClass("close") || parentPanel.hasClass("expandable")){
			//expandCollapseMarkingPanel(parentPanel);
			setTimeout(function(){
				activateMarkingPanel(li);
				console.log(enterPanel);*/
				/*if(enterPanel){
					
					setTimeout(function(){
						expandCollapseMarkingPanel(prevPanel);
					},animationTime);
				}*/
				
			/*},expandDuration);
		}
		else{*/
		//	activateMarkingPanel(li);
		//}
	}
}
/* Provisory for UI dev environment: *//* localStorage.clear();*/


//
//function markFeedback(mark){
//	 var markFeedback=$(".mark-feedback");
//	
//	 markFeedback.attr("class","mark-feedback");
//	 markFeedback.addClass("digit-"+(mark.length));
//	
//	 markFeedback.find(".mark-txt").text(mark);	 
//	 if(mark!=""){
//		 markFeedback.removeClass("animate");
//		 setTimeout(function(){
//			 markFeedback.addClass("animate");
//		 },0);
//	 }
//}

	 		
		/*Marking*/
//function generateMarkingBubble(maxMark){
//	var htmlStr="";
//	
//	for(var i=maxMark;i>=0;i--){
//		htmlStr+="<a href='#' class='mark-button'>"+i+"</a>";
//	}
//	//htmlStr+="<a href='#' class='mark-button nr-button'>NR</a>";
//	//htmlStr+="<a href='#' class='mark-button-nav down' title='Previous'><span class='sprite-icon bottom-arrow-blue'>down</span></a>";
//	$(".mark-button-wrapper").html(htmlStr); 
//	
//	setMarkBubbleView();
//}
//function setMarkBubbleView(){
//	var buttonWrapper=$(".mark-button-mask");
//	var buttonExclude=$(".mark-button.close",buttonWrapper).nextUntil(".mark-button.group-start").add(".mark-button.close",buttonWrapper);
//	var button=$(".mark-button",buttonWrapper).not(buttonExclude);
//	//debugger;
//	var buttonWrapperHeight=buttonWrapper.innerHeight();
//	var markButton=$(".mark-button-wrapper .mark-button");
//	//var markButton=button;
//	var startMarkingButton=$(".mark-button.start-view");
//	var markButtonHeight=46+12; // height including margin
//	var markButtonCount=button.length;
//	var startIndex=button.index(startMarkingButton);
//	//var startIndex=startMarkingButton.index(".mark-button-wrapper .mark-button");
//	//alert(startIndex);
//	var endIndex=$(".mark-button.end-view").index(".mark-button-wrapper .mark-button");
//	var closedButtonCount;
//	//var viewBubbleCount=Math.floor((buttonWrapperHeight+12)/markButtonHeight)+1;
//	var viewBubbleCount=Math.floor((buttonWrapperHeight)/markButtonHeight);
//	//alert(viewBubbleCount);
//	
//	if(startIndex==-1){	
//		startIndex=button.length-1;		
//	}
	
	//if(startIndex>=viewBubbleCount){
//		endIndex=startIndex-viewBubbleCount+1;
//		//alert(startIndex+","+endIndex)
//	}
//	else{
//		endIndex=0;
//	}
//	if(endIndex>0){
//		$(".mark-button-nav.up.disabled").removeClass("disabled");
//		$(".mark-button-nav.up").removeClass("hide");
//		$(".mark-entry").removeClass("hide");
//	}
//	else{		
//		$(".mark-button-nav.up").removeClass("disabled").addClass("disabled");
//		if(markButtonCount<=viewBubbleCount){
//			$(".mark-button-nav.up").removeClass("hide").addClass("hide");
//			$(".mark-entry").removeClass("hide").addClass("hide");
//		}
//	}
	
	//alert(startIndex);
	//if(startIndex<markButtonCount-1){
//		$(".mark-button-nav.down.disabled").removeClass("disabled");		
//	}
//	else{
//		$(".mark-button-nav.down").removeClass("disabled").addClass("disabled");		
//	}
	//debugger;
	//alert(endIndex);
	//if(endIndex<0){
		//startIndex=endIndex+viewBubbleCount;
	//}
	//alert(startIndex+","+endIndex)
//	$(".mark-button.end-view").removeClass("end-view");
//	$(button[endIndex]).addClass("end-view");
//	
//	$(".mark-button.start-view").removeClass("start-view");
//	$(button[startIndex]).addClass("start-view");
//	
//}

/*function changeCommentView(view){
			var commentWrapper=$(".comment-wrapper");
			var widthDifference
			var ratio;
			
			commentWrapper.each(function(){
				widthDifference=$(window).width()-$(this).width();
				if(view=="onpage"){
					$(this).css({"width":"calc(100% - "+ widthDifference+"px)", "padding-top":"calc("+ratio+"*(100% - "+widthDifference+"px))"});	
				}
				else if(view=="offpage"){
					$(this).css({"width":"calc(100% - "+ widthDifference+"px)", "padding-top":"calc("+ratio+" * 100%)"});	
				}
			});
		}*/

		
function setToolbarCol(){
	var toolPanel=$(".tool-panel");
	var currentCol=toolPanel.length>0?toolPanel.attr('class').match(/\bcol-(\d+)\b/)[1]:1;
	var toolTray=$(".marking-tool-tray");
	var toolCount=$(".tool-wrap",toolTray).length;
	var tool=$(".tool-wrap",toolTray);
	var toolHeight=tool.outerHeight()+parseInt(tool.css("margin-top"));
	var toolTrayHeight=toolTray.height();
	var toolsPerCol=Math.floor(toolTrayHeight/toolHeight);	
	var colCount=Math.ceil(toolCount/toolsPerCol);

	if(currentCol!=colCount && toolTrayHeight>=toolHeight && !isNaN(colCount)){
		toolPanel.removeClass("col-"+currentCol).addClass("col-"+colCount);
	}
	
	//console.log("col-"+currentCol+ ","+"col-"+colCount);
	 
}

function detectPlatform(){
	    // Opera 8.0+
	var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		// Firefox 1.0+
	var isFirefox = typeof InstallTrigger !== 'undefined';
		// At least Safari 3+: "[object HTMLElementConstructor]"
	var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		// Internet Explorer 6-11
	var isIE = /*@cc_on!@*/false || !!document.documentMode;
		// Edge 20+
	var isEdge = !isIE && !!window.StyleMedia;
		// Chrome 1+
	var isChrome = !!window.chrome && !!window.chrome.webstore;
		// Blink engine detection
	var isBlink = (isChrome || isOpera) && !!window.CSS;
	
	
	var browser="";
	if(isOpera){
		browser="opera";	
	}
	if(isFirefox){
		browser="firefox";	
	}
	if(isSafari){
		browser="safari";	
	}
	if(isIE){
		browser="IE";	
	}
	if(isChrome){
		browser="chrome";	
	}
	if(isBlink){
		browser="blink";	
	}
	
	$("html").attr("class",browser);
}

$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function( elem ) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});