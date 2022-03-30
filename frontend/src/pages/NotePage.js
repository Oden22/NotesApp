import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from "../assets/chevron-left.svg"
import { useNavigate } from 'react-router-dom'


const NotePage = () => {
    let navigate = useNavigate();
    const { id } = useParams();
    let [note, setNote] = useState(null)

    useEffect(() => {
        let getNote = async () => {
            if (id === 'new') return
            let response = await fetch(`/api/notes/${id}/`)
            let data = await response.json()
            setNote(data)
        };

        getNote();
        
    }, [id])

    let updateNote = async () => {
        fetch(`/api/notes/${id}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let createNote = async () => {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
    }

    let deleteNote = async () => {
        fetch(`/api/notes/${id}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate('/')
    }

    let handleSumbit = () => {
        if(id !== 'new' && note.body === '') {
            deleteNote()
        } else if(id !== 'new') {
            updateNote()
        } else if(id === 'new' && note.body !== null){
            createNote()
        }
        navigate('/')
    }

    let handleChange = (value) => {
        setNote(note => ({...note, 'body': value}))
    }


    return (
        <div className="note">
            <div className='note-header'>
                <h3>
                    <ArrowLeft onClick={handleSumbit}/>
                </h3>
                {id !== 'new' ? (
                    <button onClick={deleteNote}>Delete</button>
                ) : (
                    <button onClick={handleSumbit}>Done</button>
                )}
                
            </div>
            <textarea onChange={(e) => {handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage
