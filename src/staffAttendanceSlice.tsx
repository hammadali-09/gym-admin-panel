import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface StaffAttendance {
    id: string;
    name: string;
    name_id: string;
    day: string;
    date: string;
    time_in: string;
    time_out: string;
}
interface StaffAttendanceState {
    staffs: Array<StaffAttendance>;
    filteredStaffs: Array<StaffAttendance>;
}

const initialState: StaffAttendanceState = {
    staffs: [],
    filteredStaffs: [],
};

const S_AttendanceSlice = createSlice({
    name: 'staff_attendance',
    initialState,
    reducers: {
        searchStaffs: (state, action: PayloadAction<string>) => {
            const searchQuery = action.payload.toLowerCase();

            if (searchQuery === '') {
                state.filteredStaffs = state.staffs;
            } else {
                state.filteredStaffs = state.staffs.filter((staff) =>
                    staff.name.toLowerCase().includes(searchQuery)
                );
            }
        },
    },
});

export const { searchStaffs } = S_AttendanceSlice.actions;
export default S_AttendanceSlice.reducer;
