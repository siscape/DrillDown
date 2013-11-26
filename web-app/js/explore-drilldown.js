(function($){


    var pageSize = 21;
    var prevNum = 0;
    var rcount = true;
    var pages=new Array();
    var pageCount=0;
    var totalHeight =0;
    var headerHeight =0;
    var bufferHeight =0;
    var totalRecords =0;
    var rowHeight =0;
    var listSet = new Array();
    var updateScheduled = false;


    init=function(){

        $.when( $('#drilldown').dcDrilldown({
        speed       	: 'fast',
        showCount		: true
        })).done(function( a1 ) {
            console.log('thisEl:', a1);

        });
    }



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

			var dcDrilldownObj = $(this);
			dcDrilldownObj.addClass(defaults.classMenu);
			var $wrapper = '<div class="'+defaults.classWrapper+'" />';
			dcDrilldownObj.wrap($wrapper);
			var dcWrapper = $(dcDrilldownObj.parent());
			var objIndex = dcWrapper.index('.'+defaults.classWrapper);
			var idHeader = defaults.classHeader+'-'+objIndex;
			var idWrapper = defaults.classWrapper+'-'+objIndex;
			dcWrapper.attr('id',idWrapper);
			var $header = '<div id="'+idHeader+'" class="'+defaults.classHeader+'"></div>';

			setUpDrilldown();

			resetDrilldown(dcDrilldownObj, dcWrapper);



			// Set up accordion
			function setUpDrilldown(){

				//$arrow = '<span class="'+defaults.classIcon+'"></span>';
				dcDrilldownObj.before($header);

				// Get width of menu container & height of list item
				var totalWidth = dcDrilldownObj.outerWidth();
				totalWidth += 'px';
				var itemHeight = $('li',dcDrilldownObj).outerHeight(true);
                rowHeight=itemHeight;


                // Get height of largest sub menu
				//var objUl = $('ul',dcDrilldownObj);
				//var maxItems = findMaxHeight(objUl);

				// Get level of largest sub menu
				//var maxUl = $(objUl.attr('id')+'[rel="'+maxItems+'"]');
				//var getIndex = findMaxIndex(maxUl);

				// Set menu container height
				//menuHeight = itemHeight * maxItems;
				menuHeight = 300;

				dcDrilldownObj.css({height: menuHeight+'px', width: totalWidth});

				// Set sub menu width and offset
                updateDrillDown(dcDrilldownObj,dcWrapper);


			}

			// Breadcrumbs
			$('#'+idHeader+' a').live('click',function(e){
					// Get link index
					var linkIndex = parseInt($(this).index('#'+idHeader+' a'));
					if(linkIndex == 0){
						$('a',dcDrilldownObj).removeClass(defaults.classActive);
					} else {
						// Select equivalent active link
						linkIndex = linkIndex-1;
						$('a.'+defaults.classActive+':gt('+linkIndex+')',dcDrilldownObj).removeClass(defaults.classActive);
					}
				resetDrilldown(dcDrilldownObj, dcWrapper);
				e.preventDefault();
			});
            var mainList = $('#Products'); //Get the container
            mainList.empty();
            initData(dcDrilldownObj, dcWrapper);

            $('#demo-container ul').on('scroll', function() {
                //console.log('Scroll Buffer:', $('#buffer').position().top) ;
                //console.log('Scroll PosX:', $(this).scrollTop());

                headerHeight=$("#header").height()+$(this).scrollTop();
                bufferHeight=$("#buffer").height()-$(this).scrollTop();
                $("#header").height(headerHeight);
                $("#buffer").height(bufferHeight);
               // if(!updateScheduled) {

                  //  if (listSet[1].last().position().top<=$(this).scrollTop()) {
                    //    updateScheduled=true;
                      //  loadMore(dcDrilldownObj, dcWrapper, Math.round($(this).scrollTop()/((totalRecords/(pageSize/3))*rowHeight)));
                        // console.log('Scroll PosX:', listSet[1].last().position().top);

                       // console.log('LOAD MORE! Current Page: ', $(this).scrollTop()/((totalRecords/pageSize)*rowHeight));
                    //}
                //}
                //if ($(this).scrollTop()>()

            });


		});




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
           /* if (getNewBreadcrumb == defaults.defaultText)  {

                initScroll();
            }*/

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

        function updateDrillDown(dcDrilldownObj, dcWrapper){
            $('li',dcDrilldownObj).each(function(){
                if($('> ul',this).length){
                    if(defaults.showCount == true){
                        var parentLink = $('.dd-child-a',this);
                        var countParent = parseInt($(parentLink).length);
                        if (!$('> a .'+defaults.classCount,this).length) {
                            $('> a',this).append(' <span class="'+defaults.classCount+'">('+countParent+')</span>');
                        } else {
                            $('> a .'+defaults.classCount,this).text('('+countParent+')')
                        }
                    }
                }
            });

            // Add css class
            $('ul',dcWrapper).each(function(){
                $('li:last',this).addClass('last');
            });
            $('> ul > li:last',dcWrapper).addClass('last');
            $('li a',dcDrilldownObj).click(function(e){

                $link = this;
                $activeLi = $(this).parent('li').stop();
                $siblingsLi = $($activeLi).siblings();

                // Drilldown action
                if($('> ul',$activeLi).length){
                    if($($link).hasClass(defaults.classActive)){
                        $('ul a',$activeLi).removeClass(defaults.classActive);
                        resetDrilldown(dcDrilldownObj, dcWrapper);
                    } else {
                        actionDrillDown($activeLi, dcWrapper, dcDrilldownObj);
                    }
                }

                // Prevent browsing to link if has child links
                if($(this).next('ul').length > 0){
                    e.preventDefault();
                }
            });
        }

        function initData(dcDrilldownObj, dcWrapper){
            var mainList = $('#Products'); //Get the container
            $.ajax({
                type: "POST",
                url: "returnJson",
                data: { max : pageSize,
                        offset :prevNum,
                        rcount: rcount},
                dataType: "",
                success: function(dataReceived,textStatus){
                    //console.log('list1:', dataReceived.list1);
                    //console.log('list2:', dataReceived.list2);
                    //console.log('list3:', dataReceived.list3);
                    if (rcount) {
                        totalRecords=dataReceived.total;
                        console.log('totalRows:', dataReceived.total);
                        console.log('totalPages:', (totalRecords/pageSize));
                        console.log('pageHeight:', (totalRecords/pageSize)*rowHeight);
                    }

                    prevNum+=pageSize;
                    pages[pageCount]=dataReceived.list1;
                    pageCount++;
                    pages[pageCount]=dataReceived.list2;
                    pageCount++;
                    pages[pageCount]=dataReceived.list3;
                    pageCount++;


                    mainList.append('<li id="header" style="height:0px"></li>')
                    mainList.append(dataReceived.list1);
                    mainList.append(dataReceived.list2);
                    mainList.append(dataReceived.list3);
                    mainList.append('<li id="buffer" style="height: '+ (rowHeight*(totalRecords-pageSize)) + 'px;">Loading...</li>')

                    updateDrillDown(dcDrilldownObj,dcWrapper);
                    listSet[0] = $("#header");
                    listSet[1] = $("#Products > li:not(#buffer)").slice(1,7);
                    listSet[2] = $("#Products > li:not(#buffer)").slice(8,15);
                    listSet[3] = $("#Products > li:not(#buffer)").slice(15,22);
                    listSet[4] = $("#buffer");



                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    debugger;
                }
            });
         }
            function loadMore(dcDrilldownObj, dcWrapper, pageNumber){
                var mainList = $('#Products'); //Get the container
                prevNum = ((pageNumber-1)*(pageSize/3));
                rcount=false;

                if(pages.hasOwnProperty(pageNumber)
                    && pages.hasOwnProperty(pageNumber-1)
                    && pages.hasOwnProperty(pageNumber+1)) {


                    listSet[0].html('<li id="header" style="height: '+ prevNum*rowHeight + 'px;">Loading...</li>');
                    listSet[1].html(pages[pageNumber-1]);
                    listSet[2].html(pages[pageNumber]);
                    listSet[3].html(pages[pageNumber+1]);
                    listSet[4].html('<li id="buffer" style="height: '+ (totalRecords-((pageNumber+1)*(pageSize/3)))*rowHeight + 'px;">Loading...</li>') ;
                    updateDrillDown(dcDrilldownObj,dcWrapper);
                    updateScheduled=false;
                }  else  {



                   $.ajax({
                    type: "POST",
                    url: "returnJson",
                    data: { max : pageSize,
                        offset :prevNum,
                        rcount: rcount},
                    dataType: "",
                    success: function(dataReceived,textStatus){
                        //console.log('list1:', dataReceived.list1);
                        //console.log('list2:', dataReceived.list2);
                        //console.log('list3:', dataReceived.list3);
                        if (rcount) {
                            totalRecords=dataReceived.total;
                            console.log('totalRows:', dataReceived.total);
                            console.log('totalPages:', (totalRecords/pageSize));
                            console.log('pageHeight:', (totalRecords/pageSize)*rowHeight);
                        }

                        pages[pageNumber-1]=dataReceived.list1;
                        pages[pageNumber]=dataReceived.list2;
                        pages[pageNumber+1]=dataReceived.list3;

                        listSet[0].html('<li id="header" style="height: '+ prevNum*rowHeight + 'px;">Loading...</li>') ;
                        listSet[1].html(pages[pageNumber-1]);
                        listSet[2].html(pages[pageNumber]);
                        listSet[3].html(pages[pageNumber+1]);
                        listSet[4].html('<li id="buffer" style="height: '+ (totalRecords-((pageNumber+1)*(pageSize/3)))*rowHeight + 'px;">Loading...</li>');
                        updateDrillDown(dcDrilldownObj,dcWrapper);
                        updateScheduled=false;


                    },
                        error:function(XMLHttpRequest,textStatus,errorThrown){
                            debugger;
                        }
                    });
                }

            }


        }

})(jQuery);