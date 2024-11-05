import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface DietItems {
    id: string;
    name: string;
    breakfast_meal: string;
    breakfast_time: string;
    snack_meal: string;
    snack_time: string;
    lunch_meal: string;
    lunch_time: string;
    snack_meal_1: string;
    snack_time_1: string;
    dinner_meal: string;
    dinner_time: string;
    calories: string;
    allergy: string;
    note: string;
}

interface DietItemsState {
    diets: Array<DietItems>;
    dietDetail: DietItems | null;
}

const initialState: DietItemsState = {
    diets: [],
    dietDetail: null,
};

const dietSlice = createSlice({
    name: 'diet',
    initialState,
    reducers: {
        addDiets: (state, action: PayloadAction<DietItems>) => {
            state.diets.push(action.payload);
        },

        setDiets: (state, action: PayloadAction<Array<DietItems>>) => {
            state.diets = action.payload;
        },

        deleteDiets: (state, action: PayloadAction<{ dietId: string }>) => {
            const { dietId } = action.payload;
            state.diets = state.diets.filter((diet) => diet.id !== dietId);
        },

        showDiet: (state, action: PayloadAction<{ dietId: string }>) => {
            const { dietId } = action.payload;
            state.dietDetail =
                state.diets.find(
                    (diet) => diet.id === dietId
                ) || null;
        },
    },
});

export const {
    addDiets, setDiets, deleteDiets, showDiet,
   
} = dietSlice.actions;
export default dietSlice.reducer;
