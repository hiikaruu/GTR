import axios from "axios";
import {Cloudinary} from "@cloudinary/url-gen";


const uploadFileToCloudinary = async (file, publicId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'book_upload'); // Ваше значение upload_preset
    formData.append('public_id', publicId);

    return await axios.post(
        'https://api.cloudinary.com/v1_1/dg0ibsz9h/upload',
        formData
    );
};

export default uploadFileToCloudinary;
