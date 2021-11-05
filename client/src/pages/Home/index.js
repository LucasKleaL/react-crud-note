import { React, useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";

import { Container, Typography, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";

import { Edit, DeleteForever } from '@material-ui/icons';

import Grid from "@material-ui/core/Grid";

import "./../../styles/global.css";
import "./../../styles/index.css";
import "@fontsource/roboto";

function Home() {

  var history = useHistory();

  const [notesArray, setNotesArray] = useState([]);

  useEffect(() => {
    getNotes();
  }, [])
  
  async function getNotes() {
    await Axios.get("http://localhost:3001/getNotes").then((response) => {
      setNotesArray(response.data);
      console.log(response.data);
    })
  }

  const deleteNote = (id) => {

    let answer = window.confirm("Are you sure want to delete?");
      if (answer) {
        Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
          setNotesArray(
              notesArray.filter((val) => {
                  return val.id != id;
              })
          )
        });
      }

  }

  function editNote(val) {
    let note = [];
    note.push({
        id: val.id,
        title: val.title,
        text: val.text,
        tag: val.tag,
        author: val.author
    })
    window.sessionStorage.setItem("editNote", JSON.stringify(note));
  }

  const noteTitleStyle = {
    color: "black",
    fontSize: "2rem",
    textAlign: "left",
    marginLeft: "0.5rem",
    marginTop: "0.3rem",
    fontWeight: "600"
  }

  const noteAuthorStyle = {
    color: "var(--gray-line)",
    textAlign: "left",
    fontSize: "1rem",
    marginLeft: "0.5rem",
    marginTop: "0.3rem",
    fontWeight: "590"
  }

  const noteDatetimeStyle = {
    color: "var(--gray-line)",
    textAlign: "left",
    fontSize: "0.8rem",
    marginLeft: "1rem",
    marginTop: "0.5rem",
    fontWeight: "590"
  }

  const noteTagStyle = {
    color: "var(--black)",
    textAlign: "left",
    fontSize: "0.9rem",
    fontWeight: "600",
    paddingLeft: "0.5rem"
  }

  const noteTextStyle = {
    textAlign: "left",
    fontSize: "1rem",
    marginLeft: "0.3rem",
    marginRight: "0.3rem",
    marginTop: "0.6rem",
  }

  const addNoteButton = createTheme({
    palette: {
      primary: {
        light: "#008394",
        main: "#00bcd4",
        dark: "#33c9dc",
        getContrastText: ""
      }
    }
  })

  return (

      <Container maxwidth="lg" style={{"marginTop": "5rem"}} align="center">
      
      <ThemeProvider theme={addNoteButton}>
        
        <Link to="/add">
            <Button variant="outlined" color="primary" style={{"borderWidth": "2px", "marginBottom": "0.5rem", "float": "left"}}>New Note</Button>
        </Link>

      </ThemeProvider>

      <Grid container spacing={2}>

        {
            notesArray.map((val, key) => {
                return (
                    <Grid item className="grid-note" style={{"marginLeft": "0.5rem", "marginTop": "0.5rem"}}>

                        <div className="note-header">
            
                            <Typography variant="h1" style={noteTitleStyle}>{val.title}</Typography>
                            
                            <div style={{"display": "flex"}}>
                                <Typography variant="h5" style={noteAuthorStyle}>{val.author}</Typography>
                                <Typography variant="h5" style={noteDatetimeStyle}>{val.datetime}</Typography>

                                <div className="note-tag">
                                  <Typography variant="h5" style={noteTagStyle}>{val.tag}</Typography>
                                </div>

                            </div>

                        </div>
            
                        <hr style={{"marginTop": "0.5rem"}}/>
            
                        <div className="note-body">
                            <Typography variant="p" style={noteTextStyle}>{val.text}</Typography>
                        </div>
            
                        <div className="note-footer">
                            <Link to="/edit">
                                <Edit className="footer-icon edit-icon" onClick={() => editNote(val)} />
                            </Link>
                            <DeleteForever onClick={() => deleteNote(val.id)} className="footer-icon delete-icon"/>
                        </div>
        
                    </Grid>
                )
            })
        }

        </Grid>
        
      </Container>

  );
  
}

export default Home;