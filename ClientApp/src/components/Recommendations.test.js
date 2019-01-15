import React from 'react';
import ReactDOM from 'react-dom';
import { Recommendations } from './Recommendations';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without prop recommendations', () => {
    const wrapper = shallow(<Recommendations />);
    const error = <span>There are no recommendations</span>;
    expect(wrapper.contains(error)).toEqual(true);
});

it('renders with empty prop recommendations', () => {
    const wrapper = shallow(<Recommendations recommendations={[]}/>);
    const error = <span>There are no recommendations</span>;
    expect(wrapper.contains(error)).toEqual(true);
});

it('renders with one recommedation prop', () => {
    const recommendations = [{test:"test"}]
    const wrapper = shallow(<Recommendations recommendations={recommendations}/>);
})