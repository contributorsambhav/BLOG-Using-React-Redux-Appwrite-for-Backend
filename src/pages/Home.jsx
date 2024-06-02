import React, { useEffect, useState } from 'react';
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import useTypingEffect from '../hooks/useTypingEffect'; 

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

    const introText = "Your go-to platform for creating concise and impactful documentation. In a world where information overload is the norm, DocuSharp empowers you to write documentation that is crisp, clear, and to the point. Say goodbye to lengthy manuals and hello to streamlined, efficient documentation. Join our community today and start transforming the way you share knowledge, one short document at a time.";
    const displayedIntroText = useTypingEffect(introText, 30);

    if (!posts ) {
        return (
            <div className="w-full py-8 h-[62.3vh] align-middle bg-gray-200 dark:bg-gray-700 text-center">
                <Container>
                <div className="w-[87%] mx-auto text-center mb-12">
                        <h2 className="text-3xl leading-9 font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:leading-10">
                            Welcome to DocuSharp
                        </h2><br></br>
                        <p className="w-[87%] leading-relaxed mx-auto mt-3 text-3xl  text-gray-600 dark:text-gray-300 typing-effect">
                            {displayedIntroText}
                        </p>
                    </div>
                </Container>
            </div>
        );
    }

    if (posts) {
        return (
            <div className="w-full py-8 bg-gray-100 dark:bg-gray-800">
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="w-[87%] mx-auto text-center mb-12">
                        <h2 className="lg:text-4xl md:text-3xl sm:text-2xl leading-9 font-extrabold text-gray-900 dark:text-white sm:leading-10">
                            Welcome to DocuSharp
                        </h2><br></br>
                        <p className="w-[87%] leading-relaxed mx-auto mt-3 sm:text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 typing-effect">
                            {displayedIntroText}
                        </p>
                    </div>
                    <Container>
                        <div className="p-3 text-slate-800 dark:text-white font-semibold lg:text-4xl md:text-3xl sm:text-2xl  m-8 text-center">
                            See what the community is posting...
                        </div>
                        <div className="flex flex-wrap">
                            {posts.map((post) => (
                                <div key={post.$id} className="p-2 w-full md:w-1/2 lg:w-1/4">
                                    <PostCard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>
                </div>
            </div>
        );
    }

    return null;
}

export default Home;
