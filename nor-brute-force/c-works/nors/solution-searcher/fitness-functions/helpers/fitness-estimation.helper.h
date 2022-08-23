#ifndef FITNESS_ESTIMATION_HELPER
#define FITNESS_ESTIMATION_HELPER

#define expect_network_output(network, score_var, output_idx, target_output_value, is_halting) ({ \
    if (is_halting)                                                                               \
    {                                                                                             \
        is_halting = logic_network_is_successfull(network);                                       \
        if (is_halting)                                                                           \
        {                                                                                         \
            score += get_output_value(network, output_idx) == target_output_value;                \
        }                                                                                         \
        else                                                                                      \
        {                                                                                         \
            score_var -= 10000;                                                                   \
        }                                                                                         \
    }                                                                                             \
    is_halting;                                                                                   \
})
#endif FITNESS_ESTIMATION_HELPER