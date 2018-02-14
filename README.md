# escalade-stock-store

An event-based store system for getting Escalade Sports stock. Stores all fetched stock in a cookie for quick retrieval.

## Installation

```bash
yarn add escalade-stock-store
```

## Usage

```javascript
import StockStore from 'escalade-stock-store'

const stockStore = new StockStore({
	site: `goalrilla`,
	ids: [ `ID1`, `ID2` ]
})

function allChanged(stock){
	console.log(stock)
}

stockStore.addEvent(allChanged)

stockStore.removeEvent(allChanged)
```