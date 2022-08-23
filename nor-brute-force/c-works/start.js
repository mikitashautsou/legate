




















class Main {

    static id = 0
    globalDeclarations = ""
    code = ""

    addGlobalDeclaration() {

    }

    print(message) {
        this.code += `printf("%s", "${message}");`
    }

    addCode(code) {
        this.code += code
    }

    do(codeFunc) {
        this.addCode(`
            #include <stdio.h>
            
            int main() {
                `)
                codeFunc()
        this.addCode(`
                return 0;
            }
        `)
    }

}

const main = new Main()



class Var {
    varName = undefined

    constructor(type = "int", initial_value = null) {
        main.addCode(`${type} var_${Main.id}${initial_value != null ? ` = ${initial_value}` : ''};\n`)
        this.varName = `var_${Main.id}`
        Main.id += 1;

    }

    assign(value) {
        if (typeof value == 'function') {
            main.addCode(`${this.varName} = ({`);
            value();
            main.addCode(`});`);
        } else {
            main.addCode(`${this.varName} = ${value};\n`);
        }
    }

    getValue() {
        main.addCode(`${this.varName}`);
    }
}


class CircularArray {

    varName = undefined
    constructor(size) {
        this.varName = `var_${Main.id++}`;
        main.addGlobalDeclaration(`int ${this.varName}_content[${size}]`)
        main.addGlobalDeclaration(`int ${this.varName}_start = 0;`)
        main.addGlobalDeclaration(`int ${this.varName}_end = 0;`)
    }

    addElement(expr) {
        main.addCode(`${this.varName}_start +=1; `)
        `${this.varName}_content[${this.varName}_end] = `
    }

    dequeueElement() {
        return `
            int ${this.varName}_content[${size}]

        `
    }

}

class LogicNetwork {

    run() {
        array.addElement()
    }

}


main.do(() => {
    const variable1 = new Var();
    const variable2 = new Var();
    variable1.assign(() => variable2)
    variable2.assign()
})