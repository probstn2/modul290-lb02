// Validate form input elements
const validateLib = require('./ValidationLib');

/**
 * Validate form data
 * @param data
 * @returns {boolean|{msg: string, isNotValid: boolean}|{isNotValid}|*}
 */
function validateFormData(data) {
    // Check required fields
    let result = validateLib.checkRequired("firstName", data.firstName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("lastName", data.lastName);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("age", data.age);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("email", data.email);
    if (result.isNotValid) { return result; }

    result = validateLib.checkRequired("password", data.password);
    if (result.isNotValid) { return result; }

    //check length
    result = validateLib.checkLength("firstName", data.firstName, 3, 25);
    if (result.isNotValid) { return result; }

    result = validateLib.checkLength("lastName", data.lastName, 3, 25);
    if (result.isNotValid) { return result; }

    //check email syntax
    result = validateLib.checkEmail("email", data.email);
    if (result.isNotValid) { return result; }

    //check number
    result = validateLib.checkNumber("number", data.phoneNumber);
    if (result.isNotValid) { return result; }

    //check age
    result = validateLib.checkAge("age", data.age);
    if (result.isNotValid) { return result; }

    //check password
    result = validateLib.checkPassword("password", data.password);
    if (result.isNotValid) { return result; }

    //all inputs are valid and isNotValid=false
    return false;
}

/**
 *  Export validation functions for further usage.
 *  function to export WITHOUT beackets!
 */
module.exports = {
    validateContact: validateFormData
}
