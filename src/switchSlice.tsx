import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export interface Client {
    id: string;
    name: string;
    member_id: string;
    trainer: string;
    enrollment_number: string;
    phone: string;
    registration_date: string;
    is_Active: boolean;
    delete: boolean;
    goal: string;
    exercise: string;
    medical_issue: string;
    package_type: string;
    weight: string;
    height: string;
    cnic: string;
    email: string;
    image: string;
}

interface ClientState {
    clients: Array<Client>;
    filteredClients: Array<Client>;
    clientDetail: Client | null;
}

const initialState: ClientState = {
    clients: [],
    filteredClients: [],
    clientDetail: null,
};

const switchSlice = createSlice({
    name: 'switch',
    initialState,
    reducers: {
        

        addClients: (state, action: PayloadAction<Client>) => {
            state.clients.push(action.payload);
            state.filteredClients.push(action.payload);
        },

        setClients: (state, action: PayloadAction<Array<Client>>) => {
            state.clients = action.payload;
            state.filteredClients = action.payload;
        },

        updateClients: (state, action: PayloadAction<Client>) => {
            const updatedClient = action.payload;
            const index = state.clients.findIndex(
                (client) => client.id === updatedClient.id
            );

            if (index !== -1) {
                state.clients[index] = updatedClient;
                state.filteredClients[index] = updatedClient;
            }
        },

        toggleActive: (state, action: PayloadAction<{ clientId: string }>) => {
            const { clientId } = action.payload;
            const foundClient = state.filteredClients.find(
                (client) => client.id === clientId
            );
            if (!foundClient) {
                return state;
            }
            foundClient.is_Active = !foundClient.is_Active;
            return state;
        },
        deleteClient: (state, action: PayloadAction<{ clientId: string }>) => {
            const { clientId } = action.payload;
            state.clients = state.clients.filter(
                (client) => client.id !== clientId
            );
            state.filteredClients = state.filteredClients.filter(
                (client) => client.id !== clientId
            );
        },
        showDetail: (state, action: PayloadAction<{ clientId: string }>) => {
            const { clientId } = action.payload;
            state.clientDetail =
                state.filteredClients.find(
                    (client) => client.id === clientId
                ) || null;
        },

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

export const {
    toggleActive,
    addClients,
    setClients,
    updateClients,
    deleteClient,
    showDetail,
    searchClients,
} = switchSlice.actions;
export default switchSlice.reducer;
