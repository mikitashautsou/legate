#ifndef CIRCULAR_ARRAY
#define CIRCULAR_ARRAY
// #ifdef DEBUG
// #define print(message)   \
//     {                    \
//         printf(message); \
//     }
// #define printv(message, value)          \
//     {                                   \
//         printf(message #": %d", value); \
//     }
// #endif

#define CircularArray(name, size, type)             \
    type name##_circular_array_content[size] = {0}; \
    type name##_circular_array_size = size;         \
    type name##_circular_array_start = 0;           \
    type name##_circular_array_end = 0;

int circular_array_temp_value_774937;
#define move_forward_pointer(array_name, pointer) ({                       \
    move_forward_index(array_name, array_name##_circular_array_##pointer); \
})

#define move_forward_index(array_name, index) ({   \
    index += 1;                                    \
    if (array_name##_circular_array_size <= index) \
    {                                              \
        index = 0;                                 \
    }                                              \
})



#define dequeue(array_name) ({                                                                                     \
    if (array_name##_circular_array_start == array_name##_circular_array_end)                                      \
    {                                                                                                              \
        circular_array_temp_value_774937 = -1;                                                                     \
    }                                                                                                              \
    else                                                                                                           \
    {                                                                                                              \
        circular_array_temp_value_774937 = array_name##_circular_array_content[array_name##_circular_array_start]; \
        move_forward_pointer(array_name, start);                                                                   \
    }                                                                                                              \
    circular_array_temp_value_774937;                                                                              \
})

int circular_array_temp_value_774937;

#define enqueue(array_name, element) ({                                             \
    array_name##_circular_array_content[array_name##_circular_array_end] = element; \
    move_forward_pointer(array_name, end);                                          \
})

// TODO: add ifnded DEBUG
#define print_circular_array_elements(array_name) ({                 \
    int iterator = array_name##_circular_array_start;                \
    print("====" #array_name "=======\n");                           \
    while (iterator != array_name##_circular_array_end)              \
    {                                                                \
        print("%d,", array_name##_circular_array_content[iterator]); \
        move_forward_index(array_name, iterator);                    \
    }                                                                \
    print("\n===========\n");                                        \
})
#endif