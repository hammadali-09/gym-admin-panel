import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClientAttendance {
    id: string;
    name: string;
    name_id: string;
    day: string;
    date: string;
    time_in: string;
    time_out: string;
}
interface ClientAttendanceState {
    clients: Array<ClientAttendance>;
    filteredClients: Array<ClientAttendance>;
}

const initialState: ClientAttendanceState = {
    clients: [],
    filteredClients: [],
};

const C_AttendanceSlice = createSlice({
    name: 'client_attendance',
    initialState,
    reducers: {
        searchClients: (state, action: PayloadAction<string>) => {
            const searchQuery = action.payload.toLowerCase();

            if (searchQuery === '') {
                state.filteredClients = state.clients;
            } else {
                state.filteredClients = state.clients.filter((client) =>
                    client.name.toLowerCase().includes(searchQuery)
                );
            }
        },
    },
});

export const {searchClients} = C_AttendanceSlice.actions;
export default C_AttendanceSlice.reducer;


