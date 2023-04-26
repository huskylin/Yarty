"use strict";
exports.__esModule = true;
exports.secToMin = void 0;
function secToMin(sec) {
    if (sec === undefined || sec === null)
        return;
    var minutes = Math.floor(sec / 60);
    var seconds = Math.floor(sec % 60);
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    return padTo2Digits(minutes) + ":" + padTo2Digits(seconds);
}
exports.secToMin = secToMin;
