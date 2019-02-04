import generateFunction, { Generator } from 'generate-function';

type Prop = keyof any;

export function generateCompareFunction(paths: Prop[][]) {
  const generator = generateFunction();
  generator(`
    function compare(object1, object2) {
      return (
        ${paths.map(path => {
          return `(${
            createSafeObjectRefs(generator, 'object1', path)
          }) === (${
            createSafeObjectRefs(generator, 'object2', path)
          })`;
        }).join(' && ')}
      );
    }
  `);
  return generator.toFunction();
};

/**
 * createSafeObjectRefs
 *
 * Usage:
 *   createSafeObjectRefs('state1', ['path', 'to', 'value'])
 *   ↓↓↓
 *   `(state1 && state1.path && state1.path.to && state1.path.to.value)`
 */
const createSafeObjectRefs = (generator: Generator, name: string, paths: Prop[]) => {
  return paths.reduce((refs, path) => {
    return refs.concat(
      generator.property(refs[refs.length - 1], path)
    );
  }, [name]).join(' && ');
};



