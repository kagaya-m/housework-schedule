import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ReactDOM from "react-dom/client";
import Example from "./Example";
//import './App.css';

function List() {
    return (
        <div>
            <FullCalendar plugins={[dayGridPlugin]} initialView="listWeek" />
        </div>
    );
}

export default List;

if (document.getElementById('list')) {
    const Index = ReactDOM.createRoot(document.getElementById("list"));

    Index.render(
        <React.StrictMode>
            <List/>
        </React.StrictMode>
    )
}
