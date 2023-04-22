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
import {useCallback, useEffect, useState} from "react";
import {create, erase, retrieve, update} from "@/contracts/solidify";
import env from "@/core/env";
import Notification from "@/components/Notification";
import {Record} from "@/models/Solidify";
import {NotificationType} from "@/models/Component";
import {useDispatch, useSelector} from "react-redux";
import {changeTo, selectAccount} from "@/slices/accountSlice";

export default function RecordIndex() {

    const [action, setAction] = useState<string>("")
    const [record, setRecord] = useState<Record>({
        id: 0,
        content: ""
    })

    const [response, setResponse] = useState({
        message: "",
        data: ""
    })
    const [notification, setNotification] = useState<NotificationType>({
        open: false,
        message: ""
    })

    const [openDialog, setOpenDialog] = useState<boolean>(false)

    // Load from store
    const account = useSelector(selectAccount)
    const dispatch = useDispatch()

    /**
     * Generate dialog buttons binding with click events
     */
    const dialogButton = () => {
        const createClickEvent = () => {
            create(record, account).then(r => {
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
            update(record, account).then(r => {
                if (r.success) {
                    setResponse({...r, data: JSON.stringify(r.data)})
                } else {
                    setResponse({...r, data: ""})
                }
            })
        }

        const deleteClickEvent = () => {
            erase(record.id, account).then(r => {
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

    /**
     * Connect to browser provider
     */
    const connectBrowserProvider = useCallback(async () => {
        if (!window.ethereum) {
            setNotification({open: true, message: "No external provider found", severity: "error"})
            return
        }
        await window.ethereum.enable();

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        if (accounts.length > 0) {
            dispatch(changeTo({address: accounts[0], privateKey: ""}))
        } else {
            setNotification({open: true, message: "No account found", severity: "error"})
        }
    }, [dispatch])

    useEffect(() => {
        if (!window.ethereum) {
            setNotification({open: true, message: "No external provider found", severity: "error"})
            return
        }

        const accountChanged = async (newAccount: string) => {
            dispatch(changeTo({address: newAccount[0], privateKey: ""}))
            setNotification({open: true, message: `Account changed to ${account.address}`, severity: "success"})
        }

        const chainChanged = async () => {
            window.location.reload()
        }

        window.ethereum.on("accountsChanged", accountChanged);
        window.ethereum.on("chainChanged", chainChanged);


    }, [account, dispatch]);

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

                <Typography gutterBottom>
                    Deployed address: {env.contractAddress}
                </Typography>
                <Typography gutterBottom>
                    <Button onClick={connectBrowserProvider}>Connect</Button> Current account address: {account.address}
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
                    sx={{my: 2}}
                />

                <TextField
                    value={response.data}
                    onChange={(e) => setResponse({...response, data: e.target.value})}
                    label="Data"
                    multiline
                    rows={4}
                    fullWidth
                    disabled
                    sx={{my: 2}}
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

            <Notification notification={notification} setNotification={setNotification}></Notification>
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
