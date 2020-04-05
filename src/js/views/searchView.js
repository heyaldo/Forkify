import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearList = () => {
    elements.searchList.innerHTML = '';
};

const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = []; // we can mutated an array
    if (title.length > limit) {
        title.split(' ').reduce((i, current) => {
            if(i + current.length <= limit) {
                newTitle.push(current);
            }
            return i + current.length;
        }, 0);

        //return the results
        return `${newTitle.join(' ')} ...`;
    }
    return title; 
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link" href="#${ recipe.recipe_id }">
                <figure class="results__fig">
                    <img src="${ recipe.image_url }" alt="${ recipe.title }">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${ limitRecipeTitle(recipe.title) }</h4>
                    <p class="results__author">${ recipe.publisher }</p>
                </div>
            </a>
        </li>
    `;
    elements.searchList.insertAdjacentHTML('beforeend', markup);
};

export const renderResults = recipes => {
    recipes.forEach(renderRecipe);
};