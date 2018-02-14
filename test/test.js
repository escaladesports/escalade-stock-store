import { expect } from 'chai'
import PriceStore from '../src'

const timeout = 10 * 1000

function createStore(options){
	return new PriceStore({
		site: 'goalrilla',
		ids: ['B1002'],
		//verbose: true,
		pollInterval: false,
		...options
	})
}

describe('Price store', function(){

	it('Should return a price', done => {
		createStore()
			.addEvent(prices => {
				expect(typeof prices[`b1002`]).to.equal('string')
				done()
			})
	}).timeout(timeout)

	it('Should return an unformatted price', done => {
		createStore()
			.addEvent(prices => {
				expect(typeof prices[`b1002`]).to.equal('number')
				done()
			}, { formatted: false })
	}).timeout(timeout)

	it('Should return an single price', done => {
		createStore()
			.addEvent(price => {
				expect(typeof price).to.equal('string')
				done()
			}, { id: `b1002` })
	}).timeout(timeout)

	it('Should return an price added later', done => {
		createStore({ ids: [] })
			.addEvent(price => {
				expect(typeof price).to.equal('string')
				done()
			}, { id: `b1002` })
	}).timeout(timeout)

	it('Should return an undefined price', done => {
		createStore({ ids: ['abc123'] })
			.addEvent(prices => {
				expect(prices[`abc123`]).to.equal('undefined')
				done()
			})
	}).timeout(timeout)

})