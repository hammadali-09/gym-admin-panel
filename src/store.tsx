import { configureStore } from '@reduxjs/toolkit';
import chartReducer from './chartSlice';
import switchReducer from './switchSlice';
import authReducer from './authSlice';
import packageReducer from './packageSlice'
import trainerReducer from './trainerSlice'
import voucherReducer from './voucherSlice'
import bannerReducer from './bannerSlice'
import client_attendanceReducer from './clientAttendanceSlice';
import staff_attendanceReducer from './staffAttendanceSlice'

export const store = configureStore({
    reducer: {
        chart: chartReducer,
        switch: switchReducer,
        auth: authReducer,
        package: packageReducer,
        trainer: trainerReducer,
        voucher: voucherReducer,
        banner: bannerReducer,
        client_attendance: client_attendanceReducer,
        staff_attendance: staff_attendanceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { useDispatch, useSelector } from 'react-redux';


export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
