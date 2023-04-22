import {AlertColor} from "@mui/material/Alert/Alert";

/**
 * Notification Type
 */
export type NotificationType = {
    open: boolean,
    message: string
    severity?: AlertColor
}
