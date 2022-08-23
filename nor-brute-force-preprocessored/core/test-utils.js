import { combine, copyStr, printm } from "./core.js";



export const expect = (result_value, target_value) => `
    if (${result_value} != ${target_value}) {
        printf("X TEST %s/%s FAILED\\n\\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
`

export const TestBlock = (name, ...instructions) => combine(
    copyStr(`"${name}"`, "TEST_UTILS_BLOCK_NAME"),
    ...instructions,
    printm("V %s/%s \\n\\r", "TEST_UTILS_TEST_NAME", "TEST_UTILS_BLOCK_NAME")
)


// strcpy(TEST_UTILS_BLOCK_NAME, blockname);r

export const Test = (name, ...body) => `
    #include <stdio.h>
    #include <string.h>

    int main()
    {
        char TEST_UTILS_BLOCK_NAME[100];
        char TEST_UTILS_TEST_NAME[100];
        ${copyStr(`"${name}"`, "TEST_UTILS_TEST_NAME")}
        ${body.join('\n')}
    }
`