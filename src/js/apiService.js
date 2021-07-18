export default class ApiService {

    constructor() {
        this.searchQuery = '',
            this.page = 1,
            this.KEY = '22549804-6372a8a31cd4cb0b59fbcc57f',
            this.BASE_URL = 'https://pixabay.com/api'
    };

    fetchPicture() {
        return fetch(`${this.BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${this.KEY}`)
            .then(res => res.json())
            .then(data => {
                this.page += 1;
                return data.hits;
            })
    }
    resetPage() {
        this.page = 1;
    };

    get query() {
        return this.searchQuery;
    };

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

};
