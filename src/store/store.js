import { create } from 'zustand'

export const useStore = create((set) => ({
    mission: null,
    setMission: (mission) => set((state) => ({mission})),
    turn: 0,
    setTurn: () => set((state) => ({ turn: state.turn + 1 })),
    secondaryScore: 0,
    setSecondaryScore:(secondaryScore) => set((state) => ({secondaryScore})),
    primaryScore: 0,
    setPrimaryScore:(primaryScore) => set((state) => ({primaryScore})),
    rule: null,
    setRule: (rule) => set((state) => ({rule})),
    deployment: null,
    setDeployment: (deployment) => set((state) => ({deployment})),
    mode: null,
    setMode: (mode) => set((state) => ({mode})),
    secondary: null,
    setSecondary: (secondary) => set((state) => ({secondary})),
    deck: null,
    setDeck: (deck) => set((state) => ({deck})),
    gambit: null,
    setGambit: (gambit) => set((state) => ({gambit})),
}))