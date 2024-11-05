import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Banner {
    id: string;
    name: string;
    banner_link: string;
    short_description: string;
    detail_description: string;
    delete: boolean;
    is_Active: boolean;
    image_url: string;
}

interface BannerState {
    banners: Array<Banner>;
}

const initialState: BannerState = {
    banners: [],
};

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        addBanners: (state, action: PayloadAction<Banner>) => {
            state.banners.push(action.payload);
        },

        setBanners: (state, action: PayloadAction<Array<Banner>>) => {
            state.banners = action.payload;
        },
        deleteBanners: (state, action: PayloadAction<{ bannerId: string }>) => {
            const { bannerId } = action.payload;
            state.banners = state.banners.filter(
                (banner) => banner.id !== bannerId
            );
        },

        toggleActive: (state, action: PayloadAction<{ bannerId: string }>) => {
            const { bannerId } = action.payload;
            const foundBanner = state.banners.find(
                (banner) => banner.id === bannerId
            );
            if (!foundBanner) {
                return state;
            }
            foundBanner.is_Active = !foundBanner.is_Active;
            return state;
        },
    },
});

export const { addBanners, setBanners, deleteBanners, toggleActive } = bannerSlice.actions;
export default bannerSlice.reducer;