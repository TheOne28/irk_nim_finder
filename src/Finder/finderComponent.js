import {React, useState} from 'react';
import { findRenderedComponentWithType } from 'react-dom/test-utils';
import { findAll } from './finder';
import './finderComponent.css'


function HasilPrediksi(props){
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
    const [done, setDone] = useState(false)
    const [correct, setCorrect] = useState(false)

    function onSubmit(e){
        e.preventDefault();
        console.log(e.target)

        const splitted = input.split(" ")
        const matchData = findAll(splitted)

        setHasil(matchData.data)
        setDone(true)
        setCorrect(matchData.correct)
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
            <h3 className="Find-Nim">Another NIM Finder</h3>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChangeInput} placeholder="Contoh: vincent if 20 " ></input>
            </form>
            <div>
            {done &&
            <>  {correct && 
                    <>
                    {hasil.length === 0 &&
                        <h3 className='other'>Tidak ditemukan data yang sesuai</h3>
                    }
                    {hasil.length > 0 &&
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>NIM TPB</th>
                                    <th>NIM</th>
                                    <th>Nama</th>
                                    <th>Jurusan</th>
                                    <th>Fakultas</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hasilPrediksiList()}
                            </tbody>
                        </table>
                    </>
                    }
                    </>
                }
                {!correct &&
                    <h3 className='other'>Masukan Input tidak valid</h3>
                }    
            </>
            }   
            </div>
        </div>
    );
};

