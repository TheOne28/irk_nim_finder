import React from 'react';
import { findAll } from './finder';


export function HasilPrediksi(props){
    return(
    <tr>
        <td>{props.nim}</td>
        <td>{props.nama}</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>

    </tr>
    );
};

export function SearchBar(props){
    function onSubmit(e){
        e.preventDefault();

        // console.log(e);
    };

    function onChangeInput(e){
        const splitted = e.target.value.split(" ")
        
        findAll(splitted)
        
    }

    return(
        <div>
            <h3 className='Find NIM'>Search Nim</h3>
            <form onSubmit={onSubmit}>
                <label>Enter config to find: </label>
                <input type="text" onChange={onChangeInput}></input>
            </form>
        </div>
    );
};

