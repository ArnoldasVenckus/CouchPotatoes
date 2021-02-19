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
  let links = [];

  // get first 5 TV shows
  $.ajax({
    url: "http://api.tvmaze.com/schedule/web",
    async: false,
    success: function (result) {
      result.slice(0, 5).forEach(element => {
        links.push(element._embedded.show);
      });
    }
  });

  /*------------------
        Preloader
    --------------------*/
  $(window).on("load", function () {
    console.log(links);

    // fill carousel with TV shows cover images
    let movie_cover = Array.from(document.querySelectorAll(".set-bg")).slice(3, 8);
    movie_cover.forEach((carouselItem, index) => {
      carouselItem.setAttribute("data-setbg", links[index].image.original);
      carouselItem.setAttribute(
        "style",
        "background-image: url('" + links[index].image.original + "');"
      );
    });

    // fill carousel with TV shows genres
    let movie_genre = Array.from(document.querySelectorAll(".hero__text .label")).slice(3, 8);
    movie_genre.forEach((carouselItem, index) => {
      carouselItem.innerHTML = "";
      if (links[index].genres.length === 0) {
        carouselItem.innerHTML = "No genre information";
      } else {
        links[index].genres.forEach((genre, index2) => {
          if (index2 == links[index].genres.length - 1) {
            carouselItem.innerHTML += genre;
          } else {
            carouselItem.innerHTML += (genre + ",&nbsp;");
          }
        });
      }
    });

    // fill carousel with TV shows titles
    let movie_title = Array.from(document.querySelectorAll(".hero__text h2")).slice(3, 8);
    movie_title.forEach((carouselItem, index) => {
      carouselItem.innerText = links[index].name;
    });

    // fill carousel with links to TV shows episodes
    let movie_link = Array.from(document.querySelectorAll(".hero__text a")).slice(3, 8);
    movie_link.forEach((carouselItem, index) => {
      carouselItem.setAttribute("href", links[index].url);
    });

    // fill carousel with TV shows description
    let movie_description = Array.from(document.querySelectorAll(".hero__text p")).slice(3, 8);
    movie_description.forEach((carouselItem, index) => {
      if (links[index].summary === null) {
        carouselItem.innerHTML = "No description for this show";
      } else {
        carouselItem.innerHTML = links[index].summary;
      }
    });

    $(".loader").fadeOut();
    $("#preloder")
      .delay(200)
      .fadeOut("slow");

    /*------------------
            FIlter
        --------------------*/
    $(".filter__controls li").on("click", function () {
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
  $(".set-bg").each(function () {
    var bg = $(this).data("setbg");
    $(this).css("background-image", "url(" + bg + ")");
  });

  // Search model
  $(".search-switch").on("click", function () {
    $(".search-model").fadeIn(400);
  });

  $(".search-close-switch").on("click", function () {
    $(".search-model").fadeOut(400, function () {
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
    autoplay: true,
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
  $("#scrollToTopButton").click(function () {
    $("html, body").animate({
        scrollTop: 0
      },
      "slow"
    );
    return false;
  });
})(jQuery);