const initLabelNode = {
    id: 'aaa', 
    label: 'Label', 
    date: '202312311822', 
    strLabel: 'Label',
    strLabelDescription: 'The basic building block of the database.' 
};

const validNodes = [
    {   id: 'aaa', 
        label: 'Label', 
        date: '202312311822', 
        strLabel: 'Label',
        strLabelDescription: 'The basic building block of the database.' },
    {   id: 'bbb', 
        label: 'Label', 
        date: '202312311828', 
        strLabel: 'Topic',
        strLabelDescription: 'A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.',
        strText: '' },
    {   id: 'ccc', 
        label: 'Topic', 
        date: '202312210727', 
        strText: 'History' 
    },
];
window.validNodes = validNodes;

module.exports = {
    initLabelNode,
    validNodes,
}