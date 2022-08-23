// DEBUG search
    // window.d_info = () => {
    //     console.log('available_actions: ', Array.from(available_actions).map((a, i) => {

    //         if (a.type === 'connect') {
    //             return `${i}. connect ${a.from.id}(${a.from_input_index}) -> ${a.to.id}(${a.to_output_index})`
    //         } else if (a.type === 'disconnect') {
    //             return `${i}. disconnect ${a.target.from.id}(${a.originator.from_input_index}) -> ${a.target.to.id}(${a.originator.to_output_index})`
    //         } else if (a.type === 'remove_nor') {
    //             return `${i}. remove ${a.target.id}`
    //         } else {
    //             return `${i}. ${a.type}`
    //         }
    //     }).join('\n'), available_actions)
    //     render_graph(elements)
    // }
    // window.d_apply_action = (action_index) => {
    //     const rollback_action = apply_action(edges, elements, Array.from(available_actions)[action_index], available_actions, inputs_count + outputs_count)
    //     way_back_actions.push(rollback_action)
    //     render_graph(elements)

    // }
    // window.d_rollback = () => {
    //     apply_action(edges, elements, way_back_actions.pop(), available_actions, inputs_count + outputs_count)
    //     render_graph(elements)


    // }