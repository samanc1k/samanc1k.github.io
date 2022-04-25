import React, { Component } from 'react';
import axios from 'axios';
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default class CreateNote extends Component {

  state = {
    title: '',
    content: '',
    date: new Date(),
    userSelected: '',
    users: [],
    editing: false,
    _id: ''
  }

  async componentDidMount() {
    const res = await axios.get('http://localhost:4000/api/users');
    if(res.data.length > 0){
      this.setState({
        users: res.data.map(user => user.username),
        userSelected: res.data[0].username
      })
    }

    if(this.props.match.params.id){
      console.log(this.props.match.params.id);
      const res = await axios.get("http://localhost:4000/api/notes" + this.props.match.params.id);
      console.log(res.data);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        editing: true,
        _id: res.data._id
      })
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    if(this.state.editing){
      const updatedNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.author,
        date: this.state.date
      };
      await axios.put('http://localhost:4000/api/notes/' + this.state._id, updatedNote);
    }
    else{
      const newNote = {
        title: this.state.title,
        content: this.state.content,
        author: this.state.author,
        date: this.state.date
      };
      await axios.post('http://localhost:4000/api/notes/' + this.state._id, newNote);

    }
    window.location.href = '/';
  }

  onInputChanga = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
    // console.log('salom');
  }

  onChangeDate = date => {
    this.setState({date})
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="card card_body">
          <h4>Create a Note</h4>
          <form action="" onSubmit={this.onSubmit}>
            <div className="form-group">
                <select 
                  className='form-control'
                  value={this.state.userSelected}
                  onChange={this.onInputChanga}
                  name="userSelected"
                  required
                  id=""
                >
                {
                  this.state.users.map(user => (
                    <option key={user} value={user}>
                        {user}
                    </option>
                  ))
                }
                </select>
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  className='form-control'
                  placeholder='Title'
                  onChange={this.onInputChanga}
                  name="Title"
                  value={this.state.title}
                />
              </div>
              <div className="form-group">
                <textarea
                  type="text" 
                  className='form-control'
                  placeholder='Content'
                  onChange={this.onInputChanga}
                  name="Title"
                  value={this.state.content}
                  required
                >
                </textarea>
              </div>

              <div className="form-group">
                <div 
                  className='form-control'
                  select={this.state.date}
                  onChange={this.onChangeDate}
                >

                </div>
                <button className='btn btn-primary'>
                  Save
                </button>
              </div>
          </form>
        </div>
      </div>
    )
  }
}
