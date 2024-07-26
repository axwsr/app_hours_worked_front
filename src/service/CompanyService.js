import axios from "axios";
import { BASE_URL } from "./ConfigService";
export const getCompanies = async () => {
    return (await axios.get(`${BASE_URL}/companies/get-all-companies`)).data;
}