import { CircularArray } from "../../collections/circular_array.js";

export const LogicNetwork = (
  name,
  max_nodes,
  inputs_count,
  outputs_count,
  max_nodes_to_be_executed
) => {
  const networkId = `logic_network_${name}`;
  const activated_nodes_descriptor = `${networkId}_activated_nodes`
  const connections_descriptor = `${networkId}_CONNECTIONS`;
  const input_values_descriptor = `${networkId}_INPUT_VALUES`;
  const node_values_descriptor = `${networkId}_NODES_VALUES`;
  const edges_values_descriptor = `${networkId}_EDGES_VALUES`;
  const is_last_execution_halt = `${networkId}_is_last_execution`
  const size_descriptor = `${networkId}_SIZE`
 

  const activatedNodesArray = CircularArray(
    activated_nodes_descriptor,
    max_nodes_to_be_executed,
    "int"
  );

  return {
    name,
    max_nodes,
    inputs_count,
    outputs_count,
    max_nodes_to_be_executed,
    init: () => `
            int ${connections_descriptor}[${max_nodes}][${max_nodes}] = {0}; /* TODO: use binary number representation instead of 2? */ 
            int ${size_descriptor} = ${
      inputs_count + outputs_count
    };                                                                   
            int ${input_values_descriptor}[${inputs_count}] = {0};                                                                                                
            ${activatedNodesArray.init()}                                                                
            int ${node_values_descriptor}[${max_nodes}] = {0};                                                                                                    
            int ${edges_values_descriptor}[${max_nodes}][${max_nodes}][2] = {0}; /*2 - for left/right inputs*/                             
            int ${is_last_execution_halt} = 1;
        `,
    connect: (from, to, type) => `
            ${connections_descriptor}[${from}][${to}] |= ${type} == 0 ? 0b10 : 0b01;
        `,
    disconnect: (from, to, type) => `
            ${connections_descriptor}[${from}][${to}] &= type == 0 ? 0b01 : 0b10;
        `,
    set_input_value: (input_index, value) => `
            ${networkId}_INPUT_VALUES[${input_index}] = ${value};
        `,
    activate_input_edges: () => `
      for (int i = 0; i < ${inputs_count}; i += 1) {
        ${node_values_descriptor}[i] = ${input_values_descriptor}[i];
        for (int to_idx = 0; to_idx < ${max_nodes} += 1) {
          int has_left_connection = ${connections_descriptor}[i][to_id] & 0b10;
          int [[has_right_connection]] = ${connections_descriptor}[i][to_id] & 0b01;
          if (has_left_connection) {
            int value = ${input_values_descriptor}[i];
            if (value) {
              ${edges_values_descriptor}[i][to_id] |= 0b10; 
            } else {
              ${edges_values_descriptor}[i][to_id] &= 0b01;
            }
          }
          if (has_right_connection) {
             value = ${input_values_descriptor}[i];
            if (value) {
              ${edges_values_descriptor}[i][to_id] |= 0b01; 
            } else {
              ${edges_values_descriptor}[i][to_id] &= 0b10;
            }
          }
          if (has_right_connection || has_left_connection) {
            ${activatedNodesArray.enqueue(to_id)}
          }
        }
s      }
    `
  };
};

