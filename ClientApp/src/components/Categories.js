import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

export class Categories extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedCategory: null,
        }
    }

    handleCategoryClick = (category) => () => {
        this.setState({
              selectedCategory: category,
        }, () => {
            this.props.setCategoryId(category.id);
        });
    }

    handleReset = () => {
        this.setState({
            selectedCategory: null,
        }, () => {
            this.props.setCategoryId(this.props.parentCategoryId);
        })
    }

    renderCategory = (category, i) => (
        <Row key={i}>
            <a onClick={this.handleCategoryClick(category)}>{category.name}</a>
        </Row>
    )

    renderSelectedCategory = (category = this.state.selectedCategory) => (
        <Container>
            <Row>
                <Col>
                    <h6>{category.name}</h6>
                </Col>
                <Col>
                    <a onClick={this.handleReset}>Reset</a>
                </Col>
            </Row>
            <Row>
                <Categories
                    parentCategoryId={category.id}
                    categories={category.children}
                    setCategoryId={this.props.setCategoryId} />
            </Row>
        </Container>
    )

    render () {
        return (
            <Container>
                {this.props.categories 
                    && !this.state.selectedCategory
                    && this.props.categories.map(this.renderCategory)} 
                {this.state.selectedCategory
                    && this.renderSelectedCategory()}
            </Container>
        )
    }
}