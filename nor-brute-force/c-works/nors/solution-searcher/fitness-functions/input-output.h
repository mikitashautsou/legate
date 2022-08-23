#ifndef SIMPLE_INPUT_OUTPUT_FITNESS_FUNCTION
#define SIMPLE_INPUT_OUTPUT_FITNESS_FUNCTION

#include "../../logic-network/logic-network.h"

#define input_output_fitness_function(network) ({                    \
    reset_network(network);                                          \
    int score = 0; /* TODO: move to global var? */                   \
    set_input_value(network, 0, 0);                                  \
    exec(network);                                                   \
    int is_execution_failed = 0;                                     \
    if (!logic_network_is_successfull(network))                       \
    {                                                                \
        is_execution_failed = 1;                                     \
    }                                                                \
    if (get_output_value(network, 0) == 0)                           \
    {                                                                \
        score += 1;                                                  \
    }                                                                \
    if (!is_execution_failed)                                        \
    {                                                                \
        set_input_value(network, 0, 1);                              \
        exec(network);                                               \
        is_execution_failed = !logic_network_is_successfull(network); \
        if (!is_execution_failed)                                    \
        {                                                            \
            if (get_output_value(network, 0) == 1)                   \
            {                                                        \
                score += 1;                                          \
            }                                                        \
        }                                                            \
    }                                                                \
    if (is_execution_failed)                                         \
    {                                                                \
        score = -1000;                                               \
    }                                                                \
    score;                                                           \
})

#endif

// get_output_value(network, 0);
// // get_output_value(network, 0);