import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios';

export class Detail extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            detail: null,
        }
        this.getDetails();
    }

    getDetails = (itemId = this.props.match.params.itemId) => {
        axios.get(`/api/items/${itemId}`)
            .then(resp => {
                this.setState({
                    detail: resp.data
                })
            })
    }



    render() {
        return (
            <div>
                {!this.state.detail
                    ? null
                    : (
                        <Container>
                            <Row>
                                <Col>
                                    <img src={this.state.detail.largeImage} />
                                </Col>
                                <Col>
                                    <Container>
                                        <Row>
                                            <Col>
                                                <h1>{this.state.detail.name}</h1>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Col>
                            </Row>
                        </Container>
                    )
                }
            </div>
        )
    }
}