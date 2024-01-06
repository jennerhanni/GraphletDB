const initLabelNode = {
    id: "aaa", 
    label: "Label", 
    date: "202312311822", 
    strLabel: "Label",
    strLabelDesc: "The basic building block of the database.",
    strCslType: "",
    relNodes: []
};

const validNodes = [
    {   id: "aaa", 
        label: "Label", 
        date: "202312311822", 
        strLabel: "Label",
        strLabelDesc: "The basic building block of the database.",
        strCslType: ""
    },
    {   id: "bbb", 
        label: "Label", 
        date: "202312311828", 
        strLabel: "Topic",
        strLabelDesc: "A tag, keyword, topic, subject, person, place, etc by which other nodes can be linked.",
        strCslType: "",
        strText: "" 
    },
    {   id: "ccc", 
        label: "Topic", 
        date: "202312210727", 
        strText: "History" 
    },
];
window.validNodes = validNodes;

module.exports = {
    initLabelNode,
    validNodes,
};