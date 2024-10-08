import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });
    const [titleLength, setTitleLength] = useState(post?.title?.length || 0)
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        const file = data.image[0];
        if (file && file.size > 1048576) {
            throw new Error("File size should be less than 1 MB");
        }

        if (post) {
            const uploadedFile = file ? await appwriteService.uploadFile(file) : null;

            if (uploadedFile) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: uploadedFile ? uploadedFile.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const uploadedFile = await appwriteService.uploadFile(file);

            if (uploadedFile) {
                const fileId = uploadedFile.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                const newTitleLength = value.title?.length || 0;
                setTitleLength(newTitleLength);
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
            console.log(post);
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleTitleChange = (event) => {
        const newTitle = event.target.value;
        setValue("title", newTitle, { shouldValidate: true });
        setTitleLength(newTitle.length);
    };
    return (
        <form onSubmit={handleSubmit(submit)} className="lg:flex lg:flex-wrap">
            <div className="lg:w-2/3 lg:px-10">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {
                        required: true,
                        maxLength: 35,
                        validate: (value) => value.length <= 35 || "Title cannot exceed 35 characters",
                    })}
                    onChange={handleTitleChange}
                />

                <div className="text-right dark:text-white  limit">
                    {titleLength}/{35} 
                    {(titleLength>35?(
                        <div className="text-red-600">Character limit exceeded</div>
                    ):(null))}
                </div>

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <div className="inline-block mb-1 pl-1 text-gray-800 dark:text-gray-200">Content:</div>
                <RTE name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="lg:w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <div className="inline-block mb-1 pl-1 text-gray-800 dark:text-gray-200">Status:</div>
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" className={'border-solid border-[0.2px] text-slate-50 dark:border-gray-300 border-gray-600 mt-10 text-2xl w-full cursor-pointer'}
                    bgColor={post ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"} >
                    {post ? "Update Post" : "Create New Post"}
                </Button>
            </div>
        </form>
    );
}
