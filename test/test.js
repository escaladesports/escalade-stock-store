import { expect } from 'chai'
import StockStore from '../src'

const timeout = 10 * 1000

function createStore(options){
	return new StockStore({
		site: 'goalrilla',
		ids: ['B1002'],
		//verbose: true,
		pollInterval: false,
		...options
	})
}

describe('Price store', function(){

	it('Should return a stock', done => {
		createStore()
			.addEvent(stock => {
				expect(typeof stock[`b1002`]).to.equal(`number`)
				done()
			})
	}).timeout(timeout)

	it('Should return an single stock', done => {
		createStore()
			.addEvent(stock => {
				expect(typeof stock).to.equal(`number`)
				done()
			}, { id: `b1002` })
	}).timeout(timeout)

	it('Should return an stock added later', done => {
		createStore({ ids: [] })
			.addEvent(stock => {
				expect(typeof stock).to.equal(`number`)
				done()
			}, { id: `b1002` })
	}).timeout(timeout)

	it('Should return no stock', done => {
		createStore({ ids: ['abc123'] })
			.addEvent(stock => {
				expect(stock[`abc123`]).to.equal(0)
				done()
			})
	}).timeout(timeout)

})