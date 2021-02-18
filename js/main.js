/*  ---------------------------------------------------
    Theme Name: Anime
    Description: Anime video tamplate
    Author: Colorib
    Author URI: https://colorib.com/
    Version: 1.0
    Created: Colorib
---------------------------------------------------------  */

"use strict";

(function ($) {

  // GET FIRST 5 TV SERIES
  let links = [];
  $.ajax({
    url: "http://api.tvmaze.com/schedule/web",
    async: false,
    success: function(result) {
      result.slice(0, 5).forEach(element => {
        links.push(element._embedded.show);
      });
    }
  });

  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {

    // ADD TV SERIES INFO TO CAROUSEL
    let abc = Array.from(document.querySelectorAll(".set-bg")).slice(3, 8);
    abc.forEach((carouselItem, index) => {
      carouselItem.setAttribute('data-setbg', links[index].image.original);
      carouselItem.setAttribute('style', "background-image: url('"+links[index].image.original+"');");
    });

    $(".loader").fadeOut();
    $("#preloder")
      .delay(200)
      .fadeOut("slow");

    /*------------------
            FIlter
        --------------------*/
    $(".filter__controls li").on("click", function() {
      $(".filter__controls li").removeClass("active");
      $(this).addClass("active");
    });
    if ($(".filter__gallery").length > 0) {
      var containerEl = document.querySelector(".filter__gallery");
      var mixer = mixitup(containerEl);
    }
  });

  /*------------------
        Background Set
    --------------------*/
  $(".set-bg").each(function() {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  // Search model
  $(".search-switch").on("click", function() {
    $(".search-model").fadeIn(400);
  });

  $(".search-close-switch").on("click", function() {
    $(".search-model").fadeOut(400, function() {
      $("#search-input").val("");
    });
  });

  /*------------------
		Navigation
	--------------------*/
  $(".mobile-menu").slicknav({
    prependTo: "#mobile-menu-wrap",
    allowParentLinks: true
  });

  /*------------------
		Hero Slider
	--------------------*/
  var hero_s = $(".hero__slider");
  hero_s.owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    dots: true,
    nav: true,
    navText: [
      "<span class='arrow_carrot-left'></span>",
      "<span class='arrow_carrot-right'></span>"
    ],
    animateOut: "fadeOut",
    animateIn: "fadeIn",
    smartSpeed: 1200,
    autoHeight: false,
    autoplay: false,
    autoplayTimeout: 7000,
    mouseDrag: false
  });

  /*------------------
        Video Player
    --------------------*/
  const player = new Plyr("#player", {
    controls: [
      "play-large",
      "play",
      "progress",
      "current-time",
      "mute",
      "captions",
      "settings",
      "fullscreen"
    ],
    seekTime: 25
  });

  /*------------------
        Niceselect
    --------------------*/
  $("select").niceSelect();

  /*------------------
        Scroll To Top
    --------------------*/
  $("#scrollToTopButton").click(function() {
    $("html, body").animate(
      {
        scrollTop: 0
      },
      "slow"
    );
    return false;
  });
})(jQuery);
