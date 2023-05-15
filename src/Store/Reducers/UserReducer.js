import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isUserDataRequestSend: false,
    isUserDataRequestSuccess: false,
    isUserDataRequestError: false,
    userId: 0,
    userToken: '',
    refreshToken: '',
    errorData: '',
    isLogin: false,
    userRole: ''
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        changeLogin(state, action) {
            state.isLogin = action.payload;
        },
        changeUserCredentials(state, action) {
            state.userToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.userId = action.payload.id;
            state.userRole = action.payload.role;
        },
        changeUserId(state, action) {
            state.userId = action.payload  
        },
        changeUserToken(state, action) {
            state.userToken = action.payload
        },
        changeUserRole(state, action) {
            state.userRole = action.payload
        },
        changeRefreshToken(state, action) {
            state.refreshToken = action.payload
        },
        changeUserTokens(state, action) {
            state.userToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        setErrorData(state, action) {
            state.errorData = action.payload
        },
        changeUserRole(state, action) {
            state.userRole = action.payload;
        },clearResults() {
            // Note that this should be left intentionally empty.
                  // Clearing redux state and localForage happens in rootReducer.ts.
        }
    },
});
export const { changeLogin, changeUserCredentials, changeUserId, changeUserToken, changeRefreshToken, changeUserTokens, setErrorData, changeUserRole, clearResults } = userSlice.actions;

export default userSlice.reducer;