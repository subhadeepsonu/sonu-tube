import { create } from "zustand";
interface watchlaterStore {
    videos: any[];
    setVideos: (videos: any[]) => void;
    AddWatchLater: (id: number, triger: Boolean) => void;
}
export const useWatchLaterStore = create<watchlaterStore>((set) => ({
    videos: [],
    setVideos: (videos: any[]) => set(() => ({ videos })),
    AddWatchLater: (id: number, triger: Boolean) => set((state) => ({
        videos: state.videos.map((video) => {
            if (video.id === id) {
                return {
                    ...video,
                    MarkedAsWatchLater: triger
                }
            }
            return video
        })
    }))
}))