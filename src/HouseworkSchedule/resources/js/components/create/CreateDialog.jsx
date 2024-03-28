import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Create from './Create';
import Checkbox from "@mui/material/Checkbox";

function CreateDialog(props){
    const{onClose,open,data,setFormData,date}=props;

    const handleClose = () =>{
        onClose();
    };

    //入力値を一時保存
    const inputChange = (e) =>{
        const key = e.target.name;
        const value = e.target.value;
        data[key] = value;
        let datas = Object.assign({},data);
        setFormData(datas);
    }

    return (
        <Dialog onClose={handleClose} open={open} date={date}>
            <DialogTitle>予定登録</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    スケジュール登録
                </DialogContentText>
                <TextField margin="dense" id="due_date" name="due_date" label="予定日" type="text" fullWidth variant="standard" defaultValue={date} onChange={inputChange}/>
                <TextField margin="dense" id="title" name="title" label="タイトル" type="text" fullWidth variant="standard" onChange={inputChange}/>
                <InputLabel id="category_label">カテゴリー</InputLabel>
                <Select labelId="category" id="category_select" name="category" label="Category" variant="standard" defaultValue="1" onChange={inputChange}>
                    <MenuItem value="1">キッチン</MenuItem>
                    <MenuItem value="2">お風呂</MenuItem>
                    <MenuItem value="3">リビング</MenuItem>
                </Select>
                <TextField margin="dense" id="detail" name="detail" label="詳細" type="text" fullWidth variant="standard" onChange={inputChange} />
                <Select labelId="is_complete" id="is_complete_select" name="is_complete" label="is_complete" variant="standard" defaultValue="0" onChange={inputChange}>
                    <MenuItem value="0">未</MenuItem>
                    <MenuItem value="1">済</MenuItem>
                </Select>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>キャンセル</Button>
                <Create formData={data} />
            </DialogActions>
        </Dialog>
    );
}

CreateDialog.propTypes = {
    onClose:PropTypes.func.isRequired,
    open:PropTypes.bool.isRequired,
};

export default CreateDialog;
