import { shallow } from 'enzyme';
import { expect } from 'chai';

import React from 'react'

import App from '../../../app/scripts/components/App'


describe('<App />', function() {
  let app = shallow(<App/>);

  it('should render a div to the DOM', () => {
    expect(app.is('div')).to.be.true;
    expect(app.is('input')).to.be.false;
  });

  it('it should have an id of "app"', () => {
    expect(app.is('#app')).to.be.true;
  });

  it('should render children when passed in', () => {
   const app = shallow(
     <app>
       <div className="unique" />
     </app>
   );
   expect(app.contains(<div className="unique" />)).to.be.true;
 });
})
