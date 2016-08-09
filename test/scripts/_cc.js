import {expect} from 'chai'
import cc from '../../app/scripts/cc'

describe('cc', function() {

  it('should have a ccFormat() method', () => {
    expect(cc).to.have.property('ccFormat')
    expect(cc.ccFormat).to.be.a('function');
  })

  it('ccFormat() should format the input as "XXXX XXXX XXXX XXXX" and only be numbers', () => {
    expect(cc.ccFormat('1234123412341234')).to.equal('1234 1234 1234 1234');
    expect(cc.ccFormat('123412341234')).to.equal('1234 1234 1234');
    expect(cc.ccFormat('123412341234123452385')).to.equal('1234 1234 1234 1234');
    expect(cc.ccFormat('d.kgfhds.fkndfgjdfg')).to.equal('');
    expect(cc.ccFormat('1234 1234 1234 1234')).to.equal('1234 1234 1234 1234');
    expect(cc.ccFormat('1    234   12   34 1  234 12 34')).to.equal('1234 1234 1234 1234');
  })

  it('should have a dateFormat() method', () => {
    expect(cc).to.have.property('dateFormat')
    expect(cc.dateFormat).to.be.a('function');
  })

  it('dateFormat() should format the input as "XX / XX" and only be valid numbers', () => {
    let e = {
      which: 42
    }
    expect(cc.dateFormat(e, '1207')).to.equal('12 / 07');
    expect(cc.dateFormat(e, 'gdf1hfgh2gj0hjfg7hj')).to.equal('12 / 07');
    expect(cc.dateFormat(e, '2')).to.equal('02 / ');
    expect(cc.dateFormat(e, '7')).to.equal('07 / ');
    expect(cc.dateFormat(e, '1')).to.equal('1');
    expect(cc.dateFormat(e, '14')).to.equal('1');
    expect(cc.dateFormat(e, '102')).to.equal('10 / 2');
    expect(cc.dateFormat(e, 'a')).to.equal('');
    expect(cc.dateFormat(e, '10200')).to.equal('10 / 20');
    expect(cc.dateFormat(e, ' / ')).to.equal('');
    expect(cc.dateFormat(e, '2 / ')).to.equal('02 / ');
  })

  it('should have a cvcFormat() method', () => {
    expect(cc).to.have.property('cvcFormat')
    expect(cc.cvcFormat).to.be.a('function');
  })

  it('cvcFormat() should format the input as "XXX" and only be numbers', () => {
    expect(cc.cvcFormat('123')).to.equal('123');
    expect(cc.cvcFormat('1234')).to.equal('124');
    expect(cc.cvcFormat('a')).to.equal('');
    expect(cc.cvcFormat('a123')).to.equal('123');
    expect(cc.cvcFormat('6q35%$*&*@(%)')).to.equal('635');
    expect(cc.cvcFormat(' 1 2 3   ')).to.equal('123');
    expect(cc.cvcFormat('12')).to.equal('12');
    expect(cc.cvcFormat('1')).to.equal('1');
  })

  it('should have a checkPayment() method', () => {
    expect(cc).to.have.property('checkPayment')
    expect(cc.checkPayment).to.be.a('function');
  })

  // This will fail, because Stripe is undefined. As it was imported directly in HTML.

  // it('checkPayment() should validate a valid card', (done) => {
  //   let card = {
  //     number: 4242424242424242,
  //     cvc: 123,
  //     month: 7,
  //     year: 17,
  //     email: 'mark.lyck@gmail.com'
  //   }
  //   cc.checkPayment(card)
  //     .then(() => {
  //       done()
  //     })
  // })

  it('should have a chargeCard() method', () => {
    expect(cc).to.have.property('chargeCard')
    expect(cc.chargeCard).to.be.a('function');
  })

  // Testing this would have the same problem as the above test

})
