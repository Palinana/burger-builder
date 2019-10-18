import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { OrderSummary } from './OrderSummary';

configure({ adapter: new Adapter() });

describe('<OrderSummary />', () => {
    let wrapper;
    const props = { ingredients: { salad: 1 }, price: 4.5 };

    beforeEach(() => {
        wrapper = shallow(<OrderSummary {...props} />);
    });

    it('should render ingredients', () => {
        expect(wrapper.find('span').text()).toEqual('salad');
    });

    it('should render the total price', () => {
        expect(wrapper.find('strong').text()).toEqual(`Total Price: ${props.price}0`);
    });

    it('should render cancel button', () => {
        expect(wrapper.find('Button').at(0).exists()).toBe(true);
    });

    it('should render continue button', () => {
        expect(wrapper.find('Button').at(1).exists()).toBe(true);
    });
});