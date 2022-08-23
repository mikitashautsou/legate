

const root = document.getElementById('root')
const remaining_time_container = document.createElement('div')
root.appendChild(remaining_time_container)



Object.assign(remaining_time_container.style, {
    fontFamily: 'monospace',
    fontSize: '1.5rem',
    textTransform: 'uppercase',

})

const format_time = (time) => {
    var date = new Date(null);
    date.setSeconds(time); // specify value for SECONDS here
    return date.toISOString().substr(11, 8);
}
export const show_progress = (progress, remaining_time) => {
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            remaining_time_container.innerText = `${(progress * 100).toFixed(2)}% (${format_time(remaining_time / 1000)})`
            resolve()
        })
    })
}