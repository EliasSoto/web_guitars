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

export const getActiveAddress = async () => {
  try {
    const [data, error] = await getActiveAddress();
    if (!error && data) {
      return data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching active address:", error);
    return null;
  }
};