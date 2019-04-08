import {createElement as h, useCallback, FC, ComponentType} from 'react';
import {Go} from './go';

const noop = (() => {}) as any;
const isModifiedEvent = (event) => !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

export interface LinkProps extends React.AllHTMLAttributes<any> {
   replace?: boolean;
   state?: any | ((props: LinkProps) => any);
   to?: string;
   a?: boolean;
   component?: string | ComponentType<any>;
}

const createLink = (go: Go) => {
   const Link: FC<LinkProps> = (props) => {
      /* tslint:disable */
      let {
         replace,
         state,
         to = '',
         a,
         component = a ? 'a' : 'button',
         onClick: originalClick = noop,
         target,
         ...rest
      } = props;
      /* tslint:enable */

      const onClick = useCallback(
         (event) => {
            originalClick(event);

            if (
               !event.defaultPrevented && // onClick prevented default
               event.button === 0 && // ignore everything but left clicks
               !target && // let browser handle "target=*"
               !isModifiedEvent(event) // ignore clicks with modifier keys
            ) {
               event.preventDefault();
               go(to, {
                  replace,
                  state: state ? state(props) : undefined,
               });
            }
         },
         [originalClick, replace, target, state],
      );

      const attr: React.AllHTMLAttributes<any> = {
         ...rest,
         onClick,
      };

      if (component === 'a') {
         attr.href = to;
         attr.target = target;
      }

      return h(component, attr);
   };

   return Link;
};

export default createLink;
