
const fs = require('fs')
const { exit } = require('process')
const { solve, inRange } = require('yalps')

const TARGET_DAYS = 1
const PRODUCTS = [

    {
        name: "Banana",
        calories: 89,
        fats: 0.3,
        saturated_fats: 0.1,
        protein: 1.1,
        carbohydrate: 23,
        cholesterol: 0,
        sodium: 1,
        sugar: 12,
        vitamin_a: 64,
        vitamin_c: 8.7,
        potassium: 358,
        max: 2,
        fiber: 2.6,
        vitamin_b6: 0.4, //µg
        vitamin_b12: 0, //µg
    },
    {
        name: 'Radish 100g',
        calories: 16,
        fats: 0.1,
        saturated_fats: 0,
        protein: 0.7,
        carbohydrate: 3.4,
        cholesterol: 0,
        sodium: 39,
        sugar: 1.9,
        vitamin_a: 7,
        potassium: 233,
        max: 0.4 * 5,
        fiber: 1.6,
        vitamin_c: 14.8,
        vitamin_b6: 0.071,
        vitamin_b12: 0,
    },
    {
        name: 'Butter 82% 100g',
        calories: 746,
        fats: 82,
        saturated_fats: 51,
        protein: 0.7,
        carbohydrate: 0.8,
        cholesterol: 215,
        sodium: 11,
        sugar: 0.1,
        vitamin_a: 2499,
        potassium: 24,
        fiber: 0,
        vitamin_c: 0,
        max: Infinity,
        vitamin_b6: 0,
        vitamin_b12: 0.2,
    },
    {
        name: 'Egg(boiled) 100g',
        calories: 155,
        fats: 11,
        saturated_fats: 3.3,
        protein: 13,
        carbohydrate: 1.1,
        cholesterol: 373,
        sodium: 124,
        sugar: 1.1,
        vitamin_a: 520,
        potassium: 126,
        fiber: 0,
        max: 1,
        vitamin_c: 0,
        vitamin_b6: 0.1,
        vitamin_b12: 1.1,
    },
    {
        name: 'Walnuts 100g',
        calories: 654,
        fats: 65,
        saturated_fats: 6,
        protein: 15,
        carbohydrate: 14,
        cholesterol: 0,
        sodium: 2,
        sugar: 0.7,
        vitamin_a: 20,
        potassium: 441,
        fiber: 7,
        max: 3,
        vitamin_c: 1.3,
        vitamin_b6: 0.5,
        vitamin_b12: 0,
    },
    {
        name: 'Boiled chicken fillet',//https://www.nutritionix.com/food/boiled-chicken-breast
        calories: 142,
        fats: 28,
        saturated_fats: 0.9,
        protein: 27,
        carbohydrate: 0,
        cholesterol: 73,
        sodium: 64,
        sugar: 0,
        vitamin_a: 21,
        potassium: 223,
        fiber: 0,
        max: 5,
        vitamin_c: 0,
        vitamin_b6: 0.4,
        vitamin_b12: 0.3,

    },
    {
        name: 'Fasola Piekny jas white beans(boiled)',
        calories: 140,
        fats: 0.6,
        saturated_fats: 0.1,
        protein: 8,
        carbohydrate: 26,
        cholesterol: 0,//?
        sodium: 10,
        sugar: 0.6,
        vitamin_a: 0,
        potassium: 389,
        max: 1,
        fiber: 11,
        vitamin_c: 0.9,
        vitamin_b6: 0.2,
        vitamin_b12: 0,
    },
    {
        name: 'Cottage cheese',
        calories: 98,
        fats: 4.3,
        saturated_fats: 1.7,
        protein: 11,
        carbohydrate: 3.4,
        cholesterol: 17,
        sodium: 364,
        sugar: 2.7,
        vitamin_a: 140,
        potassium: 104,
        max: 1,
        fiber: 0,
        vitamin_c: 0,
        vitamin_b6: 0,
        vitamin_b12: 0.4,
    },
    {
        name: 'Carrot 100g',
        calories: 41,
        fats: 0.2,
        saturated_fats: 0,
        protein: 0.9,
        carbohydrate: 20,
        cholesterol: 0,
        sodium: 69,
        sugar: 4.7,
        vitamin_a: 16706,
        potassium: 320,
        max: 10,
        fiber: 0.1,
        vitamin_c: 5.9,
        vitamin_b6: 0.1,
        vitamin_b12: 0,
    },
    {
        name: 'Pasta coocked',
        calories: 131,
        fats: 1.1,
        saturated_fats: 0.2,
        protein: 5,
        carbohydrate: 25,
        cholesterol: 33,
        sodium: 6,
        sugar: 0.8,
        vitamin_a: 20,
        potassium: 24,
        max: 1,
        fiber: 1.2,
        vitamin_c: 0,
        vitamin_b6: 0,
        vitamin_b12: 0.1,
    },
    {
        name: 'Peanut butter 100g',
        calories: 588,
        fats: 50,
        saturated_fats: 10,
        protein: 25,
        carbohydrate: 20,
        cholesterol: 0,
        sodium: 17,
        sugar: 9,
        vitamin_a: 0,
        potassium: 649,
        max: 1,
        fiber: 6,
        vitamin_c: 0,
        vitamin_b6: 0.5,
        vitamin_b12: 0,
    },
    {
        name: 'Honey 100g',
        calories: 304,
        fats: 0,
        saturated_fats: 0,
        protein: 0.3,
        carbohydrate: 82,
        cholesterol: 0,
        sodium: 4,
        sugar: 82,
        vitamin_a: 0,
        potassium: 52,
        max: 3,
        fiber: 0.2,
        vitamin_c: 0.5,
        vitamin_b6: 0,
        vitamin_b12: 0,
    },
    {
        name: 'White bread 100g',
        calories: 265,
        fats: 3.2,
        saturated_fats: 0.7,
        protein: 9,
        carbohydrate: 49,
        cholesterol: 0,
        sodium: 491,
        sugar: 5,
        vitamin_a: 1,
        potassium: 115,
        max: 3,
        fiber: 2.7,
        vitamin_c: 0,
        vitamin_b6: 0.1,
        vitamin_b12: 0,
    },
    {
        name: 'Orange juice 100g',
        calories: 45,
        fats: 0.2,
        saturated_fats: 0,
        protein: 0.7,
        carbohydrate: 10,
        cholesterol: 0,
        sodium: 1,
        sugar: 8,
        vitamin_a: 200,
        potassium: 200,
        max: 2,
        fiber: 0.2,
        vitamin_c: 50,
        vitamin_b6: 0,
        vitamin_b12: 0,
    },
    {
        name: 'Sugar 100g',
        calories: 387,
        fats: 0,
        saturated_fats: 0,
        protein: 0,
        carbohydrate: 100,
        cholesterol: 0,
        sodium: 1,
        sugar: 100,
        vitamin_a: 0,
        potassium: 2,
        fiber: 0,
        max: 2,
        vitamin_c: 0,
        vitamin_b6: 0,
        vitamin_b12: 0,
    },
    {
        name: 'Apple 100g',
        calories: 52,
        fats: 0.2,
        saturated_fats: 0,
        protein: 0.3,
        carbohydrate: 14,
        cholesterol: 0,
        sodium: 1,
        sugar: 10,
        vitamin_a: 54,
        potassium: 107,
        fiber: 2.4,
        max: 2,
        vitamin_c: 4.6,
        vitamin_b6: 0,
        vitamin_b12: 0,
    },

    //https://peanut-institute.com/peanut-facts/nutritional-breakdown/#nutritional|1 - roasted peanut 40%
    // https://www.google.com/search?q=raisin+nutrition+facts&oq=raisin+nut&aqs=chrome.0.0i20i263i512j0i512l2j69i57j0i512l6.2117j0j9&sourceid=chrome&ie=UTF-8 - raisin 35%
    // https://www.google.com/search?q=nuts+nutrition+facts+100g&oq=nuts+nutriti&aqs=chrome.1.69i57j0i20i263i512j0i512l2j0i20i263i512j0i512l5.3933j0j4&sourceid=chrome&ie=UTF-8 nut - 15%
    //peach
    {
        name: 'Helio Miesznka studencka 100g',
        calories: ((166) * 0.4 + 299 * 0.35 + 607 * 0.15),
        fats: ((14.1) * 0.4 + 0.5 * 0.35 + 54 * 0.15),
        saturated_fats: ((2.2) * 0.4 + 0.1 * 0.35 + 9 * 0.15),
        protein: ((6.9) * 0.4 + 3.1 * 0.35 + 20 * 0.15),
        carbohydrate: ((6) * 0.4 + 79 * 0.35 + 21 * 0.15),
        cholesterol: ((0) * 0.4 + 0 * 0.35 + 0 * 0.15),
        sodium: (116 * 0.4 + 11 * 0.35 + 273 * 0.15),
        sugar: (0 + 59 * 0.35 + 4.2 * 0.15),
        vitamin_a: (0 + 0 * 0.35 + 3 * 0.15),
        potassium: (180 + 749 * 0.35 + 705 * 0.15),
        fiber: (2.4 * 0.4 + 0.35 * 1 + 12.5 * 0.15),
        vitamin_c: (0 * 0.4 + 0 * 0.35 + 2.3 * 0.15),
        max: 5,
        vitamin_b6: (0.6 * 0.4 + 0.2 * 0.35 + 0.4 * 0.15),
        vitamin_b12: 0,
    },

    // https://www.urmc.rochester.edu/encyclopedia/content.aspx?contenttypeid=76&contentid=20010-1
    // https://www.carbmanager.com/food-detail/nl:bbb3dd32e8924c5e88467d534c8f7a98/buckwheat-groats-roasted-cooked
    {
        name: 'Buckwheat, coocked 100g',
        calories: 154 / 168 * 100,
        fats: 1.04 / 168 * 100,
        saturated_fats: 0.23 / 168 * 100,
        protein: 5.7 / 168 * 100,
        carbohydrate: 33.5 / 168 * 100,
        cholesterol: 0 / 168 * 100,
        sodium: 6.7 / 168 * 100,
        sugar: 1.5 / 168 * 100,
        vitamin_a: 0 / 168 * 100,
        potassium: 147.8 / 168 * 100,
        fiber: 4.5 / 168 * 100,
        max: Infinity,
        vitamin_c: 0,
        vitamin_b6: 0.13 / 168 * 100,
        vitamin_b12: 0,
    }
]

//
//vitamins https://www.goodnet.org/articles/11-essential-vitamins-minerals-your-body-needs
// https://www.hsph.harvard.edu/nutritionsource/vitamins/
// fiber
// more vitamins:     // https://www.urmc.rochester.edu/encyclopedia/content.aspx?contenttypeid=76&contentid=20010-1
// https://www.carbmanager.com/food-detail/nl:bbb3dd32e8924c5e88467d534c8f7a98/buckwheat-groats-roasted-cooked
// B vitamins, calcium, phosphorus, and selenium.
const RANGED_TARGETS = {
    calories: {
        min: 2000,
        max: 3000,
    },
    cholesterol: {
        min: 0,
        ideal: 0,
        max: 300
    },
    sodium: {
        min: 0,
        max: 2000,
    },
    vitamin_a: {
        min: 3000, //https://www.hsph.harvard.edu/nutritionsource/vitamins/
        ideal: 2500,
        max: 5000, //actually it can be 10k
        // max: 7000, //https://www.google.com/search?q=max+vittamin+a&oq=max+vittamin+a&aqs=chrome..69i57j0i13l9.3810j0j7&sourceid=chrome&ie=UTF-8
    },
    saturated_fats: {
        min: 0,
        ideal: 0,
        max: 27 // 2500 / 9 * 0.1 = 27 https://www.who.int/news-room/fact-sheets/detail/healthy-diet
    },
    fats: {
        min: 55, //2500 / 9 * 0.20 https://blog.nasm.org/how-many-grams-of-fat-per-day-to-lose-weight
        max: 83 //2500 / 9 * 0.30
    },
    protein: {
        min: 62.5, //2500 / 4 * 0.10, //https://www.google.com/search?q=protein+per+day&oq=protein+pe&aqs=chrome.0.69i59j69i57j0i512l4j0i20i263i512j0i512l3.1559j0j4&sourceid=chrome&ie=UTF-8
        max: 218.75, //2500 / 4 * 0.35,
    },
    carbohydrate: {
        min: 281.25, //2500 / 4 * 0.45, https://www.google.com/search?q=carbohydrate+per+dya&sxsrf=ALiCzsb6vQYA7qIUzy5fgS-NtgZjqpMyDQ%3A1659179525468&ei=BRLlYsqUHOnHrgSfnL2YAg&ved=0ahUKEwiKq--xvaD5AhXpo4sKHR9ODyMQ4dUDCA4&uact=5&oq=carbohydrate+per+dya&gs_lcp=Cgdnd3Mtd2l6EAMyBwgjELACECcyBAgAEA0yBAgAEA0yBAgAEA0yCAgAEB4QFhAKMggIABAeEA0QBTIICAAQHhANEAUyCAgAEB4QDRAFMggIABAeEA0QBTIKCAAQHhANEAUQCjoHCAAQRxCwAzoECCMQJzoGCAAQHhAWOgUIABCABDoKCAAQgAQQhwIQFEoECEEYAEoECEYYAFDhBFiiCmDHC2gBcAF4AYABW4gBsQSSAQE3mAEAoAEByAEIwAEB&sclient=gws-wiz
        max: 406.25 //2500 / 4 * 0.65,
    },
    sugar: {
        min: 0,
        ideal: 0,
        max: 62.5 //2500 / 4 * 0.1
    },
    potassium: {
        min: 3500,
        max: 4700,
    },
    fiber: {
        min: 30,
        max: 70, // https://www.google.com/search?q=fiber+per+day&oq=fiber&aqs=chrome.0.69i59j69i57j46i175i199i512j0i512j46i175i199i512j0i512l2j69i60.1058j0j9&sourceid=chrome&ie=UTF-8
    },
    vitamin_c: {
        min: 90,
        ideal: 90,
        max: 2000
    },
    vitamin_b6: {
        min: 1.7,
        max: 200
    },
    // vitamin_b12: {
    //     min: 6,
    //     max: 2000
    // },

}
const TARGET_VALUES = Object.fromEntries(Object.entries(RANGED_TARGETS).map(([k, v]) => [k, (v.ideal !== undefined ? v.ideal : (v.max + v.min) / 2) * TARGET_DAYS]))
// calories: 2500 * 7,
// saturated_fats: 0 * 7,//less than 30
// cholesterol: 0 * 7, //less than 300mg
// sodium: 0 * 7, //less than 2000mg,
// vitamin_a: 3000 * 7, //900 mcg RAE for men (equivalent to 3,000 IU) 


// TARGET_VALUES.fats = TARGET_VALUES.calories / 9 * 0.25
// TARGET_VALUES.protein = TARGET_VALUES.calories / 4 * 0.225  //protein: //10% - 35%
// TARGET_VALUES.carbohydrate = TARGET_VALUES.calories / 4 * 0.525
// TARGET_VALUES.sugar = (TARGET_VALUES.calories / 4) * 0.05

const calculate_total_plan_values = (plan) => {

    const result_values = {}
    for (const item of plan) {
        for (const attribute in item) {
            if (result_values[attribute] === undefined) {
                result_values[attribute] = 0
            }
            result_values[attribute] += parseFloat(item[attribute]) || 0
        }
    }
    return result_values
}
const getPlanDiff = (plan_values) => {
    const diffs = {}
    for (const targetValueName in TARGET_VALUES) {
        diffs[targetValueName] = ((plan_values[targetValueName] || 0) / (TARGET_VALUES[targetValueName]))
    }
    return diffs
}

const TARGET_RANGES = {
    calories: {
        min: 2000,
        max: 3000,
    }
}
const calculate_plan_fitness_using_ranges = (plan_values, ranged_targets) => {
    const scores = []
    for (const targetRange in ranged_targets) {
        if (plan_values[targetRange] < ranged_targets[targetRange].min * TARGET_DAYS) {
            scores.push(-100_000 - (ranged_targets[targetRange].min * TARGET_DAYS - plan_values[targetRange]))
        }
        if (plan_values[targetRange] > (ranged_targets[targetRange].max * TARGET_DAYS)) {
            scores.push(-100_000 - (plan_values[targetRange] - ranged_targets[targetRange].max * TARGET_DAYS))
        }
        let ideal_value = ranged_targets[targetRange].ideal
        if (ideal_value === undefined) {
            const mid_target_value = (ranged_targets[targetRange].max * TARGET_DAYS + ranged_targets[targetRange].min * TARGET_DAYS) / 2
            ideal_value = mid_target_value
        } else {
            ideal_value *= TARGET_DAYS
        }

        const plan_value = plan_values[targetRange]
        if (plan_value <= ideal_value) {
            scores.push(Math.pow(plan_value / ideal_value, 2))
        } else {
            scores.push(Math.pow(ideal_value / plan_value, 2))
        }
    }
    let sum = 0
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i]
    }
    return sum / scores.length
}

const calculate_plan_fitness = (plan_values) => {

    // if (plan_values.saturated_fats > 30 * 7) {
    //     return 0
    // }
    // if (plan_values.cholesterol > 300 * 7) {
    //     return 0
    // }
    // if (plan_values.sodium > 2000 * 7) {
    //     return 0
    // }
    // if (plan)
    // let min = Infinity
    // for (const targetValueName in TARGET_VALUES) {
    //     const plan_value = Math.abs((plan_values[targetValueName] || 0))
    //     const target_value = TARGET_VALUES[targetValueName]
    //     let score;
    //     if (plan_value <= target_value) {
    //         score = plan_value / target_value
    //     } else {
    //         score = target_value / plan_value
    //     }
    //     if (score < min) {
    //         min = score
    //     }
    // }
    // return min

    const scores = []
    for (const targetValueName in TARGET_VALUES) {
        const plan_value = Math.abs((plan_values[targetValueName] || 0))
        const target_value = TARGET_VALUES[targetValueName]
        if (plan_value <= target_value) {
            scores.push(Math.pow(plan_value / target_value, 1))
        } else {
            scores.push(Math.pow(target_value / plan_value, 1))
        }
        if (scores[scores.length - 1] > 100) {
            console.log('imposter')
        }
    }
    let sum = 0
    for (let i = 0; i < scores.length; i++) {
        sum += scores[i]
    }

    return sum / scores.length

    // let fitness = 0
    // for (const targetValueName in TARGET_VALUES) {
    //     fitness -= Math.abs((plan_values[targetValueName] || 0) - (TARGET_VALUES[targetValueName]))
    // }
    // return fitness
}

const find_plan = () => {


    let currentPlan = []
    let maxFitness = -Infinity
    let bestPlan = []

    while (true) {
        currentPlan.push(PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)])
        const plan_totals = calculate_total_plan_values(currentPlan)
        if (plan_totals.calories >= 2500 * 7) {
            break;
        }
    }

    while (true) {


        const previousPlan = currentPlan.slice()

        for (let i = 0; i < 10; i++) {
            currentPlan[Math.floor(Math.random() * currentPlan.length)] = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)]
        }
        let plan_totals = calculate_total_plan_values(currentPlan)

        if (plan_totals.calories > 2500) {
            while (true) {
                if (plan_totals.calories > 2500) {
                    currentPlan.pop()
                    plan_totals = calculate_total_plan_values(currentPlan)
                } else {
                    break;
                }
            }
        } else {
            while (true) {
                if (plan_totals.calories < 2500) {
                    currentPlan.push(PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)])
                    plan_totals = calculate_total_plan_values(currentPlan)
                } else {
                    break;
                }

            }
        }

        plan_totals = calculate_total_plan_values(currentPlan)

        const fitness = calculate_plan_fitness(plan_totals)
        if (fitness > maxFitness) {
            maxFitness = fitness
            bestPlan = currentPlan
            console.log('plan: ', bestPlan.map(p => p.name), plan_totals, 'current fitness', fitness,)
        } else {
            currentPlan = previousPlan
        }

    }
}


const random_element = (collection) => collection[random_index(collection)]
const random_index = (collection) => Math.floor(Math.random() * collection.length)
const one_change_search = () => {
    const minCaloriesProduct = Math.min(...PRODUCTS.map(e => e.calories))
    const maxProductsAmount = Math.floor((RANGED_TARGETS.calories.max + RANGED_TARGETS.calories.min) / 2 / minCaloriesProduct)
    const products_with_nothing_product = PRODUCTS.concat({ calories: 0, name: '-' })
    let currentPlan = new Array(maxProductsAmount).fill(PRODUCTS[PRODUCTS.length - 1])

    let maxFitness = -Infinity
    let bestPlan = []
    let tempreature = maxProductsAmount;
    while (tempreature >= 1) {
        tempreature *= 0.99999
        const temporaryPlan = currentPlan.slice()
        for (let i = 0; i < tempreature; i++) {
            temporaryPlan[random_index(temporaryPlan)] = random_element(products_with_nothing_product)
        }
        const plan_totals = calculate_total_plan_values(temporaryPlan)
        const fitness = calculate_plan_fitness_using_ranges(plan_totals, RANGED_TARGETS)
        if (maxFitness < fitness) {
            maxFitness = fitness
            currentPlan = temporaryPlan
            bestPlan = currentPlan
            console.log('plan: ', bestPlan.map(e => e.name).join(',\n'), 'totals: ', plan_totals, 'fitness: ', fitness)
        }
    }

}

const try_to_add_products = (plan, estimate_result, deepness_limit, check_time) => {

    if (deepness_limit == 0) {
        if (!check_time()) {
            throw new Error('Processing time exceeded')
        }
        estimate_result(plan)
        return
    }
    for (const product of PRODUCTS) {
        plan.push(product)
        try_to_add_products(plan, estimate_result, deepness_limit - 1, check_time)
        plan.pop()

    }
}

const brute_force = (max_time) => {

    let best_fitness = -Infinity;
    let best_plan;
    let current_size = 10
    let start_time = Date.now()
    const check_time = () => Date.now() - start_time < max_time
    let plan = []
    try {
        while (true) {
            try_to_add_products(plan, (plan) => {
                const totals = calculate_total_plan_values(plan)
                const fitness = calculate_plan_fitness(totals)
                if (fitness > best_fitness) {
                    best_fitness = fitness
                    best_plan = structuredClone(plan)
                    console.log('plan: ', plan.map(e => e.name).join(', '), 'totals: ', totals, 'fitness: ', fitness)
                }
            }, current_size, check_time)
            ++current_size
            console.log('NEW SIZE: ', current_size)
        }
    } catch (e) {
        console.log('fitness: ', best_fitness, 'deepness: ', current_size)
        console.log(e)
        return best_plan
    }
}

const random_search = (max_time) => {

    let best_plan = []
    let best_fitness = -Infinity
    let totals;
    let start_time = Date.now()
    while (Date.now() - start_time < max_time) {
        const plan = []
        totals = calculate_total_plan_values(plan)
        let previous_fitness = calculate_plan_fitness(totals)

        while (true) {
            plan.push(random_element(PRODUCTS))
            totals = calculate_total_plan_values(plan)
            const new_fitness = calculate_plan_fitness(totals)
            if (new_fitness < previous_fitness) {
                break;
            }
            previous_fitness = new_fitness
        }
        plan.pop()
        const fitness = previous_fitness
        if (best_fitness < fitness) {
            best_fitness = fitness
            best_plan = plan
            console.log('plan: ', plan.map(e => e.name).join(',\n'), 'totals: ', totals, 'fitness: ', fitness)
        }

    }
    console.table(best_plan.map(i => i.name))
    print_plan_stats(best_plan)
    console.log('fitness: ', best_fitness)
    return best_plan

}

const simplified_simulated_annealing = (max_time) => {

    let best_plan = []
    let best_fitness = -Infinity
    let totals;
    let tempreature = 10000;
    let start_time = Date.now()
    while (Date.now() - start_time < max_time && tempreature >= 1) {
        let plan = structuredClone(best_plan)
        for (let i = 0; i < tempreature; ++i) {
            const choice = Math.random()
            if (choice > 0.7) {
                plan.push(random_element(PRODUCTS))
            } else if (choice > 0.4) {
                plan.splice(Math.floor(Math.random() * plan.length), 1)
            } else {
                plan[Math.floor(Math.random() * plan.length)] = random_element(PRODUCTS)
            }
        }
        tempreature *= 0.99999
        totals = calculate_total_plan_values(plan)
        const fitness = calculate_plan_fitness(totals)
        if (best_fitness < fitness) {
            best_fitness = fitness
            best_plan = plan
            console.log('plan: ', plan.map(e => e.name).join(', '), 'totals: ', totals, 'fitness: ', fitness, 'tempreature: ', tempreature)
        }

    }
    console.table(best_plan.map(i => i.name))
    print_plan_stats(best_plan)
    console.log('fitness: ', best_fitness)
    console.log(Array.from(get_plan_product_counts(best_plan).entries()).map(([element, count]) => `${element.name} X ${count}`))
    return best_plan

}

const improver_algorithm = (max_time) => {

    let best_plan = []
    let plan = []
    let distance = 0
    let best_fitness = -Infinity
    let totals;
    let max_distance = 1
    let start_time = Date.now()
    while (Date.now() - start_time < max_time) {

        const choice = Math.random()
        if (choice > 0.7) {
            plan.push(random_element(PRODUCTS))
        } else if (choice > 0.4) {
            plan.splice(Math.floor(Math.random() * plan.length), 1)
        } else {
            plan[Math.floor(Math.random() * plan.length)] = random_element(PRODUCTS)
        }
        ++distance
        totals = calculate_total_plan_values(plan)
        const fitness = calculate_plan_fitness(totals)
        // console.log('fitness', fitness, 'max_distance', max_distance)
        if (best_fitness < fitness) {
            best_fitness = fitness
            best_plan = plan
            console.log('plan: ', plan.map(e => e.name).join(', \n'), 'totals: ', totals, 'fitness: ', fitness, 'distance: ', distance)
            distance = 1
        } else if (distance > max_distance) {
            max_distance *= 1.000005
            distance = 1
            plan = structuredClone(best_plan)
        }

    }
    console.table(best_plan.map(i => i.name))
    print_plan_stats(best_plan)
    console.log('fitness: ', best_fitness)
    return best_plan

}

const solve_via_linear_programming = (relax_factor) => {
    const model = {
        "direction": "minimize",
        "objective": "saturated_fats",
        "constraints": {
            ...(Object.fromEntries(Object.entries(RANGED_TARGETS).map(([key, value]) => [key, inRange(value.min * relax_factor, value.max * (2 - relax_factor))]))),
            // "plane": { "max": 44 },
            // "person": { "max": 512 },
            // "cost": { "max": 300000 }
        },
        "variables": {
            ...(PRODUCTS.reduce((a, p) => ({ ...a, [p.name]: p }), {})),
            // "brit": {
            //     "capacity": 20000,
            //     "plane": 1,
            //     "person": 8,
            //     "cost": 5000
            // },
            // "yank": {
            //     "capacity": 30000,
            //     "plane": 1,
            //     "person": 16,
            //     "cost": 9000
            // }
        },
    }
    const solution = solve(model)
    console.log(solution)

    // const plan = []

    // for (const variable of solution.variables) {
    //     const product = PRODUCTS.find(p => p.name === variable[0])
    //     for (let i = 0; i < variable[1]; i++) {
    //         plan.push(product)
    //     }
    // }
    // print_plan_stats(plan)
    // const totals = calculate_total_plan_values(plan)
    // console.log('fitness: ', calculate_plan_fitness(totals))
}


const get_plan_product_counts = (plan) => {

    const products = new Map();
    for (const item of plan) {
        if (!products.has(item)) {
            products.set(item, 0)
        }
        products.set(item, products.get(item) + 1)
    }
    return products
}
const gradient_search = () => {

    let currentPlanFitness = -100_000_000

    let plan = []
    while (true) {
        const productFitnessIncreaseMap = new Map()

        for (let product of PRODUCTS) {
            plan.push(product)
            const totals = calculate_total_plan_values(plan)
            const fitness = calculate_plan_fitness(totals)
            productFitnessIncreaseMap.set(product, fitness - currentPlanFitness)
            plan.pop()
        }

        let fitnessMaximizationProduct = 0
        let maxUtilityIncrease = 0
        for (const productUtitliyIncrease of productFitnessIncreaseMap) {
            if (maxUtilityIncrease < productUtitliyIncrease[1]) {
                fitnessMaximizationProduct = productUtitliyIncrease[0]
                maxUtilityIncrease = productUtitliyIncrease[1]

            }
        }
        if (maxUtilityIncrease <= 0) {
            break;
        }
        plan.push(fitnessMaximizationProduct)
        currentPlanFitness += maxUtilityIncrease
        console.log('utility', currentPlanFitness)
    }

    console.table(plan.map(e => e.name))

    print_plan_stats(plan)
}


const stochastic_gradient_search = () => {

    let currentPlanFitness = -100_000_000

    let plan = []
    while (true) {
        const productFitnessIncreaseMap = new Map()

        for (let product of PRODUCTS) {
            plan.push(product)
            const totals = calculate_total_plan_values(plan)
            const fitness = calculate_plan_fitness(totals)
            productFitnessIncreaseMap.set(product, fitness - currentPlanFitness)
            plan.pop()
        }

        const total_increase = Array.from(productFitnessIncreaseMap.values()).filter(v => v >= 0).reduce((p, c) => p + c, 0)

        const target = Math.random()

        const products = Array.from(productFitnessIncreaseMap.entries())

        let selected_product;
        let current_sum = 0
        for (const product of products) {
            if (product[1] <= 0 || !Number.isFinite(product[1])) {
                continue
            }
            current_sum += product[1] / total_increase
            if (current_sum >= target) {
                selected_product = product
                break;
            }
        }

        if (!selected_product) {
            break;
        }
        plan.push(selected_product[0])
        currentPlanFitness += selected_product[1]
    }


    return { plan, currentPlanFitness }
}

const multiple_stochastic_gradient_search = (max_time) => {

    let start_time = Date.now()
    let best_fitness = - Infinity
    while (Date.now() - start_time < max_time) {
        const { plan, currentPlanFitness } = stochastic_gradient_search()
        if (best_fitness < currentPlanFitness) {
            best_fitness = currentPlanFitness
            console.log('plan: ', plan.map(e => e.name).join(', '), 'fitness: ', currentPlanFitness)
        }

    }
}
const print_plan_stats = (plan) => {
    const totals = calculate_total_plan_values(plan)
    const planTotalsWithTargetValues = {}

    for (const attribute in TARGET_VALUES) {
        planTotalsWithTargetValues[attribute] = { plan: totals[attribute], target: TARGET_VALUES[attribute] }
    }
    console.table(planTotalsWithTargetValues)

}
solve_via_linear_programming(1)
// simplified_simulated_annealing(10 * 60 * 1_000)
// improver_algorithm(60_000 * 10)
// random_search(60_000 * 10)
// brute_force(60_000)
// gradient_search()
// stochastic_gradient_search()
// multiple_stochastic_gradient_search(10_000)
// simplified_simulated_annealing(100_000)