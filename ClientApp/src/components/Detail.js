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
    
    decodeHTML = function (html) {
        var txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    };


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
                                            <h1>{this.state.detail.name}</h1>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <img src={this.state.detail.customerRatingImage} />
                                                <span>({this.state.detail.customerRating})</span>
                                            </Col>
                                            <Col>
                                                <span>({this.state.detail.numReviews}) Customer Review{(this.state.detail.numReviews === 1 ? "" : "s")}</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <h2>${this.state.detail.salePrice}</h2>
                                        </Row>
                                        <Row>
                                            <div dangerouslySetInnerHTML={{__html: this.decodeHTML(this.state.detail.longDescription)}}></div>
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