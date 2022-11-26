const $form = document.getElementById('form')
const $date = document.getElementById('date')
const $search = document.getElementById('search')
const $body = document.body
const $overlay = document.getElementById('overlay')
const $favorites = document.getElementById('favorites')


let gallery = []

function buildFavorites() {

    const html = []

    for (let i = 0; i < gallery.length; i++) {
        html.push(`      
        <div class="hold">
            <div class="icon">
                <i class="fas fa-star"></i>
            </div>
                <img class="small" src="${gallery[i].url}" alt="${gallery[i].copyright}">
                    <div class="content mt-2">
                        <h4 class="title mt-2">${gallery[i].title}</h4>
                        <h6 class="date">${gallery[i].date}</h6>
                        <button class="btn btn-3 delete mt-2" data-index="${i}">Delete</button>
                        </div>
                    </div>
            </div>`)
    }

    $favorites.innerHTML = html.join('')
}

$form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=VY7GDNe1MAB0Dk6aGk0qsivfadRjrlhtmyEaVE9f&date=${$date.value}`)
    const data = await response.json()

    $search.innerHTML = `<div class="hold">
    <div class="icon">
        <p>Add to favorites</p>
        <i class="far fa-star add" id="save"></i>
    </div>
    <img src="${data.url}" class="image big rounded-start" alt="${data.copyright}">
    <div class="content">
    <h4 class="title mt-2">${data.title}</h4>
    <h6 class="date">${data.date}</h6>
    <p class="text">${data.explanation}</p>
    </div>
    </div>`

    $form.reset()

    const $save = document.getElementById('save')

    $save.addEventListener('click', function () {
        gallery.push(data)
        localStorage.setItem('gallery', JSON.stringify(gallery))
        buildFavorites()

    })

    $body.addEventListener('click', function (e) {
        if (e.target.classList.contains('image')) {
            $overlay.innerHTML = `<img src="${data.hdurl}" alt="${data.copyright}">`
            $overlay.classList.add('show')

        }
    })

})

$favorites.addEventListener('click', function (e) {
    if (e.target.classList.contains('delete')) {
        const index = e.target.dataset.index
        gallery.splice(index, 1)
        buildFavorites()
        localStorage.setItem('gallery', JSON.stringify(gallery))
    }
})

$overlay.addEventListener('click', function () {
    $overlay.classList.remove('show')
})

const ls = localStorage.getItem('gallery')

if (ls) {
    gallery = JSON.parse(ls)
    buildFavorites()

    $favorites.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index
            gallery.splice(index, 1)
            buildFavorites()
        }
    })
}