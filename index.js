const colors = ["red", "blue", "green", "yellow"];
const colorsLength = colors.length;
var systemPattern = []; // fow now start with green
var userEnteredPattern = [];
var level = 0;
function animateColorButton(colorButton) {
    colorButton.classList.add("pressed");
    setTimeout(function () {
        colorButton.classList.remove("pressed");
    }, 100);
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
    level += 1;
    $("#level-title").text(`Level ${level}`);
}
function initializeGame() {
    systemPattern = [];
    userEnteredPattern = [];
    $("#level-title").text("Press A Key to Start");
}
function doesMatchLength(array1, array2) {
    if (array1.length != array2.length) {
        return false;
    }
    else {
        return true;
    }
}
function patternSoFarCorrect() {
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
function onUserTap(event) {
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
    }
    else {
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        const sound = new Audio("sounds/wrong.mp3");
        sound.play();
        initializeGame();
        level = 0;
        nextRound(); // round 1
    }
    console.log(`new system pattern ${systemPattern}`);
    console.log(' ');
}
initializeGame();
nextRound(); // round 1
$(".btn").on("click", onUserTap);
