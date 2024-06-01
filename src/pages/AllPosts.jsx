import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector(({ auth }) => auth.userData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const fetchedPosts = await appwriteService.getPosts([]);
                setPosts(fetchedPosts.documents);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (!userData) {
        return (
            <div className='w-full bg-gray-200 dark:bg-gray-700 '>
                <Container className="min-h-[70vh]">
                    <div className="p-3 dark:text-white text-slate-800 font-semibold text-5xl m-8 text-center">My Posts</div>
                    <div className='flex flex-wrap '>
                        <p>Request timed out ! <br></br>
                        Reload page to view posts
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full bg-gray-200 dark:bg-gray-700 '>
            <Container className="min-h-[70vh]">
                <div className="p-3 dark:text-white text-slate-800 font-semibold text-5xl m-8 text-center">My Posts</div>
                <div className='flex flex-wrap '>
                    {loading ? (
                        <p className='mx-auto mt-8 dark:text-teal-100 text-4xl'>Loading posts...</p>
                    ) : (
                        posts.map((post) => (
                            post.userId === userData.$id ? (
                                <div key={post.$id} className='w-full md:w-1/2 lg:w-1/4 p-2'>
                                    <PostCard {...post} />
                                </div>
                            ) : null
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
