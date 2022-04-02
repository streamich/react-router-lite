import * as React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {render} from 'react-dom';
import {Router, Route, Switch, Redirect, go} from '../memory';

describe('browser', () => {
   it('renders without crashing', () => {
      const html = renderToStaticMarkup(
         <Router route="/foo/bar">
            <Route>
               <span>baz</span>
            </Route>
         </Router>,
      );

      expect(html).toBe('<span>baz</span>');
   });

   it('renders matching routes', () => {
      const html = renderToStaticMarkup(
         <Router route="/foo/bar">
            <Route>
               <span>1</span>
            </Route>
            <Route match="/baz">
               <span>2</span>
            </Route>
            <Route match="/foo">
               <span>3</span>
            </Route>
            <Route match="/foo/bar">
               <span>4</span>
            </Route>
         </Router>,
      );

      expect(html).toBe('<span>1</span><span>3</span><span>4</span>');
   });

   it('<Switch> renders only one matching route', () => {
      const html = renderToStaticMarkup(
         <Router route="/foo/bar">
            <Switch>
               <Route match="/home">
                  <span>1</span>
               </Route>
               <Route match="/baz">
                  <span>2</span>
               </Route>
               <Route match="/foo">
                  <span>3</span>
               </Route>
               <Route match="/foo/bar">
                  <span>4</span>
               </Route>
            </Switch>
         </Router>,
      );

      expect(html).toBe('<span>3</span>');
   });

   it('<Redirect> renders redirect contents', async () => {
      const div1 = document.createElement('div');
      const element1 = (
         <Router route="/foo">
            <Switch>
               <Route match="/home">
                  <span>1</span>
               </Route>
               <Route match="/foo">{() => <Redirect to="/home">redirecting...</Redirect>}</Route>
               <Route match="/foo/bar">
                  <span>4</span>
               </Route>
            </Switch>
         </Router>
      );

      render(element1, div1);

      expect(div1.innerHTML).toBe('redirecting...');

      const div2 = document.createElement('div');
      const element2 = (
         <Router route="/foo">
            <Switch>
               <Route match="/home">
                  <span>1</span>
               </Route>
               <Route match="/foo">{() => <Redirect to="/home" />}</Route>
               <Route match="/foo/bar">
                  <span>4</span>
               </Route>
            </Switch>
         </Router>
      );

      render(element2, div2);

      expect(div2.innerHTML).toBe('');
   });

   it('matches partial step', () => {
      const html = renderToStaticMarkup(
         <Router route="/foo/bar">
            <Route match="/foo/b">
               <span>1</span>
            </Route>
         </Router>,
      );

      expect(html).toBe('<span>1</span>');
   });
});
