import React, { useRef, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Form, Stack, Col, Row, Button } from 'react-bootstrap'
import CreatableReactSelect from 'react-select/creatable'
import {v4 as uuidV4} from 'uuid'
import { NoteData,Tag } from '../App'
type NoteForm={
  onSubmit:(data:NoteData)=>void
  onAddTag:(tag:Tag)=>void
  availableTags:Tag[]
}
function Forms({onSubmit}:NoteForm) {
  const title = useRef<HTMLInputElement>(null)
  const markdown = useRef<HTMLTextAreaElement>(null)
  const [select,setselect]=useState<Tag[]>([])
  const SubmitForm = (e: FormEvent) => {
    e.preventDefault()
    onSubmit:({
      title:title.current!.value, 
      markdown:markdown.current!.value,
      tags:[]
    })
  }

  return (
    <>

      <Form onSubmit={SubmitForm}>
        <Stack gap={4}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId='title'>
                <Form.Label className='font-normal'>Title</Form.Label>
                <Form.Control className='font-semibold' ref={title} required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId='tags'>
                <Form.Label className='font-normal'>Tags</Form.Label>
                <CreatableReactSelect className='font-normal' onCreateOption={label=>{
                  const new_tag={id:uuidv4(),label}
                  onAddTag(new_tag)
                  setselect(prev=>[...prev,new_tag])
                }}value={select.map(tag=>{
                  return {label:tag.label,value:tag.id}
                })} onChange={tags=>{
                  setselect(tags.map(tag=>{
                    return {label:tag.label,id:tag.value}
                  }))
                }} isMulti />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId='markdown'>
            <Form.Label className='font-normal'>Body</Form.Label>
            <Form.Control required as='textarea' rows={25} ref={markdown} />
          </Form.Group>
        </Stack>
        <Stack direction='horizontal' gap={3} className='justify-content-end'>
          <Button variant='outline-danger' type="submit" className='text-center'>Save</Button>
          <Link to='..'>
            <Button variant='outline-secondary' type="button" className='text-center'>Cancel</Button>
          </Link>
        </Stack>
      </Form>
    </>

  )
}

export default Forms