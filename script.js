//declaration of DOM object variables
const validLetters =  /^[a-zA-Z]+$/;
const validNumbers =  /^[0-9]+$/;

const body = document.querySelector("body");
const nameInput = document.querySelector(".nameInput");
const tierInput = document.querySelector(".tierInput")
const teamNumberInput = document.querySelector(".teamNumberInput")
const enterPlayerButton = document.querySelector(".enterPlayerButton");
const resetPlayerButton = document.querySelector(".resetPlayerButton");
const menuButton = document.querySelector(".menuButton");
const mainMenuBody = document.querySelector(".mainMenuBody");
const searchContainer = document.querySelector(".searchContainer");
const searchInputUP = document.querySelector(".searchBarUP");
const searchIconBox = document.querySelector(".searchIconBox");
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
const teamsContainer = document.querySelector(".teamsContainer");
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

const newPoolParticipant = function (n,t) {    
    const newCont = document.createElement("div");
    newCont.setAttribute("class","poolParticipantContainer");
    newCont.dataset.name = n;
    newCont.dataset.tier = t;
    const newName = document.createElement("div");
    newCont.setAttribute("class","poolParticipant");
    newName.innerText= n;
    const newNameTier = document.createElement("div");
    if(t !== ""){
        newCont.setAttribute("class","poolParticipantTier");
        newNameTier.innerText= t;
    }
    const newButton1 = document.createElement("button");
    const newButton2 = document.createElement("button");
    newButton1.setAttribute("class", "poolAddToTeamButton");    
    newButton2.setAttribute("class", "poolDeleteButton"); 
    newButton2.addEventListener("click", function (e){
        const target = e.target.parentNode;
        deletePFromUnSortList(target)
    } );
    newButton1.innerText = "+ Manual Add";
    newButton2.innerText = "Delete";   
    participantZone.append(newCont);
    newCont.append(newName);
    if(t !== ""){newCont.append(newNameTier);}
    newCont.append(newButton1);
    newCont.append(newButton2);
}
const addParticipant = function () {
    const listOfParticipants = getUnsortedParticipants();
    let isEntered = false;
    for(participant of listOfParticipants){        
        if(nameInput.value.toLowerCase() === participant.name.toLowerCase()){
            isEntered = true;
            break;
        }
    }
    if(nameInput.value !== "" && !isEntered && (tierInput.value.match(validNumbers) || tierInput.value === "" )){
        currentEvent.unsortedParticipants.push({name: nameInput.value, tier: tierInput.value.toString().toUpperCase()})
        newPoolParticipant(nameInput.value,tierInput.value);
        nameInput.value="";
        tierInput.value="";
        nameInput.style.backgroundColor = "#ffffff";
        tierInput.style.backgroundColor = "#ffffff";
    }else{
        if(nameInput.value === "" || isEntered){nameInput.style.backgroundColor = "#ffaaaa";};
        if(!tierInput.value.match(validNumbers)){tierInput.style.backgroundColor = "#ffaaaa";};
        
        
    }
    
}
const resetParticipants = function (){
    const listOfParticipants = document.querySelectorAll(".participantZone > div");
     //console.log(listOfParticipants);
    for(i=0;i<listOfParticipants.length;i++){
        listOfParticipants[i].style.display="none";
        participantZone.removeChild(listOfParticipants[i]);
    }
    currentEvent.unsortedParticipants = [];
    currentEvent.teams = {};
    nameInput.style.backgroundColor = "#ffffff";
}
const deletePFromUnSortList = function (target){
    const participant = target;
    const pName = participant.dataset.name;
    //console.log(pName);
    for(i=0;i<currentEvent.unsortedParticipants.length;i++){
        if(currentEvent.unsortedParticipants[i].name === pName){currentEvent.unsortedParticipants.splice(i,1)}
    }
    participantZone.removeChild(participant);    
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
    //console.log(newObj);
    //console.log("loaded");
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

//team building

const getUnsortedParticipants = function (){
    const listOfParticipants = document.querySelectorAll(".participantZone > div");
    //console.log(listOfParticipants);
    let outputList = []
    for(participant of listOfParticipants){        
       // console.log(participant.dataset.name);
        outputList.push({name: participant.dataset.name, tier: participant.dataset.tier});
    }    
    return outputList;
}

const buildTeams = function (){
    eraseTeams();
    const nOfTeams = teamNumberInput.value;
    if(teamNumberInput.value !== "" && teamNumberInput.value.match(validNumbers)){
        const listOfParticipants = getUnsortedParticipants();
        newTeams(nOfTeams, listOfParticipants);
        //console.log("teamSize:",nOfTeams);
        teamNumberInput.style.backgroundColor = "#ffffff";
    }else{
        teamNumberInput.style.backgroundColor = "#ffaaaa";
    }
}
const eraseTeams = function (){
    let teamCards = document.querySelectorAll(".teamCard");
    for(i=0;i<teamCards.length;i++){
        if(teamCards[i].dataset.locked !== "true"){
            teamsContainer.removeChild(teamCards[i]);
            
        }else{            
            for(names of teamCards){
                if(names.querySelector(".cardTitle").innerText === teamCards[i].querySelector(".cardTitle").innerText){
                    teamCards[i].querySelector(".cardTitle").innerText = `Saved Team ${i+1}`;
                };
            }
        }
    }
};
const newTeams = function (nOfTeams,listOfParticipants){    
    for(i=0;i<nOfTeams;i++){
        const newCont = document.createElement("div");
        newCont.classList.add("teamCard")
        teamsContainer.insertAdjacentHTML("beforeend",`<div class="teamCard" id="teamCardExample">
        <div class="cardHeader" id="cardExampleHeader">
            <div class="cardHeaderLine1" id="cardExampleHeaderLine1">
                <div class="cardTitle" id="exampleCardTitle">Team ${i+1}</div>
                <div class="lockIcon" id="exampleCardLock">
                    <i class="fa-solid fa-lock invisible"></i>
                    <i class="fa-solid fa-unlock"></i>
                </div>                
            </div>
            <div class="cardHeaderLine2" id="cardExampleHeaderLine2">
                <input class="teamNameInput" id="exampleCardTeamNameInput" placeholder="Team name">
                <div class="cardTeamSize" id="exampleCardTeamSize">Team Size: <span></span></div>
            </div>
        </div>
        <div class="cardTeamList" id="exampleCardTeamList">            
        </div>`)
        

    }
    
    const cardList = teamsContainer.querySelectorAll(".cardTeamList");
    for(i=0;i<listOfParticipants.length;i++){
        const newEntry = document.createElement("div");
        newEntry.classList.add("cardParticipant")
        //console.log(cardList[i]);
        cardList[Math.floor(Math.random() * nOfTeams)].append(newEntry);
        const newPName = document.createElement("div");
        //console.log(listOfParticipants[i]);
        newPName.innerText=listOfParticipants[i].name;
        newEntry.append(newPName);
        newEntry.insertAdjacentHTML("beforeend",
        `<div class="switchTeamButton" id="exampleCardSwitchTeamButton">
        <div class="arrowIcon">=></div>
        </div>
        <div class="removeFromTeamButton" id="exampleCardRemoveFromTeamButton">
            <div class="xIcon">X</div>
        </div>`)

    }
    let newCards = teamsContainer.querySelectorAll(".teamCard")
    for(i=0;i<newCards.length;i++){
        newCards[i].querySelector(".cardTeamSize span").innerText = newCards[i].querySelectorAll(".cardParticipant").length;
    }
    let arrowIcons = document.querySelectorAll(".arrowIcon");
    let xIcons = document.querySelectorAll(".xIcon");
    let lockIcons = document.querySelectorAll(".lockIcon");
    for(locks of lockIcons){locks.addEventListener("click",toggleLock)};
    resetParticipants();
    for(arrows of arrowIcons){arrows.addEventListener("click",switchTeams)};
    resetParticipants();
    for(xs of xIcons){xs.addEventListener("click", deleteFromTeam)};
    resetParticipants();
}
const deleteFromTeam = function(){
    console.log("send back to unordered list");
}
const switchTeams = function(){
    console.log("switchTeams");
}
const clearSearchResult = function () {
    const listOfParticipants = document.querySelectorAll(".poolParticipant")
    //console.log(listOfParticipants);
    for(participant of listOfParticipants){
        //console.log(participant);
        participant.style.border = "1px solid #000000";
    }
}
const searchForUP = function(){
    let noMatch = true;
    if(searchInputUP.value !== ""){    
        const listOfParticipants = getUnsortedParticipants();
        for(participant of listOfParticipants){
            //console.log(participant);
            if(participant.name.toLowerCase() === searchInputUP.value.toLowerCase()){                
                
                const target = document.querySelector(`[data-name="${participant.name}"]`)
                target.style.border = "6px solid #ffaaaa"
                noMatch = false;
                searchInputUP.value = "";
                
            }
        }        
    }
    if(!noMatch) {searchInputUP.style.backgroundColor = "#ffffff";}else{searchInputUP.style.backgroundColor = "#ffaaaa";};
    searchInputUP.value = "";    
}
const lock = function (target){    
    target.parentNode.querySelector(".fa-lock").classList.remove("invisible");
    target.classList.add("invisible");
    target.parentNode.parentNode.parentNode.parentNode.style.border = "2px solid #ffaaaa";
    target.parentNode.parentNode.parentNode.parentNode.dataset.locked = "true";
}
const lockAll = function (){ 
    let lockIcons = document.querySelectorAll(".lockIcon");   
    for(locks of lockIcons){
        locks.parentNode.querySelector(".fa-lock").classList.remove("invisible");        
        locks.parentNode.parentNode.parentNode.style.border = "2px solid #ffaaaa";
        locks.parentNode.querySelector(".fa-unlock").classList.add("invisible");
        locks.parentNode.parentNode.parentNode.dataset.locked = "true";   
    }
}
const unLockAll = function (){
    let lockIcons = document.querySelectorAll(".lockIcon");    
    for(locks of lockIcons){
        locks.parentNode.querySelector(".fa-unlock").classList.remove("invisible");        
        locks.parentNode.parentNode.parentNode.style.border = "1px solid #000000";
        locks.parentNode.querySelector(".fa-lock").classList.add("invisible");   
        locks.parentNode.parentNode.parentNode.dataset.locked = "false";   
    }
}
const unlock = function (target){   
    target.parentNode.parentNode.parentNode.parentNode.style.border = "1px solid #000000";
    target.parentNode.querySelector(".fa-unlock").classList.remove("invisible");   
    target.classList.add("invisible");
    target.parentNode.parentNode.parentNode.parentNode.dataset.locked = "false";
}
const toggleLock = function (e){
    const target = e.target;
    if(target.classList.contains("fa-unlock"))
    {lock(target);
        //console.log("lock");
    }else if(target.classList.contains("fa-lock")){ 
        unlock(target)
        //console.log("unlock");
    };
}


//on click events

menuButton.onclick = function (){
    toggleMenu();
    saveOff();
    loadOff();
    clearSearchResult();
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
saveNameInput.addEventListener("keypress", function(e){
    if (e.key === "Enter") {
        saveData();
        saveOff();
    }
});
enterPlayerButton.onclick = function (){
    addParticipant();
    clearSearchResult();
}
nameInput.addEventListener("keypress", function(e){
        if (e.key === "Enter") {
            addParticipant();
            clearSearchResult();
        }
    });
tierInput.addEventListener("keypress", function(e){
        if (e.key === "Enter") {
            addParticipant();
            clearSearchResult();
        }
    });
resetPlayerButton.onclick = function(){resetParticipants()};
buildTeamsButton.onclick = function (){
    buildTeams();
    clearSearchResult();
}
teamNumberInput.addEventListener("keypress", function(e){
    if (e.key === "Enter") {
        buildTeams();
        clearSearchResult();
    }
});
searchIconBox.onclick = function () {
    clearSearchResult();
    searchForUP();
}
searchInputUP.addEventListener("keypress", function(e){
    if (e.key === "Enter") {
        clearSearchResult();
        searchForUP();
    }
});
lockTeamsButton.onclick = function (){
    lockAll();
}
unlockTeamsButton.onclick = function (){
    unLockAll();
}
resetTeamsButton.onclick = function (){
    eraseTeams();
}




// reference:

//removing key by value from local storage
//Object.keys(localStorage).forEach((key) => {
    //    if (localStorage.getItem(key) === pName){ localStorage.removeItem(key);}})


       