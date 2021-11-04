import {BrowserRouter, Route} from 'react-router-dom';
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";

const Routes = () => {

    return (
        <BrowserRouter>
        
            <Route path="/" exact={true} component={Home}/>
            
            <Route path="/add" exact={true} component={AddNote} />
            
        </BrowserRouter>
    )

}

export default Routes;