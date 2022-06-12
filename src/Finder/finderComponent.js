import {React, useState} from 'react';
import { findAll } from './finder';


export function HasilPrediksi(props){
    return(
    <tr>
        <td>{props.nimTPB}</td>
        <td>{props.nim}</td>
        <td>{props.nama}</td>
    </tr>
    );
};

export function SearchBar(props){
    const [hasil, setHasil] = useState();

    function onSubmit(e){
        e.preventDefault();

        // console.log(e);
    };

    function onChangeInput(e){
        const splitted = e.target.value.split(" ")
        
        const matchData = findAll(splitted)
        
        setHasil(matchData)

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

