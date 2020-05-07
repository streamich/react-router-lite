# react-router-lite

Similar to `react-router` but leaner.

Also you can provide any string as a route:

```tsx
import {Provider, Switch, Route} from 'react-router-lite';

<Provider route={'/any/string/goes/here'}>
   <Switch>
      <Route match="/any/string" comp={() => <div>hello world</div>}>
   </Switch>
</Provider>
```

## License

[Unlicense](LICENSE) &mdash; public domain.
