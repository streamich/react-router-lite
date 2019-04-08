import {Context, useContext} from 'react';
import {RouterData} from './createRouter';
import createMatcher, {MatcherResult} from './createMatcher';

export type UseMatch = (match, exact?: boolean) => MatchData;
export interface MatchData {
  fullRoute: string;
  route: string;
  parent?: MatchData;
  matches: MatcherResult;
}

const createUseMatch = (context: Context<any>): UseMatch => {
  const useMatch: UseMatch = (match, exact)=> {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof match !== 'string') {
        if (exact) {
          // tslint:disable-next-line
          console.warn(
            'You are using useMatch(!string, true) with non-string match prop, ' +
            'exact prop works only with string match prop.'
          );
        }
      }
    }

    const {fullRoute, route, parent} = useContext<RouterData>(context);
    const matches = createMatcher(match, exact)(route);
    const data: MatchData = {
      fullRoute,
      route,
      parent,
      matches,
    }

    return data;
  };

  return useMatch;
};

export default createUseMatch;
