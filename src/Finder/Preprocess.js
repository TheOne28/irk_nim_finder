import kodeFakultas from '../data/kode_fakultas.json'
import kodeJurusan from '../data/kode_jurusan.json'
import listFakultas from '../data/list_fakultas.json'
import listJurusan from '../data/list_jurusan.json'
import {
    isString,
    isNumber,
    regexKodeJurusan,
    regexListJurusan
}from './regex'

export function preprocess(allData){
    let nim = -1
    let nama = []
    let jurusan = {
        'Jurusan' : - 1,
        'Fakultas' : -1,
        'Angkatan' : - 1
    }

    allData.forEach(data => {
        if(isString(data)){
            
        }
    })
}

function isJurusan(toCheck){
    let codeConvertion = -1

    for(var kode in kodeJurusan){
        if(kodeJurusan.hasOwnProperty(kode)){
            if(regexKodeJurusan(toCheck, kode)){
                codeConvertion = kodeJurusan[kode]
                return codeConvertion
            }
        }
    }

    for(var code in listJurusan){
        if(listJurusan.hasOwnProperty(code)){
            if(regexListJurusan(listJurusan[kode], toCheck)){
                codeConvertion = code
                return codeConvertion
            }
        }
    }

    return codeConvertion
}