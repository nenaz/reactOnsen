// @flow
import * as React from 'react';
import type { NavigatorType } from '@/global-types';
import { 
    Page,
    // Splitter,
    // SplitterContent,
    // SplitterSide,
    // Toolbar,
    // ToolbarButton,
    // Modal,
    // SpeedDial,
    // SpeedDialItem,
    // Fab,
} from 'react-onsenui';
import { Splitter } from '@/components/splitter';


export const Main = () => (
  <Page
      className="nzPage"
      renderToolbar={this.renderToolbar}
      // renderModal={this.renderModal}
  >
    <Splitter />
  </Page>
);
