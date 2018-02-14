import format from 'usd-formatter'
import DataStore from 'escalade-data-store'

function formatPrice(price) {
	if (price === 'undefined') {
		return 'undefined'
	}
	return format(price)
}

class PriceStore extends DataStore {
	constructor(options){
		options = {
			envEndpoints: [`PRICING_ENDPOINT`, `GATSBY_PRICING_ENDPOINT`],
			cookiePrefix: `escaPricing`,
			productionEndpoint: `https://cojn6cbcd7.execute-api.us-east-1.amazonaws.com/production/handler`,
			stagingEndpoint: `https://hmfnvefe14.execute-api.us-east-1.amazonaws.com/staging/handler`,
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
					if (opt.formatted) {
						this.log(`Triggering change for ${id}: formatted price`)
						this.changeEvents[key](this.getFormattedPrice(id))
					}
					else {
						this.log(`Triggering change for ${id}: unformatted price`)
						this.changeEvents[key](this.getPrice(id))
					}
				}
			}
			else if (opt.id === false) {
				if (opt.formatted) {
					this.log(`Triggering change for all: formatted price`)
					this.changeEvents[key](this.getFormattedPrices())
				}
				else {
					this.log(`Triggering change for all: unformatted price`)
					this.changeEvents[key](this.getPrices())
				}
			}
		})
	}
	getPrice(id) {
		id = id.toLowerCase()
		if (id in this.store) {
			return this.store[id]
		}
	}
	getPrices() {
		return {
			...this.store
		}
	}
	getFormattedPrice(id) {
		let price = this.getPrice(id)
		if (price) {
			return formatPrice(price)
		}
	}
	getFormattedPrices() {
		let prices = {}
		for (let i in this.store) {
			if (this.store[i]) {
				prices[i] = formatPrice(this.store[i])
			}
		}
		return prices
	}
}

export default PriceStore