import { SetStateAction, useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e: { target: { files: SetStateAction<null>[]; }; }) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/video', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
};

export default VideoUpload;
