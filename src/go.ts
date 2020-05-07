const isClient = typeof window === 'object';

export interface IGoParams {
   replace?: boolean;
   title?: string;
   state?: any;
}

export type Go = (page: string, params?: IGoParams) => void;

const go: Go = isClient
   ? (page: string, {replace, title, state}: IGoParams = {}) => {
        history[replace ? 'replaceState' : 'pushState'](state, title || '', page);
     }
   : ((() => {}) as Go);

export default go;
