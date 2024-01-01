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
    const countParagraph = document.getElementById('nodeCount');
    if (countParagraph) {
        countParagraph.textContent = `Your list has ${state.nodes.length} items`;
    }
}
