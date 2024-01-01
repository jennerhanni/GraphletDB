const { aboutGraphlet,
        initList,
        getRandomToken,
        getListOfLabels } = require('../src/index');

let state = {
    nodes: [],
    randomToken: '',
    listOfLabels: [],
};

function demoInitList() {
    state.nodes = initList();
    console.log(state.nodes);
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

function render() {
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

    // Update the random token paragraph
    if (randomToken) {
        randomTokenParagraph.textContent = `Random token: ${state.randomToken}`;
    }

    // Update the list of labels
    state.listOfLabels.forEach(label => {
        const listItem = document.createElement('li');
        listItem.textContent = label;
        labelsListElement.appendChild(listItem);
    });
}