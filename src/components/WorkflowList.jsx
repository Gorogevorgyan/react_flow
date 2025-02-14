import {useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
    Button,
    Alert
} from '@mui/material'
import useWorkflowStore from '../stores/workflowStore';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BasicModal from "./Modal";
import {useNavigate} from "react-router-dom";

export default function BasicTable() {
    const {workflows, fetchWorkflows, deleteWorkflow, updateWorkflow, addWorkflow} = useWorkflowStore();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isSnackBarOpen, setIsSnackBarOpen] = useState(false)
    const [currentWorkflow, setCurrentWorkflow] = useState(null)
    const navigate = useNavigate()
    useEffect(() => {
        fetchWorkflows();
    }, [fetchWorkflows]);
    const handleEditWorkflow = (workflow) => {
        setCurrentWorkflow({name: workflow.name, description: workflow.description})
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setCurrentWorkflow(null)
        setIsModalOpen(false)
    }

    const handleSave = async (id, data) => {
        if (id) {
            await updateWorkflow(id, data)
        } else {
            await addWorkflow(data)
        }
        setCurrentWorkflow(null)
        setIsModalOpen(false)
    }

    const handleRemove = (workflow) => {
        if (workflow.nodes?.length > 0) {
            setIsSnackBarOpen(true)
            return
        }
        deleteWorkflow(workflow.id)
    }

    return (
            <Box sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '40px'
            }}>
                {isModalOpen &&
                    <BasicModal data={currentWorkflow} closeHandler={handleClose} saveHandler={handleSave}/>}
                {isSnackBarOpen &&
                    <Snackbar
                        open={true}
                        autoHideDuration={6000}
                    >
                        <Alert
                            onClose={() => setIsSnackBarOpen(false)}
                            severity="error"
                            variant="filled"
                            sx={{width: '100%'}}
                        >
                            Workflow contains Nodes
                        </Alert>
                    </Snackbar>
                }
                <Typography sx={{fontSize: 24, fontWeight: 600, padding: '50px'}}>Workflows</Typography>
                <TableContainer sx={{width: 'fit-content', maxWidth: '80%'}} component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center' sx={{color: 'lightBlue'}}>Name</TableCell>
                                <TableCell align='center' sx={{color: 'lightBlue'}}>Description</TableCell>
                                <TableCell align='center' sx={{color: 'lightBlue'}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {workflows.map((row) => (<TableRow
                                key={row.name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell align='center' component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align='center' component="th" scope="row">
                                    {row.description}
                                </TableCell>
                                <TableCell align='center' component="th" scope="row"
                                           sx={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                                    <EditIcon onClick={() => handleEditWorkflow(row)}
                                              sx={{height: 20, width: 20, color: 'green', cursor: 'pointer'}}/>
                                    <ClearIcon onClick={() => handleRemove(row)}
                                               sx={{height: 20, width: 20, color: 'red', cursor: 'pointer'}}/>
                                    <VisibilityIcon onClick={() => navigate(`/workflows/${row.id}`)}
                                                    sx={{height: 20, width: 20, color: 'white', cursor: 'pointer'}}/>
                                </TableCell>
                            </TableRow>))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button onClick={() => {
                    setCurrentWorkflow({name: '', description: ''})
                    setIsModalOpen(true)
                }
                } variant='contained'>Create</Button>
            </Box>
    );
}