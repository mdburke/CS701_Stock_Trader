// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { secrets } from "./secrets";

export const environment = {
  production: false,
  urls: {
    trade_king_request: "https://developers.tradeking.com/oauth/request_token",
    trade_king_access: "https://developers.tradeking.com/oauth/access_token",
    alpha_vantage_daily: "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=",
    alpha_vantage_api_key_suffix: "&apikey=" + secrets.alpha_vantage_key
  }
};
