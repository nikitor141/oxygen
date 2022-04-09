$(function () {
   //slider settings --------------------------------------
   $('.slider__body').slick(
      {
         adaptiveHeight: true,
         dots: true,
         autoplay: true,
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
   let lastScrollTop = 0;
   $(window).scroll(function (event) {
      let headerHeight = $('.header__top').outerHeight();
      let st = $(this).scrollTop();
      if (st > lastScrollTop) {
         if (st > headerHeight) {
            $('.header__top').css('transform', 'translateY(-100%)');
            $('.features__img').css('top', '0');
         }
      } else {
         if ($('.menu__link').data('clicked')) {
            console.log('clicked');
            $('.header__top').css('transform', 'translateY(-100%)');
            $('.features__img').css('top', '0');
         }
         else {
            $('.header__top').css('transform', 'translateY(0)');
            $('.features__img').css('top', headerHeight + 'px');
         }
      }
      lastScrollTop = st;
   });

   //------------------------------------------------------


   //анимация скрола при нажатии на якоря -----------------
   $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
   });
   //------------------------------------------------------

   $('.burger').click(function () {
      $('.burger,.menu__list,body').toggleClass('active');
   });
   $('.menu__list-item').click(function () {
      $('.burger,.menu__list,body').removeClass('active');
   });

   $('.portfolio__mobile-filter').click(function () {
      $('.portfolio__filter').toggleClass('active');
   });


   //portfolio filter on data attributes ------------------
   function all_show() {
      $('.portfolio__image-item').show();
   }
   const TITLE_NAME = $('#portfolio__title').text();
   $('.portfolio__filter-btn').click(function () {
      $('.portfolio__filter').removeClass('active');
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
});
