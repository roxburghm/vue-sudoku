function error() {
    navigator.vibrate([400]);
}

function completeDigit() {
    navigator.vibrate([100,50,100]);
} 
function completeGame() {
    navigator.vibrate([100,100,100,100,300]);
}
function drag() {
    navigator.vibrate(20);
}

export default {
    error,
    completeDigit: completeDigit,
    completeGame: completeGame,
    drag
}