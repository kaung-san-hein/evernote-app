import React, { Component } from "react";
import { withStyles, Button, List, Divider } from "@material-ui/core";
import styles from "./styles";
import SidebarItem from "../sidebarItem/SidebarItem";

class Sidebar extends Component {
  state = {
    addingNote: false,
    title: null
  };

  newNoteBtnClick = () => {
    this.setState({
      addingNote: !this.state.addingNote,
      title: null
    });
  };

  updateTitle = title => {
    this.setState({
      title
    });
  };

  newNote = () => {
    const { title } = this.state;
    this.props.newNote(title);
    this.setState({
      addingNote: !this.state.addingNote,
      title: null
    });
  };

  selectNote = (_note, _index) => {
    this.props.selectNote(_note, _index);
  };

  deleteNote = _note => {
    if (window.confirm(`Are you sure you want to delete: ${_note.title}`)) {
      this.props.deleteNote(_note);
    }
  };

  render() {
    const { classes, selectedNoteIndex, notes } = this.props;
    const { addingNote } = this.state;
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={this.newNoteBtnClick} className={classes.newNoteBtn}>
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={event => this.updateTitle(event.target.value)}
            />
            <Button className={classes.newNoteSubmitBtn} onClick={this.newNote}>
              Submit Note
            </Button>
          </div>
        ) : null}
        {notes && (
          <List>
            {notes.map((_note, _index) => {
              return (
                <div key={_index}>
                  <SidebarItem
                    _note={_note}
                    _index={_index}
                    selectedNoteIndex={selectedNoteIndex}
                    selectNote={this.selectNote}
                    deleteNote={this.deleteNote}
                  />
                  <Divider />
                </div>
              );
            })}
          </List>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Sidebar);
