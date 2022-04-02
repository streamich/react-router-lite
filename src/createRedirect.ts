import {FC, createElement as h, useEffect, useLayoutEffect} from 'react';
import {Go, IGoParams} from './go';

const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? useLayoutEffect : useEffect;

export interface RedirectProps extends IGoParams {
   to: string;
}

const createRedirect = (go: Go): FC<RedirectProps> => {
   const Redirect: FC<RedirectProps> = (props) => {
      useIsomorphicLayoutEffect(() => {
         go(props.to, props);
      }, []);

      return null;
   };

   return Redirect;
};

export default createRedirect;
