import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Router, Route, Link, go} from '..';
import useObservable from 'react-use/lib/useObservable';
import useLocation from 'react-use/lib/useLocation';
import {pathname$} from 'rx-use';
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

export const Memory: StoryObj<typeof meta> = {
   render: () => <Demo />,
};


const Demo2: React.FC<{}> = () => {
   const route = useObservable(pathname$, pathname$.getValue());

   return (
      <Router route={route}>
         <div>
            <div>
               <button onClick={() => go('/page-1')}>Page 1</button>
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

export const RealNavigation: StoryObj<typeof meta> = {
   render: () => <Demo2 />,
};


const Demo3: React.FC<{}> = () => {
   const location = useLocation();

   return (
      <Router route={location.pathname ?? ''}>
         <div>
            <div>
               <button onClick={() => go('/page-1')}>Page 1</button>
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

export const UseLocation: StoryObj<typeof meta> = {
   render: () => <Demo3 />,
};
