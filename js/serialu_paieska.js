"use strict";

(function ($) {
  let body = document.querySelector("body");
  let header = document.querySelector("header");
  let footer = document.querySelector("footer");
  let container = document.createElement("div");
  container.classList.add("container", "tv_container");
  let genres_container = document.querySelector("#genres-container");
  body.insertBefore(container, footer);

  // SET OF UNIQUE GENRES
  let genres;
  let genres_select = document.querySelector("#genres-selection");

  // FUNCTION FOR GENRE COLLECTION
  function farmGenres(source) {
    if (source.length != 0) {
      genres.add(...source);
    }
  }

  //  PRINT GENRES
  function printGenres() {
    genres_select.innerHTML = "";
    if (genres.size != 0) {
      let select = document.createElement("select");
      select.setAttribute("name", "genres-selection");
      select.classList.add("form-control", "text-center");
      genres.forEach(genre => {
        let option = document.createElement("option");
        option.innerText = genre;
        option.setAttribute("value", genre);
        select.append(option);
      });
      genres_select.append(select);
    }
  }

  /*-----------------------------
    Starting Search
-------------------------------*/
  // Feching data from TVmaze with key word

  // Getting input Value by every keyup
  document.addEventListener("DOMContentLoaded", async function () {
    async function getSearchRezults(keyWord) {
      let url;
      if (keyWord) {
        url = `https://api.tvmaze.com/search/shows?q=${keyWord}`;
      } else if (!keyWord || keyWord === "") {
        url = `https://api.tvmaze.com/schedule/web`;
      }

      let response = await fetch(url);
      if (!response.ok) {
        let message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      let data = await response.json();
      return data;
    }

    await getSearchRezults().then((movies) => {
      container.innerHTML = "";
      // RESET GENRES SET
      genres = new Set();
      movies.map((movie) => {

        // FARM GENRES
        farmGenres(movie._embedded.show.genres);

        // TITLE
        let row_one = document.createElement("div");
        row_one.classList.add("row", "tv_row_1", "mb-5", "mt-5");
        container.appendChild(row_one);
        let col_one = document.createElement("div");
        col_one.classList.add("col-md-6", "col_one", "col-sm-12");
        row_one.appendChild(col_one);

        let title = document.createElement("h2");
        title.classList.add("tv_title", "mt-3", "mb-3");
        title.innerText = movie._embedded.show.name;

        // body.appendChild(title);
        // IMAGE
        let image = document.createElement("img");
        if (movie._embedded.show.image !== null) {
          image.src = movie._embedded.show.image.medium;
        } else {
          image.src =
            "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png";
          image.style = "width: 210px; height: 295px;";
        }
        image.classList.add("mb-3");

        col_one.appendChild(image);
        col_one.insertBefore(title, image);

        // rating

        let rating = document.createElement("div");
        rating.classList.add("rating");
        if (movie._embedded.show.rating.average != null) {
          rating.innerHTML =
            "Average rating: " + movie._embedded.show.rating.average;
        } else {
          rating.innerHTML = "No average rating";
        }
        col_one.appendChild(rating);

        // buttons

        let button1 = document.createElement("button");
        button1.classList.add("btn", "btn-warning", "mr-1", "mt-3", "mb-3");
        button1.innerText = "Episodes";
        col_one.appendChild(button1);
        let button2 = document.createElement("button");
        button2.classList.add("btn", "btn-warning");
        button2.innerText = "Cast";
        col_one.appendChild(button2);

        // SUMMARY
        let col_two = document.createElement("div");
        col_two.classList.add("col-md-6", "col_two", "col-sm-12");
        row_one.appendChild(col_two);
        let summary = document.createElement("div");
        summary.classList.add("tv_summary", "mt-5", "align-middle");
        summary.innerHTML = movie._embedded.show.summary;

        // summary.id = "summid" + num.toString();
        // num++

        col_two.appendChild(summary);
      });

      // PRINT GENRES
      printGenres();

    });

    $(".search-model-form").submit(function (e) {
      e.preventDefault();
    });

    $(".search-model-form").on("keypress", "#search-input", async function (e) {
      // On enter print TV shows by input value
      if (e.which == 13) {
        // $(location).attr("href", "serialu_paieska.html");
        await getSearchRezults($(this).val()).then((movies) => {
          container.innerHTML = "";
          let h2_text = "";
          if (movies == null || movies == "") {
            document.querySelector("footer").style = "position: fixed;";
            h2_text = "Rezultatų nerasta pagal raktinį žodį!";
          } else {
            document.querySelector("footer").style = "position: relative;";
            h2_text = `Rezultatai pagal raktinį žodį \"${e.target.value}\" !`;
          }

          document.querySelector("#on_air_today").innerText = h2_text;

          // RESET GENRES SET
          genres = new Set();
          movies.map((movie) => {
            // FARM GENRES
            farmGenres(movie.show.genres);
            // TITLE
            let row_one = document.createElement("div");
            row_one.classList.add("row", "tv_row_1", "mb-5", "mt-5");
            container.appendChild(row_one);
            let col_one = document.createElement("div");
            col_one.classList.add("col-md-6", "col_one", "col-sm-12");
            row_one.appendChild(col_one);

            let title = document.createElement("h2");
            title.classList.add("tv_title", "mt-3", "mb-3");
            title.innerText = movie.show.name;

            // body.appendChild(title);
            // IMAGE
            let image = document.createElement("img");
            if (movie.show.image !== null) {
              image.src = movie.show.image.medium;
            } else {
              image.src =
                "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png";
              image.style = "width: 210px; height: 295px;";
            }
            image.classList.add("mb-3");

            col_one.appendChild(image);
            col_one.insertBefore(title, image);

            // rating

            let rating = document.createElement("div");
            rating.classList.add("rating");
            if (movie.show.rating.average != null) {
              rating.innerHTML = "Average rating: " + movie.show.rating.average;
            } else {
              rating.innerHTML = "No average rating";
            }
            col_one.appendChild(rating);

            // buttons

            let button1 = document.createElement("button");
            button1.classList.add("btn", "btn-warning", "mr-1", "mt-3", "mb-3");
            button1.innerText = "Episodes";
            col_one.appendChild(button1);
            let button2 = document.createElement("button");
            button2.classList.add("btn", "btn-warning");
            button2.innerText = "Cast";
            col_one.appendChild(button2);

            // SUMMARY
            let col_two = document.createElement("div");
            col_two.classList.add("col-md-6", "col_two", "col-sm-12");
            row_one.appendChild(col_two);
            let summary = document.createElement("div");
            summary.classList.add("tv_summary", "mt-5", "align-middle");
            summary.innerHTML = movie.show.summary;

            // summary.id = "summid" + num.toString();
            // num++

            col_two.appendChild(summary);
          });

          // PRINT GENRES
          printGenres();
        });
      }
    });
  });

  /*-----------------------------
      End Search
  -------------------------------*/

})(jQuery);
