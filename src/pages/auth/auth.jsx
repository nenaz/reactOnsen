import React, { Component } from 'react';
import {
  Page,
  ProgressCircular
} from 'react-onsenui';

export class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animationClass: '',
    }
    this.handleDismiss = this.handleDismiss.bind(this)
    this.fetch = true;
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        animationClass: 'FadeOut'
      })
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
          <span>v. {config.version}</span>
        </div>
      </Page>
    )
  }
}
