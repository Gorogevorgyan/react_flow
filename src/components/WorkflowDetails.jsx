import React, {useMemo, useEffect, useCallback, useState} from 'react';
import {
    ReactFlow,
    Controls,
    Background, useNodesState, useEdgesState, addEdge
} from '@xyflow/react';
import {Box, Typography, Button, Snackbar, Alert} from '@mui/material'
import '@xyflow/react/dist/style.css';
import useNodeStore from "../stores/nodeStore";
import BasicModal from "./Modal";
import {useNavigate} from "react-router-dom";

const WorkflowDetails = ({workflowId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentNode, setCurrentNode] = useState(null)
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)

    const navigate = useNavigate()
    const {nodes: myNodes, fetchNodes, addNode, updateNode, deleteNode} = useNodeStore();
    const newNodes = useMemo(() => {
        return myNodes?.map((node) => {
            return {
                id: node.id.toString(),
                position: {x: node.position_x, y: node.position_y},
                data: {label: `id: ${node.id} name: ${node.name}`},
                initialData: {...node}
            }
        })
    }, [myNodes])
    const initialEdges = useMemo(() => {
        const connections = []
        myNodes?.map((node) => {
            node.connections?.map((connection) => {
                connections.push({
                    id: 'e' + node.id.toString() + connection.toString(),
                    source: node.id.toString(),
                    target: connection.toString()
                })
                return undefined
            })
            return undefined
        })
        return connections
    }, [myNodes]);

    const handleClose = () => {
        setCurrentNode(null)
        setIsModalOpen(false)
    }

    const onNodeDragStop = async (event, node) => {
        await updateNode(workflowId, node.id, {
            ...node.initialData,
            position_x: node.position.x.toFixed(0),
            position_y: node.position.y.toFixed(0)
        })
    };

    const handleRemove = async (id) => {
        await deleteNode(workflowId, id)
        setCurrentNode(null)
        setIsModalOpen(false)
    }

    const handleEditNode = (e, node) => {
        const {workflow, ...rest} = node.initialData;
        setCurrentNode({...rest, connections: rest.connections.join(',')})
        setIsModalOpen(true)
    }
    const handleSave = async (id, data) => {
        if (id) {
            const updatedData = {...data, connections: data.connections.split(',')}
            await updateNode(workflowId, id, updatedData)
        } else {
            if(data.position_x.toString() && data.position_y.toString()){
                const newData = {...data, connections: data.connections.split(',')}
                await addNode(workflowId, newData)
            }else{
                setIsSnackBarOpen(true)
            }
        }
        setCurrentNode(null)
        setIsModalOpen(false)
    }
    useEffect(() => {
        fetchNodes(workflowId);
    }, [workflowId, fetchNodes]);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );
    useEffect(() => {
        if (newNodes) {
            setNodes(newNodes)
        }
        if (initialEdges) {
            setEdges(initialEdges)
        }
    }, [newNodes, initialEdges, setEdges, setNodes]);
    return (
        <Box sx={{width: '100vw', height: '100vh'}}>
            {isSnackBarOpen &&
                <Snackbar
                    open={true}
                >
                    <Alert
                        onClose={() => setIsSnackBarOpen(false)}
                        severity="error"
                        variant="filled"
                        sx={{width: '100%'}}
                    >
                       Unable to create Node, missing required fields position_x or position_y
                    </Alert>
                </Snackbar>
            }
            <Box sx={{display: 'flex', gap: 2, position: 'absolute', top: 10, right: 10, zIndex: 1000}}>
                <Button onClick={() => {
                    setCurrentNode({
                        name: '',
                        type: '',
                        position_x: 0,
                        position_y: 0,
                        connections: ''
                    })
                    setIsModalOpen(true)
                }
                }>
                    Create Node
                </Button>
                <Button onClick={() => navigate('/')}>
                    Go to Workflows
                </Button>
            </Box>

            {isModalOpen &&
                <BasicModal data={currentNode} removeHandler={handleRemove} closeHandler={handleClose}
                            saveHandler={handleSave}/>}
            {!!nodes.length && <ReactFlow
                onNodeClick={handleEditNode}
                onNodeDragStop={onNodeDragStop}
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                style={{color: 'black'}}
            >
                <Controls/>
                <Background variant="dots" gap={12} size={1}/>
            </ReactFlow>}
            {!nodes.length && <Typography sx={{position: 'absolute', top: '50%', left: '50%'}}>No nodes available</Typography>}
        </Box>
    );
}

export default WorkflowDetails