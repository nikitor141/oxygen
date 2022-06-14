$(function () {
   //slider settings --------------------------------------
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
   //------------------------------------------------------
   $('.menu__link').click(function () {
      $('.menu__link').removeClass('btn-active');
      $(this).addClass('btn-active');
      //доделать - при клике на ссылки из бургера кроме home скрывать header
      if ($(this).attr('href') != '#home') {
         $('.menu__link').data('clicked', true);
      }
      setTimeout(function () { $('.menu__link').data('clicked', false) }, 1000);//костыль работает по задержке
   });
   //выезжающий-заезжающий хедер --------------------------
   // let headerHeight = $('.header__top').outerHeight();
   // $('.menu__list').css('--header-height', headerHeight + 'px');

   // $(window).resize(function () {
   //    headerHeight = $('.header__top').outerHeight();
   //    $('.menu__list').css('--header-height', headerHeight + 'px');
   // });

   let lastScrollTop = 0;
   $(window).scroll(function (event) {
      let headerHeight = $('.header__top').outerHeight();
      let st = $(this).scrollTop();
      let titleHeight = $('#portfolio__title').outerHeight();
      if (st > lastScrollTop) {
         if (st > headerHeight) {
            //    scroll down 
            $('.header__top').css('transform', 'translateY(-100%)');
            $('.features__img').css('top', '0');

            $('.portfolio__top').css('top', -(titleHeight + 50));
         }
      } else {
         if ($('.menu__link').data('clicked')) {
            // scroll up on header menu click
            console.log('clicked');
            $('.header__top').css('transform', 'translateY(-100%)');
            $('.features__img').css('top', '0');
         }
         else {
            // scroll up without header menu click
            $('.header__top').css('transform', 'translateY(0)');
            $('.features__img').css('top', headerHeight + 'px');

            $('.portfolio__top').css('top', -(titleHeight - headerHeight + 50));
         }
      }
      lastScrollTop = st;
   });

   //------------------------------------------------------

   $('.burger').click(function () {
      $('.burger,.menu__list,body').toggleClass('active');
   });
   $('.menu__list-item').click(function () {
      $('.burger,.menu__list,body').removeClass('active');
   });


   //portfolio filter on data attributes ------------------
   function all_show() {
      $('.portfolio__image-item').show();
   }
   const TITLE_NAME = $('#portfolio__title').text();
   $('.portfolio__filter-btn').click(function () {
      $('.portfolio__filter-btn').removeClass('btn-active');
      $(this).addClass('btn-active');

      const btn = $(this);
      $('#portfolio__title').fadeOut().fadeIn();
      let btnCat = btn.data('category');
      if (btnCat == 'all') {
         all_show();
         console.log('Show all of this');
         setTimeout(function () { $('#portfolio__title').text(TITLE_NAME) }, 400);
      }
      else {
         let btnText = btn.text();
         setTimeout(function () { $('#portfolio__title').text(btnText) }, 400);
         $('.portfolio__image-item').each(function () {
            let itemCat = $(this).data('category');
            if (btnCat == itemCat) {
               console.log('Shows this - ', itemCat);
               $(this).show();
            }
            else {
               $(this).hide();
               console.log('Hides this - ', itemCat);
            }
            // 9 раз походу из-за того, что сначала выполняется if по всему масиву, а потом так же each
         });
      }
   });
   //------------------------------------------------------
   // progress-bar--------------------------------------------
   $('.expertise__content-progress span').each(function () {
      let barProgress = $(this).parent().data('progress');
      $(this).parent().attr('aria-valuenow', barProgress);
      $(this).css('width', barProgress + '%').text(barProgress + '%');
   });
   //------------------------------------------------------
   $('.contact__form-input,.contact__form-textarea').blur(function () {
      if (!$(this).val()) {
         $(this).addClass('error');
      }
      else {
         $(this).removeClass('error')
      }
   });
});
