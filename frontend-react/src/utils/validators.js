export function isValidEmail(s) {
    return !s.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        ? {invalidEmail: true}
        : null;
}

export function validateForm(validators, form) {
    let errors = {};
    for (let fieldName of Object.keys(validators)) {
        const fieldValidators = validators[fieldName];
        for (let fieldValidator of fieldValidators) {
            let fieldErrors = fieldValidator(form[fieldName]);
            if (fieldErrors) {
                errors[fieldName] = fieldErrors;
            } else {
                delete errors[fieldName];
            }
        }
    }
    return errors;
}
