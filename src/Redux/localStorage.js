export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("bookState");
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.error("Could not load state", e);
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("bookState", serializedState);
  } catch (e) {
    console.error("Could not save state", e);
  }
};
