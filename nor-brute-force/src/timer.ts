

let start_time: number;
let end_time: number;

export const start_timer = (time_amount: number) => {
    start_time = Date.now()
    end_time = start_time + time_amount
}

export const check_timer = (): boolean => {
    return end_time >= Date.now()
}