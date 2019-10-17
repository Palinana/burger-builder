import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Route } from 'react-router-dom';
import { Checkout } from './Checkout';

configure({ adapter: new Adapter() });

describe('<Checkout />', () => {
    let wrapper;
    const props = { match: {url: '/checkout'} };

    beforeEach(() => {
        wrapper = shallow(<Checkout {...props} />);
        wrapper.setProps({ ingredients: { salad: 0 } });
    });

    it('should render <CheckoutSummary /> component', () => {
        // console.log(wrapper.debug()) 
        // console.log(wrapper.state());           
        expect(wrapper.find('CheckoutSummary').exists()).toBe(true);
    });

    it('should render Route to Contact Data component', () => {
        wrapper.setProps({ ingredients: { salad: 0 } });

        expect(wrapper.find('Route').exists()).toBe(true);
    });

    it('should render Route to be equal to the link to Contact Data component', () => {        
        let pathMap = {};
        expect(wrapper.find(Route).reduce((pathMap, route) => {
            const routeProps = route.props()
            pathMap['path'] = routeProps.path;
            return pathMap;
        }, {})
        ).toEqual({"path": "/checkout/contact-data"})
    });
});
