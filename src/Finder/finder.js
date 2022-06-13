import dataMahasiswa from '../data/data_13_21.json'

import { preprocess } from './Preprocess'

import {
    regexName, 
    regexNim
 } from './regex'

export function findAll(toFind){
    const afterPreprocess = preprocess(toFind)
    const all = []
    
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