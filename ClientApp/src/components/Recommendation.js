import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'; 
import { Link } from 'react-router-dom';

export class Recommendation extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
        <Col>
            <Row>
                <img src={this.props.recommendation.thumbnailImage} />
            </Row>
            <Row>
                <Link to={`/Detail/${this.props.recommendation.itemId}`}>{this.props.recommendation.name}</Link>
            </Row>
            <Row>
                {this.props.recommendation.salePrice
                    ? <span>${this.props.recommendation.salePrice.toFixed(2)}</span>
                    : <span>There is no price information</span>}
            </Row>
        </Col>)    
    }
}