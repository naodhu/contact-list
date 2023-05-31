import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import "./Contact.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Contact = (props) => {
  const history = useNavigate();
  const { _id, firstName, lastName, email, phoneNumber, createdAt } =
    props.contact;

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:4000/contacts/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/contacts"));
  };

  return (
    <Card className="card">
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          className="title"
        >{`${firstName} ${lastName}`}</Typography>
        <List>
          <ListItem>
            <ListItemIcon className="icon">
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={email} className="details" />
          </ListItem>
          <ListItem>
            <ListItemIcon className="icon">
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={phoneNumber} className="details" />
          </ListItem>
          <ListItem>
            <ListItemIcon className="icon">
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary={createdAt} className="details" />
          </ListItem>
        </List>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          LinkComponent={Link}
          to={`/contacts/${_id}`}
          aria-label="edit"
          className="icon-button"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={deleteHandler}
          aria-label="delete"
          className="icon-button"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Contact;
