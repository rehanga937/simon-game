const colors = ["red", "blue", "green", "yellow"];
const colorsLength = colors.length;

var systemPattern: string[] = []; // fow now start with green
var userEnteredPattern: string[] = [];


function animateColorButton(colorButton: Element) {
    colorButton.classList.add("pressed");
    setTimeout(function () {
        colorButton.classList.remove("pressed")
    }, 100)
}


function increaseSystemPattern() {
    const randomNumber = Math.floor(Math.random() * colorsLength);
    const randomColor = colors[randomNumber];
    systemPattern.push(randomColor);
}

function showSystemPatternLatestButton() {
    const latestColor = systemPattern[systemPattern.length - 1];
    const button = $(`#${latestColor}`);
    button.fadeOut(200).fadeIn(200);
}

function nextRound() {
    userEnteredPattern = [];
    increaseSystemPattern();
    showSystemPatternLatestButton();
}

function initializeGame() {
    systemPattern = [];
    userEnteredPattern = [];
}

function doesMatchLength(array1: any[], array2: any[]): boolean {
    if (array1.length != array2.length) {
        return false;
    } else {
        return true;
    }
}

function patternSoFarCorrect(): boolean {

    const userPatternLength = userEnteredPattern.length;

    for (let i = 0; i < userPatternLength; i++) {
        const userPress = userEnteredPattern[i];
        const systemPress = systemPattern[i];
        if (userPress != systemPress) {
            return false;
        }
    }

    return true;
}


function onUserTap(event: JQuery.ClickEvent) {
    const colorButton = $(event.target);
    const color = colorButton.attr("id");

    userEnteredPattern.push(color);

    console.log(`current system pattern ${systemPattern}`);
    console.log(`user tapped ${color}`);
    console.log(`user total pattern ${userEnteredPattern}`);

    animateColorButton(colorButton[0]);

    if (patternSoFarCorrect()) {
        const sound = new Audio(`sounds/${color}.mp3`);
        sound.play();
        if (doesMatchLength(userEnteredPattern, systemPattern)) {
            nextRound();
        }
    } else {
        const sound = new Audio("sounds/wrong.mp3");
        sound.play();
        initializeGame();
        nextRound(); // round 1
    }

    console.log(`new system pattern ${systemPattern}`);
    console.log(' ');
}


initializeGame();
nextRound(); // round 1
$(".btn").on("click", onUserTap);