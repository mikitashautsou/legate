const root = document.getElementById('root')


const stopButton = document.createElement('button')
stopButton.innerText = 'STOP'
root.appendChild(stopButton)

let stopped = false
stopButton.addEventListener('click', () => {
    stopped = true
})

export const checkForceStop = () => {
    if (stopped) {
        throw new Error('Program stopped')
    }
}

export const forceStop = () => {
    stopped = true
}