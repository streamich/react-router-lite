export interface RouterContextValue {
   fullRoute: string;
   route: string;
   parent?: MatchData;
}

export interface MatchData {
   fullRoute: string;
   route: string;
   parent?: MatchData;
   matches: MatcherResult;
}

export type MatcherResult = null | RegExpMatchArray | string[];

export type Matcher = (route: string) => MatcherResult;

export interface GoParams {
   replace?: boolean;
   title?: string;
   state?: any;
}
