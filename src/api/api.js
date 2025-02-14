import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
};

export const fetchWorkflows = async () => {
    try{
        const response = await axios.get(`${API_BASE_URL}/workflows`, getAuthHeader());
        return response.data;
    }catch (e){
        console.log(e)
    }
};

export const createWorkflow = async (workflow) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/workflows`, workflow, getAuthHeader());
        return response.data;
    }catch (e) {
        console.log(e)
    }
};

export const updateWorkflow = async (id, workflow) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/workflows/${id}`, workflow, getAuthHeader());
        return response.data;
    }catch (e) {
        console.log(e)
    }
};

export const deleteWorkflow = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/workflows/${id}`, getAuthHeader());
        return response.data;
    }catch (e) {
        console.log(e)
    }
};

export const fetchNodes = async (workflowId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/workflows/${workflowId}/nodes`, getAuthHeader());
        return response.data;
    }catch (e) {
        console.log(e)
    }
};

export const createNode = async (workflowId, node) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/workflows/${workflowId}/nodes`, node, getAuthHeader());
        return response.data;
    }catch (e) {
        console.log(e)
    }
};

export const updateNode = async (workflowId, nodeId, node) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/workflows/${workflowId}/nodes/${nodeId}`, node, getAuthHeader());
        return response.data;
    }catch (e) {
        console.log(e)
    }
};

export const deleteNode = async (workflowId, nodeId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/workflows/${workflowId}/nodes/${nodeId}`, getAuthHeader());
        return response.data;
    }catch (e) {
        console.log(e)
    }
};