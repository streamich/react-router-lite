import create from './create';
import go from './go';

const {context, Match, Route, Router, useMatch, Link, Switch} = create(go);

export {context, go, Match, Route, Router, useMatch, Link, Switch};
