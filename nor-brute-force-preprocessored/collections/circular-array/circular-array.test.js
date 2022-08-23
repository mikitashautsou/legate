import { expect, Test, TestBlock } from "../../core/test-utils.js";
import { create_circular_array, dequeue_element, enqueue_element } from "./circular-array.js";



console.log(Test(
    'Circular array test',
    TestBlock('Circular array utils test, base usage',
        `
        ${create_circular_array('test_array', 5)}
        ${enqueue_element('test_array', 1)}
        ${enqueue_element('test_array', 2)}
        ${enqueue_element('test_array', 3)}
        ${expect(dequeue_element('test_array'), 1)};
        ${expect(dequeue_element('test_array'), 2)};
        ${expect(dequeue_element('test_array'), 3)};
    `),
    TestBlock('Circular array utils test, cycling usage',
        `
        ${create_circular_array('test_array_2', 2)}
        ${enqueue_element('test_array_2', 1)}
        ${expect(dequeue_element('test_array_2'), 1)};
        ${enqueue_element('test_array_2', 2)}
        ${expect(dequeue_element('test_array_2'), 2)};
        ${enqueue_element('test_array_2', 3)}
        ${expect(dequeue_element('test_array_2'), 3)};
        ${enqueue_element('test_array_2', 4)}
        ${expect(dequeue_element('test_array_2'), 4)};
        `
    ),
    TestBlock('Circular array utils test, empty array usage',
        `
        ${create_circular_array('test_array_3', 3)}
        ${enqueue_element('test_array_3', 1)}
        ${enqueue_element('test_array_3', 2)}
        ${expect(dequeue_element('test_array_3'), 1)};
        ${expect(dequeue_element('test_array_3'), 2)};
        ${expect(dequeue_element('test_array_3'), -1)};
        `
    )
))