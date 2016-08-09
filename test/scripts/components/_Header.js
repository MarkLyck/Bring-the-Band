import { shallow } from 'enzyme';
import { expect } from 'chai';

import React from 'react'



import Header from '../../../app/scripts/components/Header'

GLOBAL.localStorage = {}

describe('<Header />', function() {
  let header = shallow(<Header/>);

  it('should render a header to the DOM', () => {
    expect(header.is('header')).to.be.true;
    expect(header.is('div')).to.be.false;
  });

  it('it should have a <nav> in it', () => {
    expect(header.find('nav')).to.have.length(1);
  });

  it('it should have a logo in it', () => {
    expect(header.find('#logo')).to.have.length(1);
    expect(header.find('#logo').is('img')).to.be.true
  });

  it('it should have a wrapper in it', () => {
    expect(header.find('.wrapper')).to.have.length(1);
    expect(header.find('.wrapper').is('div')).to.be.true
  });

  it('#nav-links should exist', () => {
    expect(header.find('#nav-links')).to.have.length(1);
  })

  it('the wrapper should have a login, signup and topbands buttons in it', () => {
    expect(header.find('#nav-links').children()).to.have.length(3);
    expect(header.find('#nav-links').find('#logout-btn')).to.have.length(0);
    expect(header.find('#nav-links').find('#top-bands')).to.have.length(1);
    expect(header.find('#nav-links').find('#login-btn')).to.have.length(1);
    expect(header.find('#nav-links').find('#signup-btn')).to.have.length(1);
  });

  it('it should have a hero in it', () => {
    expect(header.find('#hero')).to.have.length(1);
    expect(header.find('#hero').is('div')).to.be.true
    expect(header.find('#hero').find('.content')).to.have.length(1);
  });

  it('The Hero should have 2 buttons in it when logged out', () => {
    expect(header.find('.content').find('button')).to.have.length(2);
  });

  it('it should not show a modal by default', () => {
    expect(header.find('.modal')).to.have.length(0);
  });

  header.setState({authtoken: '4b1816a3-41d8-4444-89b7-d25f2ca8f6d8.tUYS91BzaWbYGXm1s2qC5rY7Q7Dr3dgXALCaZFWQx00='});

  // it('The Hero should have 1 button in it when logged in', () => {
  //
  //   expect(header.find('.content').find('button')).to.have.length(1);
  // });

  // it('when logged in it should have logout and topBands buttons', () => {
  //   expect(header.find('#nav-links').find('a')).to.have.length(2);
  //   expect(header.find('#nav-links').find('#logout-btn')).to.have.length(1);
  //   expect(header.find('#nav-links').find('#top-bands')).to.have.length(1);
  //   expect(header.find('#nav-links').find('#login')).to.have.length(0);
  //   expect(header.find('#nav-links').find('#signup')).to.have.length(0);
  // });

})
