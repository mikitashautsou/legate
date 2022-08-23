
#include <stdio.h>
#include "../../utils/test-utils/test_utils.h"

#include "logic-network.h"
#include "../components-lib/component-lib.h"

LogicNetwork(TEST_GRAPH, 200, 2, 1, 1000);

int main()
{

    TEST("logic network")

    TEST_BLOCK("latch test");

    init_logic_network();
    // SEE PHYSICAL ATACHEMENT #3
    for (int i = 0; i < 20; i += 1)
    {
        add_node(TEST_GRAPH);
    }
    log_network_stats(TEST_GRAPH);

    integrate_d_latch(TEST_GRAPH, 3);

    connect(TEST_GRAPH, 3 + 7, 2, 0);
    connect(TEST_GRAPH, 0, 3 + 11, 0);
    connect(TEST_GRAPH, 1, 3 + 12, 0);
    reset_network(TEST_GRAPH);

    set_input_value(TEST_GRAPH, 0, 0);
    set_input_value(TEST_GRAPH, 1, 1);
    exec(TEST_GRAPH);
    expect(get_output_value(TEST_GRAPH, 0), 0);

    set_input_value(TEST_GRAPH, 0, 1);
    set_input_value(TEST_GRAPH, 1, 0);
    exec(TEST_GRAPH);
    expect(get_output_value(TEST_GRAPH, 0), 0);

    set_input_value(TEST_GRAPH, 0, 1);
    set_input_value(TEST_GRAPH, 1, 1);
    exec(TEST_GRAPH);
    expect(get_output_value(TEST_GRAPH, 0), 1);

    set_input_value(TEST_GRAPH, 0, 1);
    set_input_value(TEST_GRAPH, 1, 0);
    exec(TEST_GRAPH);
    expect(get_output_value(TEST_GRAPH, 0), 1);

    set_input_value(TEST_GRAPH, 0, 0);
    set_input_value(TEST_GRAPH, 1, 0);
    exec(TEST_GRAPH);
    expect(get_output_value(TEST_GRAPH, 0), 1);

    set_input_value(TEST_GRAPH, 0, 0);
    set_input_value(TEST_GRAPH, 1, 1);
    exec(TEST_GRAPH);
    expect(get_output_value(TEST_GRAPH, 0), 0);

    END_TEST_BLOCK();

    return 0;
}