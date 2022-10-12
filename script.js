// ==========================WEB API===========================
let api_key = "3ca3651fa9077ddc657ee3d7dbbdda9c";

// ============================HOME============================
let container = document.getElementById("containers");
// console.log(container);

let getDataMovie = async () => {
    let URL = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&page=1`;

    let response = await fetch(URL);
    // console.log(response);

    let allMovies = await response.json();
    // console.log(allMovies);

    let dataMovies = allMovies.results;
    // console.log(dataMovies);

    for (let i = 0; i < dataMovies.length; i++) {
        let dateRelease = moment(dataMovies[i].release_date).format("ll");
        // console.log(dateRelease);

        container.innerHTML += `
            <div class="card m-3 text-bg-dark" style="width: 15rem; border: 1px solid white; box-shadow: 5px 5px 10px 0px rgba(255,255,255,0.3);">
                <div class="card-header p-2 text-center">${dataMovies[i].title}</div>
                <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${dataMovies[i].poster_path}" class="card-img-top" alt="${dataMovies[i].title}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-8">
                            <h6 class="card-subtitle mb-2 text-white text-opacity-75">${dataMovies[i].original_title}</h6>
                        </div>
                        <div class="col-4">
                            <h6 class="card-subtitle mb-2 fw-bold">&#11088;${dataMovies[i].vote_average}</h6>
                        </div>
                    </div>
                </div>
                <div class="card-footer" style="border-top: 1px solid white;"><i>Release Date: ${dateRelease}</i></div>
            </div>
            `;
    }
};
getDataMovie();

// ================SEARCH FORM=================================

let searchInput = document.getElementById("search-form");
// console.log(searchInput);

searchInput.addEventListener("submit", (event) => {
    event.preventDefault();

    let search_key = document.getElementById("search").value;

    if (search_key == "") {
        container.innerHTML = `Please enter the keywords you are looking for`;
    } else {
        container.innerHTML = "";

        let getSearchMovie = async () => {
            let URL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${search_key}&page=1`;

            let response = await fetch(URL);
            // console.log(response);

            let search = await response.json();
            // console.log(search);

            let dataSearch = search.results;
            // console.log(dataSearch);

            let p = document.getElementById("text-search");
            // console.log(p);
            p.innerHTML = `<i>Search results : <b>${search_key}</b></i>`;

            for (let i = 0; i < dataSearch.length; i++) {
                let dateRelease = moment(dataSearch[i].release_date).format("ll");

                // console.log(dataSearch[i].title);

                container.innerHTML += `
                <div class="card m-3 text-bg-dark" style="width: 15rem; border: 1px solid white; box-shadow: 5px 5px 10px 0px rgba(255,255,255,0.3);">
                <div class="card-header p-2 text-center">${dataSearch[i].title}</div>
                    <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${dataSearch[i].poster_path}" class="card-img-top" alt="${dataSearch[i].title}">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <h6 class="card-subtitle mb-2 text-white text-opacity-75">${dataSearch[i].original_title}</h6>
                            </div>
                            <div class="col-4">
                                <h6 class="card-subtitle mb-2 fw-bold">&#11088;${dataSearch[i].vote_average}</h6>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer" style="border-top: 1px solid white;"><i>Release Date: ${dateRelease}</i></div>
                </div>
                `;
            }
        };

        getSearchMovie();
    }
});
