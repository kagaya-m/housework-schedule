import React, {useEffect, useState} from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ReactDOM from "react-dom/client";
import jaLocale from '@fullcalendar/core/locales/ja';
import Example from "./Example";
//import './App.css';

function Calendar() {
    const [schedules,setSche] = useState([])

    //画面読み込み時に、1度だけ起動
    useEffect(()=>{
        getPostData();
    },[])
    const getPostData = () =>{
        axios
            .post('/api/posts')
            .then(response=>{
                setSche(response.data); //バックエンドからのデータをセット
                //console.log(response.data);
            }).catch(()=>{
            console.log('通信に失敗しました');
        });
    }

    //データ格納の空配列を作成
    let rows = [];
    //スケジュールデータをrowに格納する
    schedules.map((post)=>
        rows.push({
            title:post.title,
            start:post.due_date,
        })
    );

    return (
        <div>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locales={[jaLocale]}
                locale='ja'
                events={rows}
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
