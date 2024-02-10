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

### Object Definitions

**@context**

In JSON-LD, @context provides links to precise definitions for the properties used in the object. 

For example, the "date" property can be ambiguous.

```
{
  "name": "Ancient Vase",
  "date": "500-300 BC"
}
```

We can be more clear by defining our terms.

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

This id is a unique identifier, usually a resource link, so this dataset can be referenced directly from across the internet. 

```
"@id": "http://af3c52e46cd.org/db.json  ",
```

**@type**

The type of the object, in this case "Dataset". 

```
"@type": "dc:Dataset",
```

**creator**

This object contains information about the responsible individual or organization, including contact information.

```
  "creator": {
    "@type": "Organization",
    "url": "https://www.whimsicalwidgetry.org/",
    "name": "Whimsical Widgetry",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "office",
      "telephone": "(555) 246-1357",
      "email": "info@whimsicalwidgetry.org"
    }
  }
```

**distribution**

This object contains the direct link to the dataset itself.

```
  "distribution": {
    "@type": "DataDownload",
    "encodingFormat": "JSON",
    "contentUrl": "https://www.whimsicalwidgetry.org/db.json"
  }
```

**radioOption**

GraphletDB provides an object in which to store sets of radio options within the dataset. This is an example from the Archively museum collections app, which has Keyword nodes that require a type, as well as Item nodes that have a privacy status.

```
"radioOption": {
  "KeywordType": [
    "Topic",
    "Person",
    "Group",
    "Place",
    "Date",
    "Medium",
    "Event",
    "Type"
  ],
  "PrivacyStatus": [
    "Public",
    "Private",
    "Confidential",
    "Unassessed"
  ],
}
```


**templates**

This object is a list. It should probably be an object. 🤷‍♂️

There are three required template objects. 

```
"templates": [
  {
    "@type": "gjs:TypeCollection",
    "gjs:typeName": "",
    "gjs:entries": []
  },
  {
    "gjs:@date": [
      ""
    ],
    "gjs:@id": "",
    "@type": "gjs:CoreTemplateObject",
    "gjs:@text": "",
    "gjs:rel__nodes": []
  },
  {
    "@type": "archively:Placeholder"
  },
```

**@graph**

This object is a dictionary of TypeCollection objects indexed by the @type of node collected. 

This is the actual data carried in the dataset. These are nodes which have varying lists of properties based on their @type. 

```
"@graph": {
  "archively:Item": {
    "@type": "gjs:TypeCollection",
    "gjs:typeName": "archively:Person",
    "gjs:entries": [
      {
        "gjs:@date": [
          "202402010658jenner"
        ],
        "gjs:@id": "e95bc8c502",
        "@type": "archively:Person",
        "archively:firstName": "John",
        "archively:lastName": "Rando"
        "archively:worksCreated": ["c2092618aa3840"]
        "gjs:rel__nodes": []
      }
    ],
  },
  "archively:Book": {
    "@type": "gjs:TypeCollection",
    "gjs:typeName": "archively:Book",
    "gjs:entries": [
      {
        "gjs:@date": [
          "2023081102301jenner"
        ],
        "gjs:@id": "c2092618aa3840",
        "@type": "archively:Book",
        "archively:rel__writtenBy": ["e95bc8c502"],
        "gjs:rel__nodes": []
      }
    ],
  },
}
```

## Property Definitions

GraphletDB definitions: 

```
graphletdb.com/terms/TypeCollection
```

|TypeCollection||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/TypeCollection|
|Label|TypeCollection|
|Definition|A collection of resources that all belong to the same data type.|
|Comment||
|Type of Term|Class|

```
graphletdb.com/terms/@id
```

|@id||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/@id|
|Label|@id|
|Definition|Identifier unique inside the dataset. Required.|
|Comment||
|Type of Term|Class|

```
graphletdb.com/terms/@text
```

|@text||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/@text|
|Label|@text|
|Definition|String descriptor of the object.|
|Comment||
|Type of Term|Class|

```
graphletdb.com/terms/entries
```

|@entries||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/entries|
|Label|entries|
|Definition|List of objects contained in this TypeCollection.|
|Comment||
|Type of Term|Class|

```
graphletdb.com/terms/typeContained
```

|typeContained||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/typeContained|
|Label|typeContained|
|Definition|The @type contained in this TypeCollection.|
|Comment||
|Type of Term|Class|

```
graphletdb.com/terms/@date
```

|@date||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/@date|
|Label|@date|
|Definition|List of formatted strings recording every event when this object was edited.|
|Comment|The string contains two parts. First, a 14-digit integer string in the format YYYYMMDDHHmmss. For example: 20240102162223 is January 1st, 2024, at 4:22 pm and 23 seconds. Second, an alphanumeric string intended to show a username. The default value is "admin".|
|Type of Term|Class|

```
graphletdb.com/terms/rel__nodes
```

|rel__nodes||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/rel__nodes|
|Label|rel__nodes|
|Definition|List of id strings of other nodes in the @graph dataset.|
|Comment||
|Type of Term|Class|

```
graphletdb.com/terms/CoreTemplateObject
```

|coreTemplateObject||
|---|---|
|Vocabulary|http://graphletdb.com/terms|
|URI|http://graphletdb.com/terms/coreTemplateObject|
|Label|coreTemplateObject|
|Definition|An object containing the minimum required properties for a valid node.|
|Comment||
|Type of Term|Class|

## Node Definitions

At a minimum, each node must contain the properties that occur in the CoreTemplateObject.

Of these, `@id` and `@type` are required. `@date` and `rel__nodes` must both be lists, but they can be empty.

```
{
  "@type": "archively:Person",
  "gjs:@date": [
    "202402010658jenner"
  ],
  "gjs:@id": "e95bc8c502",
  "gjs:rel__nodes": []
}
```

## Property Type Prefixes

GraphletDB requires prefixes on user-added properties, based on the type. Supported prefixes are:

|Prefix|Definition|
|---|---|
|bool__|boolean|
|int__|integer|
|radio__|list of string options|
|rel__|list of "id" strings|
|str__|string|
|list__|list|








### Archively Example 

Archively is an open source app that Additional top-level objects are allowed. For example, the Archively dataset includes all of the above elements along with a "website" object and a 

website: {}
archively2cslMap: {}

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
