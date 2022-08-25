





export const CircularArray = (name, size, type)  => {


    const move_pointer_forward = (index) => `
        ${index} += 1;                                    
        if (${size} <= ${index}) 
        {                                              
            ${index} = 0;                                 
        } 
    
    `


    return {
        name,
        size,
        type,
        init: () => `
            ${type} ${name}_circular_array_content[${size}] = {0};
            ${type} ${name}_circular_array_start = 0;           
            ${type} ${name}_circular_array_end = 0;
        `,
        enqueue: (expression) => {
            return `
            ${name}_circular_array_content[${name}_circular_array_end] = ({ ${expression} });
            ${move_pointer_forward(`${name}_circular_array_end`)}
            `
        },
        dequeue: () => `
            int result;
            if (${name}_circular_array_end == ${name}_circular_array_start) {
                result = -1;
            } else {
                result = ${name}_circular_array_content[${name}_circular_array_start];
            }
            ${move_pointer_forward(`${name}_circular_array_start`)}
            result;
        
        `

    }
}