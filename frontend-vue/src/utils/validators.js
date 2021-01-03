export function isValidEmail(s) {
    return !s.match(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
        ? {invalidEmail: true}
        : null;
}
