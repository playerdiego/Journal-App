import moment from 'moment';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startPictureUpload, startUpladNote } from '../../actions/notes';

export default function NotesAppBar() {

    const {active} = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const newDate = moment(active.date);

    const handleSave = () => {
        dispatch(startUpladNote(active.id, {...active}));
    };

    const handlePicture = () => {
        document.querySelector('#fileSelector').click();
    }
    
    const handleFileChange = (e) => {
        
        const file = e.target.files[0];
        if(file) {
            dispatch(startPictureUpload(file));
        }

    }

    return (
        <div className='notes__appbar'>
            <span>{newDate.format('LLL')}</span>

            <input
                type="file"
                style={{display: 'none'}}
                id='fileSelector'
                name='file'
                onChange={handleFileChange}
            />

            <div>
                <button className='btn' onClick={handlePicture}>
                    Picture
                </button>
                <button className="btn" onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
