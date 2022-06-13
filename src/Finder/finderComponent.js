import {React, useState} from 'react';
import { findAll } from './finder';


export function HasilPrediksi(props){
    return(
    <tr>
        <td>{props.nimTPB}</td>
        <td>{props.nim}</td>
        <td>{props.nama}</td>
        <td>{props.jurusan}</td>
        <td>{props.fakultas}</td>
    </tr>
    );
};

export function SearchBar(props){
    const [hasil, setHasil] = useState([])
    const [input, setInput] = useState("")

    function onSubmit(e){
        e.preventDefault();
        console.log(e.target)

        const splitted = input.split(" ")
        const matchData = findAll(splitted)

        setHasil(matchData)
    };

    function onChangeInput(e){
        setInput(e.target.value)
    }

    function hasilPrediksiList(){
        return hasil.map(prediksi => {
            return <HasilPrediksi  key={prediksi[1]} nimTPB={prediksi[1]} nim={prediksi[2]} nama={prediksi[0]} jurusan={prediksi[3]} fakultas={prediksi[4]}/>
        })
    }

    return(
        <div>
            <h3 className='Find NIM'>Search Nim</h3>
            <form onSubmit={onSubmit}>
                <label>Enter config to find: </label>
                <input type="text" onChange={onChangeInput}></input>
            </form>
            <div>
                <h3>Hasil Pencarian</h3>
                <table>
                    <thead>
                        <tr>
                            <th>nimTPB</th>
                            <th>nim</th>
                            <th>Nama</th>
                            <th>Jurusan</th>
                            <th>Fakultas</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasilPrediksiList()}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

