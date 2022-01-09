export default (values) => {
    let errors = {};

    if (!values.name) errors.name = 'Name cannot be empty';
    if (!values.surname) errors.surname = 'Surname cannot be empty';
    if (!values.ssn) errors.ssn = 'Social security number cannot be empty';

    if (!values.mobileNum) {
        errors.mobileNum = 'Mobile number cannot be empty';
    } else {
        // Expression only validates Maltese phone numbers format, for demo purpose
        if (!RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{8}$').test(values.mobileNum)) {
            errors.mobileNum = 'Mobile number format incorrect. Syntax +356 79123456'
        }
    }

    return errors;
}