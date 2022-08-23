#ifndef NOR_FITNESS_FUNCTION
#define NOR_FITNESS_FUNCTION

#include "../../logic-network/logic-network.h"

#define nor_fitness_function(network) ({                \
    __label__ end;                                      \
    int score = 0;                                      \
    int is_halting = 1;                                 \
                                                        \
    reset_network(network);                             \
    set_input_value(network, 0, 0);                     \
    set_input_value(network, 1, 0);                     \
    exec(network);                                      \
    is_halting = logic_network_is_successfull(network); \
    if (!is_halting)                                    \
    {                                                   \
        score -= 10000;                                 \
        goto end;                                       \
    }                                                   \
    score += get_output_value(network, 0) == 1;         \
                                                        \
    reset_network(network);                             \
    set_input_value(network, 0, 1);                     \
    set_input_value(network, 1, 0);                     \
    exec(network);                                      \
    is_halting = logic_network_is_successfull(network); \
    if (!is_halting)                                    \
    {                                                   \
        score -= 10000;                                 \
        goto end;                                       \
    }                                                   \
    score += get_output_value(network, 0) == 0;         \
                                                        \
    reset_network(network);                             \
    set_input_value(network, 0, 0);                     \
    set_input_value(network, 1, 1);                     \
    exec(network);                                      \
    is_halting = logic_network_is_successfull(network); \
    if (!is_halting)                                    \
    {                                                   \
        score -= 10000;                                 \
        goto end;                                       \
    }                                                   \
    score += get_output_value(network, 0) == 0;         \
                                                        \
    reset_network(network);                             \
    set_input_value(network, 0, 1);                     \
    set_input_value(network, 1, 1);                     \
    exec(network);                                      \
    is_halting = logic_network_is_successfull(network); \
    if (!is_halting)                                    \
    {                                                   \
        score -= 10000;                                 \
        goto end;                                       \
    }                                                   \
    score += get_output_value(network, 0) == 0;         \
end:                                                    \
    score;                                              \
})

#endif