import {FC, createElement as h, useEffect, useLayoutEffect, Fragment} from 'react';
import {Go, IGoParams} from './go';

const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export interface RedirectProps extends IGoParams {
   to: string;
}

const createRedirect = (go: Go): FC<RedirectProps> => {
   const Redirect: FC<RedirectProps> = ({to, replace, state, title, children}) => {
      useIsomorphicLayoutEffect(() => {
         go(to, {replace, state, title});
      }, []);

      return children ? h(Fragment, {}, children) : null;
   };

   return Redirect;
};

export default createRedirect;
