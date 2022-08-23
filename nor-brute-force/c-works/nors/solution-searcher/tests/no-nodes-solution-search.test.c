#define DEBUG_NO_NODES_SEARCHER
#include <stdio.h>
#include "../../../utils/test-utils/test_utils.h"
#include "../no-nodes-solultion-searcher.h"
#include "../fitness-functions/input-output.h"
#include "../fitness-functions/nor-fitness-function.h"

LogicNetwork(TEST_NETWORK_FOR_SIO, 3, 2, 1, 1000);
LogicNetwork(NETWORK_FOR_NOR_SYNTHESIS, 10, 2, 1, 1000);

int main()
{
    TEST("no-nodes-solution-search");
    TEST_BLOCK("synthesizing simple input output");

    search_logic_circuit_network(TEST_NETWORK_FOR_SIO, input_output_fitness_function);

    set_input_value(TEST_NETWORK_FOR_SIO, 0, 0);
    exec(TEST_NETWORK_FOR_SIO);
    expect(get_output_value(TEST_NETWORK_FOR_SIO, 0), 0);

    set_input_value(TEST_NETWORK_FOR_SIO, 0, 1);
    exec(TEST_NETWORK_FOR_SIO);
    expect(get_output_value(TEST_NETWORK_FOR_SIO, 0), 1);

    END_TEST_BLOCK();

    TEST_BLOCK("synthesizing NOR behaviour");

    add_node(NETWORK_FOR_NOR_SYNTHESIS);
    search_logic_circuit_network(NETWORK_FOR_NOR_SYNTHESIS, nor_fitness_function);

    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 0, 0);
    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 1, 0);
    exec(NETWORK_FOR_NOR_SYNTHESIS);
    expect(get_output_value(NETWORK_FOR_NOR_SYNTHESIS, 0), 1);

    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 0, 0);
    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 1, 1);
    exec(NETWORK_FOR_NOR_SYNTHESIS);
    expect(get_output_value(NETWORK_FOR_NOR_SYNTHESIS, 0), 0);

    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 0, 1);
    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 1, 0);
    exec(NETWORK_FOR_NOR_SYNTHESIS);
    expect(get_output_value(NETWORK_FOR_NOR_SYNTHESIS, 0), 0);

    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 0, 1);
    set_input_value(NETWORK_FOR_NOR_SYNTHESIS, 1, 1);
    exec(NETWORK_FOR_NOR_SYNTHESIS);
    expect(get_output_value(NETWORK_FOR_NOR_SYNTHESIS, 0), 0);

    END_TEST_BLOCK();

    return 0;
}