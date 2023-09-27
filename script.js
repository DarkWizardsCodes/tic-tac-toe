const SelectBox = document.querySelector(".select-box"),
SelectXbtn = SelectBox.querySelector(".playerX"),
SelectObtn = SelectBox.querySelector(".playerO"),
Playboard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
Players = document.querySelector(".players"),
ResultBox = document.querySelector(".result-box"),
Wontext = document.querySelector(".won-text"),
ReplayBtn = document.querySelector(".btn button");
let runBot = true;

window.onload = () =>{

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick", "clickedBox(this)");    
    }

    SelectXbtn.onclick = ()=>{
        SelectBox.classList.add("hide");
        Playboard.classList.add("show");
    }
    SelectObtn.onclick = ()=>{
        SelectBox.classList.add("hide");
        Playboard.classList.add("show");
        Players.setAttribute("class", "players active player")
    }
}

let PlayerXicon = "fas fa-times",
PlayerOicon = "far fa-circle";
let PlayerSign = "X";

// User Click Function
function clickedBox(element) {
    if(Players.classList.contains("player")){
        element.innerHTML = `<i class="${PlayerOicon}"></i>`;
        Players.classList.add("active");
        PlayerSign = "O";
        element.setAttribute("id", `${PlayerSign}`)
    }else{
        element.innerHTML = `<i class="${PlayerXicon}"></i>`;     
        Players.classList.add("active");
        PlayerSign = "X";
        element.setAttribute("id", `${PlayerSign}`);
    }
    SelectChampion() ; //Calling Select Champion Function

    element.style.pointerEvents = "none"; //once user select any box then that box can'be clicked again
    Playboard.style.pointerEvents = "none"; //add pointerEvents none to playboard so user can't immediately click on any other box until bot select

    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();

    setTimeout(() => {
        bot(runBot);
    }, randomTimeDelay); //Passing Bot in time out to delay
}

// Bot Click Function

function bot() {
    if(runBot){ //If RunBot is True Run Bot
        PlayerSign = "O";
    let array = []; // 0,1,2,3,4,5,6,7,8
    for (let i = 0; i < allBox.length; i++) { 
        if(allBox[i].childElementCount == 0){
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length > 0){
        if(Players.classList.contains("player")){
            allBox[randomBox].innerHTML = `<i class="${PlayerXicon}"></i>`;
            Players.classList.remove("active");
            // If User Id value is O Change It to X 
            PlayerSign = "X";
            allBox[randomBox].setAttribute("id", `${PlayerSign}`);
        }else{
            allBox[randomBox].innerHTML = `<i class="${PlayerOicon}"></i>`;     
            Players.classList.remove("active");
            // If User Id value is X Change It to O 
            allBox[randomBox].setAttribute("id", `${PlayerSign}`);
        }
        
        allBox[randomBox].style.pointerEvents = "none"; //once bot select any box then user can't click on that box
        Playboard.style.pointerEvents = "auto"; //add pointerEvents auto in playboard so user can again click on box
        PlayerSign = "X"; //if player has chosen X then bot will be O right then we change the playerSign again to X so user will X because above we have changed the playerSign to O for bot
        }
    }
}

// Working on the select winner
function getClass(idname) {
    return document.querySelector(".box" + idname).id;
}
function checkClass(v1,v2,v3,sign) {
    if(getClass(v1) == sign && getClass(v2) == sign && getClass(v3) == sign){
        return true;
    }
}
function SelectChampion() { // if one combination of they is matched then select the winner
    if(checkClass(1,2,3,PlayerSign) || checkClass(4,5,6,PlayerSign) || checkClass(7,8,9,PlayerSign) || checkClass(1,4,7,PlayerSign) || checkClass(2,5,8,PlayerSign) || checkClass(3,6,9,PlayerSign) || checkClass(1,5,9,PlayerSign) || checkClass(3,5,7,PlayerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            Playboard.classList.remove("show");
            ResultBox.classList.add("show");
        },700)

        Wontext.innerHTML = `Player <p>${PlayerSign}</p> won the game`;
    }else{
        // if match has drawn
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                Playboard.classList.remove("show");
                ResultBox.classList.add("show");
            },700)
            Wontext.innerHTML = `Match has drawn`;
        }
    }
    
}
ReplayBtn.onclick = ()=>{
    window.location.reload();
}