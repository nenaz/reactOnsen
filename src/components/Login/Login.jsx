import React,{ Component} from 'react'
import {
    Page,
    Input,
    Button
} from 'react-onsenui'

class Login extends Component{
    constructor(props){
        super(props)
        this.state ={}
    }

    render(){
        return (
            <Page
                renderToolbar={this.renderToolbar}
                className={this.props.className}
            >
                <div style={{
                    padding: '8px'
                }}>
                    <section>
                        <Input
                            value={this.state.accountName}
                            onChange={this.handleAccountNameChange}
                            modifier='underbar'
                            float
                            placeholder='Логин'
                            style={{
                                alignContent: 'space-around',
                                margin: '10px'
                            }}
                        />
                    </section>
                    <section>
                        <Input
                            value={this.state.amount}
                            onChange={this.handleAmountChange}
                            modifier='underbar'
                            float
                            placeholder='Пароль'
                            style={{
                                alignContent: 'space-around',
                                margin: '10px'
                            }}
                        />
                    </section>
                    <section>
                        <Button modifier='large'>Войти</Button>
                    </section>
                </div>
            </Page>
        )
    }
}

export default Login