let allNewsCat = async () => {
    let res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    let data = await res.json();

    let allCat = data.data.news_category

    showAllCat(allCat)
}

allNewsCat()

//showd all catgories of news in the display
let showAllCat = (allCat) => {
    let newsCategories = document.getElementById('newsCategories');


    allCat.forEach(category => {
        console.log(category)
        let p = document.createElement('p');
        p.classList = 'cursor-pointer  hover:-translate-y-[0.12rem] active:translate-y-[0.12rem]'
        p.innerText = category.category_name;
        newsCategories.appendChild(p);
    });

}