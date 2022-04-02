import {createContext, Context} from 'react';
import goDefault, {Go} from './go';
import createRouter, {RouterData} from './createRouter';
import createUseMatch from './createUseMatch';
import createMatch from './createMatch';
import createRoute from './createRoute';
import createSwitch from './createSwitch';
import createLink from './createLink';
import createRedirect from './createRedirect';

const create = (go: Go = goDefault, data: RouterData = {fullRoute: '', route: ''}) => {
   const context: Context<RouterData> = createContext(data);
   const Router = createRouter(context);
   const useMatch = createUseMatch(context);
   const Match = createMatch(useMatch, Router);
   const Route = createRoute(Match);
   const Switch = createSwitch(context, Route);
   const Link = createLink(go);
   const Redirect = createRedirect(go);

   return {
      go,
      context,
      Router,
      useMatch,
      Match,
      Route,
      Switch,
      Link,
      Redirect,
   };
};

export default create;
