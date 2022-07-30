//document.location.reload(true); // debug refresh
//javascript:window.close('','_parent',''); //debug closer
//.style.backgroundColor = "#000000";  //debug colorer
const body = document.querySelector("body");
const nameInput = document.querySelector(".nameInput");
const tierInput = document.querySelector(".tierInput")
const enterPlayerButton = document.querySelector(".enterPlayerButton");
const menuButton = document.querySelector(".menuButton");
const mainMenuBody = document.querySelector(".mainMenuBody");
const searchIcon = document.querySelector(".searchIcon");
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
saveScreenBody.style.display = "none";
mainMenuBody.style.display = "none";

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

menuButton.onclick = toggleMenu;
menuSave.onclick = toggleSave;
saveCloseButton.onclick = toggleSave;
