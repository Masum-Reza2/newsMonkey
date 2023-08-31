let allNewsCat = async () => {
    let res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    let data = await res.json();

    let allCat = data.data.news_category

    showAllCat(allCat)
    // console.log(allCat)
}

allNewsCat()


// loading handler
let loadingHandler = (isLoading) => {
    let loadingSpinner = document.getElementById('loadingSpinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}


//showd all catgories of news in the display
let showAllCat = (allCat) => {
    let newsCategories = document.getElementById('newsCategories');

    
    allCat.forEach(category => {
        // console.log(category)
        let p = document.createElement('p');
        p.classList = 'cursor-pointer  hover:-translate-y-[0.12rem] active:translate-y-[0.12rem] shadow-sm shadow-black'
        p.innerText = category.category_name;
        newsCategories.appendChild(p);

        p.addEventListener('click', () => {
            loadingHandler(true)
            catNewses(category.category_id)
        })
    });

}


let catNewses = async (id) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    let info = await response.json();
    let partNews = info.data;
    // console.log(partNews)

    let categoryNews = document.getElementById('categoryNews');

    categoryNews.textContent = '';

    partNews.forEach(news => {
        console.log(news)
        let div = document.createElement('div');
        div.classList = 'card bg-base-100 shadow-xl font-semibold'
        div.innerHTML = `
        <figure><img src="${news?.image_url}" /></figure>
            <div class="card-body">
                <h2 class="card-title h-24"> ${news?.title} </h2>

                <div class="flex justify-between text-sm">
                    <div class="space-y-1">
                        <h3>${news?.author?.name || 'Global'}</h3>
                        <p>${news?.author?.published_date || 'Not found'}</p>
                        <img class="w-1/3 lg:w-1/4 rounded-full"
                            src="${news?.author?.img || 'Not found'}
                            alt="">
                    </div>

                    <div>
                        <p>${news?.others_info?.is_trending? 'tranding' : 'Not in Trand'}</p>
                        <p>${news?.rating?.number || 'Unavailable'}</p>
                        <p>${news?.rating?.badge || 'Unavilable'}</p>
                        <p>View:${news?.total_view}</p>
                    </div>

                </div>

                <button class="btn shadow-md shadow-gray-300">Details</button>

            </div>
        `
        categoryNews.appendChild(div)
    });

    loadingHandler(false)

}

// by default showing all news
catNewses('08')