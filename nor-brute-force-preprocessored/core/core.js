

const Main = (...body) => `
#include <stdio.h>

int main()
{
    ${body.join('\n')}
}

`

const declareVar = (type, name, initialValue) => `${type} ${name}${initialValue != undefined ? ` = ${initialValue}` : ''};`
export const declareArray = (primaryType, name, dimensions) => `${primaryType} ${name} ${dimensions.map(d => `[${d}]`)}`;


export const ivar = (name, initial_value = 0) => `int ${name} = ${initial_value};`
export const iarray = (name, ...dimensions) => `int ${name}${dimensions.map(d => `[${d}]`).join('')} = {0};`


const printInt = (something) => `printf("%d", ${something});`

export const printm = (message, ...args) => `printf("${message}"${args.length == 0 ? '' : `,${args.join(',')}`});`
export const combine = (...elements) => elements.join('\n')

export const copyStr = (from, to) => `strcpy(${to}, ${from});`

/**
 * { size: { type: 'int', initial: '0' },  }
 */
export const structured = (owner_class, owner_name, config) => {
    return Object.entries(config).map(([k, v]) => declareVar(v.type, `${owner_class}_${owner_name}_${k}`, `${v.initial}`)).join('\n')
}

export const istructure = (owner_class, owner_name, config) => {
    return Object.entries(config).map(([k, v]) => !Array.isArray(v) ? declareVar('int', `${owner_class}_${owner_name}_${k}`, v) : iarray(`${owner_class}_${owner_name}_${k}`, ...v)).join('\n')
}

export const define_structure = istructure;

export const access = (class_name, var_name, property, selector = '') => {
    return `${class_name}_${var_name}_${property}${selector}`
}

export const gt = (expr1, expr2) => `${expr1} > ${expr2};`
export const ge = (expr1, expr2) => `${expr1} >= ${expr2};`
export const eq = (expr1, expr2) => `${expr1} == ${expr2};`

export const assign_property_value = (class_name, var_name, property, selector, value) => {
    return `${access(class_name, var_name, property, selector)} = ${value};`
}

export const assign = (var_name, value) => {
    return `${var_name} = ${value};`
}
export const increment = (variable) => `${variable} += 1; `

export const if_then = (condition, if_true) => `if (({${condition}})) { ${if_true}}`
export const if_then_else = (condition, if_true, if_false) => `if (({${condition}})) { ${if_true}} else { ${if_false}}`

export const label = (name) => `${name}:`;
export const goto = (label) => `goto ${label};`;

export const ret_val = (expression) => `${expression};`
export {
    Main,
    declareVar,
    printInt,
}
