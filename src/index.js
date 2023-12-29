"use strict";

// log the version string to the console
function aboutGraphlet() {
    console.log("GraphletJS v0.0.1");
}

// verify that all entries in the list are objects
function validateListContent(nodes) {
    const isValid = nodes.every(node => node && typeof node === 'object');
    return {
        data: isValid,
        msg: isValid ? 'Valid list content.' : 'Invalid list content. List must contain only node objects.'
    };
}

// init and return a new list with a single Label object
function initList() {
    return [{ label: 'Label', properties: {} }];
}

// init a node based on a label
function initNode(nodes, label) {
    let labelNode = nodes.find(node => node.label === 'Label' && node.properties.label === label);
    
    if (!labelNode) {
        labelNode = { label: 'Label', properties: { label: label } };
        nodes.push(labelNode);
    }

    const newNode = { ...labelNode.properties }; // Create a new node based on the Label node properties
    return [newNode];
}

// return a list of all labels
function getListOfAllLabels(nodes) {
    return nodes.filter(node => node.label === 'Label').map(node => node.properties.label);
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

module.exports = {
    aboutGraphlet,
    validateListContent,
    initList,
    initNode,
    getListOfAllLabels,
    validateList,
    addNode,
    removeNode,
    updateNode
};