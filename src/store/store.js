import { create } from 'zustand'

// Function to save state to localStorage
const persistState = (key, state) => {
  localStorage.setItem(key, JSON.stringify(state));
};

// Function to retrieve state from localStorage
const getPersistedState = (key) => {
  const storedState = localStorage.getItem(key);
  return storedState ? JSON.parse(storedState) : {};
};

export const useStore = create((set) => {
  // Retrieve any existing data from localStorage when the store is initialized
  const initialState = getPersistedState('appState');

  // Create the store with initial state and save updates to localStorage
  return {

    gamemode: false,
    setGamemode: (gamemode) => set((state) => {
      const newState = {...state, gamemode};
      return newState;
    }),

    gameRules: false,
    setGameRules: (gameRules) => set((state) => {
      const newState = {...state, gameRules};
      return newState;
    }),

    mission: initialState.mission || null,
    setMission: (mission) => set((state) => {
      const newState = { ...state, mission };
      persistState('appState', newState);
      return newState;
    }),

    turn: initialState.turn || 0,
    setTurn: () => set((state) => {
      const newState = { ...state, turn: state.turn + 1 };
      persistState('appState', newState);
      return newState;
    }),

    secondaryScore: initialState.secondaryScore || 0,
    setSecondaryScore: (secondaryScore) => set((state) => {
      const newState = { ...state, secondaryScore };
      persistState('appState', newState);
      return newState;
    }),

    primaryScore: initialState.primaryScore || 0,
    setPrimaryScore: (primaryScore) => set((state) => {
      const newState = { ...state, primaryScore };
      persistState('appState', newState);
      return newState;
    }),

    rule: initialState.rule || null,
    setRule: (rule) => set((state) => {
      const newState = { ...state, rule };
      persistState('appState', newState);
      return newState;
    }),

    deployment: initialState.deployment || null,
    setDeployment: (deployment) => set((state) => {
      const newState = { ...state, deployment };
      persistState('appState', newState);
      return newState;
    }),

    mode: initialState.mode || null,
    setMode: (mode) => set((state) => {
      const newState = { ...state, mode };
      persistState('appState', newState);
      return newState;
    }),

    secondary: initialState.secondary || null,
    setSecondary: (secondary) => set((state) => {
      const newState = { ...state, secondary };
      persistState('appState', newState);
      return newState;
    }),

    deck: initialState.deck || null,
    setDeck: (deck) => set((state) => {
      const newState = { ...state, deck };
      persistState('appState', newState);
      return newState;
    }),

    gambit: initialState.gambit || null,
    setGambit: (gambit) => set((state) => {
      const newState = { ...state, gambit };
      persistState('appState', newState);
      return newState;
    }),
  };
});
