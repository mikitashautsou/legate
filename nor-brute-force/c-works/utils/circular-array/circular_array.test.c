
#include <stdio.h>
#include "../test-utils/test_utils.h"
#include "circular_array.h"

CircularArray(test, 5, int);
int main()
{

    TEST("circular array test")
    TEST_BLOCK("get list element");
    enqueue(test, 1);
    enqueue(test, 2);
    enqueue(test, 3);
    int result1 = dequeue(test);
    int result2 = dequeue(test);
    int result3 = dequeue(test);
    expect(result1, 1);
    expect(result2, 2);
    expect(result3, 3);
    END_TEST_BLOCK();

    TEST_BLOCK("get element out of bound");
    enqueue(test, 1);
    enqueue(test, 2);
    dequeue(test);
    dequeue(test);
    dequeue(test);
    result1 = dequeue(test);
    expect(result1, -1);
    END_TEST_BLOCK();

    TEST_BLOCK("get element out of bound then use properly");
    enqueue(test, 1);
    dequeue(test);
    dequeue(test);
    dequeue(test);
    result1 = dequeue(test);
    enqueue(test, 5);
    result2 = dequeue(test);

    expect(result1, -1);
    expect(result2, 5);
    END_TEST_BLOCK();


    // TEST("circular array test 2")
    // TEST_BLOCK("get list element 2");
    // expect(1, 1);
    // END_TEST_BLOCK();

    // int result = dequeue(test);

    // result = dequeue(test);
    // result = dequeue(test);
    // result = dequeue(test);
    // result = dequeue(test);

    // printf("value: %d\n", result);
    return 0;
}