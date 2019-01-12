import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Search extends Component { 
    constructor(){
        super();
        this.state = {
            results: [],
            query: '',
        }
    }

    search = (query = this.state.query) => {
        axios.get(`/api/Search?query=${query}`)
            .then(resp => {
                this.setState({
                    results: resp.data.items
                })
            })
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

    render () {
        return (
            <Container>
                <Row>
                    <input value={this.state.query}
                        onChange={this.queryChange}
                        onKeyPress={this.handleSearchKeyPress}/>
                    <button onClick={this.search}>Search</button>
                </Row>
                {(!this.state.results
                    || !this.state.results.length)
                    ? (<Row>
                        <span>There are no results</span>
                    </Row>)
                    : null}
                {(this.state.results
                    && this.state.results.length)
                    ? this.state.results.map((result, i) => (
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
                                    <span>${result.salePrice}</span>
                                </Row>
                            </Container>
                        </Col>
                    </Row>
                    ))
                    : null}
            </Container>
        )
    }
}