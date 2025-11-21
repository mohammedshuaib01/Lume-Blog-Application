import axios from 'axios';
const API_BASE_URL = 'http://127.0.0.1:8000/api/';


// Fetch all blogs 
export const getBlogs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}posts/`);
        return response.data;
    } 
    catch (error) {
        console.error('Error fetching blogs:', error);
        return [];
    }
};


// Fetch single blog using id 
export const fetchBlogById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}posts/${id}/`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching blog details:', error);
        return null;
    }
};

