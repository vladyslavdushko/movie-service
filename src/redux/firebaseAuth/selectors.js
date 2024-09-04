export const selectIsLoggedInFire = (state) => state.fireBaseAuth.isLoggedIn;

export const selectEmail = (state) => state.fireBaseAuth.user.email;

export const selectToken = (state) => state.fireBaseAuth.token;
