import {create } from 'zustand';

export const useStore = create((set) => ({
    showMeetForm: "",
    setShowMeetForm: (value) => set({ showMeetForm: value }),
    }));