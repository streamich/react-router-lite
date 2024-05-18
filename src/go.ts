import type * as types from './types';

const isClient = typeof window === 'object';

export const go: types.Go = isClient
   ? (page: string, {replace, title, state}: types.GoParams = {}) => {
        replace ? history.replaceState(state, title || '', page) : history.pushState(state, title || '', page);
     }
   : ((() => {}) as types.Go);
