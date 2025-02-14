import {useState} from 'react';
import Box from '@mui/material/Box';
import {Typography, TextField, Button} from '@mui/material';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    alignItems: 'space-between'
};

export default function BasicModal({data, closeHandler, removeHandler, saveHandler}) {
    const [currentData, setCurrentData] = useState(data)
    const changeHandler = (e, key) => {
        setCurrentData((prev) => {
            const newData = {...prev, [key]: e.target.value}
            return newData
        })
    }
    return (<div>
        <Modal
            open={true}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography sx={{
                    alignSelf: 'center',
                    fontSize: '20px',
                    fontWeight: 600
                }}>{data ? 'Edit' : 'Create'}</Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                    {Object.keys(currentData).map((key) => {
                        return (<TextField key={key}
                                           disabled={key === 'id'}
                                           label={key}
                                           type={`${(typeof currentData[key]).toLowerCase()}`}
                                           placeholder={key === 'connections' ? 'insert node iDs followed by comma, e.g. 1,2,3' : `insert ${key}`}
                                           onChange={(e) => changeHandler(e, key)}
                                           value={currentData[key]}/>)
                    })}
                </Box>
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', gap: '40px'}}>
                    <Button variant='contained' onClick={closeHandler}>Discard</Button>
                    <Button disabled={!currentData} variant='contained'
                            onClick={() => saveHandler(data?.id, currentData)}>Save</Button>
                    {removeHandler &&
                        <Button variant='contained'
                                onClick={() => removeHandler(data?.id)}>
                            delete
                        </Button>
                    }
                </Box>
            </Box>
        </Modal>
    </div>);
}
