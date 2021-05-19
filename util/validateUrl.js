const URL = require("url").URL;

const validateUrl = (url) => {
    try {
        new URL(url);
        return true;
    } 
    catch (err) {
        // console.log(err)
        return false;
    }
}

module.exports = validateUrl