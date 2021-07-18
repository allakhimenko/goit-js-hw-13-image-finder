import './sass/main.scss';
import API from './js/apiService';
import markup from './templates/picture.hbs';
var debounce = require('lodash.debounce');

const gallery = document.querySelector('.gallery');
const searchForm = document.querySelector('.search-form');
const loadMore = document.querySelector('.load-more');

const apiService = new API();
const observer = new IntersectionObserver(infinityScroll, { threshold: 0, });

observer.observe(loadMore);

//searchForm.addEventListener('input', debounce(onSearchFormInput, 2000));
searchForm.addEventListener('submit', onSearchFormSubmit);

//function onSearchFormInput(evt) {
//    evt.preventDefault();

//    apiService.query = searchForm.elements.query.value;

//    apiService.resetPage()
//    clearPage();
//    fetchPictures();
//    searchForm.elements.query.value = '';
//}

function onSearchFormSubmit(evt) {
    evt.preventDefault();

    apiService.query = searchForm.elements.query.value;

    apiService.resetPage()
    clearPage();
    fetchPictures();
    searchForm.elements.query.value = '';
}

function clearPage() {
    gallery.innerHTML = ''
}

function fetchPictures() {
    apiService.fetchPicture()
        .then(picture => {
            renderPictures(picture);
        })
}

function renderPictures(picture) {
    gallery.insertAdjacentHTML('beforeend', markup(picture))
};

function infinityScroll([entry], observer) {
    if (entry.isIntersecting && apiService.query.trim() !== '') {
        fetchPictures()
    }

}