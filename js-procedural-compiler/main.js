import { CircularArray } from "./collections/circular_array.js";
import { main } from "./core/main.js";
import { LogicNetwork } from "./nors/logic-network/logic-network.js";









// const circularArray1 = CircularArray('test_array', 10, 'int')
const logicNetwork = LogicNetwork('test_network', 5, 2, 1, 1000);

console.log(main(
    `
        ${logicNetwork.init()}
        ${logicNetwork.set_input_value(0, 1)}
    `

))


// ${circularArray1.init()}
// ${circularArray1.enqueue('1;')}
// printf("result: %d\\r\\n", ({ ${circularArray1.dequeue()} }));
// printf("result: %d\\r\\n", ({ ${circularArray1.dequeue()} }));