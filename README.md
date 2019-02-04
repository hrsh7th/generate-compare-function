# generate-compare-function
generate compare function by object paths.

# Note
I created this package.
I hope `generate-compare-function` is faster than `select with shallow-equals`.
But real results is no my hopeness 😭.

So we dont need this package.

# Usage

### generate compare function.
```ts
import { generateCompareFunction } from 'generate-compare-function';

const compare = generateCompareFunction([
  ['path', 'to', 'value1'],
  ['path', 'to', 'value2'] // it is not using in this senario. but below senarios works well.
]);
```

### use compare function.
```ts
const baseObject = {
  path: {
    to: {
      value1: true
    }
  }
};

const differentObjectAsBase = {
  path: {
    to: {
      value1: false
    }
  }
};

const sameObjectAsBase = {
  path: {
    to: {
      value1: true
    }
  }
};

// true, if passing same object.
expect(compare(baseObject, baseObject)).toBe(true);

// false, if passing different objects thats are not have same value in path to compare.
expect(compare(baseObject, differentObjectAsBase)).toBe(false);

// true, if passing different objects thats are have same value in path to compare.
expect(compare(baseObject, sameObjectAsBase)).toBe(true);
```

