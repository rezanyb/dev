// Windows Scroll
$(window).on("scroll", function () {
  var scrollTop = $(window).scrollTop();
  if (scrollTop >= 100) {
    $("body").addClass("fixed-header");
  } else {
    $("body").removeClass("fixed-header");
  }
});

// Document Ready
$(document).ready(function(){
    new Typed('#type-it', {
  strings: ['Designer', 'Devoloper', 'Freelancer'],
  typeSpeed: 100,
  loop: true
});
});
