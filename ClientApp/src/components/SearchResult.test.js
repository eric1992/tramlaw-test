import React from 'react';
import ReactDOM from 'react-dom';
import { SearchResult } from './SearchResult';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without prop result', () => {
    const wrapper = shallow(<SearchResult />);
    const error = <span>Must pass prop result</span>;
    expect(wrapper.contains(error)).toEqual(true);
});

it('renders without prop result.itemId', () => {
    const wrapper = shallow(<SearchResult result={{}}/>);
    const error = <span>itemId must be defined in the prop result</span>;
    expect(wrapper.contains(error)).toEqual(true);
})

it('renders without prop result.salePrice', () => {
    const wrapper = shallow(<SearchResult result={{itemId: 1,}}/>);
    const error = <span>There is no price information</span>;
    expect(wrapper.contains(error)).toEqual(true);
})

it('renders without prop result.categoryPath', () => {
    const wrapper = shallow(<SearchResult result={{itemId: 1,}}/>);
    const error = <span>There is no category information for this item</span>;
    expect(wrapper.contains(error)).toEqual(true);
})