

const nutrient_facts_measure_units = new Map()

const find_nutrient_value = (food, nutritent_name) => {
    for (const nutrient of food.foodNutrients) {
        if (nutrient.nutrient.name !== nutritent_name) {
            continue
        }
        if (nutrient.nutrient.name === 'Energy' && nutrient.nutrient.unitName === 'kJ') {
            continue
        }
        if (!nutrient_facts_measure_units.has(nutrient.nutrient.name)) {
            nutrient_facts_measure_units.set(nutrient.nutrient.name, nutrient.nutrient.unitName)
        }


        const measure_unit = nutrient_facts_measure_units.get(nutrient.nutrient.name)
        if (measure_unit != nutrient.nutrient.unitName) {
            throw new Error('Mismatching measurement unit for ' + measure_unit)
        }
        return nutrient.amount
    }
}
exports.read_products = () => {
    const fs = require('fs')

    const { FoundationFoods } = JSON.parse(fs.readFileSync('./test.json').toString())


    const product_names = []
    const nutrition_facts_set = new Set()

    for (const food of FoundationFoods) {
        product_names.push(food.description)
        food.foodNutrients.forEach(e => {
            nutrition_facts_set.add(e.nutrient.name)
        })
    }

    const products = {}
    for (const food of FoundationFoods) {
        const product = {}

        for (const nutrient_name of nutrition_facts_set) {
            product[nutrient_name] = find_nutrient_value(food, nutrient_name) ?? 0
        }
        products[food.description] = product
    }
    return products

}

