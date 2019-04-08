import {Context, createElement} from 'react';
import {MatchData} from './createUseMatch';

export interface RouterProps {
   route: string;
   children: any;
   fullRoute?: string;
   parent?: MatchData;
}

export interface RouterData {
   fullRoute: string;
   route: string;
   parent?: MatchData;
}

const createRouter = ({Provider}: Context<RouterData>): React.FC<RouterProps> => (props) => {
   const {route, fullRoute, parent, children} = props;

   if (process.env.NODE_ENV !== 'production') {
      if (typeof route !== 'string') {
         // tslint:disable-next-line
         console.error('Router route must be a string.');
      }
   }

   const value: RouterData = {
      fullRoute: fullRoute || route,
      route,
      parent,
   };

   return createElement(Provider, {value}, children);
};

export default createRouter;
