import { addDoc, collection, doc, updateDoc, deleteDoc } from "@firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

// react-journal


export const startNewNote = () => {
    return async (dispatch, getState) => {

        const {auth} = getState();
        const {uid} = auth;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        };

        const docRef = await addDoc(collection(db, `${uid}/journal/notes`), newNote);
            
        dispatch(setActiveNote(docRef.id, newNote));
        dispatch(addNote({...newNote, id: docRef.id}));

    };
};

export const startLoadNotes = (uid) => {
    return (async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    });
};

export const startUpladNote = (id, note) => {
    return(async (dispatch, getState) => {
        const {auth} = getState();
        const {uid} = auth;

        if(!note.url) {
            delete note.url;
        }
        
        const noteToFirestore = {...note};
        delete noteToFirestore.id; 
        
        updateDoc(doc(db, uid, 'journal', 'notes', id), noteToFirestore)
            .then(() =>  Swal.fire('Saved', noteToFirestore.title, 'success'))
            .catch(e => Swal.fire('Error', e, 'error'));
        dispatch(refreshNote(id, note));
    });
}

export const startPictureUpload = (file) => {
    return async (dispatch, getState) => {
        const active = getState().notes.active;

        Swal.fire({
            title: '...Uploading',
            text: 'Please Wait...',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        })
        const fileUrl = await fileUpload(file);

        dispatch(startUpladNote(active.id, {...active, url: fileUrl}));
        dispatch(setActiveNote(active.id, {...active, url: fileUrl}));

        Swal.close();
    };
}

export const startDeletNote = () => {
    return (dispatch, getState) => {

        const active = getState().notes.active;
        const {uid} = getState().auth;

        deleteDoc(doc(db, uid, 'journal', 'notes', active.id))
            .then(() => {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
            })
        dispatch(deleteNotes(active.id));
    }
}

export const deleteNotes = (note) => ({
    type: types.notesDelete,
    payload: note
})

export const addNote = (note) => ({
    type: types.notesAddNew,
    payload: note
});

export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes
});

export const setActiveNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id, note
    }
});

export const logoutClean = () => ({
    type: types.notesLogoutCleaning
});