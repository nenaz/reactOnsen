import * as React from'react';
import { Page } from '@/components/Page';
import { AccountPageForm } from './account-page-form';
import { Switch } from '@/components/switch';
import { RoundButton } from '@/components/round-button';

export const AccountPage = (props) => {
  const addAccount = () => {
    console.log(props.formValues);
    props.addNewAccount(props.formValues);
  };
  return (
    <Page {...props} title="Добавить счет">
      <div className="nzAddAccountPage">
        <AccountPageForm />
        <Switch
          title="Не учитывать в общем балансе"
          checked={false}
        />
        <RoundButton
          position='bottom right'
          onClick={addAccount}
          iconClassName="icon-checked"
        />
      </div>
    </Page>
  );
};
