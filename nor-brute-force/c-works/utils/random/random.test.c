
#include <stdio.h>
#include "../test-utils/test_utils.h"

#include "random.h"
int main()
{

    init_random();

    TEST("random module")
    TEST_BLOCK("random from 4 to 16");

    int from = 4;
    int to = 16;

    for (int j = from; j < to; j += 1)
    {
        int target_occured = 0;
        for (int i = 0; i < 100000; i += 1)
        {
            if (random_int(from, to) == j)
            {
                target_occured = 1;
                break;
            }
        }
        expect(target_occured, 1);
    }

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