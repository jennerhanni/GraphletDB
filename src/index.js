"use strict";

/**************************************** Helpers ************************************/

// log the version string to the console
function aboutGraphletJS() {
    return "GraphletJS v0.0.1";
}


// return the working label from a contexted type node
// - "archively:User" returns User
function getTypeStr(fullTypeString) {
    try {
        if (typeof fullTypeString !== "string") {
            throw new Error("The argument 'FullTypeString' is not a string.")
        } else {
            const parts = fullTypeString.split(":");
            return parts.length > 1 ? parts[parts.length - 1] : fullTypeString
        }
    } catch (err) {
        console.error(err);
        throw err; 
    }
}


// generate a random lowercase hexstring
// that is not already used as an id in nodes
function getRandomToken(nodes, len) {   
    let token;
    let isUnique;
    let count = 0;

    do {
        token = "";
        for (let i = 0; i < len; i++) {
            token += Math.floor(Math.random() * 16).toString(16); 
        }

        // check if token is unique
        isUnique = !boolFoundKeyVal(nodes, "id", token)
        count++; 
        if (count >= 10) {
            throw new Error("Ten random keys failed uniqueness check.")
            break;
        }   
    } while (!isUnique);

    return token
}


// returns true if a node with the given keypair exists
// return false if a node with this keypair does not exist
function boolFoundKeyVal(nodes, key, value) {
    try {
        if (!nodes["@graph"] || typeof nodes["@graph"] !== "object") {
            throw new Error("Invalid or missing @graph in nodes");
        }

        for (let typeCollectionKey in nodes["@graph"]) {
            let typeCollection = nodes["@graph"][typeCollectionKey];
            if (typeCollection["@type"] === "TypeCollection" 
                && Array.isArray(typeCollection["gjs:entries"])) {
                for (let entry of typeCollection["gjs:entries"]) {
                    if (entry[key] === value) {
                        return true; // Found the key-value pair
                    }
                }
            }
        }

        return false; // Key-value pair not found
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}


// get a template object out of the templates array
function getTemplateObj(nodes, key, val) {
    try {
        return nodes["templates"].find(n => n[key] === val) || null
    } catch (e) {
        console.log("getTemplateObj failed, template not found for key, val:", key, val);
        throw new Error('template object not found'); 
    }
}


// return a list of all the type collection strings in @graph
function getListOfTypeCollections(db) {
    try {
        if (!db["@graph"] || typeof db["@graph"] !== "object" || Array.isArray(db["@graph"])) {
            throw new Error("Invalid or inappropriate @graph structure");
        }
        return Object.keys(db["@graph"]);
    } catch (error) {
        console.error("Error in getListOfTypeCollections:", error.message);
        throw error; 
    }
}

// NEEDS TRIPLE CHECK, SOMETHING IS VERY WEIRD
// WHAT IS THIS FUNCTION FOR?
// return a list of all keys in a list of nodes
function getListOfKeys(nodes) {
    console.log("getListOfKeys");

    let keySet = new Set();

    // check every TypeCollection's nodes in 'entries' to see what keys are present 
    Object.values(nodes['@graph']).forEach(typeCollection => {
        if (typeCollection['gjs:entries'] && Array.isArray(typeCollection['gjs:entries'])) {
            typeCollection['gjs:entries'].forEach(node => {
                Object.keys(node).forEach(key => {
                    keySet.add(key);
                });
            });
        }
    });

    // Convert set to an array and sort alphabetically
    let keys = Array.from(keySet).sort();

    // Prioritize "id", "date", and "label" if they exist in the keys
    const priorityKeys = ["@type", "gjs:@id", "gjs:@date", "gjs:@text"];
    priorityKeys.reverse().forEach(key => {
        if (keys.includes(key)) {
            keys = [key, ...keys.filter(k => k !== key)];
        }
    });

    return keys
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

    try {
        if (datestring) { return datestring }
    } catch (err) {
        throw new Error("Failed to create a typestring.")
    }
}


// return a list of the rel__-prefixed props
function hasRelProps(nodeToAdd) {
    return Object.keys(nodeToAdd).filter(key => key.startsWith("archively:rel__"));
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
    return [newNode]
}


// create a new type collection
// add it to the @graph array
function initTypeCollection(nodes, typeStr) {
    console.log('initTypeCollection', typeStr)

   try {
       // grab the @type template for the core template
       let newTypeCollection = getTemplateObj(nodes, "@type", "gjs:TypeCollection");
       newTypeCollection['gjs:typeName'] = typeStr;
       nodes['@graph'][typeStr] = newTypeCollection;
    } catch (err) {
        console.error(err);
    }    
}


// create a new node from a type
// also supports an optional user slug to override in the updated date
function initNode(nodes, nodeTypeStr, strUserSlug='default') {

    try {    
        // grab the @type template for the core template
        let newNode = getTemplateObj(nodes, "@type", "archively:CoreTemplateObject"); 

        // grab the @type template based on nodeTypeStr 
        // and merge if the object exists
        let tObj = getTemplateObj(nodes, '@type', nodeTypeStr);
        newNode = { ...newNode, ...tObj }

        // update core props
        newNode["gjs:@id"] = getRandomToken(nodes, 12);
        newNode["gjs:@date"] = [getDateObjects()+strUserSlug];
    
        return Object.assign({}, newNode)

    } catch (err) {
        console.error(err);
    }
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
    try {
        console.log("getNodeByKeyPair", nodes, key, value, boolFirstOnly);
        let nodeFound = nodes.find(node => node[key] === value);

        if (!nodeFound) {
            throw new Error("Node not found");
        }

        if (boolFirstOnly) {
            return Object.assign({}, nodeFound);
        } else {
            let nodesToReturn = nodes.filter(node => node[key] === value).map(node => Object.assign({}, node));
            return nodesToReturn;
        }
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}


// add a new node to @graph
function addNode(nodes, nodeToAdd) {
    console.log("addNode", nodeToAdd)

    try {
        // identify the type 
        let typeStr = getTypeStr(nodeToAdd['@type'])
        console.log('addNode typeStr', nodeToAdd, typeStr)

        // create the typecollection if it does not exist
        let typeCollectionList = getListOfTypeCollections(nodes)
        if (!typeCollectionList.includes(nodeToAdd['@type'])) {
            initTypeCollection(nodes, typeStr)
        }

        // handle bidirectionality if there are any rel-prefixed nodes
        let relPropsList = hasRelProps(nodeToAdd)
        if (relPropsList.length > 0) {
            console.log('relPropsList is nonzero', relPropsList)
            // if any of these props have nonzero lists, 
            // update this node's info in all the other node's default values
        }

        // add this node to the typecollection
        nodes['@graph'][typeStr]['gjs:entries'].push(nodeToAdd)
    } catch (err) {
        console.error(err)
        throw err;
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
    //       and remove this node"s id from that node entirely

    nodes = nodes.filter(node => node !== nodeToRemove);

    return nodes
}


// add a property to a node template
// and propagate that change to every node of that nodeType
function addAPropertyToATemplate(nodes, nodeType, prop, propType, propDefaultVal) {
    console.log("addAPropertyToATemplate", nodes, nodeType, prop, propType, propDefaultVal);
}


// remove a property from a node template
// and propagate that change to every node of that nodeType
function removeAPropertyFromATemplate(nodes, nodeType, prop) {
    console.log("removeAPropertyFromATemplate", nodes, nodeType, prop);
}


/********************************** Validation ***************************************/

// verify that all entries in the list are objects
function validateListContent(nodes) {
    console.log('validateListContent')
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
    getTypeStr,
    getRandomToken,
    boolFoundKeyVal,
    getTemplateObj,
    getListOfTypeCollections,
    getListOfKeys,
    getDateObjects,
    hasRelProps,

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

