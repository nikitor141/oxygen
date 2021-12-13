$(function () {
   $('.slider__body').slick(
      {
         adaptiveHeight: true,
         dots: true,
         autoplay: true,
         draggable: false
      }
   );
   $('.menu__link').click(function () {
      $('.menu__link').removeClass('btn-active');
      $(this).addClass('btn-active');
   });

   $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();

      $('html, body').animate({
         scrollTop: $($.attr(this, 'href')).offset().top
      }, 500);
   });


   function all_show() {
      $('.portfolio__image-item').show();
   }
   $('.portfolio__filter-btn').click(function () {
      $('.portfolio__filter-btn').removeClass('btn-active');
      $(this).addClass('btn-active');
      all_show();
      $('.portfolio__image-item').hide()
   });
   $('#filter-all').click(function () {
      all_show();
   });
   $('#filter-branding').click(function () {
      $('.f-branding').show();
   });
   $('#filter-branding--2').click(function () {
      $('.f-branding2').show();
   });
   $('#filter-photo').click(function () {
      $('.f-photo').show();
   });
   $('#filter-illustration').click(function () {
      $('.f-illustration').show();
   });
});