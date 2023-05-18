export default class CountryList {
	constructor() {
		this.searchedCountry = '';
	}

	fetchCountries() {
		console.log(this)
		const url = `https://restcountries.com/v3.1/name/${this.searchedCountry}?fields=name,capital,population,flags,languages`;
		return fetch(url)
			.then(response => {
				if (!response.ok) {
					throw new Error(response.status);
				}
				return response.json();
			})
			.then(countries => {
				return countries;
			})
			
	}

	get inputText() {
		return this.searchedCountry;
	}

	set inputText(newInputText) {
		this.searchedCountry = newInputText;
	}
}