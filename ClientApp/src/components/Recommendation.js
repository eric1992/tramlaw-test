import React, { Component } from 'react';
import { Row, Col } from 'reactstrap'; 
import { Link } from 'react-router-dom';

export class Recommendation extends Component {
    constructor(props){
        super(props);
    }
    
    validateProps = () => {
        let errorMessage = null;
        if(!this.props.thumbnailImage)
            errorMessage = "Must pass prop thumbnailImage";
        else if(!this.props.itemId)
            errorMessage = "Must pass prop itemId";
        else if(!this.props.name)
            errorMessage = "Must pass prop name";
        else if(!this.props.salePrice)
            errorMessage = "Must pass prop salePrice";
        if(errorMessage)
            return (<span>{errorMessage}</span>);
        return null;
    }

    render() {
        return(
        this.validateProps()
            || <Col>
            <Row>
                <Link to={`/Detail/${this.props.itemId}`}>
                    <img src={this.props.thumbnailImage} />
                </Link>
            </Row>
            <Row>
                <Link to={`/Detail/${this.props.itemId}`}>{this.props.name}</Link>
            </Row>
            <Row>
                <span>${this.props.salePrice.toFixed(2)}</span>
            </Row>
        </Col>)    
    }
}