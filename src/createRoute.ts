import {createElement as h, FC} from 'react';
import render from 'react-universal-interface/lib/render';
import {MatchProps} from './createMatch';

const createRoute = (Match: FC<MatchProps>): FC<MatchProps> => props =>
  h(Match, props, data =>
    data.matches
      ? render(props, data)
      : null
  );

export default createRoute;
