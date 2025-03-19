export const selectUser = (state) => state.user.data;
export const selectIsAuthenticated = (state) => !!state.user.data;
export const selectUserIsLoading = (state) => state.user.userIsLoading;
