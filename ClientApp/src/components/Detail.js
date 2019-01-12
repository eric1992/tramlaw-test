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

    renderRecommendation = (recommendation, i) => (
        <Col key={i}>
            <Row>
                <img src={recommendation.thumbnailImage} />
            </Row>
            <Row>
                <Link to={`/Detail/${recommendation.itemId}`}>{recommendation.name}</Link>
            </Row>
        </Col>       
    );

    renderRecommendations = (recommendations = this.state.recommendations) => 
        !recommendations.length
            ? <span>There are no recommendations for this item</span>
            : recommendations.map(this.renderRecommendation);
    
    renderRatings = (detail = this.state.detail) => (
            detail.customerRatingImage
                && detail.customerRating
                && detail.numReviews
                ? (<Row>
                    <Col>
                        <img src={detail.customerRatingImage} />
                        <span>({detail.customerRating})</span>
                    </Col>
                    <Col>
                        <span>({detail.numReviews}) Customer Review{(detail.numReviews === 1 ? '' : 's')}</span>
                    </Col>
                </Row>)
                : <Row>
                    <span>No customer reviews are available</span>
                </Row>
        )

    renderPrice = (salePrice = this.state.detail.salePrice) => (
        <Row>
            {salePrice
                ? <h2>${salePrice}</h2>
                : <h2>There is no price information</h2>}
        </Row>)


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
                                    {this.renderRatings()}
                                    {this.renderPrice()}
                                </Col>
                            </Row>
                            <Row>
                                <div dangerouslySetInnerHTML={{__html: this.decodeHTML(this.state.detail.longDescription)}}></div>
                            </Row>
                            <Row>
                                <h2>Recommendations</h2>
                            </Row>
                            <Row>{this.renderRecommendations()}</Row>
                        </Container>
                    )
                }
            </div>
        )
    }
}