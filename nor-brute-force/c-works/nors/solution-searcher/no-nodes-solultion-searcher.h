#ifndef LOGIC_CIRCUIT_NO_NODES_SOLUTION_SEARCHER
#define LOGIC_CIRCUIT_NO_NODES_SOLUTION_SEARCHER

#include "../../utils/advanced-array/index.h"
#include "../logic-network/logic-network.h"
#include "../logic-network/mementum/index.h"
#include "./fitness-functions/input-output.h"

#define invert(value) 1 - value

#ifdef DEBUG_NO_NODES_SEARCHER
#define printd(...) \
    printf(__VA_ARGS__);
#else
#define printd(...) \
    do              \
    {               \
    } while (0);
#endif

#define search_logic_circuit_network(network, fitness_function_macro) ({                                                                                                                  \
    /* FIXME1: DYNAMIC ARRAY SIZING? */ /* TODO: USE MORE OPTIMAL DATA STRUCTURE(MAP/SET)? */                                                                                             \
    NetworkMementum(network);                                                                                                                                                             \
    int max_score = -10000;                                                                                                                                                               \
    int current_complexity = 0;                                                                                                                                                           \
    double tempreature = 100;                                                                                                                                                             \
    while (tempreature >= 1)                                                                                                                                                              \
    {                                                                                                                                                                                     \
        int network_complexity = current_complexity;                                                                                                                                      \
        for (int t = 0; t < tempreature; t += 1)                                                                                                                                          \
        {                                                                                                                                                                                 \
            /* TODO: move vars outside to not declare each cycle? measure performance */                                                                                                  \
            int random_from = random_int(0, get_network_size(network));                                                                                                                   \
            int random_to = random_int(0, get_network_size(network));                                                                                                                     \
            int random_type = random_int(0, 2);                                                                                                                                           \
            int result = logic_network_##network##_CONNECTIONS[random_from][random_to][random_type] = invert(logic_network_##network##_CONNECTIONS[random_from][random_to][random_type]); \
            if (!result)                                                                                                                                                                  \
            {                                                                                                                                                                             \
                network_complexity -= 1;                                                                                                                                                  \
            }                                                                                                                                                                             \
            else                                                                                                                                                                          \
            {                                                                                                                                                                             \
                network_complexity += 1;                                                                                                                                                  \
            }                                                                                                                                                                             \
                                                                                                                                                                                          \
        } /* FIXME: should return -1 in case of not finishing execution */;                                                                                                               \
        if (network_complexity < 0)                                                                                                                                                       \
        {                                                                                                                                                                                 \
            printf("complexity: %d", network_complexity);                                                                                                                                 \
        }                                                                                                                                                                                 \
        int new_score = fitness_function_macro(network);                                                                                                                                  \
        if (new_score > max_score || (new_score == max_score && (network_complexity < current_complexity)))                                                                               \
        {                                                                                                                                                                                 \
            take_snapshot(network);                                                                                                                                                       \
            max_score = new_score;                                                                                                                                                        \
            current_complexity = network_complexity;                                                                                                                                      \
            printf("best score: %d, min complexity: %d\n", max_score, current_complexity);                                                                                                \
        }                                                                                                                                                                                 \
        else                                                                                                                                                                              \
        { /* TODO: USE BACK ACTION PATH INSTEAD?*/                                                                                                                                        \
            load_from_snapshot(network);                                                                                                                                                  \
        }                                                                                                                                                                                 \
        tempreature *= 0.9999;                                                                                                                                                            \
        /*printf("tempreature: %f \r\n", tempreature);      */                                                                                                                            \
    }                                                                                                                                                                                     \
    reset_network(network);                                                                                                                                                               \
    load_from_snapshot(network);                                                                                                                                                          \
})
#endif