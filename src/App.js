import React, { Component } from "react";
import "./App.css";
import firebase from "firebase";
import Sidebar from "./sidebar/Sidebar";
import Editor from "./editor/Editor";

class App extends Component {
  state = {
    selectedNoteIndex: null,
    selectedNote: null,
    notes: null
  };

  //fetch data from firebase
  componentDidMount = () => {
    firebase
      .firestore()
      .collection("notes")
      .onSnapshot(serverUpdate => {
        const notes = serverUpdate.docs.map(_doc => {
          const data = _doc.data();
          data["id"] = _doc.id;
          return data;
        });
        this.setState({
          notes
        });
      });
  };

  deleteNote = note => {
    const { notes } = this.state;

    this.setState({
      notes: notes.filter(_note => _note !== note)
    });

    this.setState({
      selectedNote: null,
      selectedNoteIndex: null
    });

    firebase
      .firestore()
      .collection("notes")
      .doc(note.id)
      .delete();
  };

  selectNote = (_note, _index) => {
    this.setState({
      selectedNote: _note,
      selectedNoteIndex: _index
    });
  };

  newNote = async title => {
    const note = { title, body: "" };
    const newFromDB = await firebase
      .firestore()
      .collection("notes")
      .add({
        ...note,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newId = newFromDB.id;
    this.setState({
      notes: [...this.state.notes, note]
    });
    //when we filter,result is [{}] so [0]
    const newNoteIndex = this.state.notes.indexOf(
      this.state.notes.filter(note => note.id === newId)[0]
    );
    this.setState({
      selectedNote: this.state.notes[newNoteIndex],
      selectedNoteIndex: newNoteIndex
    });
  };

  //update data to firebase
  noteUpdate = (id, { title, body }) => {
    firebase
      .firestore()
      .collection("notes")
      .doc(id)
      .update({
        title,
        body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  };

  render() {
    const { selectedNoteIndex, notes, selectedNote } = this.state;
    return (
      <div className="app-container">
        <Sidebar
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}
        />
        {selectedNote ? (
          <Editor
            selectedNote={selectedNote}
            selectedNoteIndex={selectedNoteIndex}
            notes={notes}
            noteUpdate={this.noteUpdate}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
