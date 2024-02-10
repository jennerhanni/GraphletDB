# GraphletDB

## Introduction

GraphletDB is an extensible property graph database written in JSON-LD. This is not a database intended for scaling or production, but for prototyping and for early explorations into a dataset where the ideal schema is unclear. GraphletDB creates nodes and relationships out of your data, then lets you directly edit the property names and types. 

The library provides functions to add and remove records, update records in place, add and remove label-associated properties, create a new records of an existing label, and validate that each entry meets the basic requirements of the GraphletDB schema.

## Installation

```
npm install --save graphletdb
```

## Usage

```
const { aboutGraphletDB } = require('graphletdb');
aboutGraphletDB(); // This will log "GraphletDB v0.0.1" to the console
```

## Demo

To see the demo of GraphletDB in action, first clone the repository.

```
git clone https://github.com/jennerhanni/GraphletDB.git
```

Then, open the `index.html` file located in the `demo` directory in your web browser.

## Dataset Structure

```
{
  @context: {},
  @id: "",
  @type: "Dataset",
  creator: {},
  distribution: {},
  radioOption: {},
  templates: [],
  @graph: []
}
```

**@context**

In JSON-LD, @context provides links to precise definitions for the properties used in the object. 

In this example, the "date" property is ambiguous.

```
{
  "name": "Ancient Vase",
  "date": "500-300 BC"
}
```

However, we can be more precise when we incorporate specific definitions.

```
{
  "@context": {
    "name": "http://schema.org/name",
    "creationDate": "http://schema.org/dateCreated"
  },
  "name": "Ancient Vase",
  "creationDate": "500-300 BC"
}
```

**@id**

This id is a unique identifier, usually a resource link, so this dataset can be referenced across the internet. 

```
"@id": "http://af3c52e46cd.org/db.json  ",
```

**@type**

The type of the object, in this case "Dataset". 

```
"@type": "dc:Dataset",
```

**creator**

This object contains information about the creating individual or organization that is responsible for this dataset. It includes contact information.

```
  "creator": {
    "@type": "Organization",
    "url": "https://www.wallowanezpercearchive.org/",
    "name": "Nez Perce Wallowa Homeland",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "office",
      "telephone": "(541) 886-3101",
      "email": "info@wallowanezperce.org"
    }
  }
```

**distribution**

This object contains the direct link to the dataset itself.

```
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "JSON",
    "contentUrl": "https://www.wallowanezpercearchive.org/data.json"
  }
```

**radioOption**

GraphletDB provides an object in which to store sets of radio options within the dataset. 

**templates**



### Archively Example

Additional top-level objects are allowed. For example, the Archively dataset includes all of the above elements along with a "website" object and a 

website: {}
archively2cslMap: {}

## Property Definitions @context



## Node Types @graph

## 

## GraphletDB Schema

Where required, the `nodes` argument in each function should be a list that is the full database.

Every node should have at minimum three string properties and one property that is a list of `id` strings. 

- The required `id` property must be a unique string.

- The required `date` property must be a 12-digit string in the form `YYYYMMDDHHmm`.

- The required `label` property must be a string with no spaces. 

- The required `relNodes` property must be a list of id strings. 

Any additional properties must start with a type suffix, and the type of the associated property's value must be the same. The type suffix options are `bool (true/false)`, `str (string)`, `list (list)`, `rel (list of id strings)`, or `obj (obj)`.

If the list contains only one object, that object's label should be `Label`, and it should include a property called `strLabel` that contains a label value that is also a string without spaces. This node is called a `Label` node. 

If a property is added, removed, or updated in a `Label` node, that change is propagated to all nodes bearing that `Label` node's `strLabel` value. 

The database requires bidirectional linking. The `id` strings in rel-prefixed properties describe relationships. In the example data below, the node with id `eee` includes the node with id `ccc` in its list of related topics. To fulfill the requirement of bidirectional linking, the node with id `ccc` includes `eee` in its default catch-all property for related nodes. In the future, another property may be added to `Topic` nodes such as `ccc` that would better describe the
relationship with node `eee` but this meets the minimum requirement for now. 

**Example Data**

```
const validNodes = [
    {   id: 'aaa',
        label: 'Label',
        date: '202312311822',
        strLabel: 'Label',
        strLabelDesc: 'The basic building block of the database.',
        relNodes: []
    },
    {   id: 'bbb',
        label: 'Label',
        date: '202312311828',
        strLabel: 'Topic',
        strLabelDesc: 'A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.',
        strText: '',
        relNodes: []
    },
    {   id: 'ccc',
        label: 'Topic',
        date: '202312210727',
        strText: 'U.S. Presidents',
        relNodes: ['eee']
    },
    {   id: 'ddd',
        label: 'Label',
        date: '202312210727',
        strLabel: 'Person',
        strLabelDesc: 'A human individual, real or mythological.' },
        strFirstName: '',
        strLastName: '',
        relTopics: [],
        relNodes: []
    },
    {   id: 'eee',
        label: 'Person',
        date: '202312210729',
        strFirstName: 'George',
        strLastName: 'Washington',
        relTopics: ['ccc'],
        relNodes: []
    },
];
```

# API Reference

## Helper Functions
- [aboutGraphletDB()](#-aboutgraphletdb)
- [getRandomToken(nodes, len)](#-getrandomtokennodes-len)
- [getListOfLabels(nodes, objOrIds)](#-getlistoflabelsnodes-objorids)
- [getListOfKeys(nodes)](#-getlistofkeysnodes)
- [getDateObjects()](#-getdateobjects)

## CRUD Node Handling Functions
- [initList()](#-initlist)
- [initNode(nodes, label)](#-initnodenodes-label)
- [getNodeByKeyPairs(nodes, keyPairList, boolFirstOnly)](#-getnodebykeypairsnodes-keypairlist-boolfirstonly)
- [getNodeByKeyPair(nodes, key, value, boolFirstOnly)](#-getnodebykeypairnodes-key-value-boolfirstonly)
- [addNode(nodes, nodeToAdd)](#-addnodenodes-nodeToAdd)
- [updateNode(nodes, nodeToUpdate)](#-updatenodenodes-nodeToUpdate)
- [removeNode(nodes, nodeToRemove)](#-removenodenodes-nodeToRemove)

## Validation Functions
- [validateListContent(nodes)](#-validatelistcontentnodes)
- [validateList(nodes, doFix)](#-validatelistnodes-dofix)

## Reference Management Functions
- [convertNodesToCslJson(nodesToConvert)](#-convertnodestocsljsonnodestoconvert)
- [convertNodesFromCslJson(nodesToConvert)](#-convertnodesfromcsljsonnodestoconvert)

## API: Helper Functions

### 🔧 aboutGraphletDB()

This helper function logs the current version of GraphletDB to the console. 

```javascript
aboutGraphletDB();  // Outputs "GraphletDB v0.0.1"
```

### 🔧 getRandomToken(nodes, len)

This helper function creates a random hexadecimal token of the length specified by `len`. It ensures the uniqueness of the token within the provided `nodes` array. Each node in the array is expected to have an `id` property, which is used to check for uniqueness. The function repeatedly generates new tokens until it finds one that is not already present in the `nodes` array.

Parameters:

- A `nodes` **array** of objects where each object represents a node. The function only cares that each node has an `id` property.
- A `len` **integer** number of characters to generate in the hexadecimal string.

Returns a unique lowercase hexadecimal **string** of the specified length.

```javascript
let nodes = [{ id: 'a1b2' }, { id: 'c3d4' }];
let tokenLength = 4;
let newToken = getRandomToken(nodes, tokenLength);
console.log(newToken); // Outputs a unique 4-character hexadecimal string
```

### 🔧 getListOfLabels(nodes, objOrIds)

This helper function returns a list of all nodes with the label `Label`. If the `objOrIds` parameter is `obj`, the function returns a list of Label node objects. If the `objOrIds` parameter is `id`, the function returns a list of `id` strings.

Parameters:

- A `nodes` **array** of objects where each object represents a node. The function only cares that each node has an `id` property.
- The `objOrIds` **string** determines the type of the returned list. Use `obj` to get a list of node objects, and `id` to get a list of `id` strings.

Returns an **array** of either `id` strings or full node objects, depending on the `objOrIds` parameter value.

```javascript
let nodes = [
    { id: 'node1', label: 'Label', data: {...} },
    { id: 'node2', label: 'Label', data: {...} },
];

// Example 1: Get list of node objects
let labelObjects = getListOfLabels('obj');
console.log(labelObjects);

// Example 2: Get list of id strings
let labelIds = getListOfLabels('id');
console.log(labelIds);
```

## CRUD Node Handler Functions

### 🔧 initList()

This function initializes returns a predefined minimal list that meets the GraphletDB schema. This can be used to set up or reset a list to a known default state that contains one Label object.

Returns an **array** containing a single Label object. The structure and content of the Label object are determined by the `initLabelNode`.

```javascript
let newList = initList();
console.log(newList); // Outputs the content of initLabelNode
```

### 🔧 initNode(nodes, label)

If a Label node exists for that label, create and return a list containing the new node using the Label node as a template.

If a Label node does not exist for that label, create the Label node, then create and return an array of both node 

Return a single object of type Label, if that label exists.

### 🔧 getNodeByKeyPair(nodes, key, value, boolFirstOnly)

This function retrieves one or more nodes from a list based on a specified key-value pair. If `boolFirstOnly` is true, the function returns the first node that matches the key-value pair. If false, it returns all nodes matching the key-value pair.

Parameters:

- `nodes` (Array): An array of objects, each representing a node.
- `key` (String): The key to match within each node object.
- `value` (Any): The value to match for the given key.
- `boolFirstOnly` (Boolean): Determines whether to return only the first matching node (`true`) or all matching nodes (`false`).

Returns an **array** containing the matching node(s). If `boolFirstOnly` is true, the array contains only the first matching node or is empty if no match is found. If `boolFirstOnly` is false, the array contains all nodes that match the key-value pair or is empty if no matches are found.

```javascript
let nodes = [
    { id: 'node1', type: 'Label', data: {...} },
    { id: 'node2', type: 'Label', data: {...} },
];

let firstLabelNode = getNodeByKeyPair(nodes, 'type', 'Label', true);
console.log(firstLabelNode);

let allLabelNodes = getNodeByKeyPair(nodes, 'type', 'Label', false);
console.log(allLabelNodes);
```

### 🔧 addNode(nodes, nodeToAdd)

### 🔧 removeNode(nodes, nodeToRemove)

### 🔧 updateNode(nodes, nodeToUpdate)

## Validation Functions

### 🔧 validateList(nodes, doFix)

Optional: if doFix is true, return a fixed list. 

## Reference Management Functions

### 🔧 convertNodeToCslJson(nodes, nodeId)

### 🔧 convertNodeFromCslJson(nodes, nodeId)

## License

GraphletDB is available for use under the GPL-3.0. See the [LICENSE](LICENSE) for more information.
