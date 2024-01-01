const { aboutGraphletJS,
        initList,
        getRandomToken,
        getListOfLabels,
        getNodeByKeyPair,
        initNode } = require('../src/index');

let state = {
    nodes: [],
    randomToken: '',
    listOfLabels: [],
    aboutGraphletJS: '',
    whichNode: {}
};

function demoClearAll() {
    console.log('demoClearAll')
    state.nodes = []
    state.randomToken = '';
    state.listOfLabels = [];
    state.aboutGraphletJS = '';
    state.whichNode = {};
    render();
}
window.demoClearAll = demoClearAll

function demoAboutGraphletJS() {
    console.log('demoAboutGraphletJs')
    state.aboutGraphletJS = aboutGraphletJS()
    render();
}
window.demoAboutGraphletJS = demoAboutGraphletJS;

function demoGetRandomToken(len) {
    state.randomToken = getRandomToken(state.nodes, len);
    console.log(state.randomToken)
    render();
}
window.demoGetRandomToken = demoGetRandomToken;

function demoInitList() {
    state.nodes = initList();
    console.log('demoInitList', state.nodes);
    state.listOfLabels = getListOfLabels(state.nodes, 'id');
    render();
}
window.demoInitList = demoInitList;

function demoGetListOfLabels(objOrIds) {
    console.log('demoGetListOfLabels', objOrIds)
    state.listOfLabels = getListOfLabels(state.nodes, objOrIds);
    render();
}
window.demoGetListOfLabels = demoGetListOfLabels

function demoInitNode(label) {
    console.log('demoInitNode', label)
    let newNode = initNode(state.nodes, label)
    console.log('demoInitNode', label, newNode)
    state.whichNode = newNode
    render();
}
window.demoInitNode = demoInitNode

function demoGetNodeByKeyPair(key, value) {
    console.log('demoGetNodeByKeyPair', key, value)
    state.whichNode = getNodeByKeyPair(state.nodes, key, value, true)
    console.log(state.whichNode)
    render();
}
window.demoGetNodeByKeyPair = demoGetNodeByKeyPair

function demoGetNodeById(val) {
    console.log('demoGetNodeById', val)
    state.whichNode = getNodeByKeyPair(state.nodes, 'id', val, true)[0]
    console.log(state.whichNode)
    render();
}
window.demoGetNodeById = demoGetNodeById

function demoAddNode(node) {
    console.log('demoAddNode', node, state.nodes)
    console.log(state.whichNode, state.nodes, state.whichNode === state.nodes[0], state.whichNode == state.nodes[0])
}
window.demoAddNode = demoAddNode

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

        const saveButton = document.createElement('button');
        saveButton.type = 'button'; // Prevent form from submitting
        saveButton.textContent = 'Add node to list';
        saveButton.classList.add('save-button');
        saveButton.addEventListener('click', () => demoAddNode(state.whichNode));
        form.appendChild(saveButton);

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
    const countParagraph = document.getElementById('nodeCount');
    const randomTokenParagraph = document.getElementById('randomToken');
    const whichNodeDiv = document.getElementById('whichNode')

    // Clear existing list items
    nodesListElement.innerHTML = '';
    labelsListElement.innerHTML = '';

    // Create a new list item for each node and append it to the list
    state.nodes.forEach(node => {
        const listItem = document.createElement('li');
        listItem.textContent = node['id'];
        nodesListElement.appendChild(listItem);
    });

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
    

    // Update the right-hand section based on state.whichNode
    updateWhichNodeDiv(whichNodeDiv)
}

document.addEventListener('DOMContentLoaded', render);