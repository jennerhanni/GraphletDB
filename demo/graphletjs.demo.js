const { aboutGraphlet,
        initList } = require('../src/index');

let state = {
    nodes: []
};

function demoInitList() {
    state.nodes = initList();
    console.log(state.nodes);
    render();
}
window.demoInitList = demoInitList;

function render() {
    const listElement = document.getElementById('nodesList');
    const countParagraph = document.getElementById('nodeCount');

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
}