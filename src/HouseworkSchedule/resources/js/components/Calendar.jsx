import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ReactDOM from "react-dom/client";
import jaLocale from '@fullcalendar/core/locales/ja';
import interactionPlugin from '@fullcalendar/interaction';
import CreateDialog from "./create/CreateDialog";
import UpdateDialog from "./update/UpdateDialog";
import Header from "./Header"
import GetSchedule from "./Schedule";
//import './App.css';

function Calendar() {
    const[open,setOpen] = useState(false);
    const [clickedDate, setClickedDate] = useState(null);
    const handleClickOpen = (info) =>{
        const date = info.dateStr;
        setClickedDate(date);
        setOpen(true);
    };

    const handleClose = () =>{
        setOpen(false);
    };

    let rows = GetSchedule();

    {/* スケジュール登録 */}
    const [formData,setFormData] = useState({title:'',category:'',detail:'', due_date:'',is_complete:'', complete_date:''});

    {/* スケジュール更新 */}
    //更新用ダイアログ開閉
    const[editopen,setEditOpen] = useState(false);

    const editHandleClickOpen = (e) =>{
        setEditOpen(true);
        getEditData(e);
    };

    const editHandleClose = () =>{
        setEditOpen(false);
    };

    //更新用のデータ配列
    const [editData,setEditData] = useState({id:'',title:'',category:'',detail:'', due_date:'',is_complete:''});

    //バックエンドからデータ一覧を取得
    function getEditData(e){
        const eventId = e.event.id;
        console.log(eventId);
        axios
            .post('/api/edit', {
                id: eventId
            })
            .then(res => {
                setEditData({
                    id:res.data.id,
                    title:res.data.title,
                    category:res.data.category,
                    detail:res.data.detail,
                    due_date:res.data.due_date,
                    is_complete:res.data.is_complete,
                });
                console.log(editData);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    return (
        <div>
            <Header />
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                locales={[jaLocale]}
                locale='ja'
                events={rows}
                dateClick={handleClickOpen}
                selectable={true}
                selectMirror={true}
                eventClick={editHandleClickOpen}
                editable={true}
                contentHeight={'auto'}
            />

            <CreateDialog
                open={open}
                onClose={handleClose}
                data = {formData}
                setFormData = {setFormData}
                date = {clickedDate}
            />

            <UpdateDialog
                open={editopen}
                onClose={editHandleClose}
                data = {editData}
                setEditData = {setEditData}
            />
        </div>
    );
}

export default Calendar;

if (document.getElementById('calendar')) {
    const Index = ReactDOM.createRoot(document.getElementById("calendar"));

    Index.render(
        <React.StrictMode>
            <Calendar/>
        </React.StrictMode>
    )
}
