import * as React from'react';
import { Page } from '@/components/Page';
import Form from '@/components/Pages/Account/Form/form'
import OptionsItem from '@/components/OptionsItem';

export const AccountPage = (props) => (
  <Page {...props} title="Добавить счет">
    <div className="nzAddAccountPage">
      <Form />
      <OptionsItem
        title="Не учитывать в общем балансе"
        checked={false}
      />
    </div>
  </Page>
);
