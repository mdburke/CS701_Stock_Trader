import { Component, OnInit } from '@angular/core';
// import * as oauth from '../../../node_modules/oauth'
import * as oauth from 'oauth';
import {secrets} from "../../environments/secrets";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let tradeking_consumer = new oauth.OAuth(
      "https://developers.tradeking.com/oauth/request_token",
      "https://developers.tradeking.com/oauth/access_token",
      secrets.auth.consumer_key,
      secrets.auth.consumer_secret,
      "1.0",
      "http://mywebsite.com/tradeking/callback",
      "HMAC-SHA1"
    );

    tradeking_consumer.get(
      secrets.auth.api_url+'/market/ext/quotes.json?symbols=aapl',
      secrets.auth.access_token,
      secrets.auth.access_secret,
      function(error, data, response) {
        // Parse the JSON data
        let account_data = JSON.parse(data);
        // Display the response
        console.log(account_data.response);
      };
  }

}
