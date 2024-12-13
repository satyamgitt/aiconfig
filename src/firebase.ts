// Temporary mock Firebase setup
const auth = {
  currentUser: null,
  onAuthStateChanged: (callback: (user: any) => void) => {
    // Simulate successful auth
    callback({
      uid: 'temp-user-123',
      email: 'temp@example.com',
      displayName: 'Temporary User'
    });
    return () => {}; // Cleanup function
  }
};

export { auth };