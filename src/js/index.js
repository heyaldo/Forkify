// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';


/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

const controlSearch = async () => {
    // 1) Get query from view
    const query = searchView.getInput();
    console.log(query);
    
    if(query) {
        // 2) New search object and add to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearList();
        renderLoader(elements.searchListBox);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render the results on UI
            clearLoader();
            console.log(state.search.result);
            searchView.renderResults(state.search.result);
        }catch(error){
            alert('Something wrong with the search...');
            clearLoader();
        }
        
    }
};

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
    // console.log(e.target);
    const btn = e.target.closest('.btn-inline');
    // console.log(btn);
    if (btn) {
        searchView.clearList();
        const goToPage = parseInt(btn.dataset.goto, 10);
        console.log(goToPage);
        searchView.renderResults(state.search.result, goToPage);
    }
});

//const search = new Search('pizza');
//console.log(search);
//search.getResults();

//const r = new Recipe(35626);
//r.getRecipe();
//console.log(r);

/**
 * Recipe Controller
 */
const controlRecipe = async () => {
    // Get id from the url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if(id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if(state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // Calculate servings and time 
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            console.log(state.recipe);
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch(error){
            alert('Error processing recipe');
        }
            
    }
};

// window.addEventListener('hashchange', controlRecipe);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if(e.target.matches('.btn-decrease, .btn-decrease *')) { // btn-increase and any child 
        // Decrease servings
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }    
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase servings
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    }
    console.log(state.recipe);
    //recipeView.updateServingsIngredients(state.recipe);
});
