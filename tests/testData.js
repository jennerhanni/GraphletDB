const initLabelNode = [
    {   id: 1, 
        label: 'Label', 
        date: '202312311822', 
        strLabel: 'Label',
        strLabelDesc: 'The basic building block of the database.' },
];

const validNodes = [
    {   id: 1, 
        label: 'Label', 
        date: '202312311822', 
        strLabel: 'Label',
        strLabelDesc: 'The basic building block of the database.' },
    {   id: 1, 
        label: 'Label', 
        date: '202312311828', 
        strLabel: 'Topic',
        strLabelDesc: 'A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.',
        strText: '' },
    {   id: 1, 
        label: 'Topic', 
        date: '202312210727', 
        strText: 'History' 
    },
];

module.exports = {
    initLabelNode,
    validNodes,
}