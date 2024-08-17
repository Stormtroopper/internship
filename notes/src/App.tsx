import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Edit from "./Components/Edit"
import useLocalStorage from './Components/useLocalStorage';
import New_Note from "./Components/New_Note"
import { Container } from 'react-bootstrap'
import {v4 as uuidV4} from 'uuid'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useMemo } from 'react';
type Note = {
  id: string
} & NoteData
export type NoteData = {
  title: string,
  markdown: string,
  tagIds: Tag[]
}
export type TagNote = {
  id: string
}
export type TagData = {
  title: string,
  markdown: string,
  tagid: string[]
}

export type Tag = {
  id: string,
  label: string
}
export default function App() {
  const [notes, set_notes] = useLocalStorage<TagNote[]>('notes_1', [])
  const [tags, set_tags] = useLocalStorage<Tag[]>('tags_1', [])
  const notes_tags=useMemo(()=>{
    return notes.map(note=>{
      return{...note,tags:tags.filter(tag=>note.id.includes(tag.id))}
    })
  },[notes,tags])
  let onCreateNote=(data:NoteData)=>{
    set_notes(prevNotes=>{
      return[...prevNotes,{...data,id:uuidV4(),tagid:tags.map(tag=>tag.id)}]
    })
  }
  const addTag=(tag:Tag)=>{
    set_tags(prev=>[...prev,tag])
}
  return (
    <>
      <Container className="my-5">

        <Routes>
          <Route path="" element={
            <h1 className='text-5xl font-300 underline'>Home</h1>
          } />
          <Route path="/new_note" element={<New_Note onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />
          <Route path="/:id">
            <Route index element={<h3 className='text-5xl font-500'>Notes </h3>} />
            <Route path="edit" element={<Edit />} />
            <Route />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Container>
    </>
  )
}


