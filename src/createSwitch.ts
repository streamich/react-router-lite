import {FC, Children, useContext, Context} from 'react';
import {RouterData} from './createRouter';
import {MatchProps} from './createMatch';
import createMatcher from './createMatcher';

/*
export interface SwitchProps {
  children: FC | FC[];
}
*/

const createSwitch = (context: Context<RouterData>, Route: FC<MatchProps>): FC<any> => {
  const Switch: FC<any> = ({children}) => {
    const {route} = useContext<RouterData>(context);

    const elements = Children.toArray(children);
    for (const element of elements) {
      if (process.env.NODE_ENV !== 'production') {
        if ((typeof element !== 'object') || ((element as any).type !== Route)) {
          throw new TypeError('All <Switch> children must be <Route> elements.');
        }
      }
      const {match, exact} = (element as any).props;
      if (createMatcher(match, exact)(route)) return element;
    }

    return null;
  };

  return Switch;
};

export default createSwitch;
