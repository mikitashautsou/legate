export const main = (code) => {


    return `
    #include <stdio.h>

    
    int main()
    {
        ${code}
    }
    
    `
}