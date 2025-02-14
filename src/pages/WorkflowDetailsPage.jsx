import React from 'react';
import { useParams } from 'react-router-dom';
import WorkflowDetails from '../components/WorkflowDetails';

const WorkflowDetailsPage = () => {
    const { id } = useParams();
    return (
        <div>
            <WorkflowDetails workflowId={id} />
        </div>
    );
};

export default WorkflowDetailsPage;