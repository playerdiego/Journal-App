import moment from 'moment';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../actions/notes';

export const JournalEntry = ({id, title, body, date, url}) => {

    const noteDate = moment(date);

    const dispatch = useDispatch();

    const handleSelect = () => {
        dispatch(setActiveNote(id, {title, body, date, url}));
    }
    
    return (
        <div className='journal__entry animate__animated animate__fadeIn' onClick={handleSelect}>
            <div
            className="journal__entry-picture"
            style={{
                backgroundImage: `url(${url}})`,
                backgroundSize: 'cover'
            }}
            ></div>

            <div className="journal__entry-body">
                <p className='journal__entry-title'>
                    {
                        title ? title : 'Some Awesome'
                    }
                </p>
                <p className='journal__entry-content'>
                    {
                        body ? body : 'What happened...'
                    }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
            
        </div>
    )
}
