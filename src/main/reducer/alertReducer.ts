import { createSlice, PayloadAction,  } from "@reduxjs/toolkit"
import { Nullable } from "../types/generalTypes"
import AlertActionTypes from "../constants/actions/alertActionTypes"
import { RootState } from "../app/store"
import { AlertColor, AlertProps } from "@mui/material"


export const ALERT_INFO_STATUS = 'info'
export const ALERT_SUCCESS_STATUS = 'success'
export const ALERT_WARNING_STATUS = 'warning'
export const ALERT_ERROR_STATUS = 'error'

/* Alert status can be:
   - "success"
   - "info"
   - "warning"
   - "error"
*/

export interface AlertStateType {
    alertStatus: AlertColor | null
    alertMessage: Nullable<string>
}

const initialState: AlertStateType = {
    alertStatus: null,
    alertMessage: null
}

const alertSlice = createSlice({
    name: AlertActionTypes.ALERT_SLICE,
    initialState,
    reducers: {
        setAlertStatusAndMessage: (state, action: PayloadAction<AlertStateType>) => {
            state.alertMessage = action.payload.alertMessage
            state.alertStatus = action.payload.alertStatus
        }
    }
})

export const selectAlertInfo = (state: RootState) => {
    return state.alert
}

export const { setAlertStatusAndMessage } = alertSlice.actions
export default alertSlice.reducer