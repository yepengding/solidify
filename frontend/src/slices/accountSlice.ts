import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import env from "@/core/env";
import {Account} from "@/models/Contract";

type AccountState = Account

const initialState: AccountState = {
    ...env.account
}

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        /**
         * Restore to the environment account
         *
         * @param state
         */
        restore: state => {
            state.address = env.account.address
            state.privateKey = env.account.privateKey
        },
        /**
         * Change to the given account
         *
         * @param state
         * @param action
         */
        changeTo: (state, action: PayloadAction<AccountState>) => {
            state.address = action.payload.address
            state.privateKey = action.payload.privateKey
        }
    }
})

export const {restore, changeTo} = accountSlice.actions

export default accountSlice.reducer
