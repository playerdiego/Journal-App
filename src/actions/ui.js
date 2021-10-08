import { types } from "../types/types";

export const uiSetError = (mgs) => ({
    type: types.uiSetError,
    payload: mgs
});

export const uiRemoveError = () => ({
    type: types.uiRemoveError
});

export const uiStartLoading = () => ({
    type: types.uiStartLoading,
    payload: true
});

export const uiFinishLoading = () => ({
    type: types.uiFinishLoading,
    payload: false
});