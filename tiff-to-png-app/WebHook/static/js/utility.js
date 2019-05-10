/* v2 - 03.03.2015:05.00*/

$(document).ready(function () {
    $('html').on("touchstart", function () {
        /iP/i.test(navigator.userAgent) && $('html').css('cursor', 'pointer'); // making <html> clickable in ipad	   

    })

	$('body').on('keydown', function (event) {
        if (event.which === 13) {           
			if(typeof $(':focus').tagName !="undefined"){
	            if ($(':focus')[0].tagName == 'DIV' || $(':focus')[0].tagName == 'SPAN' || $(':focus')[0].tagName == 'LI')
	            {
	                $(':focus').click();              
	            }
	            else if ($(':focus')[0].tagName == 'A')
	            {
	                if (typeof $(':focus').attr('href') === "undefined") {                   
	                    $(':focus').click();
	                }
	            }           
			}
        }
    });
    
});


/*Slide(flexible)*/
function setMinimumHeight(slider){
		var hSlideCount=$(".horizontal-slide", slider).length,maxH=0,slide,selectorStr,style,isHidden;
		
		for (var i = 0; i < hSlideCount; i++) {
			slide = $($(".horizontal-slide", slider).get(i));
			isHidden=slide.hasClass("hide");
			if(isHidden){
				slide.removeClass("hide");
			}
			maxH=slide.height()>maxH?slide.height():maxH;             
			if(isHidden){
				slide.addClass("hide");
			}              
		}
				
		selectorStr='.'+slider.attr('class').split(' ').join('.')+" .horizontal-slide";
		
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = selectorStr+'{ min-height: '+maxH+'px; }';
		slider[0].appendChild(style);      
                
}
                
function initHSlide(speed) {
$('.carousel-slide-nav').remove();
    $(".horizontal-carousel-container").each(function () {
        var slideMask = $(".horizontal-carousel-mask", $(this));
        var hSlide = $(".horizontal-slide", $(this));
        var hSlideCount = hSlide.length;
        var totalWidthPercentage = hSlideCount * 100;
        var leftNav = $(".nav-left", slideMask);
        var rightNav = $(".nav-right", slideMask);
        var position = 0;
        var slide;
		var autoCarouselTimer;
		var carouselSlideNavStr="<ul class='carousel-slide-nav'>";
		
		$(hSlide.get(0)).addClass("active");
                                
        var w, l;
        for (var i = 0; i < hSlideCount; i++) {
            slide = $($(".horizontal-slide", $(this)).get(i));
            w = 100 / hSlideCount;
            l = i * 100;
			
			if(i==0){
				carouselSlideNavStr+="<li class='active' tabindex='0' aria-controls='slide0'></li>";                 
			}
			else{
				carouselSlideNavStr+="<li tabindex='0'  aria-controls='slide"+i+"'></li>";
			}
        }
		setMinimumHeight($(this));
		
		carouselSlideNavStr+="</ul>";
		
		slideMask.append(carouselSlideNavStr);
		var carouselSlideNav=$(".carousel-slide-nav",slideMask);
		var carouselSlideNavLi=$("li",carouselSlideNav);
		carouselSlideNavLi.bind("click",function(){
			if(!$(this).hasClass("active")){
				var navIndex=$(this).index();
				position=navIndex*100*-1;
				
				navigateCarousel(position, slideMask);                                 
				clearTimeout(autoCarouselTimer);
				if(typeof speed!="undefined"){
					autoNavigateCarousel(speed);
				}
			}
		});

        leftNav.hide();
        leftNav.bind("click", function () {
            if ((-1 * position) > 0) {
                position += 100;
                                                                
            }
			else{
				position = 0;
			}
			navigateCarousel(position, slideMask); 
			clearTimeout(autoCarouselTimer);
			if(typeof speed!="undefined"){
				autoNavigateCarousel(speed);
			}
        });

        rightNav.bind("click", function () {
            if ((-1 * position) < (totalWidthPercentage - 100)) {
                position -= 100;
                
            }
			else{
				position=0;
			}
			navigateCarousel(position, slideMask);
			clearTimeout(autoCarouselTimer);
			if(typeof speed!="undefined"){
				autoNavigateCarousel(speed);
			}
                                                
        });
		
		if(typeof speed!="undefined"){
						autoNavigateCarousel(speed);
		}
                                
		function autoNavigateCarousel(speed){
			autoCarouselTimer=setTimeout(function(){
				if ((-1 * position) < (totalWidthPercentage - 100)){
								position -= 100;
				}
				else{
								position =0;
				}
				navigateCarousel(position, slideMask);
				autoNavigateCarousel(speed);                                                 
			},speed);
		}
    });
}




function navigateCarousel(toPos, carousel) {
    var slideWrap = $(".horizontal-carousel-wrap", carousel);
    var slide = $(".horizontal-slide", slideWrap);
	var carouselSlideNav=$(".carousel-slide-nav",carousel);
	var currentSlide=((-1*toPos/100));          

    var leftNav = $(".nav-left", carousel);
    var rightNav = $(".nav-right", carousel);

    var fadeSpeed = 200;

    if (toPos === 0) {
        leftNav.fadeOut(fadeSpeed);
    } else {
        leftNav.fadeIn(fadeSpeed);
    }

    if (-1 * toPos === (slide.length - 1) * 100) {
       rightNav.fadeOut(fadeSpeed);
    } else {
        rightNav.fadeIn(fadeSpeed);
    }
                
	var prevSlide=($(".horizontal-slide.active",slideWrap).index()); 

					
	
	$(slide.get(currentSlide)).removeClass("hide");	
	$(slide.get(currentSlide)).addClass("active"); 
	    	
	$(slide.get(prevSlide)).removeClass("active");   
	$(slide.get(prevSlide)).removeClass("hide").addClass("hide");
	
	$("li.active",carouselSlideNav).removeClass("active");
	
	$($("li",carouselSlideNav).get(currentSlide)).addClass("active");
}
/*Slider End*/
