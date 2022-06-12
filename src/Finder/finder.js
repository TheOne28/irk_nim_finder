import dataMahasiswa from '../data/data_13_21.json'
import kodeFakultas from '../data/kode_fakultas.json'
import kodeJurusan from '../data/kode_jurusan.json'
import listFakultas from '../data/list_fakultas.json'
import listJurusan from '../data/list_jurusan.json'
import {
    isNumber,
    isString, 
    regexName, 
    regexNim
 } from './regex'

export function findAll(toFind){
    const onlyNumber = []
    const onlyString = []

    toFind.forEach(element => {
        if(isNumber(element)){
            onlyNumber.push(element)
        }else if(isString(element)){
            onlyString.push(element)
        }else{
            console.log("Incorrect input")
        }
    });
    const all = []
    if(onlyNumber.length !== 0){
        const nimSuccess = findByNim(onlyNumber)

        nimSuccess.forEach(data =>{
            all.push(data)
        })
    }
    
    if(onlyString.length !== 0){
        const nameSuccess = findByName(onlyString)
        
        nameSuccess.forEach(data =>{
            if(all.findIndex(each =>{
                return each[0] === data[0] && each[1] === data[1] && each[2] === data[2]
            }) === -1){
                all.push(data)
            }
        })
    }

    return all
}

function findByNim(Nim){
    let match = []    
    
    dataMahasiswa.forEach(mhs =>{
        let done = false
        Nim.forEach(nim => {
            if(regexNim(mhs[1], nim) || regexNim(mhs[2], nim)){
                if(!done){
                    match.push(mhs)
                    done = true
                }
            }
        })
    })

    return match
}

function findByName(Name){
    let match = []

    dataMahasiswa.forEach(mhs => {
        let done = false

        Name.forEach(name => {
            if(regexName(mhs[0], name) && !done){
                match.push(mhs)
            }
        })
    })

    return match
}