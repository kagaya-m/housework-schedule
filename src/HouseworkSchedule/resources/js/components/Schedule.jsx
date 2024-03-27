import {useEffect, useState} from "react";

function GetSchedule(props){
    const [schedules,setSche] = useState([])

    {/* スケジュール表示 */}
    useEffect(()=>{
        getPostData();
    },[])
    const getPostData = () =>{
        axios
            .post('/api/posts')
            .then(response=>{
                setSche(response.data); //バックエンドからのデータをセット
            }).catch(()=>{
            console.log('通信に失敗しました');
        });
    }

    //データ格納の空配列を作成
    let rows = [];
    //スケジュールデータをrowに格納する
    schedules.map((post)=> {
        const bdColor = '#4D86D2';
        const bgColor = post.is_complete === 1 ? '#4D86D2' : 'white';
        const textColor = post.is_complete === 1 ? 'white' : '#4D86D2';
        rows.push({
            id: post.id,
            start: post.due_date,
            title: post.title,
            category: post.category,
            detail: post.detail,
            is_complete: post.is_complete,
            backgroundColor: bgColor,
            borderColor: bdColor,
            textColor: textColor
        })
    });

    return rows
}

export default GetSchedule;
