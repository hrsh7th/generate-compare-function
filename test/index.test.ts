import { generateCompareFunction } from '../src/generate-compare-function';

describe('generate-compare-function', () => {

  it('Should generate compare function', () => {
    const compare = generateCompareFunction([
      ['path', 'to', 'value1'],
      ['path', 'to', 'value2', 0]
    ]);
    expect(compare).toBeInstanceOf(Function);
    expect(compare.length).toBe(2);
  });

  describe('Should compare two states', () => {

    const compare = generateCompareFunction([
      ['value'],
    ]);

    describe('true', () => {

      it('both states has not path to compare', () => {
        expect(compare({}, {})).toBe(true);
      });

      it('both states has same primitive value', () => {
        const samePrimitive = 1;
        expect(compare({ value: samePrimitive }, { value: samePrimitive })).toBe(true);
      });

      it('both states has same object', () => {
        const sameObj = {};
        expect(compare({ value: sameObj }, { value: sameObj })).toBe(true);
      });

      it('one side state has not path to compare and other side state has undefined value', () => {
        expect(compare({ value: undefined }, {})).toBe(true);
      });
    });

    describe('false', () => {

      it('states has different primitive value', () => {
        const differentPrimitive = 1;
        expect(compare({ value: differentPrimitive }, { value: 0 })).toBe(false);
      });

      it('states has not same object in compare path', () => {
        const differentObj = {};
        expect(compare({ value: differentObj }, { value: {} })).toBe(false);
      });

      it('compare different falsy values', () => {
        expect(compare({ value: null }, { value: undefined })).toBe(false);
        expect(compare({ value: null }, { value: false })).toBe(false);
        expect(compare({ value: null }, { value: 0 })).toBe(false);
        expect(compare({ value: undefined }, { value: null })).toBe(false);
        expect(compare({ value: undefined }, { value: false })).toBe(false);
        expect(compare({ value: undefined }, { value: 0 })).toBe(false);
        expect(compare({ value: 0 }, { value: null })).toBe(false);
        expect(compare({ value: 0 }, { value: false })).toBe(false);
        expect(compare({ value: 0 }, { value: undefined })).toBe(false);
        expect(compare({ value: false }, { value: null })).toBe(false);
        expect(compare({ value: false }, { value: 0 })).toBe(false);
        expect(compare({ value: false }, { value: undefined })).toBe(false);
      });

    });
  });

});

