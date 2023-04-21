import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography
} from "@mui/material";
import Box from "@mui/material/Box";
import {useState} from "react";
import {create, erase, retrieve, update} from "@/contracts/solidify";
import env from "@/core/env";
import {Record} from "@/models/Solidify";

export default function RecordIndex() {

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [action, setAction] = useState<string>("")
    const [record, setRecord] = useState<Record>({
        id: 0,
        content: ""
    })
    const [response, setResponse] = useState({
        message: "",
        data: ""
    })

    const dialogButton = () => {
        const createClickEvent = () => {
            create(record, env.account).then(r => {
                if (r.success) {
                    setResponse({...r, data: JSON.stringify(r.data)})
                } else {
                    setResponse({...r, data: ""})
                }
            })
        }

        const retrieveClickEvent = () => {
            retrieve(record.id).then(r => {
                if (r.success) {
                    setResponse({...r, data: JSON.stringify(r.data)})
                } else {
                    setResponse({...r, data: ""})
                }
            })
        }

        const updateClickEvent = () => {
            update(record, env.account).then(r => {
                if (r.success) {
                    setResponse({...r, data: JSON.stringify(r.data)})
                } else {
                    setResponse({...r, data: ""})
                }
            })
        }

        const deleteClickEvent = () => {
            erase(record.id, env.account).then(r => {
                if (r.success) {
                    setResponse({...r, data: JSON.stringify(r.data)})
                } else {
                    setResponse({...r, data: ""})
                }
            })
        }

        switch (action) {
            case "Create":
                return <Button onClick={createClickEvent}>Create</Button>
            case "Retrieve":
                return <Button onClick={retrieveClickEvent}>Retrieve</Button>
            case "Update":
                return <Button onClick={updateClickEvent}>Update</Button>
            case "Delete":
                return <Button onClick={deleteClickEvent}>Delete</Button>
            default:
                return null
        }
    }

    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Record CRUD
                </Typography>
                <Box sx={{my: 4, display: 'flex', flexWrap: 'wrap'}}>
                    <Box sx={styles.methodBox}>
                        <Typography variant="h6" component="h1" gutterBottom>
                            Create a record
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => {
                            setAction("Create")
                            setOpenDialog(true)
                        }}>Create</Button>
                    </Box>

                    <Box sx={styles.methodBox}>
                        <Typography variant="h6" component="h1" gutterBottom>
                            Retrieve a record
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => {
                            setAction("Retrieve")
                            setOpenDialog(true)
                        }}>Retrieve</Button>
                    </Box>

                    <Box sx={styles.methodBox}>
                        <Typography variant="h6" component="h1" gutterBottom>
                            Update a record
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => {
                            setAction("Update")
                            setOpenDialog(true)
                        }}>Update</Button>
                    </Box>

                    <Box sx={styles.methodBox}>
                        <Typography variant="h6" component="h1" gutterBottom>
                            Delete a record
                        </Typography>
                        <Button variant="contained" fullWidth onClick={() => {
                            setAction("Delete")
                            setOpenDialog(true)
                        }}>Delete</Button>
                    </Box>
                </Box>

                <TextField
                    value={response.message}
                    onChange={(e) => setResponse({...response, message: e.target.value})}
                    label="Message"
                    fullWidth
                    disabled
                />

                <TextField
                    value={response.data}
                    onChange={(e) => setResponse({...response, data: e.target.value})}
                    label="Data"
                    multiline
                    rows={4}
                    fullWidth
                    disabled
                />
            </Box>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>
                    {action}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="id"
                        label="Record ID"
                        type="number"
                        fullWidth
                        variant="standard"
                        value={record.id}
                        onChange={(e) => setRecord({...record, id: parseInt(e.target.value)})}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Record Content"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={record.content}
                        onChange={(e) => setRecord({...record, content: e.target.value})}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                    {dialogButton()}
                </DialogActions>
            </Dialog>
        </Container>
    )
}

const styles = {
    methodBox: {
        p: 2,
        m: 2,
        width: 200,
        boxShadow: 1
    }
};
