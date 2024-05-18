# react-router-lite

Similar to `react-router` but leaner.

Provide your route in the `[route]` prop to the `Router` component and use
the `Route` components to define your routes.

```tsx
import {Router, Route} from 'react-router-lite';

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
</Router>;
```

You can use the `Switch` component to render only the first route that matches.

```tsx
import {Router, Switch, Route} from 'react-router-lite';

<Router route={'/any/string/goes/here'}>
   <Switch>
      <Route match="/any/string" render={() => <div>hello world</div>}>
      <Route match="/any/string/goes" render={() => <div>not hello</div>}>
   </Switch>
</Router>
```

The routes can be nested. When `[truncate]` prop is set, the nested routes will
be truncated to the parent route.

```tsx
import {Router, Route} from 'react-router-lite';

<Router route="/foo/bar">
   <Route match={'/foo'} truncate>
      <span>foo</span>
      <Route match="/bar">
         <span>bar</span>
      </Route>
   </Route>
</Router>;
```

## License

[Unlicense](LICENSE) &mdash; public domain.
