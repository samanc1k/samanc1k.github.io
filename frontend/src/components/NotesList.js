import axios from 'axios';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class NotesList extends Component {

  state = {
    notes: []
  }

  async componentDidMount() {
    this.getNotes();
  }

  getNotes = async () => {
    const res = await axios.get('http://localhost:4000/api/notes')
    this.setState({
      notes: res.data
    });
  } 

  deleteNote = async (noteId) => {
    await axios.delete('http://localhost:4000/api/notes/' + noteId);
    this.getNotes();
  }

  render() {
    return (
      <div className="row">

        {
          this.state.notes.map(note => (
            <div className="col-lg-4">
                <div className="card">
                    <div className="card-header">
                      <h5>{note.title}</h5>
                      <Link to={'/edit/' + note._id}>
                          edite
                      </Link>
                    </div>
                    <div className="card-body">
                      <p>{note.content}</p>
                      <p> Author {note.author}</p>
                      <p> 
                      {/*   {format(note.createAt)}  */  } 
                        
                        </p>
                    </div>
                    <div className="card-footer">
                      <button className='btn btn-danger' onClick={() => this.deleteNote(note._id)}>
                        Delete
                      </button>
                    </div>
                </div>
            </div>
          ))
        }
      
      
      </div>
    )
  }
}
