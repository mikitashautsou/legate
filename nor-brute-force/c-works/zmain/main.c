#define LOGIC_NETWORK_DEBUG_PRINT

#include <stdio.h>
#include "../nors/logic-network/logic-network.h"
#include "../nors/solution-searcher/no-nodes-solultion-searcher.h"
#include "../nors/solution-searcher/fitness-functions/nor-fitness-function.h"

LogicNetwork(SANDBOX_LOGIC_NETWORK, 100, 2, 1, 10000);

int main()
{
    add_node(SANDBOX_LOGIC_NETWORK);
    search_logic_circuit_network(SANDBOX_LOGIC_NETWORK, nor_fitness_function);
    logic_network_print_config(SANDBOX_LOGIC_NETWORK);
}
