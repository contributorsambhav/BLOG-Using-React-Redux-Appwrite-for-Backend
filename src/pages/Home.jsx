import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts && posts.length === 0) {
        return (
            <div className="w-full py-8 h-[62.3vh] align-middle  bg-gray-200 dark:bg-gray-500 text-center">
                <Container>
                    <div className="flex  mt-[20vh] flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-4xl dark:text-white font-semibold hover:text-gray-500">
                                Login to view Posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    if (posts){
    return (
        <div className='w-full py-8 dark:bg-gray-700'>
            <Container>
            <div className="p-3 dark:text-white text-slate-800 font-semibold text-5xl m-8  text-center">See what community is posting...</div>

                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )}
}

export default Home