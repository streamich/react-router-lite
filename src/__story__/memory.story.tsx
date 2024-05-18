import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Router, Route, Link, go} from '..';
import {createMemoryHistory} from 'history';

const Demo: React.FC<{}> = () => {
   const history = React.useMemo(() => createMemoryHistory(), []);
   const [route, setRoute] = React.useState(history.location.pathname);
   React.useEffect(() => {
      const unsubscribe = history.listen(() => {
         setRoute(history.location.pathname);
      });
      return () => unsubscribe();
   }, [history]);

   return (
      <Router route={route}>
         <div>
            <div>
               <button onClick={() => go('page-1')}>Page 1</button>
               <Link to="page-2">Page 2</Link>
            </div>
            <div>
               <Route match="/page-1">This is page one</Route>
               <Route match="/page-2">This is page two</Route>
            </div>
         </div>
      </Router>
   );
};

storiesOf('memory/<Provider>', module).add('Real navigation', () => <Demo />);
