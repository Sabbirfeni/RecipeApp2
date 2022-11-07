let searchBar = document.getElementById('search__bar');
let message = document.getElementById('message');
let search__btn = document.getElementById('search__btn');
let recipe__container = document.getElementById('recipe__container');
let details__container = document.getElementById('details__container');
search__btn.addEventListener('click', searchRecipe)
recipe__container.addEventListener('click', showDetails);

function searchRecipe() {
    document.getElementById('recipe__container').innerHTML = '';
    let inputValue = searchBar.value.trim();
    
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`)
    .then(response => response.json())
    .then(data => {
        let html = ``;
        if(data.meals) {
            data.meals.forEach(meal => {
                
                html += `<div class="recipe" id="recipe" data-id=${meal.idMeal}>
                            <img src='${meal.strMealThumb}' alt="image">
                            <h5>${meal.strMeal}</h5>
                            <button class='button' id='button'>Details</button>
                        </div>`
                    
            })
    
            document.getElementById('recipe__container').innerHTML = html;
            message.innerHTML = '';
        } else {
            message.innerHTML = 'Recipe not found!'
        }
        
    })
};

function showDetails(e) {
    
    if(e.target.classList.contains('button')) {
        let idNumber = e.target.parentElement.dataset.id;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idNumber}`)
        .then(response => response.json())
        .then(data => {
            let mealObj = data.meals[0];
            console.log(mealObj)
            let html = `<div class="details">
                            <h1>${mealObj.strMeal}</h1>
                            <img src="${mealObj.strMealThumb}" alt="">
                            <p>details</p>
                            <a href="${mealObj.strYoutube}" target="_blank">Watch video</a>
                            
                        </div>
                        <button id='closeBtn'>X</button>`;

            details__container.innerHTML = html;
            details__container.classList.add('active');
            
            document.getElementById('closeBtn').addEventListener('click', () => {
                details__container.classList.remove('active');
            
            })
        })
        // console.log(e.target.parentElement.dataset.id);
    }
}
