import React, { Component } from "react";
import { withStyles } from "@material-ui/core";
import debounce from "../helper";
import styles from "./styles";
import ReactQuill from "react-quill";
import EditIcon from "@material-ui/icons/Edit";

class Editor extends Component {
  state = {
    id: "",
    title: "",
    body: ""
  };

  componentDidMount = () => {
    const { id, title, body } = this.props.selectedNote;
    this.setState({
      id,
      title,
      body
    });
  };

  componentDidUpdate = () => {
    const { id, title, body } = this.props.selectedNote;
    if (id !== this.state.id) {
      this.setState({
        id,
        title,
        body
      });
    }
  };

  updateBody = async body => {
    await this.setState({
      body
    });
    this.update();
  };

  updateTitle = title => {
    this.setState({
      title
    });
    this.update();
  };

  //this function is not work untail 1.5s
  update = debounce(() => {
    const { id, title, body } = this.state;
    this.props.noteUpdate(id, { title, body });
  }, 1500);

  render() {
    const { classes } = this.props;
    const { title } = this.state;
    return (
      <div className={classes.editorContainer}>
        <EditIcon className={classes.editIcon} />
        <input
          className={classes.titleInput}
          placeholder="Note title..."
          value={title ? title : ""}
          onChange={event => this.updateTitle(event.target.value)}
        />
        <ReactQuill value={this.state.body} onChange={this.updateBody} />
      </div>
    );
  }
}

export default withStyles(styles)(Editor);
