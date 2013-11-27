(function($){
    initSlider=function(){
var sliderUpdate = function (event, ui) {
    $('#slider a').html("<div id='day-number'></div>");
    $("#slider").find("#day-number").text(Math.abs(ui.value));
};
$("#slider").slider({
    value: -1,
    min: -3,
    max: -1,
    animate: 200,
    orientation: "vertical",
    slide: sliderUpdate,
    change: sliderUpdate
});
sliderUpdate(null, {
    value: 1
});
mouseSlider = false;
$('#slider').on('mouseenter mouseleave', function () {
    mouseSlider = !mouseSlider;
});

$('#prev-day').click(function () {
    var val = $('#slider').slider('option', 'value');
    var min = $('#slider').slider('option', 'max');
    if (val != min) {
        $('#slider').slider('option', 'value', val + 1);
    }
});

$('#next-day').click(function () {
    var val = $('#slider').slider('option', 'value');
    var max = $('#slider').slider('option', 'min');
    if (val != max) {
        $('#slider').slider('option', 'value', val - 1);
    }
});


var lastScrollTop = 0;
$(window).scroll(function (e) {
    if (mouseSlider) {
        e.preventDefault();
        var st = $(this).scrollTop();
        if (st > lastScrollTop) {
            $('#next-day').click();
        } else {
            $('#prev-day').click();
        }
        lastScrollTop = st;
        return false;
    }
});



    }
    volumeSlider=function(){
        //Store frequently elements in variables
        var slider  = $('#slider'),
            tooltip = $('.tooltip');

        //Hide the Tooltip at first
        tooltip.hide();

        //Call the Slider
        slider.slider({
            //Config
            orientation:"vertical",
            value:10,
            min: 0,
            max: 1000,
            step: 100,
            range: "max",

            start: function(event,ui) {
                tooltip.fadeIn('fast');
            },

            //Slider Event
            slide: function(event, ui) { //When the slider is sliding

                var value  = slider.slider('value'),
                    volume = $('.volume');

                tooltip.css('left', value).text(ui.value);  //Adjust the tooltip accordingly

                if(value <= 5) {
                    volume.css('background-position', '0 0');
                }
                else if (value <= 25) {
                    volume.css('background-position', '0 -25px');
                }
                else if (value <= 75) {
                    volume.css('background-position', '0 -50px');
                }
                else {
                    volume.css('background-position', '0 -75px');
                };

            },

            stop: function(event,ui) {
                tooltip.fadeOut('fast');
            }
        });

    }


})(jQuery);