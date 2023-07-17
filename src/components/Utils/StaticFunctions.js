export function getAllStorage(data){
    let storedData = JSON.parse(localStorage.getItem(data)) || {};
    let storedDataAsList = []

    for (let i in storedData){
        storedData[i].id = i;
        storedDataAsList.push(storedData[i]);
    }

    return storedDataAsList;
}

export function setItem(type, id, property, value){
    let storedEmployees = JSON.parse(localStorage.getItem("employees")) || {};

    storedEmployees[id][property] = value;

    localStorage.setItem("employees", JSON.stringify(storedEmployees));
    window.dispatchEvent(new Event('storage'));
}

export function getEmployee(id){
    return (JSON.parse(localStorage.getItem("employees")))[id] || {};
}

export function removeEmployee(id){
    let storedEmployees = JSON.parse(localStorage.getItem("employees")) || {};

    delete storedEmployees[id];

    localStorage.setItem("employees", JSON.stringify(storedEmployees));
    window.dispatchEvent(new Event('storage'));
}