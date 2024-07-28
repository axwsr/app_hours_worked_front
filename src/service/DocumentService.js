import axios from "axios";
import { BASE_URL } from "./ConfigService";
export const generatePDF = async (data) => {
    return (await axios.post(`${BASE_URL}/document/generate_document`,data)).data;
}