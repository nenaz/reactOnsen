import React from 'react'
import Add from './Add'
import List from './List'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(name) {
    const list = this.state.list.slice();
    list.push(name);
    this.setState({ list });
  }

  render() {
    return (
      <div>
        <Add onAdd={this.handleAdd} />
        <List data={this.state.list} />
      </div>
    );
  }
}