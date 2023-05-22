function error() {
    navigator.vibrate([400]);
} 
function complete() {
    navigator.vibrate([100,100,100,100,300]);
} 
function drag() {
    navigator.vibrate(20);
}

export default {
    error,
    complete,
    drag
}