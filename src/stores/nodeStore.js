import {create} from 'zustand';
import { fetchNodes, createNode, updateNode, deleteNode } from '../api/api';

const useNodeStore = create((set) => ({
    nodes: [],
    fetchNodes: async (workflowId) => {
        const nodes = await fetchNodes(workflowId);
        set({ nodes });
    },
    addNode: async (workflowId, node) => {
        const newNode = await createNode(workflowId, node);
        set((state) => ({ nodes: [...state.nodes, newNode] }));
    },
    updateNode: async (workflowId, nodeId, node) => {
        const updatedNode = await updateNode(workflowId, nodeId, node);
        set((state) => ({
            nodes: state.nodes.map((n) => (n.id === Number(nodeId) ? updatedNode : n)),
        }));
    },
    deleteNode: async (workflowId, nodeId) => {
        await deleteNode(workflowId, nodeId);
        set((state) => ({
            nodes: state.nodes.filter((n) => n.id !== Number(nodeId)),
        }));
    },
}));

export default useNodeStore;