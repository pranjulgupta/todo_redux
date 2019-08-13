import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { addData, deleteData, editData, checkStatus } from './actions';
import 'bootstrap/dist/css/bootstrap.css';
import { ListGroup, Button, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash, faEdit, faUndo } from '@fortawesome/free-solid-svg-icons'
class App extends React.Component {
  state = {
    newItem: '',
    load: false,
    index: '',
    statusIndex: '',
    unCompletedTask: [],
    CompletedTask: [],
  }

  changeStatus = (list) => {
    this.props.checkStatus(list.newData.id)
  }

  deleteValue = (list) => {
    this.props.deleteData(list.newData.id)
  }

  edittask = (list) => {
    this.setState({ newItem: list.newData.item, load: true, index: list.newData.id })
  }

  getUnCompleteTaskList = () => {
    var unCompletedTask = this.props.list.filter(tstatus => tstatus.newData.status == false)
    const listItem = unCompletedTask.map((list, i) => <div>
      <ListGroup key={i}>
        <ListGroup.Item variant={list.newData.status ? 'success' : ''}>
          <Button variant="info" onClick={() => this.changeStatus(list)}>{list.newData.status ? <FontAwesomeIcon icon={faUndo} /> : <FontAwesomeIcon icon={faCheck} />}</Button>
          <span style={{ paddingLeft: '5px' }}>{list.newData.item}</span>
          <Button variant="danger" onClick={() => this.deleteValue(list)} style={{ float: "right" }}><FontAwesomeIcon icon={faTrash} /></Button>
          <Button variant="primary" onClick={() => this.edittask(list)} style={{ float: "right" }}><FontAwesomeIcon icon={faEdit} /></Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
    )
    return listItem;
  }

  getCompleteTaskList = () => {
    var CompletedTask = this.props.list.filter(tstatus => tstatus.newData.status == true)
    const listItem = CompletedTask.map((list, i) => <div>
      <ListGroup key={i}>
        <ListGroup.Item variant={list.newData.status ? 'success' : ''}>
          <Button variant="info" onClick={() => this.changeStatus(list)}>{list.newData.status ? <FontAwesomeIcon icon={faUndo} /> : <FontAwesomeIcon icon={faCheck} />}</Button>
          <span style={{ paddingLeft: '5px' }}>{list.newData.item}</span>
          <Button variant="danger" onClick={() => this.deleteValue(list)} style={{ float: "right" }}><FontAwesomeIcon icon={faTrash} /></Button>
          <Button variant="primary" onClick={() => this.edittask(list)} style={{ float: "right" }}><FontAwesomeIcon icon={faEdit} /></Button>
        </ListGroup.Item>
      </ListGroup>
    </div>
    )
    return listItem
  }

  getValue = (e) => {
    this.setState({ newItem: e.target.value })
  }

  updateValue = (e) => {
    this.props.editData(this.state.index, this.state.newItem)
    this.setState({ load: false, newItem: '' })
  }

  setValue = () => {
    let newItem = { id: Math.random() * 10, item: this.state.newItem, status: false }
    this.props.addData(newItem)
    this.setState({ newItem: "" })
  }

  render() {
    console.log(this.props.list);
    return (<div>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Task Name</Form.Label>
          <Form.Control type="email" placeholder="Enter Task" onChange={this.getValue} value={this.state.newItem} />
        </Form.Group>
        {this.state.load == false ? <Button variant="primary" onClick={this.setValue}>Add</Button> : ''}
        {this.state.load == true ? <Button variant="primary" onClick={this.updateValue}>Edit</Button> : ''}
      </Form>
      <span>UnCompletedTask List</span>
      {this.props.list ? this.getUnCompleteTaskList() : ''}
      <span>CompletedTask List</span>
      {this.props.list ? this.getCompleteTaskList() : ''}
    </div>)
  }
}

const mapStateToProps = state => ({
  list: state.list
})

export default connect(mapStateToProps, { addData, deleteData, editData, checkStatus })(App);
