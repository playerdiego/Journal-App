import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { setActiveNote, startDeletNote } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'
import NotesAppBar from './NotesAppBar'

export const Note = () => {

    const {active} = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const [{title, body}, handleInputChange, reset] = useForm({
        title: active.title,
        body: active.body
    });

    let activeID = useRef(active.id);

    useEffect(() => {
        if(active.id !== activeID.current) {
            reset(active);
            activeID.current = active.id;
        }
    }, [active, reset]);

    useEffect(() => {
        dispatch(setActiveNote(active.id, {
            ...active,
            title,
            body
        }));
    }, [title, body]);

    const handleDeleteNote = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if(result.isConfirmed) {
                dispatch(startDeletNote());
            }
        })
    }

    
    return (
        <div className='notes__main-content animate__animated animate__fadeIn'>
            
            <NotesAppBar />

            <div className="notes__content">

                <form>
                    <input
                        type="text"
                        placeholder='Some awesome...'
                        className='notes__title-input'
                        autoComplete='off'
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                    />

                    <textarea
                        placeholder="What happened..."
                        className='notes__textarea'
                        name='body'
                        value={body}
                        onChange={handleInputChange}
                    ></textarea>

                    {
                        active.url &&
                        <div className="notes__image">
                            <img src={active.url} alt="Fotico" />
                        </div>
                    }
                </form>

            </div>

            <button className="btn btn-danger" onClick={handleDeleteNote}>
                Delete
            </button>

        </div>
    )
}
