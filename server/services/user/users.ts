import { user } from "../../models/user";

export default class Users {
    async getUser(id: string) {
        return await findUserById(id);
    }
    async updateUser(user: user) {
        await updateUser(user);
    }
    async deleteUser(id: string) {
        await deleteUser(id);
    }
}