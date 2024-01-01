const { aboutGraphletJS,
        initList,
        getRandomToken,
        getListOfLabels,
        getNodeByKeypair } = require('../src/index');

let state = {
    nodes: [],
    randomToken: '',
    listOfLabels: [],
    aboutGraphletJS: ''
};

function demoAboutGraphletJS() {
    console.log('demoAboutGraphletJs')
    state.aboutGraphletJS = aboutGraphletJS()
    render();
}
window.demoAboutGraphletJS = demoAboutGraphletJS;

function demoInitList() {
    state.nodes = initList();
    console.log('demoInitList', state.nodes);
    state.listOfLabels = getListOfLabels(state.nodes, 'id');
    render();
}
window.demoInitList = demoInitList;

function demoGetRandomToken(len) {
    state.randomToken = getRandomToken(state.nodes, len);
    console.log(state.randomToken)
    render();
}
window.demoGetRandomToken = demoGetRandomToken;

function demoGetListOfLabels(objOrIds) {
    console.log('demoGetListOfLabels', objOrIds)
    state.listOfLabels = getListOfLabels(state.nodes, objOrIds);
    render();
}
window.demoGetListOfLabels = demoGetListOfLabels

function demoGetNodeByKeypair(key, value) {
    console.log('demoGetNodeByKeypair', key, value)
    state.which_node = demoGetNodeByKeypair(state.nodes, key, value, true)
    console.log(state.which_node)
    render();
}

function render() {
    const aboutGraphletJSParagraph = document.getElementById('aboutGraphletJS')
    const nodesListElement = document.getElementById('nodesList');
    const labelsListElement = document.getElementById('labelsList');
    const countParagraph = document.getElementById('nodeCount');
    const randomTokenParagraph = document.getElementById('randomToken');

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
        listItem.textContent = label;
        labelsListElement.appendChild(listItem);
    });
}