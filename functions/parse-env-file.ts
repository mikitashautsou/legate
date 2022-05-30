import * as fs from "fs";

export interface Atom {
  value: string;
}

export interface Relation {
  values: string[];
}

export interface EqRelation {
  param: string;
  value: Atom;
}

export const parseEnvFile = (): Relation[] => {
  const relations = fs
    .readFileSync("./input.env")
    .toString()
    .split("\n")
    .filter((line) => !line.startsWith("#") && line.trim().length !== 0)
    .reduce(
      (prev, line) => {
        let isInComment = prev.isInComment;
        if (line.startsWith("---")) {
          isInComment = !isInComment;
        }
        if (isInComment || line.startsWith("---")) {
          return {
            isInComment,
            result: prev.result,
          };
        }
        return {
          isInComment,
          result: prev.result.concat(line),
        };
      },
      {
        isInComment: false,
        result: [],
      }
    )
    .result.map((line) => line.trim())
    .map((line) => ({ values: line.split(" ") }));

  return relations;
};
