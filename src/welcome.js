import 'whatwg-fetch';
import $ from 'jquery';
import moment from 'moment';

export class Welcome {

  isLoading = false;

  from = '';
  to = '';
  departureInput = null;

  flights = [];

  attached(){
    this.departureInput = $('.datepicker').pickadate();
  }

  formatTimestamp(stamp) {
    return moment(stamp, 'X').format('DD MMMM YYYY');
  }

  submit() {

    this.isLoading = true;

    const query = {
      dateFrom: this.departureInput.val() ?
        moment(this.departureInput.val(), "DD MMMM YYYY").format('DD/MM/YYYY') :
        null,
      flyFrom: this.from ? this.from : null,
      to: this.to ? this.to : null,
      limit: 20,
    };

    fetch(`https://api.skypicker.com/flights?${$.param(query)}`, {
      method: 'get'
    })
    .then(response => response.json())
    .then(flights => {
      this.isLoading = false;
      this.flights = flights.data;
      console.log(flights.data);
    })

  }

}

