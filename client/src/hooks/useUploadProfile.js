const API_URL = import.meta.env.VITE_URL;

const useUpdateProfile = async (file, inputName, userId) => {
  if (!file || !userId) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", inputName)
  try {
    const response = await fetch(`${API_URL}/user/profile/${userId}`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, data };
    } else {
      return { success: false, error: data };
    }

  } catch (error) {
    return { success: false, error };
  }
};

export default useUpdateProfile;
