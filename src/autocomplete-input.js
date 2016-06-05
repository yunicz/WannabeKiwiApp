import {bindable, bindingMode} from 'aurelia-framework';


export class AutocompleteInputCustomElement {

	inputValue = '';
	@bindable inputLabel = '';
	@bindable inputIcon = '';
	@bindable inputId = '';
	@bindable({ defaultBindingMode: bindingMode.twoWay }) inputModel = '';

	hasFocus = false;

	autocompleteOptions = null;

	model = null;
	
	keyupHandler = () => {

		const query = {
			v: 2,
			limit: 20,
			term: this.inputValue,
		};

		fetch(`https://api.skypicker.com/places?${$.param(query)}`, {
			method: 'get',
		})
		.then(response => response.json())
		.then(places => {
			this.autocompleteOptions = places
				.filter(item => item.type === 2)
				.sort((itemA,itemB) => itemB.sp_score - itemA.sp_score)
				.slice(0, 6);

			if (this.autocompleteOptions.length) {
				this.inputModel = this.autocompleteOptions[0].id;
			}
		});
	};

	setValue = event => {
		this.inputModel = event.target.dataset.id;
		this.inputValue = event.target.text
	}

}