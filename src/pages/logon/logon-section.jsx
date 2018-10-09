// @flow
import * as React from 'react';
import { Input, Switch } from 'react-onsenui';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from '@/components/button';
// import { Button } from '../../components/button';
import { logonRequest } from './logon-actions';
import { getAuthResult } from './logon-selectors';
import type { NavigatorType } from '@/global-types';


class LogonSection extends React.PureComponent<NavigatorType> {
  componentDidUpdate(prevProps) {
    console.log(this.props.authResult);
    if (this.props.authResult.auth && this.props.authResult.token) {
      this.props.navigator.pushPage({
        title: 'main',
        hasBackButton: false,
      });
    }
  }

  render() {
    return (
      <section className="nzLogonSection">
        <section>
          <Input
            // value={this.state.username}
            // onChange={this.handleUsernameChange}
            modifier='underbar material'
            float
            placeholder='Логин'
            // disabled={this.state.disabledInputs}
          />
        </section>
        <section>
          <Input
            // value={this.state.password}
            // onChange={this.handlePasswordChange}
            modifier='underbar material'
            type='password'
            float
            placeholder='Пароль'
            // disabled={this.state.disabledInputs}
          />
        </section>
        <section className="nzLogonSectionButton">
          <section className="nzSwitchBlock">
            <Switch
              // disabled={this.state.disabledInputs}
              // checked={this.state.checkedPassRadio}
              // onChange={this.handleChangePassCodeRadio}
            />
            <p
              // className={this.state.disabledInputs
              //   ? "nzDisable"
              //   : ""}
            >Pass code</p>
          </section>
          <section>
            <Button
              label="Войти"
              type=""
              onClick={() => this.props.logonRequest({
                username: 'nenaz',
                password: '4276',
              })}
            />
          </section>
        </section>
      </section>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  authResult: getAuthResult,
});

export const LogonSectionComponent = connect(
  mapStateToProps,
  {
    logonRequest,
  }
)(LogonSection);
