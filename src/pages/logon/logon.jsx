// @flow
import * as React from 'react';
import { Page } from 'react-onsenui';
import { LogonSectionComponent } from './logon-section';

export const Logon = (props) => (
  <Page>
    <LogonSectionComponent {...props} />
  </Page>
);
