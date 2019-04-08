import {FC, createElement as h} from 'react';
import {UniversalProps} from 'react-universal-interface';
import render from 'react-universal-interface/lib/render';
import {UseMatch} from './createUseMatch';
import {RouterData, RouterProps} from './createRouter';
import {Matcher} from './createMatcher';

export interface MatchProps extends UniversalProps<RouterData> {
   match?: Matcher | string | RegExp;
   exact?: boolean;
   truncate?: boolean;
}

const createMatch = (useMatch: UseMatch, Router: FC<RouterProps>): FC<MatchProps> => {
   const Match: FC<MatchProps> = (props) => {
      const {match, exact, truncate} = props;
      const data = useMatch(match, exact);
      const {route, matches} = data;
      let element = render(props, data);

      if (matches && truncate) {
         element = h(Router, {
            fullRoute: route,
            route: route.substr(matches[0].length),
            parent: data,
            children: element,
         });
      }

      return element;
   };

   return Match;
};

export default createMatch;
