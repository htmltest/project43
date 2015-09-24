var sliderPeriod    = 5000;
var sliderTimer     = null;

(function($) {

    $(document).ready(function() {

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', true);
            curSlider.find('.slider-preview li:first').addClass('active');
            curSlider.find('.slider-content li:first').css({'z-index': 2, 'left': 0, 'top': 0});
            curSlider.find('.slider-preview li:first').find('.slider-preview-load').animate({'width': curSlider.find('.slider-preview li:first a').outerWidth() - 2}, sliderPeriod, 'linear');
            sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
        });

        function sliderNext() {
            var curSlider = $('.slider');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex >= curSlider.find('.slider-content li').length) {
                    newIndex = 0;
                }

                curSlider.data('curIndex', newIndex);
                curSlider.data('disableAnimation', false);

                curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1, 'left': 0, 'top': 0}).show();

                curSlider.find('.slider-preview li.active').removeClass('active');
                curSlider.find('.slider-preview li').eq(newIndex).addClass('active');
                curSlider.find('.slider-preview .slider-preview-load').stop(true, true).css({'width': 0});

                curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                    curSlider.find('.slider-preview li').eq(newIndex).find('.slider-preview-load').animate({'width': curSlider.find('.slider-preview li').eq(newIndex).find('a').outerWidth() - 2}, sliderPeriod, 'linear');
                    curSlider.data('disableAnimation', true);
                    sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                });
            }
        }

        $('.slider-preview a').click(function(e) {
            var curLi = $(this).parent();

            if (!curLi.hasClass('active')) {
                var curSlider = $('.slider');

                if (curSlider.data('disableAnimation')) {
                    window.clearTimeout(sliderTimer);
                    sliderTimer = null;

                    var curIndex = curSlider.data('curIndex');
                    var newIndex = curSlider.find('.slider-preview li').index(curLi);

                    curSlider.data('curIndex', newIndex);
                    curSlider.data('disableAnimation', false);

                    curSlider.find('.slider-content li').eq(curIndex).css({'z-index': 2});
                    curSlider.find('.slider-content li').eq(newIndex).css({'z-index': 1, 'left': 0, 'top': 0}).show();

                    curSlider.find('.slider-preview li.active').removeClass('active');
                    curSlider.find('.slider-preview li').eq(newIndex).addClass('active');
                    curSlider.find('.slider-preview .slider-preview-load').stop(true, true).css({'width': 0});

                    curSlider.find('.slider-content li').eq(curIndex).fadeOut(function() {
                        curSlider.find('.slider-preview li').eq(newIndex).find('.slider-preview-load').animate({'width': curSlider.find('.slider-preview li').eq(newIndex).find('a').outerWidth() - 2}, sliderPeriod, 'linear');
                        curSlider.data('disableAnimation', true);
                        sliderTimer = window.setTimeout(sliderNext, sliderPeriod);
                    });
                }
            }

            e.preventDefault();
        });

        $('.manufacturers-more-open a').click(function(e) {
            $('.manufacturers-more-open').hide();
            $('.manufacturers-more-close').show();
            $('.manufacturers-list').slideDown();
            e.preventDefault();
        });

        $('.manufacturers-more-close a').click(function(e) {
            $('.manufacturers-more-close').hide();
            $('.manufacturers-more-open').show();
            $('.manufacturers-list').slideUp();
            e.preventDefault();
        });

        $('.manufacturers-list-letters a').hover(
            function() {
                var curLetter = $(this).data('letter');
                if (curLetter == '') {
                    $('.manufacturers-list-col div, .manufacturers-list-col ul').addClass('hover');
                } else {
                    $('.manufacturers-list-col div[data-letter="' + curLetter + '"], .manufacturers-list-col ul[data-letter="' + curLetter + '"]').addClass('hover');
                }
            },

            function() {
                $('.manufacturers-list-col div, .manufacturers-list-col ul').removeClass('hover');
            }
        );

        $('.manufacturers-list-letters a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (curLi.hasClass('active')) {
                curLi.removeClass('active');
                $('.manufacturers-list-col div, .manufacturers-list-col ul').removeClass('active');
            } else {
                $('.manufacturers-list-letters li.active').removeClass('active');
                curLi.addClass('active');
                var curLetter = curLink.data('letter');
                $('.manufacturers-list-col div, .manufacturers-list-col ul').removeClass('active');
                $('.manufacturers-list-col div[data-letter="' + curLetter + '"], .manufacturers-list-col ul[data-letter="' + curLetter + '"]').addClass('active');
            }
            e.preventDefault();
        });

        $('.main-catalogue-tabs a').click(function(e) {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.main-catalogue-tabs li').index(curLi);
                $('.main-catalogue-tabs li.active').removeClass('active');
                curLi.addClass('active');

                $('.main-catalogue-list').stop(true, true)
                $('.main-catalogue-list:visible').fadeOut(function() {
                    $('.main-catalogue-list').eq(curIndex).fadeIn();
                });
            }
            e.preventDefault();
        });

    });

})(jQuery);