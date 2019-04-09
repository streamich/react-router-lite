import {createElement as h, FC, useState, useEffect} from 'react';
import {createMemoryHistory} from 'history';
import create from './create';
import {Go, IGoParams} from './go';

const history = createMemoryHistory();
const memoryGo: Go = (page: string, {replace, title, state}: IGoParams = {}) => {
   history.push(page, state);
};

const {context, go, Match, Route, Router, useMatch, Link, Switch} = create(memoryGo);

const Provider: FC<{route?: string}> = ({route: routeProp, children}) => {
   const [route, setRoute] = useState(history.location.pathname || routeProp);
   useEffect(() => history.listen((location) => {
      setRoute(location.pathname);
   }));
   return h(Router, {route, children});
};

export {Provider, context, go, Match, Route, Router, useMatch, Link, Switch};
