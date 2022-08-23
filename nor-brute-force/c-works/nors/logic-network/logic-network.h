
#ifndef LOGIC_NETWORK
#define LOGIC_NETWORK
#include "../../utils/circular-array/circular_array.h"
#include "../../utils/test-utils/debug_print.h"
#include "../../utils/log/logger.h"

#ifdef LOGIC_NETWORK_DEBUG_HISTORY

#define log_network_history_message(...) ({      \
    log(LOGIC_NETWORK_HISTORY_LOG, __VA_ARGS__); \
})
#define init_logic_network()              \
    LogStream(LOGIC_NETWORK_HISTORY_LOG); \
    init_log_stream(LOGIC_NETWORK_HISTORY_LOG, "logic-network.history");

#define log_to_graph_history(...) ({ \
    do                               \
    {                                \
    } while (0);                     \
})
#else
#define log_to_graph_history(...) ({ \
    do                               \
    {                                \
    } while (0);                     \
})
#define init_logic_network() ({ \
    do                          \
    {                           \
    } while (0);                \
})
#define log_network_history_message(...) ({ \
    do                                      \
    {                                       \
    } while (0);                            \
})
#endif

// FIXME: check if max nodes ever exceeded
#define LogicNetwork(network, max_nodes, inputs_count, outputs_count, max_nodes_to_be_executed)                                                                                              \
    const int logic_network_##network##_MAX_NODES = max_nodes;                                                                                                                               \
    const int logic_network_##network##_INPUTS_COUNT = inputs_count;                                                                                                                         \
    const int logic_network_##network##_OUTPUTS_COUNT = outputs_count;                                                                                                                       \
    const int logic_network_##network##_IO_COUNT = logic_network_##network##_INPUTS_COUNT + logic_network_##network##_OUTPUTS_COUNT;                                                         \
    const int logic_network_##network##_MAX_NODES_TO_BE_EXECUTED = max_nodes_to_be_executed;                                      /* replace with dynamic resizing */                        \
    int logic_network_##network##_CONNECTIONS[logic_network_##network##_MAX_NODES][logic_network_##network##_MAX_NODES][2] = {0}; /* TODO: use binary number representation instead of 2? */ \
    int logic_network_##network##_SIZE = logic_network_##network##_INPUTS_COUNT + logic_network_##network##_OUTPUTS_COUNT;                                                                   \
    int logic_network_##network##_INPUT_VALUES[logic_network_##network##_INPUTS_COUNT] = {0};                                                                                                \
    CircularArray(logic_network_##network##_ACTIVATED_NODES, logic_network_##network##_MAX_NODES_TO_BE_EXECUTED, int);                                                                       \
    int logic_network_##network##_NODE_VALUES[logic_network_##network##_MAX_NODES] = {0};                                                                                                    \
    int logic_network_##network##_EDGES_VALUES[logic_network_##network##_MAX_NODES][logic_network_##network##_MAX_NODES][2] = {0}; /*2 - for left/right inputs*/                             \
    int is_last_execution_successfull_logic_netwok_##network = 1;

#define logic_network_get_inputs_count(network) logic_network_##network##_INPUTS_COUNT
#define logic_network_get_outputs_count(network) logic_network_##network##_OUTPUTS_COUNT

#define log_network_stats(network) ({                                                                              \
    log_network_history_message("INPUTS %d\n", logic_network_##network##_INPUTS_COUNT);                            \
    log_network_history_message("OUTPUTS %d\n", logic_network_##network##_OUTPUTS_COUNT);                          \
    log_network_history_message("NORS %d\n", logic_network_##network##_SIZE - logic_network_##network##_IO_COUNT); \
})
#define get_network_size(network) logic_network_##network##_SIZE

#define add_node(network) /* FIXME: check the max size */ \
    {                                                     \
        logic_network_##network##_SIZE += 1;              \
    }

#define connect(network, from, to, type)                                      \
    ({                                                                        \
        logic_network_##network##_CONNECTIONS[from][to][type] = 1;            \
        log_network_history_message("CONNECTION %d %d %d\n", from, to, type); \
    })

#define disconnect(network, from, to, type)                        \
    ({                                                             \
        logic_network_##network##_CONNECTIONS[from][to][type] = 0; \
    })

#define set_inputs(network)                                                                                      \
    ({                                                                                                           \
        print("set_inputs > starting...\n");                                                                     \
        logic_network_print_config(network);                                                                     \
                                                                                                                 \
        for (int i = 0; i < logic_network_##network##_INPUTS_COUNT; i += 1)                                      \
        {                                                                                                        \
            logic_network_##network##_NODE_VALUES[i] = logic_network_##network##_INPUT_VALUES[i];                \
            for (int j = 0; j < logic_network_##network##_SIZE; j += 1)                                          \
            {                                                                                                    \
                                                                                                                 \
                int has_left_connection = logic_network_##network##_CONNECTIONS[i][j][0];                        \
                if (has_left_connection)                                                                         \
                {                                                                                                \
                    logic_network_##network##_EDGES_VALUES[i][j][0] = logic_network_##network##_INPUT_VALUES[i]; \
                }                                                                                                \
                int has_right_connection = logic_network_##network##_CONNECTIONS[i][j][1];                       \
                if (has_right_connection)                                                                        \
                    logic_network_##network##_EDGES_VALUES[i][j][1] = logic_network_##network##_INPUT_VALUES[i]; \
                                                                                                                 \
                if (has_left_connection || has_right_connection)                                                 \
                {                                                                                                \
                    enqueue(logic_network_##network##_ACTIVATED_NODES, j);                                       \
                    print("set_inputs > enqueue: %d\n", j);                                                      \
                }                                                                                                \
            }                                                                                                    \
        }                                                                                                        \
        print("set_inputs > edges values: \n");                                                                  \
        print_graph_edges_values(network);                                                                       \
        print("set_inputs > enqueued nodes: \n");                                                                \
        print_circular_array_elements(logic_network_##network##_ACTIVATED_NODES);                                \
    });

#define print_graph_edges_values(network) ({                                        \
    print("=====Edges values " #network "=====\n");                                 \
    for (int i = 0; i < logic_network_##network##_SIZE; i += 1)                     \
    {                                                                               \
        for (int j = 0; j < logic_network_##network##_SIZE; j += 1)                 \
        {                                                                           \
            int left_connection = logic_network_##network##_EDGES_VALUES[i][j][0];  \
            int right_connection = logic_network_##network##_EDGES_VALUES[i][j][1]; \
            print("|%2d%2d", left_connection, right_connection);                    \
        }                                                                           \
        print("\n");                                                                \
    }                                                                               \
    print("==========\n");                                                          \
})

#ifdef LOGIC_NETWORK_DEBUG_PRINT
#define logic_network_print_edges_config(network) ({                               \
    printf("=====Edges of " #network "=====\n");                                   \
    for (int i = 0; i < logic_network_##network##_SIZE; i += 1)                    \
    {                                                                              \
        for (int j = 0; j < logic_network_##network##_SIZE; j += 1)                \
        {                                                                          \
            int left_connection = logic_network_##network##_CONNECTIONS[i][j][0];  \
            int right_connection = logic_network_##network##_CONNECTIONS[i][j][1]; \
            printf("|%2d%2d", left_connection, right_connection);                  \
        }                                                                          \
        printf("\n");                                                              \
    }                                                                              \
    printf("==========\n");                                                        \
})
#else
#define logic_network_print_edges_config(network) ({})
#endif

#define calc_nor_value(network, target_node) ({                                                                                                                                                                                                                 \
    int result_value = 1;                                                                                                                                                                                                                                       \
    for (int j = 0; j < logic_network_##network##_SIZE; j += 1)                                                                                                                                                                                                 \
    {                                                                                                                                                                                                                                                           \
        if ((logic_network_##network##_CONNECTIONS[j][target_node][0] && logic_network_##network##_EDGES_VALUES[j][target_node][0]) || (logic_network_##network##_CONNECTIONS[j][target_node][1] && logic_network_##network##_EDGES_VALUES[j][target_node][1])) \
        {                                                                                                                                                                                                                                                       \
            result_value = 0;                                                                                                                                                                                                                                   \
            break;                                                                                                                                                                                                                                              \
        }                                                                                                                                                                                                                                                       \
    }                                                                                                                                                                                                                                                           \
    result_value;                                                                                                                                                                                                                                               \
});

#define exec(network)                                                                                                                                         \
    ({                                                                                                                                                        \
        print("executing...\n");                                                                                                                              \
        set_inputs(network);                                                                                                                                  \
        int activated_node = dequeue(logic_network_##network##_ACTIVATED_NODES);                                                                              \
        print("exec > check activated_nodes\n");                                                                                                              \
        int current_iteration = 0;                                                                                                                            \
        is_last_execution_successfull_logic_netwok_##network = 1;                                                                                             \
        do                                                                                                                                                    \
        {                                                                                                                                                     \
                                                                                                                                                              \
            print("exec > check node #%d \n", activated_node);                                                                                                \
            if (is_input(network, activated_node))                                                                                                            \
            {                                                                                                                                                 \
                print("exec > node #%d is input, skip calculation \n", activated_node);                                                                       \
            }                                                                                                                                                 \
            else                                                                                                                                              \
            {                                                                                                                                                 \
                                                                                                                                                              \
                int result_value = calc_nor_value(network, activated_node);                                                                                   \
                                                                                                                                                              \
                if (is_output_or_input(network, activated_node))                                                                                              \
                {                                                                                                                                             \
                    logic_network_##network##_NODE_VALUES[activated_node] = result_value ? 0 : 1; /* because output uses OR */                                \
                    print("exec > result value of node #%d is %d, node is output \n", activated_node, logic_network_##network##_NODE_VALUES[activated_node]); \
                    log_network_history_message("NODE_VALUE %d %d\n", activated_node, logic_network_##network##_NODE_VALUES[activated_node]);                 \
                }                                                                                                                                             \
                else                                                                                                                                          \
                {                                                                                                                                             \
                    print("exec > result value of node #%d is %d, node is nor\n", activated_node, result_value);                                              \
                    log_network_history_message("NODE_VALUE %d %d\n", activated_node, result_value);                                                          \
                    logic_network_##network##_NODE_VALUES[activated_node] = result_value;                                                                     \
                    /*TODO: move below code to propage macros*/                                                                                               \
                    for (int k = 0; k < logic_network_##network##_SIZE; k += 1)                                                                               \
                    {                                                                                                                                         \
                        int previous_left_value = logic_network_##network##_EDGES_VALUES[activated_node][k][0];                                               \
                        int previous_right_value = logic_network_##network##_EDGES_VALUES[activated_node][k][1];                                              \
                        int node_should_be_activated = 0;                                                                                                     \
                        if (logic_network_##network##_CONNECTIONS[activated_node][k][0] && (previous_left_value != result_value))                             \
                        {                                                                                                                                     \
                            logic_network_##network##_EDGES_VALUES[activated_node][k][0] = result_value;                                                      \
                            node_should_be_activated = 1;                                                                                                     \
                            log_network_history_message("CONNECTION_VALUE %d %d %d %d\n", activated_node, k, 0, result_value);                                \
                        }                                                                                                                                     \
                        if (logic_network_##network##_CONNECTIONS[activated_node][k][1] && (previous_right_value != result_value))                            \
                        {                                                                                                                                     \
                            logic_network_##network##_EDGES_VALUES[activated_node][k][1] = result_value;                                                      \
                            log_network_history_message("CONNECTION_VALUE %d %d %d %d\n", activated_node, k, 1, result_value);                                \
                            node_should_be_activated = 1;                                                                                                     \
                        }                                                                                                                                     \
                        if (node_should_be_activated) /* FIXME: add check if node is already was added to queue */                                            \
                        {                                                                                                                                     \
                            enqueue(logic_network_##network##_ACTIVATED_NODES, k);                                                                            \
                        }                                                                                                                                     \
                    }                                                                                                                                         \
                }                                                                                                                                             \
            }                                                                                                                                                 \
            activated_node = dequeue(logic_network_##network##_ACTIVATED_NODES);                                                                              \
            /* TODO: move 100 to constant*/                                                                                                                   \
            if (current_iteration > 100)                                                                                                                      \
            {                                                                                                                                                 \
                print("iterations exceeded");                                                                                                                 \
                is_last_execution_successfull_logic_netwok_##network = 0;                                                                                     \
                break;                                                                                                                                        \
            }                                                                                                                                                 \
            current_iteration += 1;                                                                                                                           \
        } while (activated_node != -1);                                                                                                                       \
        print("exec > finish activation chain, terminating...\n");                                                                                            \
    })

#define logic_network_is_successfull(network) is_last_execution_successfull_logic_netwok_##network

// #define calc_network_complexy(network) ({

// })
#define is_input(network, activated_node) ({                 \
    activated_node < logic_network_##network##_INPUTS_COUNT; \
})

#define is_output_or_input(network, activated_node) ({   \
    activated_node < logic_network_##network##_IO_COUNT; \
})

#define get_output_value(network, output_index) ({                                                \
    logic_network_##network##_NODE_VALUES[logic_network_##network##_INPUTS_COUNT + output_index]; \
})

#define print_output_values(network) ({                                  \
    print("result of executing network: ");                              \
    for (int i = 0; i < logic_network_##network##_OUTPUTS_COUNT; i += 1) \
    {                                                                    \
        print("%d", get_output_value(network, i));                       \
    }                                                                    \
    print("\n\r");                                                       \
})

#define set_input_value(network, input_index, value) ({                    \
    logic_network_##network##_INPUT_VALUES[input_index] = value;           \
    log_network_history_message("NODE_VALUE %d %d\n", input_index, value); \
})

#define print_graph_matrix(network) ({                                             \
    for (int i = 0; i < logic_network_##network##_SIZE; i += 1)                    \
    {                                                                              \
        for (int j = 0; j < logic_network_##network##_SIZE; j += 1)                \
        {                                                                          \
            int left_connection = logic_network_##network##_CONNECTIONS[i][j][0];  \
            int right_connection = logic_network_##network##_CONNECTIONS[i][j][1]; \
            int print_result;                                                      \
            if (left_connection && right_connection)                               \
            {                                                                      \
                print_result = 3;                                                  \
            }                                                                      \
            else if (left_connection)                                              \
            {                                                                      \
                print_result = 2;                                                  \
            }                                                                      \
            else if (right_connection)                                             \
            {                                                                      \
                print_result = 1;                                                  \
            }                                                                      \
            else                                                                   \
            {                                                                      \
                print_result = 0;                                                  \
            }                                                                      \
            print("%d", print_result);                                             \
        }                                                                          \
        print("\n");                                                               \
    }                                                                              \
})

#define reset_network(network) ({                                                       \
    printn(reset_network);                                                              \
    for (int i = 0; i < logic_network_##network##_SIZE; i += 1)                         \
    {                                                                                   \
        logic_network_##network##_NODE_VALUES[i] = -1;                                  \
                                                                                        \
        for (int j = 0; j < logic_network_##network##_SIZE; j += 1)                     \
        { /* can be skipped for disabled connections*/                                  \
            logic_network_##network##_EDGES_VALUES[i][j][0] = -1;                       \
            logic_network_##network##_EDGES_VALUES[i][j][1] = -1;                       \
            log_network_history_message("CONNECTION_VALUE %d %d %d %d\n", i, j, 0, -1); \
            log_network_history_message("CONNECTION_VALUE %d %d %d %d\n", i, j, 1, -1); \
        }                                                                               \
    }                                                                                   \
})

#endif