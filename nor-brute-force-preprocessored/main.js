import { declare_advanced_array, get_element } from "./core/collections/advanced_array/index.js";
import { Main, printInt } from "./core/core.js";
import { create_logic_network } from "./logic-network/logic-network.js";




console.log(Main(
    // declare_advanced_array('test_array', 10),
    // printInt(get_element('test_array', 0)),
    create_logic_network('test_network', 5, 2, 1, 1000)
))