import type * as types from './types';
import * as React from 'react';
import {go} from './go';

export type * from './types';
export {go};

const h = React.createElement;
const defaultGo = go;

export const context = React.createContext<types.RouterContextValue>(null!);

// ------------------------------------------------------------------- <Router>

export interface RouterProps {
   route: string;
   children?: React.ReactNode;
   fullRoute?: string;
   parent?: types.MatchData;
}

export const Router: React.FC<RouterProps> = (props) => {
   const {route, fullRoute, parent, children} = props;
   const value: types.RouterContextValue = {
      fullRoute: fullRoute || route,
      route,
      parent,
   };
   return h(context.Provider, {value}, children);
};

// -------------------------------------------------------------------- <Match>

const createMatcher = (match: string | RegExp | types.Matcher, exact?: boolean): types.Matcher => {
   if (typeof match === 'function') return match;
   const regex = typeof match === 'string' ? new RegExp(`^(${match}${exact ? '$' : ''})`) : match;
   return (route: string) => route.match(regex);
};

export const useMatch = (match: string | RegExp | types.Matcher, exact?: boolean): types.MatchData => {
   if (process.env.NODE_ENV !== 'production') {
      if (typeof match !== 'string') {
         if (exact) {
            // tslint:disable-next-line
            console.warn(
               'You are using useMatch(!string, true) with non-string match prop, ' +
                  'exact prop works only with string match prop.',
            );
         }
      }
   }
   const {fullRoute, route, parent} = React.useContext(context);
   const mather = React.useMemo(() => createMatcher(match, exact), [match, exact]);
   const matches = mather(route);
   return {
      fullRoute,
      route,
      parent,
      matches,
   };
};

export interface MatchProps {
   render?:
      | ((data: types.MatchData) => React.ReactNode)
      | React.ReactNode;
   children?:
      | ((data: types.MatchData) => React.ReactNode)
      | React.ReactNode;
   match?: string | RegExp | types.Matcher;
   exact?: boolean;
   truncate?: boolean;
}

export const Match: React.FC<MatchProps> = (props) => {
   const {match = '', exact = false, truncate, children, render = children} = props;
   const data = useMatch(match, exact);
   const {route, matches} = data;
   let element = (typeof render === 'function' ? render(data) : render) || null;
   if (matches && truncate) {
      element = h(Router, {
         fullRoute: route,
         route: route.substring(matches[0].length),
         parent: data,
         children: element,
      });
   }
   return element instanceof Array ? h(React.Fragment, null, element) : element;
};

// -------------------------------------------------------------------- <Route>

export const Route: React.FC<MatchProps> = ({children, render = children, ...rest}) =>
   h(Match, {
      ...rest,
      render: (data) => (data.matches ? (typeof render === 'function' ? render(data) : render || null) : null),
   });

// -------------------------------------------------------------------- <Switch>

export interface SwitchProps {
   children: React.ReactElement[];
}

export const Switch: React.FC<SwitchProps> = ({children}) => {
   const {route} = React.useContext(context);
   for (const element of children) {
      if (process.env.NODE_ENV !== 'production') {
         if (typeof element !== 'object' || (element as any).type !== Route) {
            throw new TypeError('All <Switch> children must be <Route> elements.');
         }
      }
      const {match, exact} = element.props;
      if (createMatcher(match, exact)(route)) return element;
   }
   return null;
};

// ----------------------------------------------------------------- <Redirect>

const isBrowser = typeof window !== 'undefined';
const useIsomorphicLayoutEffect = isBrowser ? React.useLayoutEffect : React.useEffect;

export interface RedirectProps extends types.GoParams {
   to: string;
}

export const Redirect: React.FC<RedirectProps> = ({to, ...params}) => {
   const go = React.useContext(context).go || defaultGo;
   useIsomorphicLayoutEffect(() => {
      go(to, params);
   }, []);
   return null;
};

const isModifiedEvent = (event: React.MouseEvent) =>
   !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export interface LinkProps extends React.AllHTMLAttributes<any> {
   replace?: boolean;
   state?: any | ((props: LinkProps) => any);
   to?: string;
   a?: boolean;
   comp?: string | React.ComponentType<any>;
}

// --------------------------------------------------------------------- <Link>

export const Link: React.FC<LinkProps> = React.forwardRef<any, LinkProps>((props, ref) => {
   const {replace, state, to = '', a, comp = a ? 'a' : 'button', onClick: originalClick, target, ...rest} = props;
   const go = React.useContext(context).go || defaultGo;
   const onClick = React.useCallback(
      (event) => {
         if (
            !event.defaultPrevented && // onClick prevented default
            event.button === 0 && // ignore everything but left clicks
            !target && // let browser handle "target=*"
            !isModifiedEvent(event) // ignore clicks with modifier keys
         ) {
            event.preventDefault();
            go(to, {
               replace,
               state: state ? state(props) : undefined,
            });
            if (originalClick) originalClick(event);
         }
      },
      [originalClick, replace, target, state],
   );
   const attr: React.AllHTMLAttributes<any> & React.RefAttributes<any> = {
      ...rest,
      ref,
      onClick,
   };
   if (comp === 'a') {
      attr.href = to;
      attr.target = target;
   }
   return h(comp, attr);
});
