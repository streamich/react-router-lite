import {createElement as h, FC} from 'react';
import useLocation from 'react-use/lib/useLocation';
import create from './create';

const {context, go, Match, Route, Router, useMatch, Link, Switch, Redirect} = create();

const Provider: FC<{route?: string}> = ({route, children}) =>
   h(Router, {route: useLocation().pathname || route || '', children});

export {Provider, context, go, Match, Route, Router, useMatch, Link, Switch, Redirect};
