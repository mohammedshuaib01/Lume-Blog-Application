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
export const fetchBlogById = async (slug) => {
    try {
        const response = await axios.get(`${API_BASE_URL}posts/${slug}/`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching blog details:', error);
        return null;
    }
};


// Update api for blog using slug
export const updateBlogBySlug = async (slug, updatedData) => {
    try {
        const response = await axios.patch(
            `${API_BASE_URL}posts/${slug}/`,
            updatedData,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating blog:", error);
        return null;
    }
};
