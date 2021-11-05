import { React, useState, useLayoutEffect } from "react";
import { useHistory } from "react-router";
import { Container, Typography, Button } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Axios from "axios";

import "./../../styles/global.css";
import "./../../styles/index.css";

function EditNote() {

    var history = useHistory();

    const [note, setNote] = useState([]);
    const [title, setTitle] = useState();
    const [tag, setTag] = useState();
    const [text, setText] = useState();

    useLayoutEffect(() => {

        let data = JSON.parse(window.sessionStorage.getItem("editNote"));
        setTitle(data[0].title);
        setTag(data[0].tag);
        setText(data[0].text);
        setNote(data[0]);

    }, []);

    const edit = (id) => {

        let datetime = new Date();
        let date = datetime.getDate()+"/"+datetime.getMonth()+"/"+datetime.getFullYear() + " ";
        let time = datetime.getHours()+":"+datetime.getMinutes()+":"+datetime.getSeconds();
        let formatedDatetime = date + time;

        Axios.put("http://localhost:3001/update", { 
            id: id,
            title: title,
            tag: tag,
            text: text,
            datetime: formatedDatetime
        }).then(() => {
            console.log("Edits updated successful");
            history.push("/");
        });
    }

    function backHome()  {
        history.push("/");
    }

    const noteAuthorStyle = {
        color: "var(--gray-line)",
        textAlign: "left",
        fontSize: "1rem",
        marginLeft: "0.6rem",
        marginTop: "0.3rem",
        fontWeight: "590"
    }

    const tagInputStyle = {
        backgroundColor: "var(--gray-tag)",
        marginTop: "0.4rem",
        marginLeft: "1rem",
        borderRadius: "20px",
        border: 0,
        height: "1.2rem",
        width: "5rem",
        paddingLeft: "0.5rem",
        fontWeight: "600"
    }

    const titleInputStyle = {
        width: "95%",
        height: "2rem",
        paddingLeft: "0.3rem",
        marginTop: "0.5rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        borderRadius: "10px",
        border: "0",
        fontSize: "1.5rem",
        fontWeight: "600",
        textAlign: "left"
    }

    const textAreaStyle = {
        width: "95%",
        height: "95%",
        paddingLeft: "0.5rem",
        paddingTop: "0.3rem",
        marginLeft: "0.5rem",
        marginRight: "0.5rem",
        borderRadius: "10px",
        border: "0",
        resize: "none"
    }

    const addNoteButton = createTheme({
        palette: {
            primary: {
                light: "#008394",
                main: "#00bcd4",
                dark: "#33c9dc",
                getContrastText: "#33c9dc"
            },
            secondary: {
                light: "#C4C4C4",
                main: "#C4C4C4",
                dark: "#C4C4C4",
                getContrastText: "#C4C4C4"
            }
        }
    });

    

    return (

        <div>
            
                <Container maxwidth="lg" style={{"marginTop": "10%"}} align="center">

                    <div className="grid-note" style={{"marginLeft": "0.5rem", "marginTop": "0.5rem"}}>

                        <div className="note-header">

                            <input type="text" defaultValue={note.title} style={titleInputStyle} onChange={ (e) => {setTitle(e.target.value)} } />
                            
                            <div style={{"display": "flex"}}>
                                <Typography variant="h5" style={noteAuthorStyle}>{note.author}</Typography>
                                <input type="text" defaultValue={note.tag} style={tagInputStyle} onChange={ (e) => {setTag(e.target.value)} }/>
                            </div>

                        </div>

                        <hr style={{"marginTop": "0.5rem"}}/>

                        <div className="note-body">
                            <textarea defaultValue={note.text} style={textAreaStyle} onChange={ (e) => {setText(e.target.value)} }></textarea>
                        </div>

                    </div>

                    <div className="div-container">
                        <div style={{"display": "block"}}>
                            <ThemeProvider theme={addNoteButton}>
                                <Button variant="outlined" color="primary" onClick={() => edit(note.id)} style={{"borderWidth": "2px", "marginTop": "2rem", "float": "left"}}>SAVE EDITS</Button>
                            </ThemeProvider>
                        </div>
                    </div>

                    <div className="div-container">
                            <ThemeProvider theme={addNoteButton}>
                                <Button variant="outlined" color="secondary" onClick={() => backHome()} style={{"borderWidth": "2px", "marginTop": "1rem", "float": "left"}}>CANCEL</Button>
                            </ThemeProvider>
                    </div>
                    
                </Container>

        </div>

        

    )

}

export default EditNote;
