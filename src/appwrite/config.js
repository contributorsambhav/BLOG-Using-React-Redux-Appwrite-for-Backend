import { splitVendorChunkPlugin } from "vite";
import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from 'appwrite';

class Service {
    client = new Client()
    databases
    bucket
    constructor() {

        this.client.setEndpoint(conf.appwriteUrl)
        this.client.setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost(title, slug, content, featuredImage, status, userId) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId
                , conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log(error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                title, content, featuredImage, status
            }
            )
        } catch (error) {
            console.log(error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            
            )
        return true
        } catch (error) {
            console.log(error)
        }
        return false
    }

}


const service = new Service()
export default service