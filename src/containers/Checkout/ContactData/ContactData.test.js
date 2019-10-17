import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ContactData } from './ContactData';

configure({ adapter: new Adapter() });

describe('<ContactData />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<ContactData />);
    });

    it('should render <ContactData /> form', () => {          
        expect(wrapper.find('form').exists()).toBe(true);
    });

    it('should render <Input /> component', () => {
        expect(wrapper.find('Input').exists()).toBe(true);
    });

    it('should render <Button /> component', () => {
        expect(wrapper.find('Button').exists()).toBe(true);
    });
});