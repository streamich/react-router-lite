const isClient = typeof window === 'object';

export interface IGoParams {
  replace?: boolean;
  title?: string;
  state?: any;
}

export type Go = (page: string, params?: IGoParams) => void;

const go: Go = (page: string, {replace, title, state}: IGoParams = {}) => {
  if (isClient) history[replace ? 'replaceState' : 'pushState'](state, title || '', page);
};

export default go;
