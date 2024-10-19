import { create } from 'zustand';
interface HomeVideoState {
    videos: any[];
    setVideos: (videos: any[]) => void;
    addWatchLater: (id: number, triger: Boolean) => void;
}

export const useHomeVideoStore = create<HomeVideoState>((set) => ({
    videos: [],
    setVideos: (videos: any[]) => set(() => ({ videos })),
    addWatchLater: (id: number, triger: Boolean) => set((state) => ({
        videos: state.videos.map((video) => {
            if (video.id === id) {
                return {
                    ...video,
                    MarkedAsWatchLater: triger
                };
            }
            return video
        }),
    })),
}));
