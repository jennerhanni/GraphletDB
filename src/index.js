"use strict";

/**************************************** Helpers ************************************/

// log the version string to the console
function aboutGraphletJS() {
    console.log("GraphletJS v0.0.1");
    return {
        data: "GraphletJS v0.0.1",
        msg: "SUCCESS"
    };
}


// generate a random lowercase hexstring
// that is not already used as an id in nodes
function getRandomToken(nodes, len) {    
    let token;
    let isUnique;

    do {
        token = "";
        for (let i = 0; i < len; i++) {
            token += Math.floor(Math.random() * 16).toString(16); 
        }

        // Check if token is unique
        let res = boolFoundKeyVal(nodes, 'id', token)
        if (res['msg'] === 'SUCCESS' && !res['data']) {
            isUnique = !res['data']
        }
    } while (!isUnique);

    return {
        data: token,
        msg: "SUCCESS"
    };
}


// returns true if a node with the given keypair exists
// return false if a node with this keypair does not exist
function boolFoundKeyVal(nodes, key, value) {
    if (!nodes["@graph"] || typeof nodes["@graph"] !== 'object') {
        console.error('Invalid or missing @graph in nodes');
            return {
                data: false,
                msg: "ERROR: Invalid or missing @graph"
            };
    }

    for (let typeCollectionKey in nodes["@graph"]) {
        let typeCollection = nodes["@graph"][typeCollectionKey];
        if (typeCollection["@type"] === "TypeCollection" && Array.isArray(typeCollection["gjs:entries"])) {
            for (let entry of typeCollection["gjs:entries"]) {
                if (entry[key] === value) {
                    return {
                        data: true,
                        msg: "SUCCESS"
                    };
                }
            }
        }
    }

    return {
        data: false,
        msg: "SUCCESS"
    };

}


function keyValExists(nodes, key, val) {
    console.log('keyValExists', nodes, key, val)

    let res = getNodeByKeyPair(nodes, key, val, true)
    console.log('keyValExists res of getNodeBYKeyPair', res.data, Object.keys(res.data).length > 0)
    if (res.msg === "SUCCESS" && Object.keys(res.data).length > 0) {
        return true
    } else {
        return false
    }
}


// get a template object out of the templates array
function getTemplateObj(nodes, key, val) {
    try {
        return { 
            data: nodes['templates'].find(n => n[key] === val) || null,
            msg: "SUCCESS" 
        }
    } catch (e) {
        console.log('getTemplateObj', key, val);
        return { 
            data: e,
            msg: "ERROR_SEE_DATA" 
        }
    }
}


// return a list of all the type collection strings in @graph
function getListOfTypeCollections(db) {
    try {
        if (db["@graph"] && typeof db["@graph"] === 'object' && !Array.isArray(db["@graph"])) {
            return { data: Object.keys(db["@graph"]),
                     msg: "SUCCESS" };
        } else {
            return { data: [],
                     msg: "SUCCESS" };
        }
    } catch (error) {
        console.error('Error in getListOfTypeCollections:', error);
        return { data: [],
                 msg: "ERROR" };
    }
}


// return a list of all keys in a list of nodes
function getListOfKeys(nodes) {
    console.log("getListOfKeys");

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
    const priorityKeys = ["id", "date", "label"];
    priorityKeys.reverse().forEach(key => {
        if (keys.includes(key)) {
            keys = [key, ...keys.filter(k => k !== key)];
        }
    });

    return {
        data: keys,
        msg: "SUCCESS"
    };
}


const getUnixTimestamp = () => {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000);
    return timestamp;
};

// calculates a formatted datetime string in the form YYYYMMDDHHmm
const getDateObjects = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-indexed 
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    let datestring = `${year}${month}${day}${hour}${minute}`;
    if (datestring) {    
        return {
            data: `${year}${month}${day}${hour}${minute}`,
            msg: "SUCCESS"
        };
    } else {
        return {
            data: "",
            msg: "ERROR_FAILED_TO_CREATE_DATESTRING"
        };
    }
}


/****************************** List & Node Handling *********************************/

// init and return a new list with a single Label object
function initList() {
    let newNode = Object.assign({}, initLabelNode);
    let message = "SUCCESS";

    if (!newNode || (newNode && Object.keys(newNode).length === 0)) {
        message = "ERROR_NODE_DOES_NOT_EXIST";
    }

    console.log("initList", newNode);
    return {
        data: [newNode],
        msg: message
    };
}

function initNode(nodes, nodeTypeStr, strDateBlame) {
    // start with the core template object
    let data = {}
    let msg = "SUCCESS";

    // grab the @type template based on nodeTypeStr and merge if the object exists
    // otherwise return
    let res = getTemplateObj(nodes, '@type', 'archively:CoreTemplateObject');
    if (res['msg'] !== 'SUCCESS') {
        return { 
            data: {},
            msg: res['msg']                 
        }
    } else {
        data = res['data']
    }

    // grab the @type template based on nodeTypeStr and merge if the object exists
    // otherwise return
    res = getTemplateObj(nodes, '@type', nodeTypeStr);
    if (res['msg'] !== 'SUCCESS') {
        return {
            data: {},
            msg: res['msg']
        }
    } else {
        data = { ...data, ...res['data'] }
    }

    // update the core props
    let tokenRes; do {
        tokenRes = getRandomToken(nodes, 12);
    } while (tokenRes.msg !== "SUCCESS");
    data['gjs:@id'] = tokenRes.data;
    
    let dateRes; do {
        dateRes = getDateObjects();
    } while (dateRes.msg !== "SUCCESS");
    data['gjs:@date'] = [dateRes.data+strDateBlame];

    return { data, msg };
}


// MAJOR REWRITE REQUIRED [search/sort/filter]
// find all nodes by a set of keypairs and boolean and/or/not conditions
function getNodeByKeyPairs(nodes, keyPairList, boolFirstOnly = false) {
    console.log("getNodeByKeyPairs", keyPairList, boolFirstOnly);

    if (boolFirstOnly) {
        boolFirstOnly = true;
    }

    // Filter nodes based on the key-value pairs
    let filteredNodes = nodes.filter(node => 
        keyPairList.every(pair => node[pair.key] === pair.value)
    );
    console.log(filteredNodes);
    // Return the first element if boolFirstOnly is true, otherwise return all matched elements
    return {
        data: boolFirstOnly ? filteredNodes[0] : filteredNodes,
        msg: "I_WOULDNT_TRUST_THIS_IF_I_WERE_YOU"
    };
}


// get a node from the list by KeyPair
function getNodeByKeyPair(nodes, key, value, boolFirstOnly) {
    console.log("getNodeByKeyPair", nodes, key, value, boolFirstOnly);
    if (boolFirstOnly) {
        let nodesToReturn = [Object.assign({}, nodes.find(node => node[key] === value))];
        return {
            data: nodesToReturn[0],
            msg: "SUCCESS"
        };
    } else {
        let nodesToReturn = [Object.assign({}, nodes.find(node => node[key] === value))];
        return {
            data: nodesToReturn,
            msg: "SUCCESS"
        };
    }
}


// add a new node to the list
function addNode(nodes, nodeToAdd) {

    let boolIdExists = keyValExists(nodes, "id", nodeToAdd.id);
    if (boolIdExists) {
        return {
            data: nodes,
            msg: "ERROR_ID_ALREADY_EXISTS_IN_THE_LIST"
        };

    } else if (nodeToAdd.id === "") {
        return {
            data: nodes,
            msg: "ERROR_ID_CANNOT_BE_AN_EMPTY_STRING"
        };

    } else {
        // don't create a new Label node if strLabel already exists. 
        if (nodeToAdd.label === "Label") {
            let boolStrLabelExists = keyValExists(nodes, "strLabel", nodeToAdd.strLabel);
            if (boolStrLabelExists) {
                return {
                    data: nodes,
                    msg: "ERROR_STRLABEL_EXISTS"
                };
            }
        }

        // todo: if any rel-prefixed props exist, 
        //       look up the full target node based on the id
        //       and add this node.id to the relNodes array in the targetNode

        nodes.push(nodeToAdd);

        return {
            data: nodes,
            msg: "SUCCESS"
        };
    }
}


// update a node in the list
function updateNode(nodes, nodeToUpdate) {

    // todo: compare each keypair before anda after, and if there are changes to 
    //       any rel-prefixed props in this node, identify the types of changes,
    //       then look up the full target and propagate those changes. 

    return nodes.map(node => node.id === nodeToUpdate.id ? { ...node, ...nodeToUpdate } : node);
}


// removes a node from the list
function removeNode(nodes, nodeToRemove) {

    // todo: if any rel-prefixed props exist,
    //       look up the full target node based on the id
    //       and remove this node's id from that node entirely

    nodes = nodes.filter(node => node !== nodeToRemove);

    return {
        data: nodes,
        msg: "SUCCESS"
    };
}


// add a property to a Label node
// and propagate that change to every node of that label
function addAPropertyToALabelNode(nodes, label, prop, propType, propDefaultVal) {
    console.log("addAPropertyToALabelNode", nodes, label, prop, propType, propDefaultVal);
}


// remove a property from a Label node
// and propagate that change to every node of that label
function removeAPropertyFromALabelNode(nodes, label, prop) {
    console.log("removeAPropertyFromALabelNode", nodes, label, prop);
}


/********************************** Validation ***************************************/

// verify that all entries in the list are objects
function validateListContent(nodes) {
    const isValid = nodes.every(node => node && typeof node === "object");
    return {
        data: isValid,
        msg: isValid ? "Valid list content." : "Invalid list content. List must contain only node objects."
    };
}


// validate the list of nodes
function validateList(nodes, doFix = false) {
    let fixedNodes = [];
    
    // implement validation logic here
    if (doFix) {
        // implement fixing logic here
        return fixedNodes;
    }
    return nodes;
}


/****************************** Reference Management *********************************/

// convert a set of nodes in GraphletJS format to CSL JSON
function convertNodesToCslJson(nodesToConvert) {
    console.log("convertNodesToCslJson", nodesToConvert);
}


// convert a set of nodes from CSL JSON to the GraphletJS format
function convertNodesFromCslJson(nodesToConvert) {
    console.log("convertNodesFromCslJson", nodesToConvert);
}


/********************************** EXPORTS ******************************************/

module.exports = {
    aboutGraphletJS,
    getRandomToken,
    getTemplateObj,
    keyValExists,
    getListOfTypeCollections,
    getListOfKeys,
    getDateObjects,

    initList,
    initNode,
    getNodeByKeyPair,
    getNodeByKeyPairs,
    
    addNode,
    removeNode,
    updateNode,

    validateListContent,
    validateList,
    
};

