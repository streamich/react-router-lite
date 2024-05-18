export interface RouterContextValue {
   fullRoute: string;
   route: string;
   parent?: MatchData;
   go?: Go;
}

export interface MatchData {
   fullRoute: string;
   route: string;
   parent?: MatchData;
   matches: MatcherResult;
}

export type MatcherResult = null | RegExpMatchArray | string[];

export type Matcher = (route: string) => MatcherResult;

export type Go = (page: string, params?: GoParams) => void;

export interface GoParams {
   replace?: boolean;
   title?: string;
   state?: any;
}
