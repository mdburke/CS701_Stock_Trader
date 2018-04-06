import { Component, OnInit } from '@angular/core';
// import * as oauth from '../../../node_modules/oauth'
import * as oauth from 'oauth';
import {environment} from "../../environments/environment";

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
      environment.auth.consumer_key,
      environment.auth.consumer_secret,
      "1.0",
      "http://mywebsite.com/tradeking/callback",
      "HMAC-SHA1"
    );

    tradeking_consumer.get(environment.auth.api_url+'/accounts.json', environment.auth.access_token, environment.auth.access_secret,
      function(error, data, response) {
        // Parse the JSON data
        let account_data = JSON.parse(data);
        // Display the response
        console.log(account_data.response);
      };
  }

}
