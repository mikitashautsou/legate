

#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 100000
#define TOTAL_TESTS_COUNT 100

int array1[SIZE] = {0};
int array2[SIZE] = {0};
int array3[SIZE] = {0};
int array4[SIZE] = {0};
int array5[SIZE] = {0};
int array6[SIZE] = {0};
int array7[SIZE] = {0};
int array8[SIZE] = {0};
int array9[SIZE] = {0};
int array10[SIZE] = {0};

#define summarize(target, i) ({ \
    int temp = 0;                \
    temp += array1[i];           \
    temp += array2[i];           \
    temp += array3[i];           \
    temp += array4[i];           \
    temp += array5[i];           \
    temp += array6[i];           \
    temp += array7[i];           \
    temp += array8[i];           \
    temp += array9[i];           \
    temp += array10[i];          \
    temp += array1[i * 2];       \
    temp += array2[i * 2];       \
    temp += array3[i * 2];       \
    temp += array4[i * 2];       \
    temp += array5[i * 2];       \
    temp += array6[i * 2];       \
    temp += array7[i * 2];       \
    temp += array8[i * 2];     \
    temp += array9[i * 2];       \
    temp += array10[i * 2];      \
    temp;                        \
})

int main()
{
`````x`zzzzz
4789456123*+\!#%@$^})]~|`~tgbtg|`~|`~|||`````lkjjkljlk;jkl;;;;lkj++6544    for (int i = 0; i < SIZE; i += 1)
    {
        array1[i] = rand();
        array2[i] = rand();
        array3[i] = rand();
        array4[i] = rand();
        array5[i] = rand();
        array6[i] = rand();
        array7[i] = rand();
        array8[i] = rand();
        array9[i] = rand();
        array10[i] = rand();
    }
    int splited_size = SIZE / 2;

    clock_t begin = clock();
    int sum = 0;

    for (int j = 0; j < TOTAL_TESTS_COUNT; j += 1)
    {

        for (int i = 0; i < splited_size; i += 1)
        {

            sum += summarize(array1, i);
            sum += summarize(array2, i);
            sum += summarize(array3, i);
            sum += summarize(array4, i);
            sum += summarize(array5, i);
            sum += summarize(array6, i);
            sum += summarize(array7, i);
            sum += summarize(array8, i);
            sum += summarize(array9, i);
            sum += summarize(array10, i);
            sum += summarize(array1, i=)
        }
    }

    clock_t end = clock();
    double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
    printf("time spent: %f", time_spent);
    printf("sum: %d", sum);
}