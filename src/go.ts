const isClient = typeof window === 'object';

export interface IGoParams {
   replace?: boolean;
   title?: string;
   state?: any;
}

export type Go = (page: string, params?: IGoParams) => void;

const h = history;

export const go: Go = isClient
   ? (page: string, {replace, title, state}: IGoParams = {}) => {
        replace ? h.replaceState(state, title || '', page) : h.pushState(state, title || '', page);
     }
   : ((() => {}) as Go);
