const root = document.getElementById('root')

const MAX_LOGS = 2

const logsContainer = document.createElement('div')
Object.assign(logsContainer.style, {
    fontFamily: 'monospace',
    fontSize: '1.5rem',
    textTransform: 'uppercase',

})

root.appendChild(logsContainer)

let logs = []

const renderMessages = () => {
    logsContainer.innerHTML = logs.map(l => `<div style="color: ${l.type === 'error' ? 'red' : 'black'}">${l.content}`).join('<br>')
}
export const log = async (...messages) => {


    await new Promise(resolve => {
        requestAnimationFrame(() => {
            logs.unshift({ content: messages.join(' '), type: 'message' })
            if (logs.length > MAX_LOGS) {
                logs.pop()
            }
            renderMessages()
            resolve()
        })
    })
}
export const error = async (...messages) => {
    logs.unshift({ content: messages.join(' '), type: 'error' })
    if (logs.length > MAX_LOGS) {
        logs.pop()
    }
    renderMessages()
    resolve()
}


