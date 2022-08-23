#ifndef COMPONENT_LIB
#define COMPONENT_LIB
#include "../logic-network/logic-network.h"

#define integrate_and(network, reserved_3_nors_start_index) ({                         \
    connect(network, reserved_3_nors_start_index, reserved_3_nors_start_index + 2, 0); \
    connect(network, reserved_3_nors_start_index + 1, reserved_3_nors_start_index + 2, 1); \
})

// SEE PHYSICAL ATTACHEMENT #2
// inputs: 11,12; outputs: 7
#define integrate_d_latch(network, reserved_13_nors_start_index)                                   \
    ({                                                                                             \
        integrate_and(network, reserved_13_nors_start_index);                                      \
        integrate_and(network, reserved_13_nors_start_index + 3);                                  \
                                                                                                   \
        /* latch */                                                                                \
        connect(network, reserved_13_nors_start_index + 6, reserved_13_nors_start_index + 7, 0);   \
        connect(network, reserved_13_nors_start_index + 7, reserved_13_nors_start_index + 6, 1);   \
                                                                                                   \
        /* connect ands to latch */                                                                \
        connect(network, reserved_13_nors_start_index + 2, reserved_13_nors_start_index + 6, 0);   \
        connect(network, reserved_13_nors_start_index + 5, reserved_13_nors_start_index + 7, 1);   \
                                                                                                   \
        /*  create NOT and connect to bottom AND */                                                \
        connect(network, reserved_13_nors_start_index + 8, reserved_13_nors_start_index + 4, 0);   \
        connect(network, reserved_13_nors_start_index + 8, reserved_13_nors_start_index + 4, 1);   \
                                                                                                   \
        /* create data buffer */                                                                   \
        connect(network, reserved_13_nors_start_index + 11, reserved_13_nors_start_index + 9, 0);  \
                                                                                                   \
        /* create reset buffer */                                                                  \
        connect(network, reserved_13_nors_start_index + 12, reserved_13_nors_start_index + 10, 0); \
                                                                                                   \
        /* connect data buffer */                                                                  \
        connect(network, reserved_13_nors_start_index + 9, reserved_13_nors_start_index + 0, 0);   \
        connect(network, reserved_13_nors_start_index + 9, reserved_13_nors_start_index + 0, 1);   \
                                                                                                   \
        connect(network, reserved_13_nors_start_index + 9, reserved_13_nors_start_index + 8, 0);   \
        connect(network, reserved_13_nors_start_index + 9, reserved_13_nors_start_index + 8, 1);   \
                                                                                                   \
        /* connect set buffer */                                                                   \
        connect(network, reserved_13_nors_start_index + 10, reserved_13_nors_start_index + 1, 0);  \
        connect(network, reserved_13_nors_start_index + 10, reserved_13_nors_start_index + 1, 1);  \
                                                                                                   \
        connect(network, reserved_13_nors_start_index + 10, reserved_13_nors_start_index + 3, 0);  \
        connect(network, reserved_13_nors_start_index + 10, reserved_13_nors_start_index + 3, 1);  \
    })

// TODO: add toggle component
#endif