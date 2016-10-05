/* eslint-disable no-undef */
import { expect } from 'chai'
import helper from './helper'
import HttpRequest from '../httpRequest'

describe('HttpRequest', () => {
  let request
  before(() => {
    request = new HttpRequest()
    // request.debug = true
    helper.addNockServer()
  })
  it('Get', () => {
    request.jsonPost = true
    return request.get(`${helper.host}/foo`)
      .then(res => {
        expect(res).to.deep.equal({message: 'foo'})
      })
  })
  it('Get param', () => {
    request.jsonPost = true
    return request.get(`${helper.host}/foo_param`,
      {
        user: 'blob'
      })
      .then(res => {
        expect(res).to.deep.equal({
          message: 'foo_param',
          user: 'blob'
        })
      })
  })
  it('Post', () => {
    request.jsonPost = true
    return request.post(`${helper.host}/bar`)
      .then(res => {
        expect(res).to.deep.equal({message: 'bar'})
      })
  })
  it('Post param', () => {
    request.jsonPost = true
    return request.post(`${helper.host}/bar_param`,
      {
        username: 'pgte',
        email: 'pedro.teixeira@gmail.com'
      })
      .then(res => {
        expect(res).to.deep.equal({
          message: 'bar_param',
          username: 'pgte',
          email: 'pedro.teixeira@gmail.com'
        })
      })
  })
})

/* eslint-enable no-undef */
