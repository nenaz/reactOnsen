import * as React from 'react';
import { reduxForm } from 'redux-form';
import { ReduxFormTextInput } from '@/components/fields/text-input-field';
import { listOfFields } from '@/js/consts';

const renderField = (props, item, key) => (
  <ReduxFormTextInput
    key={`${item}-${key}`}
    placeholder={item.placeholder}
    name={item.name}
    className={item.className}
    {...props}
  />
);

const AccountPage = (props) => {
  return (
    <div className="nzAccountPageInputBlock">
      {listOfFields.map((item, key) => {
        return renderField(props, item, key)
      })}
    </div>
  )
}

export const AccountPageForm = reduxForm({
  form: 'addAccount',
})(AccountPage);
