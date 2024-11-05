import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Package {
    id: string;
    package_name: string;
    registration_fees: string;
    monthly_fees: string;
    fitness_details: string;
    features: string;
    delete: boolean;
}

interface PackageState {
    packages: Array<Package>;
    packageDetail: Package | null;
}
const initialState: PackageState = {
    packages: [],
    packageDetail: null,
};

const packageSlice = createSlice({
    name: 'package',
    initialState,
    reducers: {
        addPackages: (state, action: PayloadAction<Package>) => {
            state.packages.push(action.payload);
        },
        setPackages: (state, action: PayloadAction<Array<Package>>) => {
            state.packages = action.payload;
        },
        deletePackage: (
            state,
            action: PayloadAction<{ packageId: string }>
        ) => {
            const { packageId } = action.payload;
            state.packages = state.packages.filter(
                (Package) => Package.id !== packageId
            );
        },
        showDetail: (state, action: PayloadAction<{ packageId: string }>) => {
            const { packageId } = action.payload;
            state.packageDetail =
                state.packages.find((Package) => Package.id === packageId) ||
                null;
        },
    },
});

export const { addPackages, setPackages, deletePackage, showDetail } =
    packageSlice.actions;
export default packageSlice.reducer;
