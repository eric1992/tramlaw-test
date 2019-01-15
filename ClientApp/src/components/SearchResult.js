
import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export class SearchResult extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Row key={this.props.i}
                style={{margin: '10px'}}>
                <Col>
                    <Link to={`/Detail/${this.props.result.itemId}`}><img src={this.props.result.thumbnailImage} /></Link>
                </Col>
                <Col>
                    <Container>
                        <Row>
                            <Link to={`/Detail/${this.props.result.itemId}`}>{this.props.result.name}</Link>
                        </Row>
                        <Row>
                            {this.props.result.salePrice 
                                ? <span>${this.props.result.salePrice}</span>
                                : <span>There is no price information</span>}
                        </Row>
                        <Row>
                            {this.props.result.categoryPath
                                ? <span>{this.props.result.categoryPath}</span>
                                : <span>There is no category infor for this item</span>}
                        </Row>
                    </Container>
                </Col>
            </Row>
        )
    }
}