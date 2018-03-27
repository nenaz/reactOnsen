import React, { Component } from 'react';
import {
    Button,
    Input,
    // Page,
    // Modal
} from 'react-onsenui'

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            password2: '',
            email: ''
        }
    }

    render() {
        return (
            <section style={{ margin: '16px' }}>
                <section>
                    <Input
                        value={this.state.username}
                        // onChange={this.handleAccountNameChange}
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
                        // value={this.state.password}
                        // onChange={this.handleAmountChange}
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
                    <Input
                        value={this.state.password2}
                        // onChange={this.handleAmountChange}
                        modifier='underbar'
                        float
                        placeholder='Повторить пароль'
                        style={{
                            alignContent: 'space-around',
                            margin: '10px'
                        }}
                    />
                </section>
                <p>
                    <Button
                        onClick={this.props.handleModalClose}
                    >Отмена</Button>
                    <Button
                        onClick={() => this.setState({ isOpen: false })}
                    >Создать</Button>
                </p>
            </section>
        )
    }
}

export default NewUser