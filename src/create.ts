import {createContext, Context} from 'react';
import defaultGo from './go';
import createProvider, {RouterData} from './createRouter';
import createUseMatch from './createUseMatch';
import createMatch from './createMatch';
import createRoute from './createRoute';
import createSwitch from './createSwitch';
import createLink from './createLink';

const create = (go = defaultGo, data: RouterData = {fullRoute: '', route: ''}) => {
  const context: Context<RouterData> = createContext(data);
  const Router = createProvider(context);
  const useMatch = createUseMatch(context);
  const Match = createMatch(useMatch, Router);
  const Route = createRoute(Match);
  const Switch = createSwitch(context, Route);
  const Link = createLink(go);

  return {
    go,
    context,
    Router,
    useMatch,
    Match,
    Route,
    Switch,
    Link,
  };
};

export default create;
