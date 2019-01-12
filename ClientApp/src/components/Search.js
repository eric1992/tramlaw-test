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

export class Search extends Component { 
    constructor(){
        super();
        this.state = {
            results: [],
            query: '',
            loadingResults: false
        }
    }

    search = () => {
        this.setState({
            loadingResults: true,
            results: [],
        }, () => {
        axios.get(`/api/Search?query=${this.state.query}`)
            .then(resp => {
                this.setState({
                    results: resp.data.items,
                    loadingResults: false,
                })
            })})

    }
    

    queryChange = (e) => {
        this.setState({
            query: e.target.value,
        })
    }

    handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.search();
        }
    }

    renderResultRow = (result, i) => (
        <Row key={i}
            style={{margin: '10px'}}>
            <Col xs={2}>
                <img src={result.thumbnailImage} />
            </Col>
            <Col xs={4}>
                <Container>
                    <Row>
                        <Link to={`/Detail/${result.itemId}`}>{result.name}</Link>
                    </Row>
                    <Row>
                        {result.salePrice 
                            ? <span>${result.salePrice}</span>
                            : <span>There is no price information</span>}
                    </Row>
                </Container>
            </Col>
        </Row>
        )

    render () {
        return (
            <Container>
                <Row>
                    <input value={this.state.query}
                        onChange={this.queryChange}
                        onKeyPress={this.handleSearchKeyPress}/>
                    <button onClick={this.search}>Search</button>
                </Row>
                {(this.state.results
                    && this.state.results.length)
                    ?  this.state.results.map(this.renderResultRow)
                    : (this.state.loadingResults
                        ? null
                        : <Row>
                        <span>There are no results</span>
                    </Row>)}
                <ClipLoader
                    css={override}
                    sizeUnit={"px"}
                    size={150}
                    color={'#123abc'}
                    loading={this.state.loadingResults} />
            </Container>
        )
    }
}