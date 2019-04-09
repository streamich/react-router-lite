import * as React from 'react';
import {storiesOf} from '@storybook/react';
import useLocation from 'react-use/lib/useLocation';
import {Router, Route, Switch, Link, go} from '..';

const Demo: React.FC<{}> = () => {
   const {pathname} = useLocation();

   return (
      <Router route={pathname}>
         <div>
            <div>
               <button onClick={() => go('page-1')}>Page 1</button>
               <Link to="page-2">Page 2</Link>
            </div>
            <div>
               Route: {pathname}
            </div>
            <div>
               <Route match="/page-1">This is page one</Route>
               <Route match="/page-2">This is page two</Route>
            </div>
         </div>
      </Router>
   );
};

storiesOf('useLocation', module)
  .add('Real navigation', () => <Demo />)
