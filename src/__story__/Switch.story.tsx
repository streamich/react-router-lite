import * as React from 'react';
import {storiesOf} from '@storybook/react';
import {Router, Route, Switch} from '..';

storiesOf('<Switch>', module)
   .add('Matches first route', () => (
      <Router route="/test">
         <Switch>
            <Route match="/test" exact>
               <div>First route</div>
            </Route>
            <Route match="/test" exact>
               <div>Second route</div>
            </Route>
         </Switch>
      </Router>
   ))
   .add('Matches first matching route', () => (
      <Router route="/test">
         <Switch>
            <Route match="/te" exact>
               <div>SHOULD NOT MATCH</div>
            </Route>
            <Route match="/test" exact>
               <div>First route</div>
            </Route>
            <Route match="/test" exact>
               <div>SHOULD NOT MATCH</div>
            </Route>
            <Route match="/te" exact>
               <div>SHOULD NOT MATCH</div>
            </Route>
         </Switch>
      </Router>
   ));
