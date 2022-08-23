
#include <stdio.h>
#include "../../utils/test-utils/test_utils.h"

#include "logic-network.h"



int main()
{

LogicNetwork(GRAPH_1, 100, 1, 1, 1000);
LogicNetwork(GRAPH_2, 100, 2, 1, 1000);
LogicNetwork(GRAPH_3, 100, 2, 1, 1000);
LogicNetwork(GRAPH_4, 100, 2, 1, 1000);
LogicNetwork(GRAPH_5, 100, 2, 1, 1000);
    TEST("logic network")

    // TEST_BLOCK("simple input-output case");
    // add_node(GRAPH_1);
    // connect(GRAPH_1, 0, 1, 0);
    // set_input_value(GRAPH_1, 0, 1);
    // exec(GRAPH_1);

    // print_output_values(GRAPH_1);

    // expect(get_output_value(GRAPH_1, 0), 1);
    // exec(GRAPH_1);
    // expect(get_output_value(GRAPH_1, 0), 1);
    // END_TEST_BLOCK();

    TEST_BLOCK("nor test case");
    add_node(GRAPH_2);
    reset_network(GRAPH_2);
    connect(GRAPH_2, 0, 3, 0);
    connect(GRAPH_2, 1, 3, 1);
    connect(GRAPH_2, 3, 2, 0);

    set_input_value(GRAPH_2, 0, 0);
    set_input_value(GRAPH_2, 1, 0);
    exec(GRAPH_2);
    expect(get_output_value(GRAPH_2, 0), 1);

    set_input_value(GRAPH_2, 0, 1);
    set_input_value(GRAPH_2, 1, 0);
    exec(GRAPH_2);
    expect(get_output_value(GRAPH_2, 0), 0);

    set_input_value(GRAPH_2, 0, 0);
    set_input_value(GRAPH_2, 1, 1);
    exec(GRAPH_2);
    expect(get_output_value(GRAPH_2, 0), 0);

    set_input_value(GRAPH_2, 0, 1);
    set_input_value(GRAPH_2, 1, 1);
    exec(GRAPH_2);
    expect(get_output_value(GRAPH_2, 0), 0);

    END_TEST_BLOCK();

    // SEE PHYSICAL ATTACHEMENT #1
    TEST_BLOCK("AND test case");
    add_node(GRAPH_3);
    add_node(GRAPH_3);
    add_node(GRAPH_3);

    reset_network(GRAPH_3);

    connect(GRAPH_3, 0, 3, 0);
    connect(GRAPH_3, 0, 3, 1);

    connect(GRAPH_3, 1, 4, 1);
    connect(GRAPH_3, 1, 4, 0);

    connect(GRAPH_3, 3, 5, 1);
    connect(GRAPH_3, 4, 5, 0);

    connect(GRAPH_3, 5, 2, 0);

    set_input_value(GRAPH_3, 0, 0);
    set_input_value(GRAPH_3, 1, 0);
    exec(GRAPH_3);
    expect(get_output_value(GRAPH_3, 0), 0);

    set_input_value(GRAPH_3, 0, 0);
    set_input_value(GRAPH_3, 1, 1);
    exec(GRAPH_3);
    expect(get_output_value(GRAPH_3, 0), 0);

    set_input_value(GRAPH_3, 0, 1);
    set_input_value(GRAPH_3, 1, 0);
    exec(GRAPH_3);
    expect(get_output_value(GRAPH_3, 0), 0);

    set_input_value(GRAPH_3, 0, 1);
    set_input_value(GRAPH_3, 1, 1);
    exec(GRAPH_3);
    expect(get_output_value(GRAPH_3, 0), 1);

    END_TEST_BLOCK()

  // SEE PHYSICAL ATTACHEMENT #2

    return 0;
}