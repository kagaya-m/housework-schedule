import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function Create(props){
    const{formData}=props;

    console.log(formData);
    //ダイアログデータを登録
    const createSchedule = async() => {
        //タイトルが空なら弾く
        if(formData.title===''){
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/posts/create',{
                title:formData.title,
                category:formData.category,
                detail:formData.detail,
                due_date:formData.due_date,
                is_complete:formData.is_complete,
                complete_date:formData.complete_date
            })
            .then((res)=>{
                //戻り値をtodosにセット
                const tempPosts = post;
                tempPosts.push(res.data);
                setPosts(tempPosts)
                setFormData('');
            })
            .catch(error=>{
                console.log(error);
            })
    }

    return (
        <Button href="/houseworkSchdule" onClick={createSchedule}>登録</Button>
    );
}

export default Create;
