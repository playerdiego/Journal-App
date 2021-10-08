import { collection, doc, getDocs } from "@firebase/firestore"
import { db } from "../firebase/firebase-config"

export const loadNotes = async (uid) => {
    const notesSnap = await getDocs(collection(db, uid, 'journal', 'notes'))
    const notes = [];

    notesSnap.docs.forEach(snap => {
        notes.push({
            ...snap.data(),
            id: snap.id
        });
    });

    return notes;
}