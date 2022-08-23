#ifndef LOGIC_NETWORK_MEMENTUM
#define LOGIC_NETWORK_MEMENTUM

#define NetworkMementum(target_network)                                                         \
    int logic_network_mementum_##target_network##_SIZE = logic_network_##target_network##_SIZE; \
    int logic_network_mementum_##target_network##_CONNECTIONS[logic_network_##target_network##_MAX_NODES][logic_network_##target_network##_MAX_NODES][2] = {0};

#define take_snapshot(target_network) ({                                                                                            \
    logic_network_mementum_##target_network##_SIZE = logic_network_##target_network##_SIZE;                                         \
    for (int i = 0; i < logic_network_##target_network##_MAX_NODES; i += 1)                                                         \
    {                                                                                                                               \
        for (int j = 0; j < logic_network_##target_network##_MAX_NODES; j += 1)                                                     \
        {                                                                                                                           \
            logic_network_mementum_##target_network##_CONNECTIONS[i][j][0] = logic_network_##target_network##_CONNECTIONS[i][j][0]; \
            logic_network_mementum_##target_network##_CONNECTIONS[i][j][1] = logic_network_##target_network##_CONNECTIONS[i][j][1]; \
        }                                                                                                                           \
    }                                                                                                                               \
})

#define load_from_snapshot(target_network) ({                                                                                       \
    logic_network_##target_network##_SIZE = logic_network_mementum_##target_network##_SIZE;                                         \
    for (int i = 0; i < logic_network_##target_network##_MAX_NODES; i += 1)                                                         \
    {                                                                                                                               \
        for (int j = 0; j < logic_network_##target_network##_MAX_NODES; j += 1)                                                     \
        {                                                                                                                           \
            logic_network_##target_network##_CONNECTIONS[i][j][0] = logic_network_mementum_##target_network##_CONNECTIONS[i][j][0]; \
            logic_network_##target_network##_CONNECTIONS[i][j][1] = logic_network_mementum_##target_network##_CONNECTIONS[i][j][1]; \
        }                                                                                                                           \
    }                                                                                                                               \
})

#endif