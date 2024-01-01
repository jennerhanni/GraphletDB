"use strict";
const { validMinimumList } = require('./initData.js');

/**************************************** Helpers ************************************/

// log the version string to the console
// and attach the function to the window object
function aboutGraphletJS() {
    console.log("GraphletJS v0.0.1");
    return "GraphletJS v0.0.1"
}
window.aboutGraphletJS = aboutGraphletJS;


// generate a random lowercase hexstring
// that is not already used as an id in nodes
function getRandomToken(nodes, len) {    

    let token;
    let isUnique;

    do {
        token = '';
        for (let i = 0; i < len; i++) {
            token += Math.floor(Math.random() * 16).toString(16); 
        }

        // Check if token is unique
        isUnique = !nodes.some(node => node.id === token);
    } while (!isUnique);

    console.log("getRandomToken", len, token);
    return token
}
window.getRandomToken = getRandomToken;

// return a list of all labels
function getListOfLabels(nodes, objOrIds) {
    console.log('getListOfLabels', nodes, objOrIds)
    if (nodes && nodes.length > 0) {
        if (objOrIds === 'id') {
            return nodes.filter(node => node.label === 'Label').map(node => node.label)
        } else if (objOrIds === 'obj') {
            return nodes.filter(node => node.label === 'Label')
        } else {
            return []
        }
    }
}
window.getListOfLabels = getListOfLabels

/****************************** List & Node Handling *********************************/

// init and return a new list with a single Label object
function initList() {
    return validMinimumList;
}
window.initList = initList;

// init a node based on a label
function initNode(nodes, labelStr) {
    let labelNode = nodes.find(node => node.label === 'Label' && node.properties.label === label);
    
    if (!labelNode) {
        labelNode = { label: 'Label', properties: { label: label } };
        nodes.push(labelNode);
    }

    const newNode = { ...labelNode.properties }; // Create a new node based on the Label node properties
    return [newNode];
}
window.initNode = initNode

// get a node from the list by keypair
function getNodeByKeypair(nodes, key, value, boolFirstOnly) {
    if (boolFirstOnly) {
        return [nodes.find(node => node[key] === value)]
    } else {
        return [nodes.filter(node => node[key] === value)]
    }
}   
window.getNodeByKeypair = getNodeByKeypair

// add a new node to the list
function addNode(nodes, nodeToAdd) {
    nodes.push(nodeToAdd);
    return nodes;
}

// removes a node from the list
function removeNode(nodes, nodeToRemove) {
    return nodes.filter(node => node !== nodeToRemove);
}

// update a node in the list
function updateNode(nodes, nodeToUpdate) {
    return nodes.map(node => node === nodeToUpdate ? { ...node, ...nodeToUpdate } : node);
}
/********************************** Validation ***************************************/

// verify that all entries in the list are objects
function validateListContent(nodes) {
    const isValid = nodes.every(node => node && typeof node === 'object');
    return {
        data: isValid,
        msg: isValid ? 'Valid list content.' : 'Invalid list content. List must contain only node objects.'
    };
}

// validate the list of nodes
function validateList(nodes, doFix = false) {
    // implement validation logic here
    if (doFix) {
        // implement fixing logic here
        return fixedNodes;
    }
    return nodes;
}



module.exports = {
    aboutGraphletJS,
    getRandomToken,
    getListOfLabels,

    initList,
    initNode,
    getNodeByKeypair,
    
    addNode,
    removeNode,
    updateNode,

    validateListContent,
    validateList,
    
};

