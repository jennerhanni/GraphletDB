const { aboutGraphletJS,
        initList,
        getRandomToken,
        getListOfLabels,
        getNodeByKeypair,
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

function demoGetNodeByKeypair(key, value) {
    console.log('demoGetNodeByKeypair', key, value)
    state.which_node = demoGetNodeByKeypair(state.nodes, key, value, true)
    console.log(state.which_node)
    render();
}
window.demoGetNodeByKeypair = demoGetNodeByKeypair

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
    

    // Helper function to create and append elements
function createAndAppend(parent, elementType, className, text) {
    const element = document.createElement(elementType);
    if (className) element.className = className;
    if (text) element.textContent = text;
    parent.appendChild(element);
    return element;
}

// Update the right-hand section based on state.whichNode
if (whichNodeDiv) {
    console.log('whichNodeDiv', state.whichNode);
    whichNodeDiv.innerHTML = ''; // Clear existing content

    if (state.whichNode && Object.keys(state.whichNode).length > 0) {
        createAndAppend(whichNodeDiv, 'h4', '', state.whichNode.label || 'Node');

        const propertiesToShow = ['id', 'date'].concat(
            Object.keys(state.whichNode).filter(key => !['id', 'date', 'label'].includes(key))
        );

        propertiesToShow.forEach(key => {
            if (state.whichNode[key] !== undefined) {
                const fieldDiv = createAndAppend(whichNodeDiv, 'div', 'node-field');
                createAndAppend(fieldDiv, 'span', 'node-label', `${key} `);
                createAndAppend(fieldDiv, 'span', 'node-value', state.whichNode[key]);

                // Check if the current property is 'date' and add a divider
                if (key === 'date') {
                    createAndAppend(whichNodeDiv, 'hr', 'node-divider');
                }
            }
        });
    } else {
        whichNodeDiv.textContent = 'No active node selected';
        whichNodeDiv.classList.add('inside')
    }
}



}