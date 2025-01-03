import { createRef, RefObject } from "react";

type Pool = Record<string, RefObject<unknown>>;

const pool: Pool = {};

const refUtil = {
  cached<Elem>(name: string) {
    const ref = pool[name];
    if (ref) return ref as RefObject<Elem>;
    pool[name] = createRef();
    return pool[name] as RefObject<Elem>;
  },
};

export default refUtil;
