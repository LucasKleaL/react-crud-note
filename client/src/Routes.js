import {BrowserRouter, Route} from 'react-router-dom';
import Home from "./pages/Home";
import AddNote from "./pages/AddNote";
import EditNote from './pages/EditNote';

const Routes = () => {

    return (
        <BrowserRouter>
        
            <Route path="/" exact={true} component={Home}/>
            <Route path="/add" exact={true} component={AddNote} />
            <Route path="/edit" exact={true} component={EditNote} />
            
        </BrowserRouter>
    )

}

export default Routes;