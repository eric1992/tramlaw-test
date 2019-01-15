import React, { Component } from 'react';
import {Container, Row} from 'reactstrap';
import {Recommendation} from './Recommendation';

export class Recommendations extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Container className={'appFont'}>
                <Row>{!this.props.recommendations || !this.props.recommendations.length
                    ? <span>There are no recommendations</span>
                    : this.props.recommendations.map((recommendation, i) => <Recommendation key={i} recommendation={recommendation}/>)
                }</Row>
            </Container>
        )
    }
}