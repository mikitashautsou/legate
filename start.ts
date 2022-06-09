import * as fs from "fs";
import { normalizeRelations } from "./functions/build-correlations";
import { extractAtoms } from "./functions/extract-atoms";
import { parseEnvFile } from "./functions/parse-env-file";

const relations = parseEnvFile();
const atoms = extractAtoms(relations);
const normalizedRelations = normalizeRelations(relations);


// console.log(JSON.stringify({ atoms, relations, normalizedRelations }, null, 2));
console.log(JSON.stringify({ normalizedRelations }, null, 2));
// console.log(normalizedRelations.map(nr => nr.values.join(' ')))