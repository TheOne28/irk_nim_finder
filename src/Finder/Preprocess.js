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
            
            console.log(`Kode ${kode}`)
            console.log(`Kode2 ${kode2}`)
            
            if((kode.length === 0 && kode2.length === 0) || i === allData.length - 1){
                console.log(i)
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
    if(data.Angkatan === ""){
        return [...new Set([...data.Jurusan, data.Fakultas])]
    }else if(data.Fakultas.length === 0 && data.Jurusan.length === 0){
        return []
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