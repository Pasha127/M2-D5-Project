//declaration of DOM object variables

const body = document.querySelector("body");
const nameInput = document.querySelector(".nameInput");
const tierInput = document.querySelector(".tierInput")
const enterPlayerButton = document.querySelector(".enterPlayerButton");
const resetPlayerButton = document.querySelector(".resetPlayerButton");
const menuButton = document.querySelector(".menuButton");
const mainMenuBody = document.querySelector(".mainMenuBody");
const searchIcon = document.querySelector(".searchIcon");
const participantZone = document.querySelector(".participantZone");
const poolParticipantContainer = document.querySelector(".poolParticipantContainer");
let poolParticipants = document.querySelectorAll(".poolParticipant");
let poolAddToTeamButtons = document.querySelectorAll(".poolAddToTeamButton");
let poolDeleteButtons = document.querySelectorAll(".poolDeleteButton");
const seeFullPoolButton = document.querySelector(".seeFullPoolButton");
const buildTeamsButton = document.querySelector(".buildTeamsButton");
const lockTeamsButton = document.querySelector(".lockTeamsButton");
const unlockTeamsButton = document.querySelector(".unlockTeamsButton");
const resetTeamsButton = document.querySelector(".resetTeamsButton");
let teamCards = document.querySelectorAll(".teamCard");
let lockIcons = document.querySelectorAll(".lockIcon");
let teamNameInputs = document.querySelectorAll(".teamNameInput");
let cardTeamSizes = document.querySelectorAll(".cardTeamSize");
let cardParticipants = document.querySelectorAll(".cardParticipant");
let arrowIcons = document.querySelectorAll(".arrowIcon");
let xIcons = document.querySelectorAll(".xIcon");
let editTeamButtons = document.querySelectorAll(".editTeamButton");
const teamInspectionContainer = document.querySelector(".teamInspectionContainer");
const teamInspectionTeamNumber = document.querySelector(".teamInspectionTeamNumber");
const inspectionTeamNameInput = document.querySelector("#inspectionTeamNameInput");
let teamInspectionItems = document.querySelectorAll(".teamInspectionItem");
let inspectionParticipants = document.querySelectorAll(".inspectionParticipant");
const saveScreenBody = document.querySelector(".saveScreenBody");
const saveNameInput = document.querySelector(".saveNameInput");
const saveButton = document.querySelector(".saveButton");
const menuSave = document.querySelector(".menuSave")
const menuLoad = document.querySelector(".menuLoad")
const menuPrint = document.querySelector(".menuPrint")
const menuDark = document.querySelector(".menuDark")
const saveCloseButton = document.querySelector(".saveCloseButton");
const loadScreenBody = document.querySelector(".loadScreenBody");
const loadScreenContainer = document.querySelector(".loadScreenContainer");
const loadCloseButton = document.querySelector(".loadCloseButton");
const clearMemButton = document.querySelector(".clearMemButton");
saveScreenBody.style.display = "none";
mainMenuBody.style.display = "none";
loadScreenBody.style.display = "none";

//general functions
const closeWindow = function(){
    javascript:window.close('','_parent','');
}
const refreshWindow = function(){
    document.location.reload(true);
}

//initializing object to hold event data

let currentEvent =  {
    eventName: "event01",
    unsortedParticipants: [],
    teams:{
        //team0000:[]
    }
};

//initial list logic

const newPoolParticipant = function (n) {
    const newCont = document.createElement("div");
    newCont.setAttribute("class","poolParticipantContainer");
    const newName = document.createElement("div");
    newCont.setAttribute("class","poolParticipant");
    newName.innerText= n;
    const newButton1 = document.createElement("button");
    const newButton2 = document.createElement("button");
    newButton1.setAttribute("class", "poolAddToTeamButton");    
    newButton2.setAttribute("class", "poolDeleteButton"); 
    newButton1.innerText = "+ Manual Add";
    newButton2.innerText = "Delete";   
    participantZone.append(newCont);
    newCont.append(newName);
    newCont.append(newButton1);
    newCont.append(newButton2);
}
const addParticipant = function () {
    currentEvent.unsortedParticipants.push({name: nameInput.value, tier: tierInput.value.toString().toUpperCase()})
    newPoolParticipant(nameInput.value);
    nameInput.value="";
    tierInput.value="";
}
const resetParticipants = function (){
    const listOfParticipants = document.querySelectorAll(".participantZone > div");
    //console.log(listOfParticipants);
    for(i=0;i<listOfParticipants.length;i++){
        listOfParticipants[i].style.display="none";
    }
    currentEvent.unsortedParticipants = [];
    currentEvent.teams = {};
}


//opening and closing windows
const toggleMenu = function (){
    if(mainMenuBody.style.display === "none"){
        mainMenuBody.style.display = "flex";
    }else{
        mainMenuBody.style.display = "none";
    }
    
}
const toggleSave = function () {
    if(saveScreenBody.style.display === "none"){
        saveScreenBody.style.display = "flex";
        mainMenuBody.style.display = "none";
    }else{
        saveScreenBody.style.display = "none";
    }
}
const toggleLoad = function () {
    if(loadScreenBody.style.display === "none"){
        loadScreenBody.style.display = "flex";
        mainMenuBody.style.display = "none";
    }else{
        loadScreenBody.style.display = "none";
    }
}
const clearLoadList = function (){
    const listOfLoads = document.querySelectorAll(".loadItem");
    for(i=0;i<listOfLoads.length;i++){
        listOfLoads[i].style.display="none";
    }
}
const menuOff = function (){
    mainMenuBody.style.display = "none";
}
const loadOff = function (){
    loadScreenBody.style.display = "none";
}
const saveOff = function (){
    saveScreenBody.style.display = "none";
}

//saving logic

const saveData = function (){
    
    //take all data and put it into object
    currentEvent.eventName = saveNameInput.value;
    const savedData = Object.assign({},currentEvent)
    //console.log(currentEvent.eventName);
    localStorage.setItem(currentEvent.eventName, JSON.stringify(savedData));
    //console.log(JSON.parse(localStorage.getItem(currentEvent.eventName)));
    clearLoadList();
    populateLoad();
    saveOff();
}
const loadData = function (){
    console.log(localStorage.getItem(e.target.innertext));
    
}
const clearMemory = function (){
    clearLoadList();
    localStorage.clear()
}
const loadEvent = function(e){
    const newObj = JSON.parse(localStorage.getItem(e.target.innerText))
    console.log(newObj);
    console.log("loaded");
    resetParticipants();

    loadOff();
}

const populateLoad = function () {
    
    for(let i=0; i<localStorage.length;i++){
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class","loadItem");
        newDiv.innerText = Object.keys(localStorage)[i];
        newDiv.addEventListener("click", loadEvent);
        loadList.append(newDiv);
    }     
}
populateLoad();
clearMemButton.onclick = clearMemory;

//on click events

menuButton.onclick = function (){
    toggleMenu();
    saveOff();
    loadOff();
}
menuSave.onclick = function(){
    toggleSave();
    loadOff();
}
menuLoad.onclick = function (){
    menuOff();
    saveOff();
    toggleLoad();
}
saveCloseButton.onclick = saveOff;
loadCloseButton.onclick = loadOff;
saveButton.onclick = function () {
    saveData();
    saveOff();
}
enterPlayerButton.onclick = function (){
    addParticipant();
}
resetPlayerButton.onclick = function(){resetParticipants()};