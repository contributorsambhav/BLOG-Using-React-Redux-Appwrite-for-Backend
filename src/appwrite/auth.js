import conf from "../conf/conf";
import { Client, Account } from 'appwrite';



class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
        this.client.setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)

    }

    async createaccount({ email, password, name }) {
        try {
            const useraccount = await this.account.create(ID.unique(), email, password, name)
            if (useraccount) {
                return
            } else {
                return useraccount
            }
        } catch (error) {
            throw error
        }

        return null
    }


    async login({ email, password }) {
        const promise = this.account.createEmailSession(email, password);

        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            console.log(error); // Failure
        });
    }

    async getcurrentuser() {
        try {
            return await this.account.get()
        } catch (error) {
            throw error
        }

        return null
    }

    async logout() {
        try {
            this.account.deleteSessions()


        } catch (error) {
            console.log(error);
        }
    }
}


const authservice = new AuthService()
export default authservice