// CREATE REQUEST OBJECT
var req = new XMLHttpRequest();

//  API CALL KEYWORD
let keyword = "war";

//  API CALL DATA
req.open('GET', `http://api.tvmaze.com/search/shows?q=${keyword}`);
req.send(null);

// GET JSON DATA FROM API
req.onreadystatechange = function () {
    if (req.readyState === 4) {
        var response = req.responseText;
        var movies = JSON.parse(response);
        var num = 0;
        console.log(movies);
        // SELECT BODY
        body = document.querySelector("body");
        header = document.querySelector('header');
        footer = document.querySelector('footer');
        container = document.createElement("div");
        container.classList.add('container', 'tv_container');
        body.insertBefore(container, footer);
        movies.forEach(movie => {
             // TITLE
            row_one = document.createElement("div");
            row_one.classList.add('row', 'tv_row_1', 'mb-5', 'mt-5');
            container.appendChild(row_one);
            col_one = document.createElement("div");
            col_one.classList.add('col', 'col_one');
            row_one.appendChild(col_one);

            title = document.createElement("h2");
            title.classList.add('tv_title', 'mt-3', 'mb-3');
            title.innerText = movie.show.name;

            // body.appendChild(title);
            // IMAGE
            image = document.createElement("img");
            if(movie.show.image !== null) {
                image.src = movie.show.image.medium;
            } else {
                image.src = "https://www.allianceplast.com/wp-content/uploads/2017/11/no-image.png";
                image.style = "width: 210px; height: 295px;";
            }
            image.classList.add('mb-3');

            col_one.appendChild(image);
            col_one.insertBefore(title, image);

            // rating

            rating = document.createElement("div");
            rating.classList.add('rating');
            if(movie.show.rating.average != null){
                rating.innerHTML = "Average rating: " + movie.show.rating.average;
            }
            else{
                rating.innerHTML = "No average rating";
            }
            col_one.appendChild(rating);

            // buttons

            button1 = document.createElement("button");
            button1.classList.add('btn', 'btn-warning', 'mr-1', 'mt-3', 'mb-3');
            button1.innerText = "Episodes";
            col_one.appendChild(button1);
            button2 = document.createElement("button");
            button2.classList.add('btn', 'btn-warning');
            button2.innerText = "Cast";
            col_one.appendChild(button2);


            // SUMMARY
            col_two = document.createElement("div");
            col_two.classList.add('col', 'col_two');
            row_one.appendChild(col_two);
            summary = document.createElement("div");
            summary.classList.add('tv_summary', 'mt-5', 'align-middle');
            summary.innerHTML = movie.show.summary;

            // summary.id = "summid" + num.toString();
            // num++

            col_two.appendChild(summary);

        });
    }
};