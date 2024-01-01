"use strict";
const { initLabelNode } = require('./initData.js');

/**************************************** Helpers ************************************/

// log the version string to the console
// and attach the function to the window object
function aboutGraphletJS() {
    console.log("GraphletJS v0.0.1");
    return {
        data: "GraphletJS v0.0.1",
        msg: "SUCCESS"
    }
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

    return {
        data: token,
        msg: "SUCCESS"
    }
}
window.getRandomToken = getRandomToken;


// return a list of all labels
// currently represented in the list of nodes
function getListOfLabels(nodes, objOrIds) {
    console.log('getListOfLabels', nodes, objOrIds)
    if (nodes && nodes.length > 0) {
        if (objOrIds === 'id') {
            return nodes.filter(node => node.label === 'Label').map(node => node.strLabel)
        } else if (objOrIds === 'obj') {
            return nodes.filter(node => node.label === 'Label')
        } else {
            return []
        }
    } else {
        return []
    }
}
window.getListOfLabels = getListOfLabels

// return a list of all keys in a list of nodes
function getListOfKeys(nodes) {
    console.log('getListOfKeys');

    const keySet = new Set();

    // Add each key from each node to the set
    nodes.forEach(node => {
        Object.keys(node).forEach(key => {
            keySet.add(key);
        });
    });

    // Convert set to an array and sort alphabetically
    let keys = Array.from(keySet).sort();

    // Prioritize 'id', 'date', and 'label' if they exist in the keys
    const priorityKeys = ['id', 'date', 'label'];
    priorityKeys.reverse().forEach(key => {
        if (keys.includes(key)) {
            keys = [key, ...keys.filter(k => k !== key)];
        }
    });

    return keys;
}



// calculates a formatted datetime string in the form YYYYMMDDHHmm
const getDateObjects = () => {
    console.log('getDateObjects')
    const now = new Date()

    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0') // months are 0-indexed 
    const day = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')

    return `${year}${month}${day}${hour}${minute}`
  }

/****************************** List & Node Handling *********************************/

// init and return a new list with a single Label object
function initList() {
    return [initLabelNode];
}
window.initList = initList;

// init a node based on a label
function initNode(nodes, label) {
    let labelNode = Object.assign({}, nodes.find(node => node.label === 'Label' && node.strLabel === label));
    
    if (!labelNode) {
        labelNode = initLabelNode();
        labelNode.label = 'Label';
    }

    labelNode.id = getRandomToken(nodes, 12);
    labelNode.date = getDateObjects();

    console.log('initNode', labelNode)
    return labelNode;
}
window.initNode = initNode

// 
function getNodeByKeyPairs(nodes, KeyPairList, boolFirstOnly) {
    console.log('getNodeByKeyPairs', KeyPairList, boolFirstOnly)

    // Filter nodes based on the key-value pairs
    let filteredNodes = nodes.filter(node => 
        KeyPairList.every(pair => node[pair.key] === pair.value)
    );
    console.log(filteredNodes)
    // Return the first element if boolFirstOnly is true, otherwise return all matched elements
    return boolFirstOnly ? filteredNodes[0] : filteredNodes;
}
window.getNodeByKeyPairs = getNodeByKeyPairs

// get a node from the list by KeyPair
function getNodeByKeyPair(nodes, key, value, boolFirstOnly) {
    if (boolFirstOnly) {
        return [Object.assign({}, nodes.find(node => node[key] === value))]
    } else {
        return [Object.assign({}, nodes.filter(node => node[key] === value))]
    }
}   
window.getNodeByKeyPair = getNodeByKeyPair

// add a new node to the list
function addNode(nodes, nodeToAdd) {

    let idExists = getNodeByKeyPair(nodes, 'id', nodeToAdd.id, true)[0]
    console.log('id exists', idExists)
    if (idExists && Object.keys(idExists).length > 0) {
        return {
            data: nodes,
            msg: 'ERROR_ID_EXISTS'
        }
    } else if (nodeToAdd.id === '') {
        return {
            data: nodes,
            msg: 'ERROR_ID_CANNOT_BE_AN_EMPTY_STRING'
        }
    } else {
        // don't create a new Label node if strLabel already exists. 
        if (nodeToAdd.label === 'Label') {
            let strLabelExists = getNodeByKeyPair(nodes, 'strLabel', nodeToAdd.strLabel, true)[0]
            if (strLabelExists && Object.keys(strLabelExists).length > 0) {
                console.log('strlabel exists')
                return {
                    data: nodes,
                    msg: 'ERROR_STRLABEL_EXISTS'
                }
            }
        }

        // todo: figure out the long-term fix to indicate uniqueness on certain props
        
        // todo: if any rel-prefixed props exist, 
        //       look up the full target node based on the id
        //       and add this node.id to the relNodes array in the targetNode

        nodes.push(nodeToAdd)
        console.log('nodes with added', nodes)

        return {
            data: nodes,
            msg: 'SUCCESS'
        }
    }
}

// removes a node from the list
function removeNode(nodes, nodeToRemove) {

    // todo: if any rel-prefixed props exist,
    //       look up the full target node based on the id
    //       and remove this node's id from that node entirely

    nodes = nodes.filter(node => node !== nodeToRemove)

    return {
        data: nodes,
        msg: 'SUCCESS'
    }
}

// update a node in the list
function updateNode(nodes, nodeToUpdate) {

    // todo: compare each keypair before anda after, and if there are changes to 
    //       any rel-prefixed props in this node, identify the types of changes,
    //       then look up the full target and propagate those changes. 

    return nodes.map(node => node.id === nodeToUpdate.id ? { ...node, ...nodeToUpdate } : node);
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
    getListOfKeys,
    getDateObjects,

    initList,
    initNode,
    getNodeByKeyPair,
    
    addNode,
    removeNode,
    updateNode,

    validateListContent,
    validateList,
    
};

