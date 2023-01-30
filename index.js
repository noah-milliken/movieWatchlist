let searchConcat
let newList
let movieList = document.getElementById('movie-list')
let addButton = document.getElementById('add-button')
let imdbArr = JSON.parse(localStorage.getItem('imdb_Arr')) || []

searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    let searchField = document.getElementById('search-field');
    searchConcat = searchField.value.split(' ').join('+')
    getMovies()
});

if (localStorage.getItem(imdbArr)) {
    imdbArr = JSON.parse(localStorage.getItem('imdb_Arr'))
}

document.addEventListener('click', function (e) {
    if (e.target.dataset.id && !imdbArr.includes(e.target.dataset.id))
        imdbArr.push(e.target.dataset.id)
    localStorage.setItem('imdb_Arr', JSON.stringify(imdbArr))
    console.log(JSON.parse(localStorage.getItem('imdb_Arr')))
})

async function getMovies() {
    const response = await fetch(`http://www.omdbapi.com/?s=${searchConcat}&apikey=32992baf&10`)
    const movies = await response.json()
    const newList = await movies.Search
    renderHtml(movies.Search)
};


async function renderHtml(movieResults) {
    movieList.innerHTML = ``
    movieResults.forEach(result => {
        fetch(`http://www.omdbapi.com/?apikey=32992baf&i=${result.imdbID}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                movieList.innerHTML += `
                <div class="movie-container">
                <div class="movie-poster">
                    <img src=${data.Poster} />
                </div>
                <div class="movie-text">
                    <div class=title>
                        <h3 class="movie-title"> ${data.Title}</h3>
                        <p class="movie-rating"> ⭐️${data.imdbRating}</p>
                    </div>
                    <div class="info">
                        <p class="movie-durration"> ${data.Runtime}</p>
                        <p class="movie-genre"> ${data.Genre}</p>
                        <div class="add-button">
                        <button id="add-button" data-id="${data.imdbID
                    }">+</button>
                        <h5>Watchlist</h5>
                        </div>
                    </div>
                    <p class="movie-plot"> ${data.Plot}</p>
                    
                </div>
                
            </div>
            <hr/>



            `

            })

    });
    async function renderWatchList(imdbArr) {
        console.log(imdbArr)

    }

}


