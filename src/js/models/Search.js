import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
            console.log(res); //Api Resful Answer 
            this.result = res.data.recipes;
            //console.log(this.result); it's printed in the controller
        } catch(error) {
            alert(error);
        }
            
    }
}