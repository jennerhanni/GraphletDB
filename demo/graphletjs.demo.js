const { aboutGraphletJS,
        initList,
        getRandomToken,
        getListOfLabels,
        getListOfKeys,
        getNodeByKeyPair,
        initNode,
        addNode,
        updateNode,
        removeNode } = require('../src/index');

let state = {
    nodes: [],
    randomToken: '',
    listOfLabels: [],
    listOfKeys: [],
    aboutGraphletJS: '',
    whichNode: {},
    whichNodeMode: '', // valid options: 'create', 'edit', empty string
    searchResults: [],
};

function demoClearAll() {
    console.log('demoClearAll')
    state.nodes = []
    state.randomToken = '';
    state.listOfLabels = [];
    state.listOfKeys = [];
    state.aboutGraphletJS = '';
    state.whichNode = {};
    state.searchResults = [];
    render();
}
window.demoClearAll = demoClearAll

function demoAboutGraphletJS() {
    console.log('demoAboutGraphletJs')
    let res = aboutGraphletJS()
    if (res.msg === 'SUCCESS') {
        state.aboutGraphletJS = res.data
    }
    render();
} 
window.demoAboutGraphletJS = demoAboutGraphletJS;

function demoGetRandomToken(len) {
    console.log('demoGetRandomToken', len)
    let res = getRandomToken(state.nodes, len)
    if (res.msg === 'SUCCESS') {
        state.randomToken = res.data
    }
    render();
}
window.demoGetRandomToken = demoGetRandomToken;

function demoInitList() {
    state.nodes = initList();
    console.log('demoInitList', state.nodes);
    state.listOfLabels = getListOfLabels(state.nodes, 'id');
    state.listOfKeys = getListOfKeys(state.nodes);
    render();
}
window.demoInitList = demoInitList;

function demoGetListOfLabels(objOrIds) {
    console.log('demoGetListOfLabels', objOrIds)
    state.listOfLabels = getListOfLabels(state.nodes, objOrIds);
    render();
}
window.demoGetListOfLabels = demoGetListOfLabels

function demoGetListOfKeys() {
    console.log('demoGetListOfKeys')
    state.listOfKeys = getListOfKeys(state.nodes);
    render();
}
window.demoGetListOfKeys = demoGetListOfKeys

function demoInitNode(label) {
    let newNode = initNode(state.nodes, label)
    demoSetWhichNode(newNode, 'create')
}
window.demoInitNode = demoInitNode

function demoGetNodeByKeyPair(key, value) {
    console.log('demoGetNodeByKeyPair', key, value)
    state.whichNode = demoSetWhichNode(getNodeByKeyPair(state.nodes, key, value, true)[0], 'update')
    console.log(state.whichNode)
    render();
}
window.demoGetNodeByKeyPair = demoGetNodeByKeyPair

// todo: make this extensible
// see 
function demoGetNodeByKeyPairs() {
    let keyPairList = [
        { key: 'id', value: '123' },
        { key: 'name', value: 'Node1' },
        { key: 'id', value: 'aaa' }
    ];

    state.searchResults = getNodeByKeyPairs(state.nodes, keyPairList, false)
    console.log('demoGetNodeByKeyPairs done', state.searchResults)

    return searchResults
}
window.demoGetNodeByKeyPairs = demoGetNodeByKeyPairs

function demoGetNodeById(val) {
    console.log('demoGetNodeById', val)
    state.whichNode = getNodeByKeyPair(state.nodes, 'id', val, true)[0]
    console.log(state.whichNode)
    render();
}
window.demoGetNodeById = demoGetNodeById

function demoAddNode(nodeToAdd) {
    console.log('demoAddNode', state.nodes, nodeToAdd)
    let res = addNode(state.nodes, nodeToAdd)
    if (res.msg === 'SUCCESS') {
        state.nodes = res.data;
        state.listOfLabels = getListOfLabels(state.nodes, 'id');
        state.whichNodeMode = 'update';
    }
    render();
}
window.demoAddNode = demoAddNode

function demoUpdateNode(nodeToUpdate) {
    console.log('demoUpdateNode', state.nodes, nodeToUpdate)
    let res = updateNode(state.nodes, nodeToUpdate)
    if (res.msg === 'SUCCESS') {
        state.nodes = res.data
    }
    render();
}
window.demoAddNode = demoAddNode

function demoRemoveNode(nodeToRemove) {
    console.log('demoRemoveNode', state.nodes, nodeToRemove)
    let res = removeNode(state.nodes, nodeToRemove)
    if (res.msg === 'SUCCESS') {
        state.nodes = res.data
        if (state.whichNode.id === nodeToRemove.id) {
            state.whichNode = {}
        }
    }
    console.log('res', res, state.nodes)
    render();
}
window.demoRemoveNode = demoRemoveNode

function demoSetWhichNode(nodeToSet, op) {
    state.whichNode = nodeToSet
    state.whichNodeMode = op
    render();
}
window.demoSetWhichNode = demoSetWhichNode

function renderNodesList(nodesListElement) {
    state.nodes.forEach(node => {
        const listItem = document.createElement('li');
        listItem.style.display = 'flex';
        listItem.style.justifyContent = 'space-between';
    
        // Create and append label span
        const labelSpan = document.createElement('span');
        labelSpan.textContent = node['label'];
        labelSpan.onclick = () => demoSetWhichNode(node, 'update');
        listItem.appendChild(labelSpan);
    
        // Create and append id span
        const idSpan = document.createElement('span');
        idSpan.textContent = node['id'];
        idSpan.onclick = () => demoSetWhichNode(node, 'update');
        listItem.appendChild(idSpan);
    
        // Create and append date span
        const dateSpan = document.createElement('span');
        dateSpan.textContent = node['date'];
        dateSpan.onclick = () => demoSetWhichNode(node, 'update');
        listItem.appendChild(dateSpan);
    
        // Create and append trash can icon
        const trashCan = document.createElement('span');
        trashCan.textContent = '🗑️';
        trashCan.style.cursor = 'pointer';
        trashCan.onclick = () => demoRemoveNode(node);
        listItem.appendChild(trashCan);
    
        // Append the list item to the nodes list
        nodesListElement.appendChild(listItem);
    });   
}

function renderWhichNodeProps(form, propertiesToShow) {
    propertiesToShow.forEach(key => {
        if (state.whichNode[key] !== undefined) {
            const fieldDiv = createAndAppend(form, 'div', 'node-field');
            createAndAppend(fieldDiv, 'label', 'node-label', `${key}: `, { for: `input-${key}` });
            const input = createAndAppend(fieldDiv, 'input', 'node-input', '', {
                id: `input-${key}`,
                value: state.whichNode[key],
                name: key
            });

            input.addEventListener('change', (event) => {
                state.whichNode[key] = event.target.value;
            });

            // Check if the current property is 'date' and add a divider
            if (key === 'date') {
                createAndAppend(form, 'hr', 'node-divider');
            }
        }
    });
}

function updateWhichNodeDiv(whichNodeDiv) {

    if (!whichNodeDiv) return;

    console.log('whichNodeDiv', state.whichNode);
    whichNodeDiv.innerHTML = ''; // Clear existing content

    if (state.whichNode && Object.keys(state.whichNode).length > 0) {
        createAndAppend(whichNodeDiv, 'h4', '', state.whichNode.label || 'Node');

        const form = createAndAppend(whichNodeDiv, 'form', 'node-form');
        const propertiesToShow = ['id', 'date'].concat(
            Object.keys(state.whichNode).filter(key => !['id', 'date', 'label'].includes(key))
        );

        // render all the properties
        renderWhichNodeProps(form, propertiesToShow)

        if (state.whichNodeMode) {
            const saveButton = document.createElement('button');
            saveButton.type = 'button'; // Prevent form from submitting
            saveButton.classList.add('save-button');
    
            if (state.whichNodeMode === 'update') {
                saveButton.addEventListener('click', () => demoUpdateNode(state.whichNode));
                saveButton.textContent = 'Update Node';
                } else if (state.whichNodeMode === 'create') {
                saveButton.addEventListener('click', () => demoAddNode(state.whichNode));
                saveButton.textContent = 'Create Node';
            } 
            form.appendChild(saveButton);
        } 

    } else {
        const element = document.createElement('p')
        element.textContent = 'No active node selected';
        element.classList.add('inside')
        whichNodeDiv.appendChild(element)
    }
}


// Helper function to create and append elements with attributes
function createAndAppend(parent, elementType, className, text, attributes = {}) {
    const element = document.createElement(elementType);
    if (className) element.className = className;
    if (text) element.textContent = text;

    // Set attributes if provided
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }

    parent.appendChild(element);
    return element;
}


function render() {
    const aboutGraphletJSParagraph = document.getElementById('aboutGraphletJS')
    const nodesListElement = document.getElementById('nodesList');
    const labelsListElement = document.getElementById('labelsList');
    const keysListElement = document.getElementById('keysList');
    const countParagraph = document.getElementById('nodeCount');
    const randomTokenParagraph = document.getElementById('randomToken');
    const whichNodeDiv = document.getElementById('whichNode')
    const createNodeModalDiv = document.getElementById('createNodeModal')

    // Clear existing list items
    nodesListElement.innerHTML = '';
    labelsListElement.innerHTML = '';
    keysListElement.innerHTML = '';

    // Create a new list item for each node and append it to the list
    renderNodesList(nodesListElement)
    
    // Update the count paragraph
    if (countParagraph) {
        countParagraph.textContent = `Your list has ${state.nodes.length} items`;
    }

    // Update aboutGraphletJSParagraph
    if (aboutGraphletJSParagraph) {
        aboutGraphletJSParagraph.textContent = `${state.aboutGraphletJS}`;
    }

    // Update the random token paragraph
    if (randomToken) {
        randomTokenParagraph.textContent = `${state.randomToken}`;
    }

    // Update the list of labels
    state.listOfLabels.forEach(label => {
        const listItem = document.createElement('li');
        listItem.classList.add('labelListItem');

        const textSpan = document.createElement('span');
        textSpan.textContent = label;
        listItem.appendChild(textSpan);
    
        const emojiSpan = document.createElement('span');
        emojiSpan.textContent = '➕'; 
        listItem.appendChild(emojiSpan);

        listItem.onclick = function() {
            console.log('clicked', listItem.textContent)
            demoInitNode(textSpan.textContent);
        };
    
        labelsListElement.appendChild(listItem);
    });

    // Update the list of keys
    state.listOfKeys.forEach(key => {
        const listItem = document.createElement('li');
        listItem.classList.add('keyListItem');

        const textSpan = document.createElement('span');
        textSpan.textContent = key;
        listItem.appendChild(textSpan);
    
        listItem.onclick = function() {
            console.log('clicked', listItem.textContent)
        };
    
        keysListElement.appendChild(listItem);
    });

    // Update the right-hand section based on state.whichNode
    updateWhichNodeDiv(whichNodeDiv)
}

document.addEventListener('DOMContentLoaded', render);