import axios from "axios";
import { BASE_URL } from "./ConfigService";
export const getPersonInfo = async () => {
    return (await axios.get(`${BASE_URL}/persons/get_person_information`)).data;
}

export const updatePersonInfo = async (data) => {
    return await axios.put(`${BASE_URL}/persons/edit_person_information`,data);
}

