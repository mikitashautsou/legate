#ifndef ADVANCED_ARRAY
#define ADVANCED_ARRAY
#include "../random/random.h"

#define AdvancedArray(name, size, type)       \
    type name##_advanced_array_content[size]; \
    type name##_advanced_array_size = size;   \
    type name##_advanced_array_current_size = 0;


#define advanced_array_add_element(array_name, element) ({                                   \
    array_name##_advanced_array_content[array_name##_advanced_array_current_size] = element; \
    array_name##_advanced_array_current_size += 1;                                           \
})

#define advanced_array_get(array_name, index) ({ \
    array_name##_advanced_array_content[index];  \
})

#define advanced_array_get_size(array_name) ({ \
    array_name##_advanced_array_current_size;  \
})

#define advanced_array_pick_and_swap_with_last(array_name) ({                                                                            \
    int random_idx = random_int(0, array_name##_advanced_array_current_size); /* TODO: move to global var? */                            \
    int value = array_name##_advanced_array_content[random_idx];                                                                         \
    array_name##_advanced_array_content[random_idx] = array_name##_advanced_array_content[array_name##_advanced_array_current_size - 1]; \
    array_name##_advanced_array_current_size -= 1;                                                                                       \
    value;                                                                                                                               \
})

#endif