import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Detail extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            detail: null,
            recommendations: [],
        }
        this.getDetails();
        this.getRecommendations();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            detail: null,
            recommendation: [],
        }, () => {
            this.getDetails(nextProps.match.params.itemId);
            this.getRecommendations(nextProps.match.params.itemId)
        });
    }

    getDetails = (itemId = this.props.match.params.itemId) => {
        axios.get(`/api/items/${itemId}`)
            .then(resp => {
                this.setState({
                    detail: resp.data,
                })
            })
    }

    getRecommendations = (itemId = this.props.match.params.itemId) => {
        axios.get(`/api/items/${itemId}/recommendations`)
            .then(resp => {
                if(resp.data.length)
                    this.setState({
                        recommendations: resp.data.filter((item, i) => i < 10),
                    });
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
                                </Col>
                            </Row>
                            <Row>
                                <div dangerouslySetInnerHTML={{__html: this.decodeHTML(this.state.detail.longDescription)}}></div>
                            </Row>
                            <Row>
                                <h2>Recommendations</h2>
                            </Row>
                            <Row>
                                {!this.state.recommendations.length
                                    ? <span>There are no recommendations for this item</span>
                                    : null}
                                {this.state.recommendations.length
                                    ? this.state.recommendations.map((recommendation, i) => (
                                            <Col key={i}>
                                                <Row>
                                                <img src={recommendation.thumbnailImage} />
                                                </Row>
                                                <Row>
                                                <Link to={`/Detail/${recommendation.itemId}`}>{recommendation.name}</Link>
                                                </Row>
                                            </Col>))
                                    : null}
                            </Row>
                        </Container>
                    )
                }
            </div>
        )
    }
}