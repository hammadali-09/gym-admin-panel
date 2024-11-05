import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Trainer {
    id: string;
    name: string;
    training_type: string;
    enrollment_number: string;
    phone: string;
    dateTime: string;
    specialization: string;
    designation: string;
    experience: string;
    location: string;
    cnic: string;
    email: string;
    delete: boolean;
    image_url: string;
}

interface TrainerState {
    trainers: Array<Trainer>;
    filteredTrainers: Array<Trainer>;
    trainerDetail: Trainer | null;
}

const initialState: TrainerState = {
    trainers: [],
    filteredTrainers: [],
    trainerDetail: null,
};

const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {
        addTrainers: (state, action: PayloadAction<Trainer>) => {
            state.trainers.push(action.payload);
            state.filteredTrainers.push(action.payload);
        },

        setTrainers: (state, action: PayloadAction<Array<Trainer>>) => {
            state.trainers = action.payload;
            state.filteredTrainers = action.payload;
        },
        deleteTrainers: (
            state,
            action: PayloadAction<{ trainerId: string }>
        ) => {
            const { trainerId } = action.payload;
            state.trainers = state.trainers.filter(
                (trainer) => trainer.id !== trainerId
            );
            state.filteredTrainers = state.filteredTrainers.filter(
                (trainer) => trainer.id !== trainerId
            );
        },

        showDetail: (state, action: PayloadAction<{ trainerId: string }>) => {
            const { trainerId } = action.payload;
            state.trainerDetail =
                state.filteredTrainers.find(
                    (trainer) => trainer.id === trainerId
                ) || null;
        },

        searchTrainers: (state, action: PayloadAction<string>) => {
            const searchQuery = action.payload.toLowerCase();

            if (searchQuery === '') {
                state.filteredTrainers = state.trainers;
            } else {
                state.filteredTrainers = state.trainers.filter((trainer) =>
                    trainer.name.toLowerCase().includes(searchQuery)
                );
            }
        },
    },
});

export const { addTrainers, setTrainers, deleteTrainers, showDetail, searchTrainers } =
    trainerSlice.actions;
export default trainerSlice.reducer;