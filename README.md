# CS701_Stock_Trader

## Running the project
1. Download project
2. `cd` into folder
3. Run `npm install`
4. Run `ng serve`
5. Navigate to `http://localhost:4200/` in your browser

## Walk Through
1. The initial homepage opens with some default settings. You should see the watchlist filled with 3 stocks and the stock details section with AAPL data.
2. The Stock Details section will update with the latest data every 5 seconds. Note that this only makes a meaningful difference while the stock market is open from 9:30 - 4 EST. You can see the market status in the message in the Stock Details section.
3. Enter a new stock ticker in the "Search" field (such as "OSTK") and click Submit. You will notice that the stock details and the charts update automatically.
4. Take a look at the Watchlist. Click in the "Symbol" cell of one of the stocks (such as NVDA) and note that all other components update automatically with that ticker's data.
5. Use the Move cell in the Watchlist to adjust the order of the watchlist.
6. Add a symbol (such as "IWM") to the watchlist in the "Add" field. Note that it will update with the correct data and be added.
7. Refresh your browser. You should see the symbols in the watchlist and in the rest of the components stay the same. They are saved in local storage.
8. You can reset the watchlist to the default state by clicking "Reset Watchlist".
9. You can use the various controls in the Charts component to adjust your chart (note, however, this functionality was provided by the library and not myself). 

## Features covered
* Local Storage
    * `services/storage.service.ts`
* Drag and Drop
    * Watchlist component
* Oauth
    * `services/trade-king.service.ts`
* API usage
    * `services/trade-king.service.ts`
    * `services/alpha-vantage.service.ts`
* Services
    * Services folder
* Timed Jobs
    * `services/trade-king.service.ts`
* Pipes
    * Pipes folder
* External Libraries
    * Plotly - Charting in the 'Chart' component
    * Oauth - `services/trade-king.service.ts`
    * Lodash - cloneDeep in `watchlist.component.ts`
    * ng2-dnd - drag and drop in `watchlist.component.html`
    

 
