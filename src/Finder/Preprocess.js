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
        'Jurusan' : [],
        'Fakultas' : [],
        'Angkatan' : ""
    }

    for(let i = 0; i < allData.length;){
        if(isNumber(allData[i])){
            nim = allData[i]
            i ++
        }else if(isString(allData[i])){
            let kode = isJurfak(allData[i])
            let kode2 = isJurfak(allData[i], false)
               
            if((kode.length === 0 && kode2.length === 0) || i === allData.length - 1){
                nama.push(allData[i])
                i ++
            }else if(kode.length !== 0 || kode2.length !== 0){
                data.Jurusan = kode
                data.Fakultas = kode2

                if(isNumber(allData[i + 1])){
                    data.Angkatan = allData[i + 1]
                    i += 2
                }else{ 
                    i ++
                }
            }
        }
        else{
            continue
        }
    }

    const converted = convert(data)   
    console.log(data)
    console.log(`Converted ${converted.length}`)
    return {
        'nim' : nim,
        'nama' : nama,
        'nimConverted' : converted
    }
}

function isJurfak(toCheck, isFak = true){
    let codeConvertion = []

    let kodeJurfak = kodeJurusan
    let listJurFak = listJurusan

    if(!isFak){
        kodeJurfak = kodeFakultas
        listJurFak = listFakultas
    }

    for(let kode in kodeJurfak){
        if(kodeJurfak.hasOwnProperty(kode)){
            if(regexKodeJurusan(toCheck, kode)){
                codeConvertion.push(kodeJurfak[kode])
            }
        }
    }

    for(let kode in listJurFak){
        if(listJurFak.hasOwnProperty(kode)){
            if(regexListJurusan(listJurFak[kode], toCheck) && codeConvertion.indexOf(kode) === -1){
                codeConvertion.push(kode)
            }
        }
    }

    return codeConvertion
}

function convert(data){
    if(data.Fakultas.length === 0 && data.Jurusan.length === 0){
        return []
    }else if(data.Angkatan === ""){
        return [...new Set([...data.Jurusan, data.Fakultas])]
    }else if(data.Fakultas.length !== 0){
        let added = []

        data.Fakultas.forEach(fak => {
            added.push(fak.concat(data.Angkatan))
        });
        return added
    }else{
        let added = []

        data.Jurusan.forEach(fak => {
            added.push(fak.concat(data.Angkatan))
        });
        return added
    }
}

export function complete(toComplete){
    if(toComplete.length === 5){
        return toComplete
    }else if(toComplete.length === 2){
        toComplete.push("")
        toComplete.push(listJurusan[toComplete[2].slice(0, 3)])
        return toComplete
    }else{
        toComplete.push(listJurusan[toComplete[2].slice(0, 3)])
        toComplete.push(listFakultas[toComplete[1].slice(0,3)])
        return toComplete
    }
}