// @flow
import * as React from 'react';
import {
  Page,
  ProgressCircular
} from 'react-onsenui';
import config from '../../js/config';
import type { NavigatorType } from '@/global-types';


export class Welcome extends React.PureComponent<NavigatorType> {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     animationClass: '',
  //   }
  //   this.handleDismiss = this.handleDismiss.bind(this)
  //   this.fetch = true;
  // }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigator.pushPage({
        title: 'logon',
        hasBackButton: false,
      });
    }, 3000);
  }

  handleDismiss() {
    this.setState({
      toastShown: false,
      errorLogonStatus: '',
    }, () => {
      this.fetch = true
    })
  }

  render() {
    return (
      <Page className={this.props.className}>
        <section className="nzWelcomeSection">
          <div className="nzWelcomeSectionBlock">
            <span>Welcome!</span>
          </div>
        </section>
        <ProgressCircular indeterminate className="nzProgressWelcomePage" />
        <div className="nzVersion">
          <span>sv. {config.version}</span>
        </div>
      </Page>
    )
  }
}
