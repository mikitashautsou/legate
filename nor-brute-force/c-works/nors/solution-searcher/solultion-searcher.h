#ifndef LOGIC_CIRCUIT_SOLUTION_SEARCHER
#define LOGIC_CIRCUIT_SOLUTION_SEARCHER

#include "../../utils/advanced-array/index.h"
#include "../logic-network/logic-network.h"

/*
[0]// add_node
[1, target_node]//remove_node
[2, from, to, type]//add edge
[3, from, to, type]//remove edge

*/

// #define add_add_node_action()                               \
//     available_actions[available_actions_array_size][0] = 0; \
//     available_actions_array_size += 1;

// #define add_remove_node_action(target_node)                           \
//     available_actions[available_actions_array_size][0] = 1;           \
//     available_actions[available_actions_array_size][1] = target_node; \
//     available_actions_array_size += 1;

// #define add_add_edge_action(from, to, type)                    \
//     available_actions[available_actions_array_size][0] = 3;    \
//     available_actions[available_actions_array_size][1] = from; \
//     available_actions[available_actions_array_size][2] = to;   \
//     available_actions[available_actions_array_size][3] = type; \
//     available_actions_array_size += 1;

// #define add_remove_edge_action()                               \
//     available_actions[available_actions_array_size][0] = 4;    \
//     available_actions[available_actions_array_size][1] = from; \
//     available_actions[available_actions_array_size][2] = to;   \
//     available_actions[available_actions_array_size][3] = type; \
//     available_actions_array_size += 1;

#define remove_action_and_swap(available_action, target_action_idx)                                   \
    for (int i = 0; i < 4; i += 1)                                                                    \
    {                                                                                                 \
        available_actions[target_action_idx][i] = available_actions[available_actions_array_size][i]; \
    }                                                                                                 \
    available_actions_array_size -= 1;


#define add_initial_actions(logic_network, available_actions_array, available_actions_array_size) ({ \
    for (int i = 0; i < logic_network_get_inputs_count(logic_network); i += 1)                       \
    {                                                                                                \
        for (int o = 0; o < logic_network_get_outputs_count(logic_network); o += 1)                  \
        {                                                                                            \
            /* TODO: GLOBALLY REUSE DATA ELEMENTS WITH VARIABLE?*/                                   \
                                                                                                     \
            available_actions_array[available_actions_array_size][0] = 2;                            \
            available_actions_array[available_actions_array_size][1] = i;                            \
            available_actions_array[available_actions_array_size][2] = o;                            \
            available_actions_array[available_actions_array_size][1] = 0;                            \
            available_actions_array_size += 1;                                                       \
        }                                                                                            \
    }                                                                                                \
    available_actions_array[available_actions_array_size][0] = 0;                                    \
})

#define execute_add_node_action(logic_network, available_actions) ({ \
    add_node(logic_network);                                         \
    add_remove_node_action(get_network_size(logic_network));         \
})


#define handle_action(logic_network, available_actions, action_idx) ({ \
    if (available_actions[action_idx][0] == 0)                         \
    {                                                                  \
        add_node_action(logic_network);                            \
    } else if (available_actions[action_idx][0] == 1) {
}
})

#define search_logic_circuit_network(logic_network, fitness_macros_func) ({                    \
    /* FIXME1: DYNAMIC ARRAY SIZING? */                                                        \
    /* TODO: USE MORE OPTIMAL DATA STRUCTURE(MAP/SET)? */                                      \
    int available_actions_array[10000][4];                                                     \
    int available_actions_array_size = 0;                                                      \
    add_initial_actions(logic_network, available_actions_array, available_actions_array_size); \
                                                                                               \
    int action_idx = available_actions_array[random_int(0, available_actions_array_size)];
})

#endif