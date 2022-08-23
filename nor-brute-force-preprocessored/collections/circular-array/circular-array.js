import { access, assign, assign_property_value, combine, declareVar, define_structure, eq, ge, goto, if_then, if_then_else, increment, istructure, label, printm, ret_val } from "../../core/core.js"



export const create_circular_array = (name, size) => `
    int circular_array_${name}_content[${size}] = {0};
    int circular_array_${name}_start = 0;
    int circular_array_${name}_end= 0;
    int circular_array_${name}_size= ${size};

`

export const enqueue_element = (array_name, element) => `
    circular_array_${array_name}_content[circular_array_${array_name}_end] = ${element};
    ${move_pointer_forward(array_name, 'end')}
`

export const dequeue_element = (array_name) => `
({
    int retval;
    if (circular_array_${array_name}_start == circular_array_${array_name}_end) {
        retval = -1;
    } else {
        retval = circular_array_${array_name}_content[circular_array_${array_name}_start];
        ${move_pointer_forward(array_name, 'start')}
    }
    retval;
})

`

const move_pointer_forward = (array_name, pointer) => `

    circular_array_${array_name}_${pointer} += 1;
    if (circular_array_${array_name}_${pointer} == circular_array_${array_name}_size) {
        circular_array_${array_name}_${pointer} = 0;
    }
`