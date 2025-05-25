
export const getUserFirstNameLocal = () => {
  const userData = localStorage.getItem('user_info');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      return user.fullname?.split(' ')[0] || null;
    } catch (error) {
      console.error("Error parsing user_info:", error);
    }
  }
  return null;
};
