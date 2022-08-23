
#include <stdio.h>
// #include "../../utils/test-utils/test_utils.h"
#include "../../../utils/test-utils/test_utils.h"

#include "../logic-network.h"
#include "index.h"

#define expect_nor_behaviour()                    \
    set_input_value(TEST_NETWORK, 0, 0);          \
    set_input_value(TEST_NETWORK, 1, 0);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 1); \
                                                  \
    set_input_value(TEST_NETWORK, 0, 1);          \
    set_input_value(TEST_NETWORK, 1, 0);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 0); \
                                                  \
    set_input_value(TEST_NETWORK, 0, 0);          \
    set_input_value(TEST_NETWORK, 1, 1);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 0); \
    set_input_value(TEST_NETWORK, 0, 1);          \
    set_input_value(TEST_NETWORK, 1, 1);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 0);

#define expect_void_behaviour()                   \
    set_input_value(TEST_NETWORK, 0, 0);          \
    set_input_value(TEST_NETWORK, 1, 0);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 0); \
                                                  \
    set_input_value(TEST_NETWORK, 0, 1);          \
    set_input_value(TEST_NETWORK, 1, 0);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 0); \
                                                  \
    set_input_value(TEST_NETWORK, 0, 0);          \
    set_input_value(TEST_NETWORK, 1, 1);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 0); \
                                                  \
    set_input_value(TEST_NETWORK, 0, 1);          \
    set_input_value(TEST_NETWORK, 1, 1);          \
    exec(TEST_NETWORK);                           \
    expect(get_output_value(TEST_NETWORK, 0), 0);

int main()
{

    TEST("logic network mementum");
    TEST_BLOCK("check making/loading snapshot");

    LogicNetwork(TEST_NETWORK, 10, 2, 1, 1000);
    NetworkMementum(TEST_NETWORK);

    // create network with nor
    add_node(TEST_NETWORK);
    reset_network(TEST_NETWORK);
    connect(TEST_NETWORK, 0, 3, 0);
    connect(TEST_NETWORK, 1, 3, 1);
    connect(TEST_NETWORK, 3, 2, 0);
    expect_nor_behaviour();

    // create snapshot
    take_snapshot(TEST_NETWORK);
    disconnect(TEST_NETWORK, 0, 3, 0);
    disconnect(TEST_NETWORK, 1, 3, 1);
    disconnect(TEST_NETWORK, 3, 2, 0);
    expect_void_behaviour();

    load_from_snapshot(TEST_NETWORK);

    expect_nor_behaviour();

    END_TEST_BLOCK();
}