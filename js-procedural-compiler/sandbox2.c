

#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <time.h>

#define SIZE 1000000
#define TOTAL_TESTS_COUNT 100

int array1[SIZE] = {0};

void randomize(int* pointer, int i) {
    pointer[i] = rand();
}

int main()
{
            for (int i = 0; i < SIZE; i += 1)
        {
            randomize(array1, i);
        }

        clock_t begin = clock();
        int sum = 0;

    for (int j = 0; j < TOTAL_TESTS_COUNT; j += 1)
    {

        for (int i = 0; i < SIZE; i += 1)
        {
            sum += array1[i];
        }
    }

    clock_t end = clock();
    double time_spent = (double)(end - begin) / CLOCKS_PER_SEC;
    printf("time spent: %f", time_spent);
    printf("sum: %d", sum);
}