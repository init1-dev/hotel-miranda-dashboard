import { fetchFromApi } from "./fetchFromApi";

export const isExistInCollection = async(
    type: string,
    collection: string,
    formInput: string, 
    currentId: string | null | undefined) => {
    const isExistResponse = await fetchFromApi("GET", `${collection}/get${type}/${formInput}`);

    if (isExistResponse && isExistResponse.data) {
        const isNew = !currentId;
        return isNew || currentId !== isExistResponse.data._id;
    }
    return false;
}