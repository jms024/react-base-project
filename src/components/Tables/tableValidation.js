const gameTypes = require('../../config/gameTypes.config.json');

export default (values) => {
    let errors = {};

    if (!values.name) errors.name = 'Name cannot be empty';

    if (!values.type) {
        errors.type = 'Type cannot be empty';
    } else if(!gameTypes.includes(values.type)) {
        errors.type = `Type must be one of ${gameTypes.join(', ')}`;
    }

    return errors;
}