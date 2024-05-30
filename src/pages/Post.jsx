import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="w-[70%] mx-auto my-4 p-16 rounded-3xl bg-slate-200 dark:text-gray-200 dark:bg-slate-900">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border shadow-inner shadow-lime-200 rounded-xl p-8">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 w-[30%] top-6 flex flex-wrap sm:flex-nowrap">
                            <Link to={`/edit-post/${post.$id}`} className="w-full sm:w-1/2 pr-1">
                                <Button bgColor="bg-green-600 hover:bg-green-700" className="text-wrap text-2xl w-full h-12 mb-2 sm:mb-0">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Link>
                            <div className="w-full sm:w-1/2 pl-1">
                                <Button className="text-2xl w-full h-12" bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-center text-4xl mt-4 font-bold">{post.title}</h1>
                </div>
                <div className="text-2xl browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
