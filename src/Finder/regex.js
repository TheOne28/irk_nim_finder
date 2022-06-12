


export function isNumber(toTest){
    return /^-?\d+$/.test(toTest)
}

export function isString(toTest){
    return /^\w+$/.test(toTest)
}

export function regexNim(toTest, nim){
    return new RegExp(`${nim}`).test(toTest)
}

export function regexName(toTest, name){
    return new RegExp(`${name}`, 'i').test(toTest)
}

export function regexKodeJurusan(toTest, jurusan){
    return new RegExp(`^${jurusan}$`, 'i').test(toTest)
}

export function regexListJurusan(toTest, jurusan){
    return new RegExp(`${jurusan}`, 'i').test(toTest)
}