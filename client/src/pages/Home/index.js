import { React, useState, useEffect } from "react";
import { useHistory, Redirect, Link } from "react-router-dom";
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
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setNotesArray(
          notesArray.filter((val) => {
              return val.id != id;
          })
      )
    })
  }

  function AddNote(e) {
    console.log("addnote")
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
    marginTop: "0.6rem",
    fontWeight: "590"
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
            <Button variant="outlined" color="primary" onClick={AddNote} style={{"borderWidth": "2px", "marginBottom": "0.5rem", "float": "left"}}>New Note</Button>
        </Link>

      </ThemeProvider>

      <Grid container spacing={2}>

        {
            /*
            <Grid item className="grid-note" style={{"marginLeft": "0.5rem", "marginTop": "0.5rem"}}>

            <div className="note-header">
  
              <Typography variant="h1" style={noteTitleStyle}>Note title</Typography>
              
              <div style={{"display": "flex"}}>
                <Typography variant="h5" style={noteAuthorStyle}>Lucas Kusman</Typography>
                <Typography variant="h5" style={noteDatetimeStyle}>04/11/2021 14:35</Typography>
              </div>
              
            </div>
  
            <hr style={{"marginTop": "0.5rem"}}/>
  
            <div className="note-body">
              <Typography variant="p" style={noteTextStyle}>TAenean placerat. In vulputate urna eu arcu. Aliquam erat volutpat. Suspendisse potenti. Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nunc posuere. Nullam lectus justo, vulputate eget, mollis sed, tempor sed, magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam neque.
  
              </Typography>
            </div>
  
            <div className="note-footer">
              <Edit className="footer-icon edit-icon" />
              <DeleteForever className="footer-icon delete-icon"/>
            </div>
  
          </Grid>
          */
        }

        {
            notesArray.map((val, key) => {
                return (
                    <Grid item className="grid-note" style={{"marginLeft": "0.5rem", "marginTop": "0.5rem"}}>

                        <div className="note-header">
            
                            <Typography variant="h1" style={noteTitleStyle}>{val.title}</Typography>
                            
                            <div style={{"display": "flex"}}>
                                <Typography variant="h5" style={noteAuthorStyle}>{val.author}</Typography>
                                <Typography variant="h5" style={noteDatetimeStyle}>{val.datetime}</Typography>
                            </div>
                        
                        </div>
            
                        <hr style={{"marginTop": "0.5rem"}}/>
            
                        <div className="note-body">
                            <Typography variant="p" style={noteTextStyle}>{val.text}</Typography>
                        </div>
            
                        <div className="note-footer">
                            <Edit className="footer-icon edit-icon" />
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