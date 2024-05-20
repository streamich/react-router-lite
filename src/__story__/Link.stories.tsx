// import * as React from 'react';
import type {Meta, StoryObj} from '@storybook/react';
import {Link} from '..';

const meta: Meta<typeof Link> = {
   component: Link,
   argTypes: {},
};

export default meta;

export const External: StoryObj<typeof meta> = {
   args: {
      children: 'External link',
      a: true,
      to: 'https://github.com/streamich/react-router-lite',
   },
};
