// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
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

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render the results on UI
        clearLoader();
        console.log(state.search.result);
        searchView.renderResults(state.search.result);
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