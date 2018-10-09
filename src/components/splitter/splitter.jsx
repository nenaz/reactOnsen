// @flow
import *as React from 'react';
import { Page, Splitter as SplitterOUI } from 'react-onsenui';

export const Splitter = (LeftMenuComponent, PageComponent) => (
  <Page
    className="nzPage"
    // renderToolbar={this.renderToolbar}
    // renderModal={this.renderModal}
    // renderFixed={this.renderFixed}
  >
    <SplitterOUI>
      <SplitterSide
          side='left'
          width={200}
          collapse={true}
          swipeable={true}
          // isOpen={this.state.isOpenLeftMenu}
          // onClose={this.hideLeftMenu}
          // onOpen={this.showLeftMenu}
      >
        <LeftMenuComponent />
      </SplitterSide>
      <SplitterContent>
        <PageComponent />
      </SplitterContent>
    </SplitterOUI>
  </Page>
);
