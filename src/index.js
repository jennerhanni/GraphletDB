"use strict";

function aboutGraphlet() {
    console.log("GraphletJS v0.0.1");
}

function validateListContent(nodes) {
    const isValid = nodes.every(node => node && typeof node === 'object');
    return {
        data: isValid,
        msg: isValid ? 'Valid list content.' : 'Invalid list content. List must contain only node objects.'
    };
}

// Validation Functions

module.exports = {
    aboutGraphlet,
    validateListContent
};