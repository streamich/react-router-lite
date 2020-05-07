import {createElement as h, useCallback, FC, ComponentType, forwardRef, RefAttributes} from 'react';
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
   const Link: FC<LinkProps> = forwardRef<any, LinkProps>((props, ref) => {
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
               originalClick(event);
            }
         },
         [originalClick, replace, target, state],
      );

      const attr: React.AllHTMLAttributes<any> & RefAttributes<any> = {
         ...rest,
         ref,
         onClick,
      };

      if (component === 'a') {
         attr.href = to;
         attr.target = target;
      }

      return h(component, attr);
   });

   return Link;
};

export default createLink;
