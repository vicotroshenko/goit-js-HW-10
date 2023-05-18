import './css/styles.css';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';
import CountryList from './fetchCountries.js'


const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  info: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(((event)=>{
	countryList.inputText  = refs.input.value.trim();
	fetchCountry();
}), DEBOUNCE_DELAY));



const countryList = new CountryList()

function fetchCountry() {
	countryList.fetchCountries().then(countries => {
		if(refs.input.value === '') {
			return clearData();
		}
		onMurkup(countries);
	}).catch(error => Notiflix.Notify.failure("Oops, there is no country with that name"));
};


function onMurkup(countries) {
  if (countries.length > 10) {
		clearData();
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  } else if (countries.length >= 2 && countries.length <= 10) {
    clearData();
    const markup = countries.map(country => {
      return `<li><img src="${country.flags.svg}" width="30" style="margin: 0 10px; 4px 0">
							<span>${country.name.common}</span>
							</li>`
		}).join('');
		refs.list.insertAdjacentHTML('beforeend', markup);
  } else {
		clearData();
		const markupCountry = countries.map(country => {
     		return `<img src="${country.flags.svg}" class="image">
				<span class="country">${country.name.common}</span>
				<div><b>Capital:</b><span> ${country.capital}</span></div>
				<div><b>Population:</b><span> ${country.population}</span></div>
				<div><b>Languages:</b><span class="lang"> ${Object.values(country.languages).join(', ')}</span></div>`
    }).join('');
		refs.info.insertAdjacentHTML('beforeend', markupCountry);
  }
}

function clearData() {
	refs.list.innerHTML = '';
	refs.info.innerHTML = '';
}