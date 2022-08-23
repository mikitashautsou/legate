
#include <stdio.h>
#include "../test-utils/test_utils.h"

#include "index.h"

AdvancedArray(test, 10, int);

int main()
{

    TEST("advanced array test")
    TEST_BLOCK("test array operations");

    advanced_array_add_element(test, 1);
    advanced_array_add_element(test, 2);
    advanced_array_add_element(test, 3);

    expect(advanced_array_get_size(test), 3);

    int has_one = 0;
    int has_two = 0;
    int has_three = 0;

    int random_element = advanced_array_pick_and_swap_with_last(test);
    if (random_element == 1)
    {
        has_one = 1;
    }
    else if (random_element == 2)
    {
        has_two = 1;
    }
    else if (random_element == 3)
    {
        has_three = 1;
    }
    random_element = advanced_array_pick_and_swap_with_last(test);

    if (random_element == 1)
    {
        has_one = 1;
    }
    else if (random_element == 2)
    {
        has_two = 1;
    }
    else if (random_element == 3)
    {
        has_three = 1;
    }
    random_element = advanced_array_pick_and_swap_with_last(test);

    if (random_element == 1)
    {
        has_one = 1;
    }
    else if (random_element == 2)
    {
        has_two = 1;
    }
    else if (random_element == 3)
    {
        has_three = 1;
    }

    expect(has_one, 1);
    expect(has_two, 1);
    expect(has_three, 1);

    return 0;
}