import { create } from 'zustand';

interface HomeVideoState {
    videos: any[];
    setVideos: (videos: any[]) => void;
}

export const useHomeVideoStore = create<HomeVideoState>((set) => ({
    videos: [],
    setVideos: (videos: any[]) => set(() => ({ videos })),
}));
