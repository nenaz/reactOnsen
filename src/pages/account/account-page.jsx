import * as React from'react';
import { Page } from '@/components/Page';
import { AccountPageForm } from './account-page-form';
import { Switch } from '@/components/switch';

export const AccountPage = (props) => (
  <Page {...props} title="Добавить счет">
    <div className="nzAddAccountPage">
      <AccountPageForm />
      <Switch
        title="Не учитывать в общем балансе"
        checked={false}
      />
    </div>
  </Page>
);
