export type MatcherResult = null | RegExpMatchArray | string[];
export type Matcher = (route: string) => MatcherResult;

export default function createMatcher(match: string | RegExp | Matcher, exact?: boolean): Matcher {
   if (typeof match === 'function') {
      return match;
   }

   const regex = typeof match === 'string' ? new RegExp(`^(${match}${exact ? '$' : ''})`) : match;

   return (route: string) => route.match(regex);
}
