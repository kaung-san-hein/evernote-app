import React from "react";
import { withStyles, ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styles from "./styles";
import { removeHTMLTags } from "../helper";

const SidebarItem = ({
  _note,
  _index,
  selectedNoteIndex,
  selectNote,
  deleteNote,
  classes
}) => {
  return (
    <div>
      <ListItem
        className={classes.listItem}
        selected={selectedNoteIndex === _index}
        alignItems="flex-start"
      >
        <div
          className={classes.textSection}
          onClick={() => selectNote(_note, _index)}
        >
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          />
        </div>
        <DeleteIcon
          onClick={() => deleteNote(_note)}
          className={classes.deleteIcon}
        />
      </ListItem>
    </div>
  );
};

export default withStyles(styles)(SidebarItem);
