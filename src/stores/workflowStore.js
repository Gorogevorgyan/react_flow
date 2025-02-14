import {create} from 'zustand';
import { fetchWorkflows, createWorkflow, updateWorkflow, deleteWorkflow } from '../api/api';

const useWorkflowStore = create((set) => ({
    workflows: [],
    fetchWorkflows: async () => {
        const workflows = await fetchWorkflows();
        set({ workflows });
    },
    addWorkflow: async (workflow) => {
        const newWorkflow = await createWorkflow(workflow);
        set((state) => ({ workflows: [...state.workflows, newWorkflow] }));
        return newWorkflow
    },
    updateWorkflow: async (id, workflow) => {
        const updatedWorkflow = await updateWorkflow(id, workflow);
        set((state) => ({
            workflows: state.workflows.map((w) => (w.id === id ? updatedWorkflow : w)),
        }));
    },
    deleteWorkflow: async (id) => {
        await deleteWorkflow(id);
        set((state) => ({
            workflows: state.workflows.filter((w) => w.id !== id),
        }));
    },
}));

export default useWorkflowStore;