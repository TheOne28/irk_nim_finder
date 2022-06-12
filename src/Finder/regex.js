
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