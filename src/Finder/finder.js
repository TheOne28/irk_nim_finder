import dataMahasiswa from '../data/data_13_21.json'

import { preprocess, complete} from './Preprocess'

import {
    regexName, 
    regexNim,
    regexJurfak
 } from './regex'

export function findAll(toFind){
    console.log("topFind")
    console.log(toFind)
    const afterPreprocess = preprocess(toFind)
    console.log(afterPreprocess.nimConverted)
    let all = []

    if(afterPreprocess.nama.length === 0){
        if(afterPreprocess.nim === -1){
            all = findByJurfak(afterPreprocess.nimConverted, dataMahasiswa)
        }else{
            all = findByNim(afterPreprocess.nim, dataMahasiswa)
            if(afterPreprocess.nimConverted.length !== 0){
                all =findByJurfak(afterPreprocess.nimConverted, all)
            }
        }
    }else if(afterPreprocess.nim === -1){
        if(afterPreprocess.nimConverted.length === 0){
            all = findByName(afterPreprocess.nama, dataMahasiswa)
        }else{
            all = findByJurfak(afterPreprocess.nimConverted, dataMahasiswa)
        }

    }else if(afterPreprocess.nimConverted.length === 0){
        if(afterPreprocess.nim === -1){
            all = findByJurfak(afterPreprocess.nimConverted, dataMahasiswa)
        }else{
            all = findByJurfak(afterPreprocess.nim, dataMahasiswa)

            if(afterPreprocess.nama.length !== 0){
                all = findByName(afterPreprocess.nama, all)
            }
        }
    }else{
        all = findByName(afterPreprocess.nama, dataMahasiswa)
        all = findByJurfak(afterPreprocess.nimConverted, all)
        all = findByNim(afterPreprocess.nim, all)
    }
    console.log(all)
    return all
}

function findByNim(Nim, data){
    let match = []    
    
    data.forEach(mhs =>{
        if(regexNim(mhs[1], Nim) || regexNim(mhs[2], Nim)){
             match.push(complete(mhs))
        }
    })

    return match
}

function findByName(Name, data){
    let match = []

    data.forEach(mhs => {
        let done = false

        Name.forEach(name => {
            if(regexName(mhs[0], name) && !done){
                match.push(complete(mhs))
                done = true
            }
        })
    })

    return match
}

function findByJurfak(jurfak, data){
    let match = []

    data.forEach(mhs => {
        let done = false

        jurfak.forEach(jur => {
            if((regexJurfak(mhs[1], jur) || regexJurfak(mhs[2], jur)) && !done){
                match.push(complete(mhs))
                done = true
            }
        })
    })

    return match
}