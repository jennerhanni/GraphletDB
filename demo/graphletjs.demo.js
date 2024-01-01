const { aboutGraphlet,
        initList,
        getRandomToken } = require('../src/index');

let state = {
    nodes: [],
    randomToken: ''
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

function render() {
    const listElement = document.getElementById('nodesList');
    const countParagraph = document.getElementById('nodeCount');
    const randomTokenParagraph = document.getElementById('randomToken');

    // Clear existing list items
    listElement.innerHTML = '';

    // Create a new list item for each node and append it to the list
    state.nodes.forEach(node => {
        const listItem = document.createElement('li');
        listItem.textContent = node['id'];
        listElement.appendChild(listItem);
    });

    // Update the count paragraph
    if (countParagraph) {
        countParagraph.textContent = `Your list has ${state.nodes.length} items`;
    }

    // Update the random token paragraph
    if (randomToken) {
        randomTokenParagraph.textContent = `Random token: ${state.randomToken}`;
    }
}