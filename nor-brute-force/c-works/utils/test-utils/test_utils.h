#ifndef TEST_UTILS
#define TEST_UTILS
#include <string.h>
char TEST_UTILS_BLOCK_NAME[50];
char TEST_UTILS_TEST_NAME[50];

#define expect(actual_value, expected_value)                                                                         \
    if (actual_value != expected_value)                                                                              \
    {                                                                                                                \
        printf("X %s/%s: %d != " #expected_value "\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME, actual_value); \
        return -1;                                                                                                   \
    }                                                                                                                \
    // else                                                                                                  \
    // {                                                                                                     \
    //     printf("V %s\n\r", TEST_UTILS_TEST_NAME);                                                                    \
    // }

#define TEST(test_name) \
    strcpy(TEST_UTILS_TEST_NAME, test_name);

#define TEST_BLOCK(blockname) \
    strcpy(TEST_UTILS_BLOCK_NAME, blockname);

#define END_TEST_BLOCK() \
    printf("V %s/%s\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
#endif
