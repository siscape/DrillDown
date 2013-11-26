(function($){
    var prevNum = 0;
    var updateScheduled = false;
    var rcount = false;



    initScroll=function(){
        var mainList = $('#Products'); //Get the container



        listView = new infinity.ListView(mainList, { //Inititalize infinity
            lazy: function() { //With the lazy load callback
                $(this).find('li').each(function() {
                    var $ref = $(this);
                    //$ref.attr('src', $ref.attr('data-original')); //Set the img source from a string hard coded into the data-original attribute.
                });
            }
        });

        mainList.data('listView', listView); //Use jQeary Data to set our list to the element as a conveniance.
        load(25); //Load a 100 images!


        $('#demo-container ul').on('scroll', function() {

            //alert( $(this).scrollTop());
            if(!updateScheduled) {
                setTimeout(function() {
                    var spinner=$('.spinner');
                    if(onscreen(spinner,$(this)))
                        load(25); //if we are at the page bottom add 250 more images!

                    updateScheduled = false;
                }, 500);
                updateScheduled = true;
            }
        });

    }
    function onscreen($el, $item) {
        var viewportBottom = $item.scrollTop() + $item.height();
        return $el.offset().top <= viewportBottom;
    }
//
//Master append function.
//

    load=function(num){
        var mainList = $('#Products');

        $.ajax({
            type: "POST",
            url: "returnHTML",
            dataType: 'html',
            data: { max : num, offset: prevNum},
            success: function(data) {
                //$('#Products').append(data);
                mainList.data('listView').append(data);
                //mainList.data('listView').append('<li id="spacer" style="height:1000px;"></li>');
                prevNum += num;

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                debugger;
            }
        });



    }
    /*load=function(num){

        var mainList = $('#Products');


        rcount = false

            $.ajax({
                type: "POST",
                url: "returnJson",
                data: { max : num,
                    offset :prevNum,
                    rcount: rcount},
                dataType: "",
                success: function(dataReceived,textStatus){

                    var data =   dataReceived.list1+dataReceived.list2+dataReceived.list3;

                    mainList.data('listView').append(data);
                    prevNum+=num;

                    //updateDrillDown(dcDrilldownObj,dcWrapper);



                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    debugger;
                }
            });

    }*/



//
//Simple logic to check when the page bottom is reached. Sourced from main example at: http://airbnb.github.io/infinity/demo-on.html
//


	//define the new for the plugin and how to call it
	$.fn.dcDrilldown = function(options) {

		//set default options
		var defaults = {
			classWrapper	: 'dd-wrapper',
			classMenu		: 'dd-menu',
			classParent		: 'dd-parent',
			classParentLink	: 'dd-parent-a',
			classActive		: 'active',
			classHeader		: 'dd-header',
			eventType		: 'click',
			hoverDelay		: 300,
			speed       	: 'fast',
			showCount		: true,
			classCount		: 'dd-count',
			classIcon		: 'dd-icon',
			resetText		: 'All',
			headerTag		: 'h3',
			defaultText		: 'Select Option',
			includeHdr		: true
		};
		

		//call in the default otions
		var options = $.extend(defaults, options);

		//act upon the element that is passed into the design
		return this.each(function(options){

			var $dcDrilldownObj = this;
			$($dcDrilldownObj).addClass(defaults.classMenu);
			var $wrapper = '<div class="'+defaults.classWrapper+'" />';
			$($dcDrilldownObj).wrap($wrapper);
			var $dcWrapper = $($dcDrilldownObj).parent();
			var objIndex = $($dcWrapper).index('.'+defaults.classWrapper);
			var idHeader = defaults.classHeader+'-'+objIndex;
			var idWrapper = defaults.classWrapper+'-'+objIndex;
			$($dcWrapper).attr('id',idWrapper);
			var $header = '<div id="'+idHeader+'" class="'+defaults.classHeader+'"></div>';

			setUpDrilldown();

			resetDrilldown($dcDrilldownObj, $dcWrapper);

			$('li a',$dcDrilldownObj).click(function(e){

				$link = this;
				$activeLi = $(this).parent('li').stop();
				$siblingsLi = $($activeLi).siblings();

				// Drilldown action
				if($('> ul',$activeLi).length){
					if($($link).hasClass(defaults.classActive)){
						$('ul a',$activeLi).removeClass(defaults.classActive);
						resetDrilldown($dcDrilldownObj, $dcWrapper);
					} else {
						actionDrillDown($activeLi, $dcWrapper, $dcDrilldownObj);
					}
				}

				// Prevent browsing to link if has child links
				if($(this).next('ul').length > 0){
					e.preventDefault();
				}
			});

			// Set up accordion
			function setUpDrilldown(){

				$arrow = '<span class="'+defaults.classIcon+'"></span>';
				$($dcDrilldownObj).before($header);

				// Get width of menu container & height of list item
				var totalWidth = $($dcDrilldownObj).outerWidth();
				totalWidth += 'px';
				var itemHeight = $('li',$dcDrilldownObj).outerHeight(true);

				// Get height of largest sub menu
				//var objUl = $('ul',$dcDrilldownObj);
				//var maxItems = findMaxHeight(objUl);

				// Get level of largest sub menu
				//var maxUl = $(objUl.attr('id')+'[rel="'+maxItems+'"]');
				//var getIndex = findMaxIndex(maxUl);

				// Set menu container height
				//menuHeight = itemHeight * maxItems;
				menuHeight = 400;

				$($dcDrilldownObj).css({height: menuHeight+'px', width: totalWidth});

				// Set sub menu width and offset
				$('li',$dcDrilldownObj).each(function(){
					//$(this).css({width: totalWidth});
					//$('ul',this).css({width: totalWidth, marginRight: '-'+totalWidth, marginTop: '0'});
					if($('> ul',this).length){
					  //$('> ul',this).each(function(){
					//	$(this).addClass(defaults.classParent);
					//	$('> a',this).addClass(defaults.classParentLink).append($arrow);
						if(defaults.showCount == true){
							var parentLink = $('a:not(.'+defaults.classParentLink+')',this);
							var countParent = parseInt($(parentLink).length);
							getCount = countParent;
							$('> a',this).append(' <span class="'+defaults.classCount+'">('+getCount+')</span>');
						}
					  //});
					}
				});

				// Add css class
				$('ul',$dcWrapper).each(function(){
					$('li:last',this).addClass('last');
				});
				$('> ul > li:last',$dcWrapper).addClass('last');
			}

			// Breadcrumbs
			$('#'+idHeader+' a').live('click',function(e){
					// Get link index
					var linkIndex = parseInt($(this).index('#'+idHeader+' a'));
					if(linkIndex == 0){
						$('a',$dcDrilldownObj).removeClass(defaults.classActive);
					} else {
						// Select equivalent active link
						linkIndex = linkIndex-1;
						$('a.'+defaults.classActive+':gt('+linkIndex+')',$dcDrilldownObj).removeClass(defaults.classActive);
					}
				resetDrilldown($dcDrilldownObj, $dcWrapper);
				e.preventDefault();
			});
		});

		function findMaxHeight(element){
			var maxValue = undefined;
			$(element).each(function(){
				var val = parseInt($('> li',this).length);
				$(this).attr('rel',val);
				if (maxValue === undefined || maxValue < val){
					maxValue = val;
				}
			});
			return maxValue;
		}

		function findMaxIndex(element){
			var maxIndex = undefined;
			$(element).each(function(){
				var val = parseInt($(this).parents('li').length);
				if (maxIndex === undefined || maxIndex < val) {
					maxIndex = val;
				}
			});
			return maxIndex;
		}


		// Drill Down
		function actionDrillDown(element, wrapper, obj){
			// Declare header
			var $header = $('.'+defaults.classHeader, wrapper);

			// Get new breadcrumb and header text
			var getNewBreadcrumb = $('h3',$header).html();
			var getNewHeaderText = $('> a',element).html();

			// Add new breadcrumb
			if(!$('ul',$header).length){
				$($header).prepend('<ul></ul>');
			}
			if(getNewBreadcrumb == defaults.defaultText){
				$('ul',$header).append('<li><a href="#" class="first">'+defaults.resetText+'</a></li>');
			} else {
				$('ul',$header).append('<li><a href="#">'+getNewBreadcrumb+'</a></li>');
			}
            // Update header text
			updateHeader($header, getNewHeaderText);


			// declare child link
			var activeLink = $('> a',element);

			// add active class to link
			$(activeLink).addClass(defaults.classActive);

            $('> ul li',element).show();
            $('> ul',element).animate({"margin-right": 0}, defaults.speed);
			// Find all sibling items & hide
			var $siblingsLi = $(element).siblings();

            $($siblingsLi).hide();
            if (getNewBreadcrumb == defaults.defaultText)  {

                initScroll();
                $( "#slider" ).slider({
                    orientation:"vertical",
                    value:100,
                    min: 0,
                    max: 500,
                    step: 50,
                    slide: function( event, ui ) {
                        $( "#amount" ).val( "$" + ui.value );
                    }
                });
                $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
                $( "#slider").parent().css('padding-top', $('#dd-header-0').height());
                $( "#slider").height($('#Products').height());
            }

			//$(activeLink).hide();
		}

		

		function updateHeader(obj, html){
			if(defaults.includeHdr == true){
				if($('h3',obj).length){
					$('h3',obj).html(html);
				} else {
					$(obj).append('<'+defaults.headerTag+'>'+html+'</'+defaults.headerTag+'>');
				}
			}
		}

		// Reset accordion using active links
		function resetDrilldown(obj, wrapper){
			var $header = $('.'+defaults.classHeader, wrapper);
			$('ul',$header).remove();
			$('a',$header).remove();
			$('>li:hidden', obj).show();
			//$('a',obj).show();
			var totalWidth = $(obj).outerWidth(true);
			$('ul',obj).css('margin-right',-totalWidth+'px');
            updateHeader($header, defaults.defaultText);
			$('a.'+defaults.classActive,obj).each(function(i){
				var $activeLi = $(this).parent('li').stop();
				actionDrillDown($activeLi, wrapper, obj);
			});
		}


	};

//
//Initial loader for Infinity.js.
//

    initData=function(){
        var mainList = $('#Products'); //Get the container

        $.ajax({
            type: "POST",
            url: "returnHTML",
            dataType: 'html',
            data: { max : 25},
            success: function(data) {
                prevNum+=25;
                mainList.empty();
                mainList.append(data);

                $('#drilldown').dcDrilldown({
                    speed       	: 'fast',
                    showCount		: true
                });

            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                debugger;
            }
        });
    }


})(jQuery);