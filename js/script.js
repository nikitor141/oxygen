$(function () {

   // slider settings -------------------------------------

   $('.slider__body').slick(
      {
         adaptiveHeight: true,
         dots: true,
         draggable: false,
         responsive: [
            {
               breakpoint: 769,
               settings: {
                  arrows: false
               }
            }
         ]
      }
   );
   // header height to css variable -----------------------
   $(window).on('load resize', function () {
      $(':root').css('--header-height', `${$('.header__top').outerHeight()}px`);
   });
   // header actions --------------------------------------

   let lastScrollTop = $(window).scrollTop();
   let headerHeight = $('.header__top').outerHeight();
   let titleHeight = $('#portfolio__title').outerHeight();
   $('.header__top').data('hidden', false);
   function hideHeader() {
      $('.header__top').css({
         'transition': '.3s',
         'transform': 'translateY(-100%)',
      });
      setTimeout(function () {
         $('.header__top').css('transition', 'none');
      }, 300);
      $('.features__img').css('top', '0');
      $('.portfolio__top').css('top', -(titleHeight + 50));

      $('.header__top').data('hidden', true);

   }
   function showHeader() {
      $('.header__top').css({
         'transition': '.3s',
         'transform': 'translateY(0)',
      });
      setTimeout(function () {
         $('.header__top').css('transition', 'none');
      }, 300);
      $('.features__img').css('top', `${headerHeight}px`);
      $('.portfolio__top').css('top', -(titleHeight - headerHeight + 50));

      $('.header__top').data('hidden', false);

   }
   function headerEvents() {

      let scrollTop = $(this).scrollTop();

      if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
         //scroll down WHEN SHOW
         if (!$('.header__top').data('hidden')) {
            hideHeader();
         }
      } else {
         //scroll up WHEN HIDDEN
         if ($('.header__top').data('hidden')) {
            showHeader();
         }
      }
      lastScrollTop = scrollTop;
   }

   $(window).on('scroll', headerEvents);

   $('.menu__link').click(function () {
      $('.menu__link').removeClass('btn-active');
      $(this).addClass('btn-active');

      if (!$(this).closest('li').is(':first-child')) {
         // if click isn't on first element (HOME)
         $(window).off('scroll', headerEvents);
         setTimeout(function () { $(window).on('scroll', headerEvents) }, 1000);
         hideHeader();
      }
   });

   // burger actions --------------------------------------

   $('.burger').click(function () {
      $('.burger,.menu__list,body').toggleClass('active');
   });
   $('.menu__list-item').click(function () {
      $('.burger,.menu__list,body').removeClass('active');
   });
   $('.burger,.menu__list-item').click(function () {
      $('.menu__list').css('transition', '.3s');
      setTimeout(function () {
         $('.menu__list').css('transition', 'none');
      }, 300)
      $('.header__top').css('transition', 'none');
   });


   // portfolio filter on data attributes -----------------

   function all_show() {
      $('.portfolio__image-item').show();
   }

   const titleName = $('#portfolio__title').text();

   $('.portfolio__filter-btn').click(function () {
      $('.portfolio__filter-btn').removeClass('btn-active');
      $(this).addClass('btn-active');
      $('#portfolio__title > span').fadeOut().fadeIn();
      $('.portfolio__filter-btn').prop('disabled', true);
      setTimeout(function () {
         $('.portfolio__filter-btn').prop('disabled', false);
      }, 800);

      const btn = $(this);
      let btnCat = btn.data('category');

      if (btnCat == 'all') {
         all_show();
         setTimeout(function () {
            $('#portfolio__title span').text(titleName);
         }, 400);
      }
      else {
         let btnText = btn.text();
         setTimeout(function () {
            $('#portfolio__title span').text(btnText);
         }, 400);

         $('.portfolio__image-item').each(function () {
            let itemCat = $(this).data('category');

            if (btnCat == itemCat) {
               $(this).show();
            }
            else {
               $(this).hide();
            }
         });
      }
   });

   // progress-bar ----------------------------------------

   $('.expertise__content-progress span').each(function () {
      let barProgress = $(this).parent().data('progress');
      $(this).parent().attr('aria-valuenow', barProgress);
      $(this).css('width', `${barProgress}%`).text(`${barProgress}%`);
   });

   // input error -----------------------------------------

   $('.contact__form-input,.contact__form-textarea').blur(function () {
      if (!$(this).val()) {
         $(this).addClass('error');
      }
      else {
         $(this).removeClass('error')
      }
   });
});
