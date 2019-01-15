import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { Categories } from './Categories';
import { SearchResults } from './SearchResults';
import { css } from '@emotion/core';
import ReactDOM from "react-dom";
import Pagination from 'rc-pagination';
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
            loadingResults: false,
            loadingCategories: true,
            categories: [],
            categoryId: null,
            page: 1,
            totalResults: 0,
        }
        this.loadCategories();
    }

    search = () => {
        if(this.state.query){
            this.setState({
                loadingResults: true,
                results: [],
            }, () => {
                const queryStringParams = []
                if(this.state.query)
                    queryStringParams.push(`query=${this.state.query}`);
                if(this.state.categoryId)
                    queryStringParams .push(`categoryId=${this.state.categoryId}`)
                if(this.state.page)
                    queryStringParams.push(`start=${1 + (parseInt(this.state.page, 10) - 1) * 10}`)
                const queryString = queryStringParams
                    .join('&');
                axios.get(`/api/Search?${queryString}`)
                    .then(resp => {
                        this.setState({
                            results: resp.data.items,
                            totalResults: resp.data.totalResults,
                            loadingResults: false,
                        })
                    })
            });
        }
    }

    loadCategories = () => {
        axios.get('/api/Categories')
            .then(resp => {
                this.setState({
                    categories: resp.data.categories,
                    loadingCategories: false,
                })
            });
    }
    

    queryChange = (e) => {
        this.setState({
            query: e.target.value,
        })
    }

    handlePageChange = (pageNumber) => 
        this.setState({
            page: pageNumber,
        }, this.search)

    handleSearchKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.search();
        }
    }

    setCategoryId = (categoryId) => {
        this.setState({
            categoryId: categoryId,
        }, this.search);
    }
    
    render () {
        return (
            <Container className={'appFont'}>
                <Row>
                    <Col>
                        <Row>
                            <input value={this.state.query}
                                onChange={this.queryChange}
                                onKeyPress={this.handleSearchKeyPress}/>
                            <button onClick={this.search}>Search</button>
                        </Row>
                        <Row>
                            <h5>Categories</h5>
                        </Row>
                        <Row>
                            <ClipLoader
                                css={override}
                                sizeUnit={"px"}
                                size={150}
                                color={'#123abc'}
                                loading={this.state.loadingCategories} />
                            <Categories
                                parentCategoryId={null}
                                categories={this.state.categories}
                                setCategoryId={this.setCategoryId}/>
                        </Row>
                    </Col>
                    <Col>
                        <SearchResults results={this.state.results} 
                            page={this.state.page}
                            totalResults={this.state.totalResults < 1000 ? this.state.totalResults : 1000}
                            handlePageChange={this.handlePageChange} 
                            loadingResults={this.state.loadingResults} />
                    </Col>
                </Row>
            </Container>
        )
    }
}