import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';
import { SearchResult } from './SearchResult';
import 'rc-pagination/assets/index.css';
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

export class SearchResults extends Component {
    constructor(props){
        super(props);
    }

    renderResultRow = (result, i) => (
        <Row key={i}
            style={{margin: '10px'}}>
            <Col>
                <Link to={`/Detail/${result.itemId}`}><img src={result.thumbnailImage} /></Link>
            </Col>
            <Col>
                <Container>
                    <Row>
                        <Link to={`/Detail/${result.itemId}`}>{result.name}</Link>
                    </Row>
                    <Row>
                        {result.salePrice 
                            ? <span>${result.salePrice}</span>
                            : <span>There is no price information</span>}
                    </Row>
                    <Row>
                        {result.categoryPath
                            ? <span>{result.categoryPath}</span>
                            : <span>There is no category infor for this item</span>}
                    </Row>
                </Container>
            </Col>
        </Row>
        )


    render(){
        return(
            <Container>
                {this.props.totalResults 
                    ? <Row>
                        <Pagination
                            current={this.props.page}
                            pageSize={10}
                            total={this.props.totalResults}
                            onChange={this.props.handlePageChange} />
                    </Row>
                    : null}
                {(this.props.results && this.props.results.length)
                    ? this.props.results.map((result, i) => (<SearchResult key={i} result={result} />))
                    : (!this.props.loadingResults
                        ? <span>There are no results</span>
                        : <ClipLoader
                            css={override}
                            sizeUnit={"px"}
                            size={150}
                            color={'#123abc'}
                            loading={this.props.loadingResults} />
)
                }
            </Container>
        )
    }
}