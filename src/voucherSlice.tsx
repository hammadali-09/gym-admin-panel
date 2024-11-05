import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Voucher {
    id: string;
    code: string;
    valid_from: string;
    until_from: string;
    type: string;
    value: string;
    visibility: string;
    redeem_count: string;
    max_redeem: string;
    delete: boolean;
}

interface VoucherState {
    vouchers: Array<Voucher>;
}
const initialState: VoucherState = {
    vouchers: [],
};

const voucherSlice = createSlice({
    name: 'voucher',
    initialState,
    reducers: {
        addVouchers: (state, action: PayloadAction<Voucher>) => {
            state.vouchers.push(action.payload);
        },

        setVouchers: (state, action: PayloadAction<Array<Voucher>>) => {
            state.vouchers = action.payload;
        },

        deleteVouchers: (
            state,
            action: PayloadAction<{ voucherId: string }>
        ) => {
            const { voucherId } = action.payload;
            state.vouchers = state.vouchers.filter(
                (voucher) => voucher.id !== voucherId
            );
        },
    },
});

export const { addVouchers, setVouchers, deleteVouchers,
} = voucherSlice.actions;
export default voucherSlice.reducer;