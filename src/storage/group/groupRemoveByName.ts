import AsyncStorage from "@react-native-async-storage/async-storage";
import { GroupsGetAll } from "./groupsGetAll";
import { GROUP_COLLECTION, PLAYER_COLLECTION } from "@storage/storage.config";


export async function groupRemoveByName(groupName: string) {

    try {
        const storedGroups = await GroupsGetAll();
        const groups = storedGroups.filter(group => group !== groupName)

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupName}`)

    } catch (error) {
        throw error;

    }



}