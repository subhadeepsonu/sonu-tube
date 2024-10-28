import { create } from "zustand"

interface BookMarkState {
    videos: any[];
    setVideos: (videos: any[]) => void;
    removeBookMark: (id: number) => void;
}

export const useBookMarkStore = create<BookMarkState>((set) => ({
    videos: [],
    setVideos: (videos: any[]) => set(() => ({ videos })),
    removeBookMark(id) {
        set((state) => ({
            videos: state.videos.filter((video) => video.id !== id),
        }));
    },
}));