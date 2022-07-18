export const notEmpty = (email: string, password: string) => {
    if (!email || !password){
        return false;
    }
}

export const emailValid = (email: string) => {
    const emailIsValid = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/

    if (emailIsValid.test(email) === false){
        return false;
    }
}

export const passwordLength = (password: string) => {
    if (password.length < 7){
        return false;
    }
}

export const passwordHasNumber = (password: string) => {
    const hasNumber = /[0-9]/;
    if (hasNumber.test(password) === false){
        return false;
    }
}

export const passwordHasLetter = (password: string) => {
    const hasLetter = /[a-zA-Z]/;
    if (hasLetter.test(password) === false){
        return false;
    }
}