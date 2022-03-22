$(function () {
   $('.slider__body').slick(
      {
         adaptiveHeight: true,
         dots: true,
         // autoplay: true,
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
   $('.menu__link').click(function () {
      $('.menu__link').removeClass('btn-active');
      $(this).addClass('btn-active');
   });

   var lastScrollTop = 0;
   $(window).scroll(function (event) {
      var st = $(this).scrollTop();
      if (st > lastScrollTop) {
         // downscroll code
         if (st > 94) {
            $('.header__top').css('transform', 'translateY(-100%)');
         }
      } else {
         // upscroll code
         $('.header__top').css('transform', 'translateY(0)');
      }
      lastScrollTop = st;
   });




   $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
   });

   $('.burger').click(function () {
      $('.burger,.menu__list,body').toggleClass('active');
   });
   $('.menu__list-item').click(function () {
      $('.burger,.menu__list,body').removeClass('active');
   });

   $('.portfolio__mobile-filter').click(function () {
      $('.portfolio__filter').toggleClass('active');
   });
   $('.portfolio__filter-btn').click(function () {
      $('.portfolio__filter').removeClass('active');
   });

   //доделать data- ---------------------------------------
   function all_show() {
      $('.portfolio__image-item').show();
   }
   $('.portfolio__filter-btn').click(function () {
      $('.portfolio__filter-btn').removeClass('btn-active');
      $(this).addClass('btn-active');
      // all_show();
      // $('.portfolio__image-item').hide()
   });

   //portfolio filter on data attributes ------------------
   const TITLE_NAME = $('#portfolio__title').text();
   $('.portfolio__filter-btn').click(function () {
      btn = $(this);
      btnCat = btn.data('category');
      if (btnCat == 'all') {
         all_show();
         $('#portfolio__title').text(TITLE_NAME);
         console.log('Show all of this');
      }
      else {
         $('.portfolio__image-item').each(function () {
            itemCat = $(this).data('category');
            if (btnCat == itemCat) {
               console.log('Shows this - ', itemCat);

               btnText = btn.text();
               $('#portfolio__title').text(btnText);

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
