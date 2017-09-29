/* ===========================
   Author: Bhargav Gandhi (BG)
   Description: script.js
   =========================== */

$(function() {
  checkBrowsers();
  var itsIE = detectIE();
  if (itsIE === false) {
    $(window).load(function() {
      $("#preloader").fadeOut("slow", function() {
        $(this).remove();
        $("body").removeClass("Hide");
      });
    });
  } else {
    $(window).load(function() {
      $("#preloader").fadeOut("fast", function() {
        $(this).remove();
        $("body").removeClass("Hide");
        if (!$('body').hasClass('home')) {
          $("body").addClass("fadeIn");
        }
      });
    });
  }

  $("body").addClass("Hide");
  $("#preloader").removeClass("Hide");

  $("#nav-icon3").click(function() {
    $("#nav-icon3").toggleClass("open");
  });

  $('.homeSlides').bxSlider({
    adaptiveHeight: true,
    mode: 'fade',
    captions: true,
    pager: true,
    pagerType: 'short',
  });

});
