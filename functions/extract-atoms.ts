import { Atom, Relation } from "./parse-env-file";

export const extractAtoms = (relations: Relation[]): Atom[] => {
  return relations
    .reduce(
      (previous, relation) => previous.concat(...relation.values.slice(0)),
      []
    )
    .filter((value, index, self) => self.indexOf(value) === index);
};
