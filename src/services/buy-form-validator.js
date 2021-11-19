export default class BuyFormValidator {

    static validateName(value) {

        const letters = /^[A-Za-z]+$/;

        if (!value) {
            return "required"
        }
        if (!value.match(letters)) {
            return "invalidEmail";
        }
        return null;
    }

    static validatePhone(value) {

        const numbers = /^[0-9\b]+$/;

        if (!value) {
            return "required";
        }
        if (!value.match(numbers)) {
            return "invalidPhone";
        }
        if (value.length !== 12) {
            return "invalidCharacters";
        }
        return null;
    }
}