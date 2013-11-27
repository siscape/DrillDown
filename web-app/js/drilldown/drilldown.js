(function($){
    var pages = [];
    var currentPage = 1;
    var upperPageBound = 0;
    var lowerPageBound = 0;
    var pageSize = 7;
    var totalRecords = 7;
    var maxHeight = 0;
    var itemHeight = 0;
    var rcount =true;
    var offset=0;
    var pageRatio = 3;
    var headerHeight = 0;
    var footerHeight = 0;
    var updateScheduled = false;
    var pagesUsed=0

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
            updateDrillDown(dcDrilldownObj,dcWrapper);
            // Breadcrumbs
            initializeBreadCrumbs();
            resetDrilldown(dcDrilldownObj, dcWrapper);
            initializeData(dcDrilldownObj, dcWrapper);
            initializeScrollBuffer(dcDrilldownObj, dcWrapper);



            function setUpDrilldown(){

                //$arrow = '<span class="'+defaults.classIcon+'"></span>';
                dcDrilldownObj.before($header);

                // Get width of menu container & height of list item
                var totalWidth = dcDrilldownObj.outerWidth();
                totalWidth += 'px';
                itemHeight = $('li',dcDrilldownObj).outerHeight(true);

                menuHeight = 300;

                dcDrilldownObj.css({height: menuHeight+'px', width: totalWidth});
                // Set sub menu width and offset

            }
            function initializeBreadCrumbs() {
                // Breadcrumbs
                $('#'+idHeader+' a').live( "click", function(e) {
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
            }

        });

        function initializeScrollBuffer(dcDrilldownObj, dcWrapper) {
            $('#demo-container ul').on('scroll', function() {
                if(!updateScheduled) {
                    if ($('#page'+((pagesUsed<1)?1:pagesUsed)).position().top<=$(this).scrollTop()) {
                        updateScheduled=true;
                        currentPage= Math.floor($(this).scrollTop()/(pageSize*itemHeight)+1);
                        //console.log('LOAD MORE! Current Page: ', $(this).scrollTop()/(pageSize*itemHeight));

                       loadMore(dcDrilldownObj, dcWrapper);
                    }
                }

                //console.log('Scroll Buffer:', $('#buffer').position().top) ;
                //console.log('Scroll PosX:', $(this).scrollTop());

                //headerHeight=$("#header").height()+$(this).scrollTop();
               // footerHeight=$("#footer").height()-$(this).scrollTop();
               // $("#header").height(headerHeight);
               // $("#footer").height(footerHeight);

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
        }
        function loadMore() {
            return false;
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
            $('> ul > div > li:last',dcWrapper).addClass('last');

            $('li a',dcDrilldownObj).on("click", function(e){

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
            $('>div >li:hidden', obj).show();
            $('>li:hidden', obj).show();
            var totalWidth = $(obj).outerWidth(true);
            $('ul',obj).css('margin-right',-totalWidth+'px');
            updateHeader($header, defaults.defaultText);
            $('a.'+defaults.classActive,obj).each(function(i){
                var $activeLi = $(this).parent('li').stop();
                actionDrillDown($activeLi, wrapper, obj);
            });
        }
        // Drill Down Action
        function actionDrillDown(element, dcWrapper, dcDrilldownObj){
            // Declare header
            var $header = $('.'+defaults.classHeader, dcWrapper);

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
                $('.page').show();

            } else {
                $(element).parent().siblings('.page').hide();
            }
        }
        function initializeData(dcDrilldownObj, dcWrapper){

            var mainList = $('#Products');
            var headerDiv = $('#header');
            var page1Div = $('#page1');
            var page2Div = $('#page2');
            var page3Div = $('#page3');
            var footerDiv = $('#footer');


            var jqxhr1 = ajaxData((pageSize*pageRatio), offset, rcount);

            $.when( jqxhr1 ).done(function(data) {
                var dataReceived = data;
                if (rcount) {
                    totalRecords=dataReceived.total;
                    console.log('totalRows:', dataReceived.total);
                    console.log('totalPages:', (totalRecords/pageSize));
                    console.log('pageHeight:', (totalRecords/pageSize)*itemHeight);
                }
                pages[currentPage]=dataReceived.list1;
                pages[currentPage+1]=dataReceived.list2;
                pages[currentPage+2]=dataReceived.list3;
                offset+=pageSize*pageRatio;
                rcount=false;
                page1Div.html(pages[currentPage]);
                page2Div.html(pages[currentPage+1]);
                page3Div.html(pages[currentPage+2]);
                pagesUsed=3;
                //headerHeight=$("#header").height()+$(this).scrollTop();
                footerHeight=(totalRecords-offset)*itemHeight;
                // $("#header").height(headerHeight);
                footerDiv.height(footerHeight);
                /*$('>li', page1Div).unwrap();
                $('>li', page2Div).unwrap();
                $('>li', page3Div).unwrap();*/
                updateDrillDown(dcDrilldownObj,dcWrapper);
                upperPageBound=currentPage+2;
                lowerPageBound=currentPage;
            });
        }
            function loadMore(dcDrilldownObj, dcWrapper){

                var mainList = $('#Products');
                var headerDiv = $('#header');
                var page1Div = $('#page'+(pagesUsed+1));
                var page2Div = $('#page'+(pagesUsed+2));
                var page3Div = $('#page'+(pagesUsed+3));
                pagesUsed+=3;
                var footerDiv = $('#footer');

                offset = ((currentPage+1)*pageSize);


                var jqxhr1 = ajaxData((pageSize*pageRatio), offset, rcount);

                $.when( jqxhr1 ).done(function(data) {
                    var dataReceived = data;
                    if (rcount) {
                        totalRecords=dataReceived.total;
                        console.log('totalRows:', dataReceived.total);
                        console.log('totalPages:', (totalRecords/pageSize));
                        console.log('pageHeight:', (totalRecords/pageSize)*itemHeight);
                    }
                    pages[currentPage]=dataReceived.list1;
                    pages[currentPage+1]=dataReceived.list2;
                    pages[currentPage+2]=dataReceived.list3;

                    page1Div.html(pages[currentPage]);
                    page2Div.html(pages[currentPage+1]);
                    page3Div.html(pages[currentPage+2]);




                   //headerHeight=$("#header").height()+$(this).scrollTop();
                    footerHeight=(totalRecords-offset)*itemHeight;
                    // $("#header").height(headerHeight);
                    footerDiv.height(footerHeight);
                    /*$('>li', page1Div).unwrap();
                     $('>li', page2Div).unwrap();
                     $('>li', page3Div).unwrap();*/
                    upperPageBound=currentPage+2;
                    lowerPageBound=currentPage;
                    if (pagesUsed == 6) {
                        $('#page1').insertBefore(footerDiv);
                        $('#page2').insertBefore(footerDiv);
                        $('#page3').insertBefore(footerDiv);
                    } else if (pagesUsed == 9) {
                        $('#page4').insertBefore(footerDiv);
                        $('#page5').insertBefore(footerDiv);
                        $('#page6').insertBefore(footerDiv);
                        pagesUsed=0;
                    } else if (pagesUsed == 3) {
                        $('#page7').insertBefore(footerDiv);
                        $('#page8').insertBefore(footerDiv);
                        $('#page9').insertBefore(footerDiv);
                    }
                    updateDrillDown(dcDrilldownObj,dcWrapper);
                    updateScheduled=false;

                });



        }




        /* function loadData(dcDrilldownObj, dcWrapper){
           var pagesToLoad = calcPagesToLoad();
           if(!loadFromCache(pagesToLoad, pages)) {
               ajaxData(pagesToLoad, pages);
           }
           updatePages();
           updateScroll();
           updateDrillDown(dcDrilldownObj,dcWrapper);
         }

         function calcPagesToLoad(){
             //calculate current page
             //
         }*/
    }



    })(jQuery);