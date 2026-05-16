import {
BrowserRouter,
Routes,
Route,
Link
}
from "react-router-dom";

import {
Button
}
from "@mui/material";

import Notifications from "./pages/Notifications";
import Priority from "./pages/Priority";

import "./App.css";

function App(){

return(

<BrowserRouter>

<div className="container">

<div className="navbar">

<Button
variant="contained"
component={Link}
to="/"
>

ALL NOTIFICATIONS

</Button>


<Button
variant="contained"
component={Link}
to="/priority"
>

PRIORITY NOTIFICATIONS

</Button>

</div>

<Routes>

<Route
path="/"
element={<Notifications/>}
/>

<Route
path="/priority"
element={<Priority/>}
/>

</Routes>

</div>

</BrowserRouter>

)

}

export default App;