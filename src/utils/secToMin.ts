export function secToMin(sec: number | undefined) {
    if (sec === undefined || sec === null) return
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);
    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }
    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`
}
