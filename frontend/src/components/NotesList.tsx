import { useState } from "react";
import { Note } from "../models/note";


const NotesList:React.FC= () => {
    const[notes, setNotes] = useState<Note[]>([]);

    return (
        <div>
            
        </div>
    );
};

export default NotesList;