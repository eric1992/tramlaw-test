import React, { Component } from 'react';
import axios from 'axios';

export class Search extends Component { 
    constructor(){
        super();
        this.state = {
            results: [],
            query: 'test',
        }
        this.search();
    }

    search = (query = this.state.query) => {
        axios.get(`/api/Search?query=${query}`)
            .then(resp => {
                this.setState({
                    results: resp.data.items
                })
            })
    }

    render () {
        return (
            <div>
                
                <ul>
                    {this.state.results.map((result, i) => (
                        <li key={i}>{JSON.stringify(result)}</li>
                    ))}
                </ul>
            </div>
        )
    }
}