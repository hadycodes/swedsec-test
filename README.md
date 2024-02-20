# Swedsec Test

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Motivation

### Intro

I tried to demonstrate more of a production-like application.
Adding authentication layer, and listening to the token through `Redux useSelectors`

for redux endpoints, I have split the code using `injections` and `lazyFetchQuery` to have more control on over when to call.

I demonstrate `createApi` and `createSlice` implementation, with `transformResponse` as well as `prepareHeaders` to add Bearer token.

I have used `Ant Design`m but for basic usage to demonstrate working with different design library, the grid layout with the infinite functionality is totally by my design, to demonstrate a reusable component.

**Note**
Due to github oauth cannot be done via client, I have used `cors-anywhere`

**Tasks**

- [x] Make the API calls only if the user has typed 3 or more characters.
- [x] Make the API calls only if the user has typed 3 or more characters.
- [x] If the user clears the input or types less than three characters, clear the results and show the empty screen
- [x]  Infinite scroll
- [x]  Add Authentication using github oauth and guest
- [ ]  Add Authorization
- [ ]  Authorized users to fetch Repositories
