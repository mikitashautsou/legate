import { question } from "readline-sync"
import { execute, reset_network } from "./executor"
import { render_graph, render_graph_async } from "./graph"
import { EDGE, IAction, IAddNorAction, IConnectAction, IDisconnectAction, IEdge, IElement, INetwork, INPUT, IRemoveNorAction, NOR, OUTPUT, print_actions, Signal } from "./network"
import { clone, last, random_element } from "./utils"
import { start_timer, check_timer } from './timer'

import { apply_action, init_search } from './network_changer'

type Executor = (inputs: Signal[]) => Signal[]



export const search_with_simulated_annealing = async (
    inputs_count: number,
    outputs_count: number,
    fitness_function: (executor: Executor) => number,
    max_time: number,
    tempreature: number,
    decay_factor: number
) => {

    let { inputs, outputs, edges, elements, available_actions } = init_search(inputs_count, outputs_count)

    let current_fitness = -Infinity
    let best_model: INetwork & { available_actions: Set<IAction> } = structuredClone({
        inputs,
        outputs,
        elements,
        edges,
        available_actions
    })

    const execute_func: Executor = (values: Signal[]) => execute(inputs, outputs, values)
    start_timer(max_time)
    let max_distance = 1
    // let just_after_commiting_edges_count: number = 0
    // let just_after_commiting_nodes_count: number = 0
    while (check_timer() && tempreature >= 1) {

        const model_copy = structuredClone(best_model)
        inputs = model_copy.inputs
        outputs = model_copy.outputs
        elements = model_copy.elements
        edges = model_copy.edges
        available_actions = model_copy.available_actions

        tempreature *= decay_factor

        for (let i = 0; i < tempreature; ++i) {
            apply_action(edges, elements, random_element(available_actions), available_actions)
        }

        let new_fitness: number;
        try {
            reset_network(elements, edges)
            new_fitness = fitness_function(execute_func) - edges.size * 0.0001 - elements.size * 0.001
        } catch (e) {
            new_fitness = - Infinity
        }
        // console.log({ max_distance, new_fitness, edges: edges.size, nodes: elements.size })
        if (new_fitness > current_fitness) {
            console.log('best result so far: ', Math.ceil(new_fitness), 'tempreature: ', tempreature)
            current_fitness = new_fitness
            best_model = structuredClone({
                inputs,
                outputs,
                elements,
                edges,
                available_actions
            })
        }
    }

    inputs = best_model.inputs
    outputs = best_model.outputs
    elements = best_model.elements
    edges = best_model.edges
    available_actions = best_model.available_actions


    render_graph(elements)
    window.d_exec = (inputs) => execute_func(inputs)
    return {
        fitness: current_fitness,
        execute: (inputs: Signal[]) => execute_func(inputs)
    }



}


