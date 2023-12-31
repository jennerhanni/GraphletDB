# GraphletJS

## Introduction

GraphletJS is a JavaScript library for managing property graph databases. The library expects to work with a flat list of objects called nodes, where each node has certain properties based on its label. 

The library provides functions to add and remove nodes, update nodes in place, add and remove label-associated properties, create a new node of an existing label, and validate that a list meets the basic requirements of the GraphletJS schema.  

## Installation

```
npm install --save graphletjs
```

## Usage

```
const { aboutGraphlet } = require('graphletjs');
aboutGraphlet(); // This will log "GraphletJS v0.0.1" to the console
```

## GraphletJS Schema

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
        strLabelDescription: 'The basic building block of the database.',
        relNodes: []
    },
    {   id: 'bbb',
        label: 'Label',
        date: '202312311828',
        strLabel: 'Topic',
        strLabelDescription: 'A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.',
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
        strLabelDescription: 'A human individual, real or mythological.' },
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

## API Reference

Functions are separated into three areas:

1. CRUD Node Handling
- initList
- initNode
- getListOfAllLabels
- addNode
- updateNode
- removeNode

2. Database Validation
- validateList()

3. Reference Management
- convertNodeToCslJson(nodes, nodeId)
- convertNodeFromCslJson(nodes, nodeId)

**initList()**

Return a new list containing one Label object. 

**initNode(nodes, label)**

If a Label node exists for that label, create and return a list containing the new node using the Label node as a template.

If a Label node does not exist for that label, create the Label node, then create and return an array of both node 

Return a single object of type Label, if that label exists.

**getListOfAllLabels**

**validateList(nodes, doFix)**

Optional: if doFix is true, return a fixed list. 

**addNode(nodes, nodeToAdd)**

**removeNOde(nodes, nodeToRemove)**

**updateNode(nodes, nodeToUpdate)**

## License

GraphletJS is available for use under the GPL-3.0. See the [LICENSE](LICENSE) for more information.
