import * as Benchmark from 'benchmark';
import { generateCompareFunction } from '../src/generate-compare-function';
import shallowequal from 'shallowequal';

const suite = new Benchmark.Suite();

type State = {
  value0: number;
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
  value6: number;
  value7: number;
  value8: number;
  value9: number;
};

const state1: State = {
  value0: 0,
  value1: 0,
  value2: 0,
  value3: 0,
  value4: 0,
  value5: 0,
  value6: 0,
  value7: 0,
  value8: 0,
  value9: 0
};

const state2: State = {
  value0: 1,
  value1: 1,
  value2: 1,
  value3: 1,
  value4: 1,
  value5: 1,
  value6: 1,
  value7: 1,
  value8: 1,
  value9: 1
};

suite.add('generate-compare-function', (() => {
  const compare = generateCompareFunction([
    ['value0'],
    ['value1'],
    ['value2'],
    ['value3'],
    ['value4'],
    ['value5'],
    ['value6'],
    ['value7'],
    ['value8'],
    ['value9'],
  ]);
  return () => {
    compare(state1, state2);
  };
})());

suite.add('select function with shallow equals.', (() => {
  const select = (state: State) => {
    return {
      value0: state.value0,
      value1: state.value1,
      value2: state.value2,
      value3: state.value3,
      value4: state.value4,
      value5: state.value5,
      value6: state.value6,
      value7: state.value7,
      value8: state.value8,
      value9: state.value9,
    };
  };
  return () => {
    shallowequal(select(state1), select(state2));
  };
})());

suite.on('cycle', function(event: any) {
  console.log(String(event.target));
});

suite.on('complete', function() {
  // @ts-ignore
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})

suite.run({ async: true });

