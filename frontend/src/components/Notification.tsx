import {Alert, Snackbar} from "@mui/material";
import {Dispatch, SetStateAction} from "react";
import {NotificationType} from '@/models/Component'

/**
 * Notification Component
 *
 * @param props
 * @constructor
 */
const Notification = (props: {
    notification: NotificationType,
    setNotification: Dispatch<SetStateAction<NotificationType>>
}) => {

    return (
        <Snackbar open={props.notification.open} autoHideDuration={6000}
                  anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                  onClose={() => props.setNotification({...props.notification, open: false})}>
            <Alert severity={props.notification.severity || 'info'} sx={{width: '100%'}}>
                {props.notification.message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
