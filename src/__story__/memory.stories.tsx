import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Router, Route, Link} from '..';
import {createMemoryHistory} from 'history';

const meta: Meta<typeof Router> = {
   component: Router,
   argTypes: {},
};

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
      <Router route={route} go={(path: string) => history.push(path)}>
         <div>
            <div>
               <button onClick={() => history.push('/page-1')}>Page 1</button>
               <Link to="/page-2">Page 2</Link>
            </div>
            <div>
               <Route match="/page-1">This is page one</Route>
               <Route match="/page-2">This is page two</Route>
            </div>
         </div>
      </Router>
   );
};

export default meta;

export const Primary: StoryObj<typeof meta> = {
   render: () => <Demo />,
};
