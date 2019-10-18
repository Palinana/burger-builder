import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Orders } from './Orders';

configure({ adapter: new Adapter() });

describe('<Orders />', () => {
    let wrapper;
    const props = { 
        orders: [{
            ingredients: {
                cheese: 1, 
                salad: 1, 
                tomato: 2
            }, 
            orderData: {
                country: "us", 
                deliveryMethod: "fastest", 
                email: "testuser@gmail.com", 
                name: "TestUser", 
                street: "22",
                zipCode: "22222" 
            }, 
            price: 5, 
            userId: "1", 
            id: "L4"
        }]
    };

    beforeEach(() => {
        wrapper = shallow(<Orders {...props} onFetchOrders={() => {}}/>);
    });

    it('should render Order component', () => {
        expect(wrapper.find('Order').exists()).toBe(true);
    });
});