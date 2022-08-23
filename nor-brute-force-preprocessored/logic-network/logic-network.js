import { create_circular_array } from "../collections/circular-array/circular-array.js"
import { combine, istructure } from "../core/core.js"




export const create_logic_network = (network_name, max_nodes, inputs_count, outputs_count, max_nodes_to_be_executed) => {


    return `
int logic_network_${network_name}_MAX_NODES = ${max_nodes};                                                                                                                               
int logic_network_${network_name}_INPUTS_COUNT = ${inputs_count};                                                                                                                         
int logic_network_${network_name}_OUTPUTS_COUNT = ${outputs_count};                                                                                                                       
int logic_network_${network_name}_IO_COUNT = logic_network_${network_name}_INPUTS_COUNT + logic_network_${network_name}_OUTPUTS_COUNT;                                                         
int logic_network_${network_name}_MAX_NODES_TO_BE_EXECUTED = ${max_nodes_to_be_executed};                 /* replace with dynamic resizing */                        
int logic_network_${network_name}_CONNECTIONS[logic_network_${network_name}_MAX_NODES][logic_network_${network_name}_MAX_NODES][2] = {0}; /* TODO: use binary number representation instead of 2? */ 
int logic_network_${network_name}_SIZE = logic_network_${network_name}_INPUTS_COUNT + logic_network_${network_name}_OUTPUTS_COUNT;                                                                   
int logic_network_${network_name}_INPUT_VALUES[logic_network_${network_name}_INPUTS_COUNT] = {0};                     
${create_circular_array(network_name, max_nodes_to_be_executed)}                                                                           
CircularArray(logic_network_${network_name}_ACTIVATED_NODES, logic_network_${network_name}_MAX_NODES_TO_BE_EXECUTED, int);                                                                       
int logic_network_${network_name}_NODE_VALUES[logic_network_${network_name}_MAX_NODES] = {0};                                                                                                    
int logic_network_${network_name}_EDGES_VALUES[logic_network_${network_name}_MAX_NODES][logic_network_${network_name}_MAX_NODES][2] = {0}; /*2 - for left/right inputs*/                             
int is_last_execution_successfull_logic_netwok_##network = 1;
`
}