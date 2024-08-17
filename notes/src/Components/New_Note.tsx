import React from 'react'
import Forms from './Forms'
import { NoteData } from '../App'
type NewNoteProps={
    onSubmit:(data:NoteData)=>void
    onAddTag:(tag:Tag)=>void
    availableTags:Tag[]
}
function New_Note({onSubmit,onAddTag,availableTags}:NewNoteProps) {
    return (
        <>
            <h1 className='text-5xl font-500'>New Note</h1>
            <Forms onSubmit={onSubmit}onAddTag={onAddTag} />
        </>
    )
}

export default New_Note