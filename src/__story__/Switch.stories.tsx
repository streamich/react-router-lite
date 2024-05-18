import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Router, Switch, Route} from '..';

const meta: Meta<typeof Router> = {
   component: Router,
   argTypes: {},
};

export default meta;

export const FirstRoute: StoryObj<typeof meta> = {
   args: {
      route: '/test',
      children: (
         <Switch>
            <Route match="/test" exact>
               <div>First route</div>
            </Route>
            <Route match="/test" exact>
               <div>Second route</div>
            </Route>
         </Switch>
      ),
   },
};

export const FirstRoute2: StoryObj<typeof meta> = {
   args: {
      route: '/test',
      children: (
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
      ),
   },
};
