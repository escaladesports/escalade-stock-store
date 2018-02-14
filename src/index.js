
import DataStore from 'escalade-data-store'

class StockStore extends DataStore {
	constructor(options){
		options = {
			envEndpoints: [`STOCK_ENDPOINT`, `GATSBY_STOCK_ENDPOINT`],
			cookiePrefix: `escaStock`,
			productionEndpoint: `https://xinn7f22bj.execute-api.us-east-1.amazonaws.com/production/handler`,
			stagingEndpoint: `https://t9w63tqdfk.execute-api.us-east-1.amazonaws.com/staging/handler`,
			...options
		}
		super(options)
	}
	triggerChange(id = false) {
		this.log(`Triggering any changes...`)
		this.changeEventsOptions.forEach((opt, key) => {
			if (id !== false) {
				id = id.toLowerCase()
				if (opt.id === id) {
					this.log(`Triggering change for ${id}`)
					this.changeEvents[key](this.getStock(id))
				}
			}
			else if (opt.id === false) {
				this.log(`Triggering change for all`)
				this.changeEvents[key](this.getAllStock())
			}
		})
	}
	getStock(id) {
		id = id.toLowerCase()
		if (id in this.store) {
			return this.store[id]
		}
	}
	getAllStock() {
		return {
			...this.store
		}
	}
}

export default StockStore