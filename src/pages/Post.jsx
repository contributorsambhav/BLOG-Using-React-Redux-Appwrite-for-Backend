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
        const bool = confirm("Do you want to delete or clicked by mistake?")
        if (bool){

            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            });
        }else {
            console.log("okay bye");
        }
    };

    return post ? (
        <div className="sm:w-[100%] md:w-[90%] lg:w-[80%] mx-auto my-4 p-16 rounded-3xl bg-slate-300 text-gray-900 dark:text-gray-200 dark:bg-slate-900">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border border-gray-300 dark:border-gray-700 shadow-xl   shadow-gray-500 dark:shadow-lime-800 rounded-xl p-8 bg-white dark:bg-gray-800">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="flex flex-col justify-between mx-1 my-2">
                            <Link to={`/edit-post/${post.$id}`} className="w-full">
                                <Button bgColor="bg-green-600 hover:bg-green-700" className="text-wrap text-2xl w-full h-12 mb-2 sm:mb-0">
                                    <FontAwesomeIcon icon={faEdit} />
                                </Button>
                            </Link>
                            <div className="w-full ">
                                <Button className="text-2xl w-full h-12" bgColor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                                    <FontAwesomeIcon icon={faTrashAlt} />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full mt-20 mb-6">
                    <h1 className="text-center sm:text-4xl text-5xl mt-4 font-bold text-gray-900 dark:text-gray-200">{post.title}</h1>
                </div>
                <div className="sm:text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-gray-200">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
