
    #include <stdio.h>
    #include <string.h>

    int main()
    {
        char TEST_UTILS_BLOCK_NAME[100];
        char TEST_UTILS_TEST_NAME[100];
        strcpy(TEST_UTILS_TEST_NAME, "Circular array test");
        strcpy(TEST_UTILS_BLOCK_NAME, "Circular array utils test, base usage");

        
    int circular_array_test_array_content[5] = {0};
    int circular_array_test_array_start = 0;
    int circular_array_test_array_end= 0;
    int circular_array_test_array_size= 5;


        
    circular_array_test_array_content[circular_array_test_array_end] = 1;
    

    circular_array_test_array_end += 1;
    if (circular_array_test_array_end == circular_array_test_array_size) {
        circular_array_test_array_end = 0;
    }


        
    circular_array_test_array_content[circular_array_test_array_end] = 2;
    

    circular_array_test_array_end += 1;
    if (circular_array_test_array_end == circular_array_test_array_size) {
        circular_array_test_array_end = 0;
    }


        
    circular_array_test_array_content[circular_array_test_array_end] = 3;
    

    circular_array_test_array_end += 1;
    if (circular_array_test_array_end == circular_array_test_array_size) {
        circular_array_test_array_end = 0;
    }


        
    if (
({
    int retval;
    if (circular_array_test_array_start == circular_array_test_array_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_content[circular_array_test_array_start];
        

    circular_array_test_array_start += 1;
    if (circular_array_test_array_start == circular_array_test_array_size) {
        circular_array_test_array_start = 0;
    }

    }
    retval;
})

 != 1) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
    if (
({
    int retval;
    if (circular_array_test_array_start == circular_array_test_array_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_content[circular_array_test_array_start];
        

    circular_array_test_array_start += 1;
    if (circular_array_test_array_start == circular_array_test_array_size) {
        circular_array_test_array_start = 0;
    }

    }
    retval;
})

 != 2) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
    if (
({
    int retval;
    if (circular_array_test_array_start == circular_array_test_array_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_content[circular_array_test_array_start];
        

    circular_array_test_array_start += 1;
    if (circular_array_test_array_start == circular_array_test_array_size) {
        circular_array_test_array_start = 0;
    }

    }
    retval;
})

 != 3) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
    
printf("V %s/%s \n\r",TEST_UTILS_TEST_NAME,TEST_UTILS_BLOCK_NAME);
strcpy(TEST_UTILS_BLOCK_NAME, "Circular array utils test, cycling usage");

        
    int circular_array_test_array_2_content[2] = {0};
    int circular_array_test_array_2_start = 0;
    int circular_array_test_array_2_end= 0;
    int circular_array_test_array_2_size= 2;


        
    circular_array_test_array_2_content[circular_array_test_array_2_end] = 1;
    

    circular_array_test_array_2_end += 1;
    if (circular_array_test_array_2_end == circular_array_test_array_2_size) {
        circular_array_test_array_2_end = 0;
    }


        
    if (
({
    int retval;
    if (circular_array_test_array_2_start == circular_array_test_array_2_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_2_content[circular_array_test_array_2_start];
        

    circular_array_test_array_2_start += 1;
    if (circular_array_test_array_2_start == circular_array_test_array_2_size) {
        circular_array_test_array_2_start = 0;
    }

    }
    retval;
})

 != 1) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
    circular_array_test_array_2_content[circular_array_test_array_2_end] = 2;
    

    circular_array_test_array_2_end += 1;
    if (circular_array_test_array_2_end == circular_array_test_array_2_size) {
        circular_array_test_array_2_end = 0;
    }


        
    if (
({
    int retval;
    if (circular_array_test_array_2_start == circular_array_test_array_2_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_2_content[circular_array_test_array_2_start];
        

    circular_array_test_array_2_start += 1;
    if (circular_array_test_array_2_start == circular_array_test_array_2_size) {
        circular_array_test_array_2_start = 0;
    }

    }
    retval;
})

 != 2) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
    circular_array_test_array_2_content[circular_array_test_array_2_end] = 3;
    

    circular_array_test_array_2_end += 1;
    if (circular_array_test_array_2_end == circular_array_test_array_2_size) {
        circular_array_test_array_2_end = 0;
    }


        
    if (
({
    int retval;
    if (circular_array_test_array_2_start == circular_array_test_array_2_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_2_content[circular_array_test_array_2_start];
        

    circular_array_test_array_2_start += 1;
    if (circular_array_test_array_2_start == circular_array_test_array_2_size) {
        circular_array_test_array_2_start = 0;
    }

    }
    retval;
})

 != 3) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
    circular_array_test_array_2_content[circular_array_test_array_2_end] = 4;
    

    circular_array_test_array_2_end += 1;
    if (circular_array_test_array_2_end == circular_array_test_array_2_size) {
        circular_array_test_array_2_end = 0;
    }


        
    if (
({
    int retval;
    if (circular_array_test_array_2_start == circular_array_test_array_2_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_2_content[circular_array_test_array_2_start];
        

    circular_array_test_array_2_start += 1;
    if (circular_array_test_array_2_start == circular_array_test_array_2_size) {
        circular_array_test_array_2_start = 0;
    }

    }
    retval;
})

 != 4) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
printf("V %s/%s \n\r",TEST_UTILS_TEST_NAME,TEST_UTILS_BLOCK_NAME);
strcpy(TEST_UTILS_BLOCK_NAME, "Circular array utils test, empty array usage");

        
    int circular_array_test_array_3_content[3] = {0};
    int circular_array_test_array_3_start = 0;
    int circular_array_test_array_3_end= 0;
    int circular_array_test_array_3_size= 3;


        
    circular_array_test_array_3_content[circular_array_test_array_3_end] = 1;
    

    circular_array_test_array_3_end += 1;
    if (circular_array_test_array_3_end == circular_array_test_array_3_size) {
        circular_array_test_array_3_end = 0;
    }


        
    circular_array_test_array_3_content[circular_array_test_array_3_end] = 2;
    

    circular_array_test_array_3_end += 1;
    if (circular_array_test_array_3_end == circular_array_test_array_3_size) {
        circular_array_test_array_3_end = 0;
    }


        
    if (
({
    int retval;
    if (circular_array_test_array_3_start == circular_array_test_array_3_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_3_content[circular_array_test_array_3_start];
        

    circular_array_test_array_3_start += 1;
    if (circular_array_test_array_3_start == circular_array_test_array_3_size) {
        circular_array_test_array_3_start = 0;
    }

    }
    retval;
})

 != 1) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
    if (
({
    int retval;
    if (circular_array_test_array_3_start == circular_array_test_array_3_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_3_content[circular_array_test_array_3_start];
        

    circular_array_test_array_3_start += 1;
    if (circular_array_test_array_3_start == circular_array_test_array_3_size) {
        circular_array_test_array_3_start = 0;
    }

    }
    retval;
})

 != 2) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
    if (
({
    int retval;
    if (circular_array_test_array_3_start == circular_array_test_array_3_end) {
        retval = -1;
    } else {
        retval = circular_array_test_array_3_content[circular_array_test_array_3_start];
        

    circular_array_test_array_3_start += 1;
    if (circular_array_test_array_3_start == circular_array_test_array_3_size) {
        circular_array_test_array_3_start = 0;
    }

    }
    retval;
})

 != -1) {
        printf("X TEST %s/%s FAILED\n\r", TEST_UTILS_TEST_NAME, TEST_UTILS_BLOCK_NAME);
        return -1;
    }
;
        
printf("V %s/%s \n\r",TEST_UTILS_TEST_NAME,TEST_UTILS_BLOCK_NAME);
    }

