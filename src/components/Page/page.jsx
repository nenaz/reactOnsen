import * as React from 'react';
import { Page as OSPage } from 'react-onsenui';
import ToolbarCustom from '@/components/ToolbarCustom';

const renderToolbar = ({ title, route, navigator }) => (
  <ToolbarCustom
    hasBackButton={route.hasBackButton}
    title={title}
  />
);

export const Page = (props) => {
  const toolbar = () => renderToolbar(props);
  return (
    <OSPage renderToolbar={toolbar}>
      {props.children}
    </OSPage>
  );
};