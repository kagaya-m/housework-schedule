import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Update(props){
    const{editData}=props;

    //ダイアログデータを登録
    const updateSchedule = async() => {
        //空なら弾く
        if(editData.title===''){
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/update',{
                id:editData.id,
                title:editData.title,
                category:editData.category,
                detail:editData.detail,
                due_date:editData.due_date,
                is_complete:editData.is_complete,
                complete_date:editData.complete_date
            })
            .then((res)=>{
                //戻り値をtodosにセット
                setEditData(res.data);
            })
            .catch(error=>{
                console.log(error);
            })
    }

    return (
        <Button href="/houseworkSchdule" onClick={updateSchedule}>登録</Button>
    );
}

export default Update;
