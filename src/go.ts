const isClient = typeof window === 'object';

export interface IGoParams {
   replace?: boolean;
   title?: string;
   state?: any;
}

export type Go = (page: string, params?: IGoParams) => void;

export const go: Go = isClient
   ? (page: string, {replace, title, state}: IGoParams = {}) => {
        replace ? history.replaceState(state, title || '', page) : history.pushState(state, title || '', page);
     }
   : ((() => {}) as Go);
