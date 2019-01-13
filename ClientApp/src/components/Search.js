import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';
import { Categories } from './Categories';
import { css } from '@emotion/core';
import ReactDOM from "react-dom";
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
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
                    queryStringParams .push({id: 'query', value: this.state.query });
                if(this.state.categoryId)
                    queryStringParams .push({id: 'categoryId', value: this.state.categoryId })
                if(this.state.page)
                    queryStringParams.push({id: 'start', value: 1 + (parseInt(this.state.page, 10) - 1) * 10})
                const queryString = queryStringParams
                    .map(param => `${param.id}=${param.value}`)
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

    handlePageKeyPress = (e) => {
        if (e.key === 'Enter')
            this.search();
    }

    setCategoryId = (categoryId) => {
        this.setState({
            categoryId: categoryId,
        })
    }

    renderResultRow = (result, i) => (
        <Row key={i}
            style={{margin: '10px'}}>
            <Col>
                <img src={result.thumbnailImage} />
            </Col>
            <Col>
                <Container>
                    <Row>
                        <Link className={'appFont'} to={`/Detail/${result.itemId}`}>{result.name}</Link>
                    </Row>
                    <Row>
                        {result.salePrice 
                            ? <span className={'appFont'}>${result.salePrice}</span>
                            : <span className={'appFont'}>There is no price information</span>}
                    </Row>
                    <Row>
                        {result.categoryPath
                            ? <span className={'appFont'}>{result.categoryPath}</span>
                            : <span className={'appFont'}>There is no category infor for this item</span>}
                    </Row>
                </Container>
            </Col>
        </Row>
        )

    render () {
        return (
            <Container>
                <Row>
                    <Col>
                        <Row>
                            <input className={'appFont'} 
                                value={this.state.query}
                                onChange={this.queryChange}
                                onKeyPress={this.handleSearchKeyPress}/>
                            <button className={'appFont'} onClick={this.search}>Search</button>
                        </Row>
                        <Row>
                            <h5 className={'appFont'}>Categories</h5>
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
                        {(this.state.results
                        && this.state.results.length)
                        ?  (
                            <Container>
                                <Row>
                                    <Pagination 
                                        current={this.state.page}
                                        pageSize={10}
                                        total={this.state.totalResults < 1000 ? this.state.totalResults : 1000}
                                        onChange={this.handlePageChange}/>
                                </Row>
                                {this.state.results.map(this.renderResultRow)}
                            </Container>
                        )
                        : (this.state.loadingResults
                            ? null
                            : <Row>
                            <span className={'appFont'}>There are no results</span>
                        </Row>)}
                        <ClipLoader
                            css={override}
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={this.state.loadingResults} />
                    </Col>
                </Row>
            </Container>
        )
    }
}