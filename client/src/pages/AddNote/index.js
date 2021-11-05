import { React, useState } from "react";
import { useHistory } from "react-router";
import { Container, Typography, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Axios from "axios";

import "./../../styles/global.css";
import "./../../styles/addNote.css";
import "@fontsource/roboto";

function AddNote() {

  var history = useHistory();

  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [tag, setTag] = useState();
  const [author, setAuthor] = useState();

  const submitButton = createTheme({
    palette: {
      primary: {
        light: "#008394",
        main: "#00bcd4",
        dark: "#33c9dc",
        getContrastText: ""
      }
    }
  })

  const sendNote = () => {

    let datetime = new Date();
    let date = datetime.getDate()+"/"+datetime.getMonth()+"/"+datetime.getFullYear() + " ";
    let time = datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds();
    let formatedDatetime = date + time;

    Axios.post("http://localhost:3001/insert", {
      title: title, 
      text: text, 
      tag: tag, 
      author: author, 
      datetime: formatedDatetime,
    })
    .then(() => {
      console.log("Successful sendNote");
      history.push("/");
    })
  }

  return (
    <Container maxwidth="lg" style={{"marginTop": "8rem"}} align="center">
      <div className="internal-container">

        <div className="div-form">

          <div style={{"display": "block", "width": "100%", "height": "100%"}}> 

            <div style={{"marginLeft": "3rem"}}>
              <Typography variant="h6" style={{"color": "white", "text-align": "left"}}>Note title</Typography>
              <input type="text" placeholder="Title" className="text-input" onChange={(e) => {setTitle(e.target.value)}} />
            </div>

            <div style={{"marginLeft": "3rem", "marginTop": "3rem"}}>
              <Typography variant="h6" style={{"color": "white", "text-align": "left"}}>Note text</Typography>
              <textarea placeholder="Multiline text" className="textarea-input" onChange={(e) => {setText(e.target.value)}} />
            </div>

            <div style={{"marginLeft": "3rem", "marginTop": "5rem"}}>
              <Typography variant="h6" style={{"color": "white", "text-align": "left"}}>Note tag</Typography>
              <input type="text" placeholder="Category, tags..." className="text-input" onChange={(e) => {setTag(e.target.value)}} />
            </div>

            <div style={{"marginLeft": "3rem", "marginTop": "3rem"}}>
              <Typography variant="h6" style={{"color": "white", "text-align": "left"}}>Note author</Typography>
              <input type="text" placeholder="Name" className="text-input" onChange={(e) => {setAuthor(e.target.value)}}/>
            </div>

          </div>
        
        </div>

        <ThemeProvider theme={submitButton}>
          <Button variant="outlined" color="primary" onClick={sendNote} style={{"borderWidth": "2px", "marginTop": "2.5rem"}}>Add note</Button>
        </ThemeProvider>

      </div>
    </Container>
  );
}

export default AddNote;