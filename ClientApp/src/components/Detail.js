import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class Detail extends Component {
    constructor(props){
        super(props);
        console.log(props);
        this.state = {
            detail: null,
            recommendations: [],
            loadingDetail: true,
            loadingRecommendations: true,
        }
        this.getDetails();
        this.getRecommendations();
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            detail: null,
            recommendation: [],
            loadingDetail: true,
            loadingRecommendations: true,
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
                    loadingDetail: false,
                })
            });
    }

    getRecommendations = (itemId = this.props.match.params.itemId) => {
        axios.get(`/api/items/${itemId}/recommendations`)
            .then(resp => {
                if(resp.data.length)
                    this.setState({
                        recommendations: resp.data.filter((item, i) => i < 10),
                        loadingRecommendations: false,
                    });
                else 
                    this.setState({
                        loadingRecommendations: false
                    });
            });
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
                <Link className={'appFont'} to={`/Detail/${recommendation.itemId}`}>{recommendation.name}</Link>
            </Row>
            <Row>
                {recommendation.salePrice
                    ? <span className={'appFont'}>${recommendation.salePrice.toFixed(2)}</span>
                    : <span className={'appFont'}>There is no price information</span>}
            </Row>
        </Col>       
    );

    renderRecommendations = (recommendations = this.state.recommendations) => 
        !recommendations.length
            ? <span className={'appFont'}>There are no recommendations for this item</span>
            : recommendations.map(this.renderRecommendation);
    
    renderRatings = (detail = this.state.detail) => (
            detail.customerRatingImage
                && detail.customerRating
                && detail.numReviews
                ? (<Row>
                    <Col>
                        <img src={detail.customerRatingImage} />
                        <span className={'appFont'}>({detail.customerRating})</span>
                    </Col>
                    <Col>
                        <span className={'appFont'}>({detail.numReviews}) Customer Review{(detail.numReviews === 1 ? '' : 's')}</span>
                    </Col>
                </Row>)
                : <Row>
                    <span className={'appFont'}>No customer reviews are available</span>
                </Row>
        )

    renderPrice = (salePrice = this.state.detail.salePrice) => (
        <Row>
            <h2 className={'appFont'}>
                {salePrice
                    ? "$" + salePrice.toFixed(2)
                    : 'There is no price information'}
            </h2>
        </Row>)


    render() {
        return (
            <div>
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loadingDetail} />
                {this.state.detail
                    && (
                        <Container>
                            <Row>
                                <Col>
                                    <img src={this.state.detail.largeImage} />
                                </Col>
                                <Col>
                                    <Row>
                                        <h1 className={'appFont'}>{this.state.detail.name}</h1>
                                    </Row>
                                    {this.renderRatings()}
                                    {this.renderPrice()}
                                </Col>
                            </Row>
                            <Row>
                                <div className={'appFont'} dangerouslySetInnerHTML={{__html: this.decodeHTML(this.state.detail.longDescription)}}></div>
                            </Row>
                            <Row>
                                <h2 className={'appFont'}>Recommendations</h2>
                            </Row>
                            <Row>
                                <ClipLoader
                                    css={override}
                                    sizeUnit={"px"}
                                    sie={150}
                                    color={'#123abc'}
                                    loading={!this.state.loadingDetail && this.state.loadingRecommendations}/>
                            </Row>
                            <Row>
                                {this.renderRecommendations()}
                            </Row>
                        </Container>
                    )
                }
            </div>
        )
    }
}