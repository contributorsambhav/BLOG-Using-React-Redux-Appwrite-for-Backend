import React from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  return (
    <div className=' bg-gray-200 dark:bg-gray-700 py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost