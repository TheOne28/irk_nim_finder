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
    let data = {
        'Jurfak' : -1,
        'Angkatan' : - 1
    }

    for(let i = 0; i < allData.length;){
        if(isString(allData[i])){
            let kode = isJurfak(allData[i])
            let kode2 = isJurfak(allData[i], false)

            if((kode === -1 && kode2 === -1) || i !== allData.length - 1){
                nama.push(allData[i])
                i ++
            }else if(kode !== -1 || kode2 !== -1){
                data.Jurfak = (kode === -1? kode2 : kode)

                if(isNumber(allData[i + 1])){
                    data.Angkatan = allData[i + 1]
                    i += 2
                }else{ 
                    i ++
                }
            }
        }else if(isNumber(allData[i])){
            nim = allData[i]
        }else{
            continue
        }
    }

    return {
        'nim' : nim,
        'nama' : nama,
        'data' : data
    }
}

function isJurfak(toCheck, isFak = true){
    let codeConvertion = -1

    let kodeJurfak = kodeJurusan
    let listJurFak = listJurusan

    if(! isFak){
        kodeJurfak = kodeFakultas
        listJurFak = listFakultas
    }

    for(let kode in kodeJurfak){
        if(kodeJurfak.hasOwnProperty(kode)){
            if(regexKodeJurusan(toCheck, kode)){
                codeConvertion = kodeJurfak[kode]
                return codeConvertion
            }
        }
    }

    for(let kode in listJurFak){
        if(listJurFak.hasOwnProperty(kode)){
            if(regexListJurusan(listJurFak[kode], toCheck)){
                codeConvertion = kode
                return codeConvertion
            }
        }
    }

    return codeConvertion
}

function isFakultas(toCheck){

}