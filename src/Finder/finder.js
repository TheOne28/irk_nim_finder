import dataMahasiswa from '../data/data_13_21.json'
import kodeFakultas from '../data/kode_fakultas.json'
import kodeJurusan from '../data/kode_jurusan.json'
import listFakultas from '../data/list_fakultas.json'
import listJurusan from '../data/list_jurusan.json'
import { isNumber, isString } from './regex'

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
    console.log(onlyNumber)
    console.log(onlyString)
}

export function findByNimTPB(Nim){

};