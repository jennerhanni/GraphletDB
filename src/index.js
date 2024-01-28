"use strict";

/**************************************** Helpers ************************************/

// log the version string to the console
function aboutGraphletJS() {
    return "GraphletJS v0.0.1";
}


// return the working label from a contexted node's type
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

// this expects @graph
// generate a random lowercase hexstring
function getRandomToken(nodesDict, len) {   
    let token;
    let isUnique;
    let count = 0;
    
    do {
        token = "";
        for (let i = 0; i < len; i++) {
            token += Math.floor(Math.random() * 16).toString(16); 
        }

        // check if token is unique
        let existingNodesList = listFoundKeyVal(nodesDict, null, "id", token, true)
        if (existingNodesList.length === 0) {
            isUnique = true
        }
        count++; 
        if (count >= 10) {
            throw new Error("Ten random keys failed uniqueness check.")
            break;
        }   
    } while (!isUnique);

    return token
}


// this accepts not the whole dbJson but the subset of nodes to be examined
// return a list of entries. if FIRSTONLY is true, 
// return only the first node encountered.
// TODO: add a type arg to make the lookup faster by limiting to typecollection
function listFoundKeyVal(nodesDict, targetType, key, value, firstOnly=false) {
    console.log('listFoundKeyVal', targetType, key, value, firstOnly)
    try {
        if (typeof nodesDict !== "object" || Array.isArray(nodesDict)) {
            throw new Error("Invalid or inappropriate @graph structure");
        }

        // find any (firstOnly = true) or all (firstOnly = false) matching entries
        let entriesToReturn = [];
        for (let typeCollectionKey in nodesDict) {
            let typeCollection = nodesDict[typeCollectionKey];
            if (typeCollection["@type"] === "TypeCollection" 
                && Array.isArray(typeCollection["gjs:entries"])) {
                for (let entry of typeCollection["gjs:entries"]) {
                    if (entry[key] === value) {
                        if (firstOnly) {
                            return [entry]; // found the key-value pair
                        } else {
                            entriesToReturn.push(entry)
                        }
                    }
                }
            }
        }
        return entriesToReturn; 
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}


// get a template object out of the templates array
function getTemplateObj(templateNodes, key, val) {
    try {
        console.log('getTemplateObj *****', key, val, templateNodes.find(n => n[key] === val))
        let nodeToReturn = templateNodes.find(n => n[key] === val) || null
        nodeToReturn = nodeToReturn ? JSON.parse(JSON.stringify(nodeToReturn)) : null;
        console.log('getTemplateObj noteToReturn', nodeToReturn)
        return nodeToReturn;
    } catch (e) {
        console.log("getTemplateObj failed, template not found for key, val:", key, val);
        throw new Error('template object not found'); 
    }
}


// return a list of all the type collection strings in @graph
function getListOfTypeCollections(nodesDict) {
    try {
        if (typeof nodesDict !== "object" || Array.isArray(nodesDict)) {
            throw new Error("Invalid or inappropriate @graph structure");
        }
        return Object.keys(nodesDict);
    } catch (error) {
        console.error("Error in getListOfTypeCollections:", error.message);
        throw error; 
    }
}

// NEEDS TRIPLE CHECK, SOMETHING IS VERY WEIRD
// WHAT IS THIS FUNCTION FOR?
// return a list of all keys in an @graph dict
function getListOfKeys(nodesDict) {
    console.log("getListOfKeys");

    let keySet = new Set();

    // check every TypeCollection's nodes in 'entries' to see what keys are present 
    Object.values(nodesDict).forEach(typeCollection => {
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
// TODO: test this!! should work on the rel__prop itself and disregard the "context:"
function hasRelProps(nodeToAdd) {
    return Object.keys(nodeToAdd).filter(key => getTypeStr(key).startsWith("rel__"));
}


/****************************** List & Node Handling *********************************/

// create a new type collection
// add it to the @graph array
function initTypeCollection(dbJson, typeStr) {
    console.log('initTypeCollection', typeStr)

   try {
       // grab the @type template for the core template
       let newTypeCollection = getTemplateObj(dbJson['templates'], "@type", "gjs:TypeCollection");
       newTypeCollection['gjs:typeName'] = typeStr;
       console.log('newTC', newTypeCollection)
       dbJson['@graph'][typeStr] = newTypeCollection;
       console.log("@GRAPH", dbJson['@graph'])
    } catch (err) {
        console.error(err);
    }    
}


// create a new node from a type
// also supports an optional user slug to override in the updated date
function initNode(dbJson, nodeTypeStr, strUserSlug='default') {

    try {    
        // grab the @type template for the core template
        let newNode = getTemplateObj(dbJson['templates'], "@type", "archively:CoreTemplateObject"); 

        // grab the @type template based on nodeTypeStr 
        // and merge if the object exists
        let tObj = getTemplateObj(dbJson['templates'], '@type', nodeTypeStr);
        newNode = { ...newNode, ...tObj }

        // update core props
        newNode["gjs:@id"] = getRandomToken(dbJson['@graph'], 12);
        newNode["gjs:@date"] = [getDateObjects()+strUserSlug];
    
        return newNode

    } catch (err) {
        console.error(err);
    }
}


// add a new node to @graph
// if the node exists, this will not write but return a warning
// this function does not update target nodes to ensure bidirectionality
function addNode(dbJson, nodeToAdd) {
    console.log("addNode nodeToAdd", nodeToAdd)

    nodeToAdd = nodeToAdd ? JSON.parse(JSON.stringify(nodeToAdd)) : null;
    try {
        // create the typecollection if it does not exist
        // and add the node to the TypeCollection
        let typeCollectionList = getListOfTypeCollections(dbJson['@graph'])
        console.log('addNode typeCollectionList', typeCollectionList)
        if (!typeCollectionList.includes(nodeToAdd['@type'])) {
            initTypeCollection(dbJson, nodeToAdd['@type'])
            dbJson['@graph'][nodeToAdd['@type']]['gjs:entries'] = [nodeToAdd]
        } else {
            dbJson['@graph'][nodeToAdd['@type']]['gjs:entries'].push(nodeToAdd)
        }
        console.log('addNode after initTypeCollection @GRAPH', dbJson['@graph'])

        
    } catch (err) {
        console.error(err)
        throw err;
    }
}

/**        // handle bidirectionality if there are any rel-prefixed nodes
        let relPropsList = hasRelProps(nodeToAdd); 
        if (relPropsList.length > 0) {
            console.log('relPropsList is nonzero', relPropsList);
            relPropsList.forEach(prop => {
                let propArray = nodeToAdd[prop];
                if (Array.isArray(propArray) && propArray.length > 0) {
                    console.log(`Processing non-empty array for property: ${prop}`);
                    propArray.forEach(id => {
                        console.log(`Processing id: ${id} in property: ${prop}`);
                        updateTargetNode(dbJson['@graph'], null, id, nodeToAdd['gjs:@id'], prop, 'ADD')
                    });
                }
            });
        } 
**/

// enforce bidirectionality by ADD or REMOVE a sourceId from a target node's appropriate rel__ prop
function updateTargetNode(nodesDict, targetType='archively:Placeholder', targetId, sourceId, 
                          relKey='gjs:rel__nodes', op) {
    console.log('updateTargetNode', nodesDict, targetType, targetId, sourceId, relKey, op)

    try {
        // find the target node in nodesDict
        let foundNodesList = listFoundKeyVal(nodesDict, targetType, 'gjs:@id', targetId, true)

        // if the node does not exist, create it 
        if (!foundNodesList || foundNodesList.length === 0) {
            
        }

        console.log('foundNodesList', foundNodesList)

    } catch (err) {
        console.error(err)
        throw err;
    }
}


// update a node in the list
function updateNode(dbJson, nodeToUpdate) {

    nodeToUpdate = nodeToUpdate ? JSON.parse(JSON.stringify(nodeToUpdate)) : null;

    // todo: compare each keypair before anda after, and if there are changes to 
    //       any rel-prefixed props in this node, identify the types of changes,
    //       then look up the full target and propagate those changes. 

    //return nodes.map(node => node.id === nodeToUpdate.id ? { ...node, ...nodeToUpdate } : node);
}


// removes a node from the list
function removeNode(dbJson, nodeToRemove) {

    nodeToRemove = nodeToRemove ? JSON.parse(JSON.stringify(nodeToRemove)) : null;

    // todo: if any rel-prefixed props exist,
    //       look up the full target node based on the id
    //       and remove this node"s id from that node entirely

    //nodes = nodes.filter(node => node !== nodeToRemove);

    // return nodes
}


// add a property to a node template
// and propagate that change to every node of that nodeType
function addAPropertyToATemplate(dbJson, nodeType, prop, propType, propDefaultVal) {
    console.log("addAPropertyToATemplate", dbJson, nodeType, prop, propType, propDefaultVal);
}


// remove a property from a node template
// and propagate that change to every node of that nodeType
function removeAPropertyFromATemplate(dbJson, nodeType, prop) {
    console.log("removeAPropertyFromATemplate", dbJson, nodeType, prop);
}


/********************************** Validation ***************************************/

// coming soon

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
    listFoundKeyVal,
    getTemplateObj,
    getListOfTypeCollections,
    getListOfKeys,
    getDateObjects,
    hasRelProps,

    initNode,
    
    addNode,
    removeNode,
    updateNode,
    addAPropertyToATemplate,
    removeAPropertyFromATemplate,
    
    convertNodesToCslJson,
    convertNodesFromCslJson
};

