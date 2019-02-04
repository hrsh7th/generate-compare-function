declare module 'generate-function' {

  export interface Generator {
    (body: string): void;
    property(name: string, prop: keyof any): string;
    toFunction(scope?: object): (...args: any[]) => any;
  }

  export interface GenerateFunction {
    formats: {
      s: (str: string) => string;
      d: (num: number) => string;
      o: (obj: object) => string;
    };
    (): Generator;
  }

  const GF: GenerateFunction;

  export default GF;

}

