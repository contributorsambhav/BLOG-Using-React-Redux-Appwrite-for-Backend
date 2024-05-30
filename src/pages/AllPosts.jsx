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

    return (
        <div className='w-full bg-gray-200 dark:bg-gray-700 py-8'>
            <Container className="min-h-[70vh]">
                <div className='flex flex-wrap'>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        posts.map((post) => (
                            post.userId === userData.$id ? (
                                <div key={post.$id} className='p-2 w-full md:w-1/2 lg:w-1/4'>
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
