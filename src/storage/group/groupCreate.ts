import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storage.config";
import { GroupsGetAll } from "./groupsGetAll";
import { AppError } from "@utils/AppError";


export async function groupCreate(newGroup: string) {

    try {
        const storedGroup = await GroupsGetAll();

        const groupAreadyExists = storedGroup.includes(newGroup);

        if (groupAreadyExists) {
            throw new AppError('Já existe um grupo com esse nome.');
        }

        const storage = JSON.stringify([...storedGroup, newGroup]);
        await AsyncStorage.setItem(GROUP_COLLECTION, storage)

    } catch (error) {
        throw error;
    }
}