import { useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from '../services/userNormalService';

export default function useNormalUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUser = async () => {
    setLoading(true);
    const [data, err] = await getCurrentUser();
    if (err) {
      setError(err);
    } else {
      setUser(data);
      sessionStorage.setItem("cachedNormalUser", JSON.stringify(data));
    }
    setLoading(false);
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedNormalUser");

    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      setUser(parsed);
      setLoading(false);
    } else {
      fetchUser();
    }
  }, []);

  const handleUpdate = () => {
    setShowForm(true);
    setIsEditing(true);
  };

const handleFormSuccess = useCallback(async () => {
  const [updatedUser] = await getCurrentUser();
  if (updatedUser) {
    setUser(updatedUser);
    sessionStorage.setItem("cachedNormalUser", JSON.stringify(updatedUser));
  }
  setShowForm(false);
  setIsEditing(false);
}, []);

  const handleCloseForm = () => {
    setShowForm(false);
    setIsEditing(false);
  };

  return {
    user,
    setUser,
    loading,
    error,
    showForm,
    isEditing,
    handleUpdate,
    handleFormSuccess,
    handleCloseForm,
    setShowForm,
    setIsEditing
  };
}
