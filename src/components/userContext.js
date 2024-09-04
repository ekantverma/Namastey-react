import React from 'react';

const UserContext = React.createContext({
  loggedInUser: null,
  setUserInformation: () => {},
});

export default UserContext;
