import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ChartState {
    data: { days: string; desktop: number }[]
}

const initialState: ChartState = {
    data: [
        { days: 'Monday', desktop: 186 },
        { days: 'Tuesday', desktop: 305 },
        { days: 'Wednesday', desktop: 237 },
        { days: 'Thursday', desktop: 73 },
        { days:'Friday', desktop: 209 },
        { days: 'Saturday', desktop: 214 },
        { days: 'Sunday', desktop: 200 },
    ],
}

const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {
        updateData: (
            state,
            action: PayloadAction<{ days: string; desktop: number }[]>
        ) => {
            state.data = action.payload
        },
    },
})

export const { updateData } = chartSlice.actions
export default chartSlice.reducer
