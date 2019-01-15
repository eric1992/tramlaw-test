import React from 'react';
import ReactDOM from 'react-dom';
import { Categories } from './Categories';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const categories = [
    {
        name: 'test',
        id: '1',
    }]

it('renders without categories prop', () => {
    const wrapper = shallow(<Categories />);
})

it('renders with categories', () => {
    const wrapper = shallow(<Categories categories={categories} />);
})

it('handles category click', () => {
    let categoryId = null;
    const setCategoryId = (id) => { categoryId = id};
    const wrapper = shallow(<Categories 
        categories={categories} 
        setCategoryId={setCategoryId}
        parentCategoryId={'2'}/>);
    wrapper.instance().handleCategoryClick(categories[0])();
    expect(wrapper.state("selectedCategory")).toEqual(categories[0]);
    expect(categoryId).toEqual('1');
})

it('handles category reset', () => {
    let categoryId = null;
    const setCategoryId = (id) => { categoryId = id};
    const wrapper = shallow(<Categories 
        categories={categories} 
        setCategoryId={setCategoryId}
        parentCategoryId={'2'}/>);
    wrapper.instance().handleReset(categories[0]);
    expect(wrapper.state("selectedCategory")).toEqual(null)
    expect(categoryId).toEqual('2');
})