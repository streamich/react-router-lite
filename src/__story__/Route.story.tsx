import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Router, Route} from '..';

storiesOf('<Route>', module)
   .add('Children', () => {
      return (
         <Router route="/bar">
            <Route match="/foo">foo</Route>
            <Route match="/bar">
               <div>bar</div>
            </Route>
            <Route match="/bar">
               <div>bar 2</div>
            </Route>
            <Route match="/baz">baz</Route>
         </Router>
      );
   })
   .add('Render props', () => {
      return (
         <Router route="/bar">
            <Route match="/foo">foo</Route>
            <Route match="/bar">{() => <div>bar</div>}</Route>
            <Route match="/bar" render={() => <div>bar 2</div>} />
            <Route match="/baz">baz</Route>
         </Router>
      );
   })
   .add('Exact', () => {
      return (
         <Router route="/foo/bar">
            <Route match="/foo" exact>
               foo
            </Route>
            <Route match="/foo/bar" exact>
               foo/bar
            </Route>
         </Router>
      );
   })
   .add('Truncate nested paths', () => {
      return (
         <Router route="/foo/bar">
            <Route match="/foo" exact>
               foo
            </Route>
            <Route match="/foo" truncate>
               <Route match="/bar">Nested</Route>
            </Route>
         </Router>
      );
   })
   .add('Partial match', () => {
      return (
         <Router route="/foo/bar">
            <Route match="/fo">
               <div>/fo</div>
            </Route>
            <Route match="/foo">
               <div>/foo</div>
            </Route>
            <Route match="/foo/bar">
               <div>/foo/bar</div>
            </Route>
         </Router>
      );
   })
   .add('Can use regex for matching', () => (
      <Router route="/test">
         <Route match={/^\/lol/}>
            <div>SHOULD NOT MATCH</div>
         </Route>
         <Route match={/^\/test/}>
            <div>This should match</div>
         </Route>
      </Router>
   ))
   .add('By default matches any route', () => (
      <Router route="/test">
         <Route>
            <div>This should match</div>
         </Route>
      </Router>
   ))
   .add('Exact prop', () => (
      <Router route="/test">
         <Route match="/test" exact>
            <div>This should match</div>
         </Route>
         <Route match="/te" exact>
            <div>This should not match</div>
         </Route>
      </Router>
   ))
   .add('Non-exact string matches', () => (
      <Router route="/test">
         <Route match="/te">
            <div>Non-exact match</div>
         </Route>
      </Router>
   ))
   .add('Universal interface', () => (
      <Router route="/test">
         <Route match="/test">
            <div>Children</div>
         </Route>
         <Route match="/test">{() => <div>Facc</div>}</Route>
         <Route match="/test" render={() => <div>Render prop</div>} />
         <Route match="/test" comp={() => <div>Component prop 1</div>} />
         <Route match="/test" component={() => <div>Compnent prop 2</div>} />

         <Route match="/no-match">
            <div>THIS SHOUDL NOT MATCH</div>
         </Route>
      </Router>
   ))
   .add('Renders children', () => (
      <Router route="/test">
         <div>Renders</div>
         <div>its</div>
         <div>children</div>
      </Router>
   ))
   .add('Can nest routes', () => (
      <Router route="/foo/bar">
         <Route match="/foo">
            <div>First level</div>
            <Route match="/foo/bar">
               <div>Second level</div>
            </Route>
            <Route match="/foo/bar2">
               <div>SHOULD NOT MATCH</div>
            </Route>
         </Route>
      </Router>
   ))
   .add('Can truncate routes', () => (
      <Router route="/foo/bar/baz">
         <Route match="/foo" truncate>
            <div>First level</div>
            <Route match="/bar" truncate>
               <div>Second level</div>
               <Route match="/baz" truncate>
                  <div>Third level</div>
               </Route>
            </Route>
         </Route>
      </Router>
   ))
   .add('Returns data object', () => (
      <Router route="/foo/bar/baz">
         <Route match="/foo" truncate>
            {(data) => (
               <div>
                  <pre>{JSON.stringify(data, null, 2)}</pre>
                  <Route match={/^\/([^\?]+)\/([^\?]+)/} truncate>
                     {(data) => <pre>{JSON.stringify(data, null, 2)}</pre>}
                  </Route>
               </div>
            )}
         </Route>
      </Router>
   ));
