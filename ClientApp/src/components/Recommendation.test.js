import React from 'react';
import ReactDOM from 'react-dom';
import { Recommendation } from './Recommendation';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without prop thumbnailImage', () => {
    const wrapper = shallow(<Recommendation />);
    const error = <span>Must pass prop thumbnailImage</span>;
    expect(wrapper.contains(error)).toEqual(true);
});

it('renders without prop itemId', () => {
    const wrapper = shallow(<Recommendation thumbnailImage={"test"}/>);
    const error = <span>Must pass prop itemId</span>;
    expect(wrapper.contains(error)).toEqual(true);
})

it('renders without prop name', () => {
    const wrapper = shallow(<Recommendation thumbnailImage={"test"} itemId={1}/>);
    const error = <span>Must pass prop name</span>;
    expect(wrapper.contains(error)).toEqual(true);
})

it('renders without prop salePrice', () => {
    const wrapper = shallow(<Recommendation thumbnailImage={"test"} itemId={1} name={'test'}/>);
    const error = <span>Must pass prop salePrice</span>;
    expect(wrapper.contains(error)).toEqual(true);
})