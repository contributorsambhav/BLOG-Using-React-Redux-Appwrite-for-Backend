import React, { useEffect } from 'react'
import { Container, PostForm } from '../components'

function AddPost() {
  useEffect(()=>{
    <script src="https://cdn.tiny.cloud/1/f5e7bq9wwqrfmhstvnmqadvz8xgrp10zznajfqfj0lor2wvr/tinymce/7/tinymce.min.js" referrerpolicy="origin"></script>  
  })
  return (
    <div className=' bg-gray-200 dark:bg-gray-700 py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost