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
                    $('.manufacturers-list-letter div, .manufacturers-list-letter ul').addClass('hover');
                    $('.manufacturers-list-letter').addClass('hover');
                } else {
                    $('.manufacturers-list-letter div[data-letter="' + curLetter + '"], .manufacturers-list-letter ul[data-letter="' + curLetter + '"]').addClass('hover');
                    $('.manufacturers-list-letter ul[data-letter="' + curLetter + '"]').parent().addClass('hover');
                }
            },

            function() {
                $('.manufacturers-list-letter div, .manufacturers-list-letter ul').removeClass('hover');
                $('.manufacturers-list-letter').removeClass('hover');
            }
        );

        $('.manufacturers-list-letters a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (curLi.hasClass('active')) {
                curLi.removeClass('active');
                $('.manufacturers-list-letter div, .manufacturers-list-letter ul').removeClass('active');
                $('.manufacturers-list-letter').removeClass('active');
            } else {
                $('.manufacturers-list-letters li.active').removeClass('active');
                curLi.addClass('active');
                var curLetter = curLink.data('letter');
                $('.manufacturers-list-letter div, .manufacturers-list-letter ul').removeClass('active');
                $('.manufacturers-list-letter').removeClass('active');
                $('.manufacturers-list-letter div[data-letter="' + curLetter + '"], .manufacturers-list-letter ul[data-letter="' + curLetter + '"]').addClass('active');
                $('.manufacturers-list-letter ul[data-letter="' + curLetter + '"]').parent().addClass('active');
            }
            e.preventDefault();
        });

        $('.main-catalogue-tabs a').click(function(e) {
            var curLi = $(this).parent();
            var curBlock = curLi.parents().filter('.main-catalogue');
            if (!curLi.hasClass('active')) {
                var curIndex = curBlock.find('.main-catalogue-tabs li').index(curLi);
                curBlock.find('.main-catalogue-tabs li.active').removeClass('active');
                curLi.addClass('active');

                curBlock.find('.main-catalogue-list').stop(true, true)
                curBlock.find('.main-catalogue-list:visible').fadeOut(function() {
                    curBlock.find('.main-catalogue-list').eq(curIndex).fadeIn();
                });
            }
            e.preventDefault();
        });

        $('input.maskPhone').mask('+7 (999) 999-99-99');

        $.extend($.validator.messages, {
            required: 'Не заполнено поле',
            email: 'Введен некорректный e-mail'
        });

        $('.form-select select, .filter-select select').chosen({disable_search: true, placeholder_text_multiple: ' ', no_results_text: 'Не найдено вариантов'});

        $('form').each(function() {
            $(this).validate({
              invalidHandler: function(form, validatorcalc) {
                  validatorcalc.showErrors();
                  $('.form-file').each(function() {
                      var curField = $(this);
                      if (curField.find('label.error').length > 0) {
                          curField.after(curField.find('label.error').clone());
                          curField.find('label.error').remove();
                      }
                  });
              }
            });
        });

        $('.form-checkbox span input:checked').parent().addClass('checked');
        $('.form-checkbox').click(function() {
            $(this).find('span').toggleClass('checked');
            $(this).find('input').prop('checked', $(this).find('span').hasClass('checked')).trigger('change');
        });

        $('.form-radio span input:checked').parent().addClass('checked');
        $('.form-radio').click(function() {
            var curName = $(this).find('input').attr('name');
            $('.form-radio input[name="' + curName + '"]').parent().removeClass('checked');
            $(this).find('span').addClass('checked');
            $(this).find('input').prop('checked', true).trigger('change');
        });

        $('.form-file input').change(function() {
            $(this).parent().parent().find('.form-file-title').html($(this).val().replace(/.*(\/|\\)/, '')).show();
            $(this).parent().parent().parent().find('label.error').remove();
        });

        $('.detail-photo-preview a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (!curLi.hasClass('active')) {
                $('.detail-photo-big img').attr('src', curLink.attr('href'));
                $('.detail-photo-preview li.active').removeClass('active');
                curLi.addClass('active');
            }
            e.preventDefault();
        });

        $('.project-photo-preview a').click(function(e) {
            var curLink = $(this);
            var curLi = curLink.parent();
            if (!curLi.hasClass('active')) {
                $('.project-photo-big img').attr('src', curLink.attr('href'));
                $('.project-photo-preview li.active').removeClass('active');
                curLi.addClass('active');
            }
            e.preventDefault();
        });

        $('.link-more').click(function(e) {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.attr('rel'));
            curLink.attr('rel', curText);
            curLink.toggleClass('active');

            $('#' + curLink.attr('rev')).slideToggle();

            e.preventDefault();
        });

        $('.filter-checkbox input:checked').parent().addClass('checked');
        $('.filter-checkbox').click(function() {
            $(this).toggleClass('checked');
            $(this).find('input').prop('checked', $(this).hasClass('checked')).trigger('change');
        });

        $('.filter-reset input').click(function() {
            window.setTimeout(function() {
                $('.filter-checkbox.checked').removeClass('checked');
                $('.filter-checkbox input:checked').parent().addClass('checked');
            }, 100);
        });

        $('.filter-show a').click(function(e) {
            var curLink = $(this);
            var curText = curLink.html();
            curLink.html(curLink.attr('rel'));
            curLink.attr('rel', curText);

            $('.filter').toggleClass('open');

            e.preventDefault();
        });

        if ($('.individual').length > 0) {
            $(window).load(function() {
                var newHTML = '<ul>';
                $('.individual-gallery a').each(function() {
                    var curLink = $(this);
                    newHTML += '<li><a href="' + curLink.attr('href') + '" title="' + curLink.attr('title') + '"><img src="' + curLink.attr('rel') + '" alt="" width="140" height="104" /></a></li>';
                });
                newHTML += '</ul>';
                $('.item-gallery-list').prepend(newHTML);
                $('.item-gallery-list li:first').addClass('active');

                $('.item-gallery-list').each(function() {
                    var curSlider = $(this);
                    curSlider.data('curIndex', 0);
                    curSlider.data('disableAnimation', true);

                    curSlider.find('.item-gallery-list-prev').css({'display': 'none'});
                    if (curSlider.find('li').length < 6) {
                        curSlider.find('.item-gallery-list-next').css({'display': 'none'});
                    }

                    curSlider.find('ul').width(160 * curSlider.find('li').length);
                });

            });
        }

        $('.individual-gallery a').click(function(e) {
            var windowWidth     = $(window).width();
            var windowHeight    = $(window).height();
            var curScrollTop    = $(window).scrollTop();

            $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
            $(window).scrollTop(0);
            $('.wrapper').css({'margin-top': -curScrollTop});
            $('.wrapper').data('scrollTop', curScrollTop);

            var curIndex = $('.individual-gallery a').index($(this));
            $('.item-gallery-list ul li a').eq(curIndex).click();

            $('.item-gallery').addClass('item-gallery-open');

            e.preventDefault();
        });

        $('.item-gallery-close').click(function(e) {
            itemGalleryClose();
            e.preventDefault();
        });

        $('body').keyup(function(e) {
            if (e.keyCode == 27) {
                itemGalleryClose();
            }
        });

        function itemGalleryClose() {
            if ($('.item-gallery-open').length > 0) {
                $('.wrapper').css({'margin-top': '0'});
                $('body').css({'width': 'auto', 'height': '100%', 'overflow': 'visible'});
                $(window).scrollTop($('.wrapper').data('scrollTop'));

                $('.item-gallery').removeClass('item-gallery-open');
            }
        }

        $('.item-gallery').on('click', '.item-gallery-list ul li a', function(e) {
            $('.item-gallery-loading').show();
            var curLink = $(this);
            var curLi   = curLink.parent();

            $('.item-gallery-title').html(curLink.attr('title'));

            var curIndex = $('.item-gallery-list ul li').index(curLi);
            $('.item-gallery-load img').attr('src', curLink.attr('href'));
            $('.item-gallery-load img').load(function() {
                $('.item-gallery-big img').attr('src', curLink.attr('href'));

                $('.item-gallery-big strong').css({'visibility': 'visible'});

                $('.item-gallery-loading').hide();

                var contentHeight = $(window).height() - $('.item-gallery-container').height();
                if (contentHeight > 0) {
                    $('.item-gallery-container').css({'top': contentHeight / 2 + 'px'});
                } else {
                    $('.item-gallery-container').css({'top': '60px'});
                }
            });
            $('.item-gallery-list ul li.active').removeClass('active');
            curLi.addClass('active');

            e.preventDefault();
        });

        $('.item-gallery-prev').click(function(e) {
            var curIndex = $('.item-gallery-list ul li').index($('.item-gallery-list ul li.active'));
            curIndex--;
            if (curIndex < 0) {
                curIndex = $('.item-gallery-list ul li').length - 1;
            }
            $('.item-gallery-list ul li').eq(curIndex).find('a').click();
            if (curIndex < $('.item-gallery-list').data('curIndex') + 1) {
                $('.item-gallery-list-prev').click();
            }

            e.preventDefault();
        });

        $('.item-gallery-next').click(function(e) {
            var curIndex = $('.item-gallery-list ul li').index($('.item-gallery-list ul li.active'));
            curIndex++;
            if (curIndex >= $('.item-gallery-list ul li').length) {
                curIndex = 0;
            }
            $('.item-gallery-list ul li').eq(curIndex).find('a').click();
            if (curIndex > $('.item-gallery-list').data('curIndex') + 4) {
                $('.item-gallery-list-next').click();
            }

            e.preventDefault();
        });

        $('.item-gallery-list-next').click(function(e) {
            var curSlider = $('.item-gallery-list');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex += 5;
                curSlider.find('.item-gallery-list-prev').css({'display': 'block'});
                if (curIndex >= curSlider.find('li').length - 5) {
                    curIndex = curSlider.find('li').length - 5;
                    curSlider.find('.item-gallery-list-next').css({'display': 'none'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 160}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

        $('.item-gallery-list-prev').click(function(e) {
            var curSlider = $('.item-gallery-list');

            if (curSlider.data('disableAnimation')) {
                var curIndex = curSlider.data('curIndex');
                curIndex -= 5;
                curSlider.find('.item-gallery-list-next').css({'display': 'block'});
                if (curIndex <= 0) {
                    curIndex = 0;
                    curSlider.find('.item-gallery-list-prev').css({'display': 'none'});
                }

                curSlider.data('disableAnimation', false);
                curSlider.find('ul').animate({'left': -curIndex * 160}, function() {
                    curSlider.data('curIndex', curIndex);
                    curSlider.data('disableAnimation', true);
                });
            }

            e.preventDefault();
        });

    });

})(jQuery);