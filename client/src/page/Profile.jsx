import React, { useState } from "react";
import useUpdateProfile from "../hooks/useUploadProfile";
import ImageUpload from "../components/profile/ImageUpload";

function Profile() {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState("123"); // Replace with actual user ID
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  async function handleProfile(e) {
    e.preventDefault();
    const userIdD = localStorage.getItem("user");
    // console.log(JSON.parse(userIdD))
    const parsedUser = JSON.parse(userIdD);
    const userId = parsedUser?.user?._id;
    setLoading(true);
    const { name } = e.target.elements;
    const inputName = name.value
    console.log(inputName)

    if (!image) {
      setUploadStatus("Please select an image");
      setLoading(false);
      return;
    }

    const result = await useUpdateProfile(image, inputName, userId);

    if (result?.success) {
      setUploadStatus("Upload successful");
    } else {
      setUploadStatus("Upload failed");
      console.error(result?.error);
    }

    setLoading(false);
  }

  return (
    <>
      <form
        className="h-screen w-screen flex justify-center items-center" 
        onSubmit={handleProfile}>
        <div className="h-screen w-screen sm:w-3/6 flex px-5 content-center flex-col gap-3 justify-center items-center">
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50  border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="User name"
            />
          <div className="flex items-center justify-center w-full ">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                type="file"
                name="profile"
                id="dropzone-file"
                // className="hidden"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
          </div>
          {/* <input
            type="file"
            name="profile"
            id="profileImg"
            onChange={(e) => setImage(e.target.files[0])}
          /> */}

          <button
            className=" w-full py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-800 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
           type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>

          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      </form>
    </>
  );
}

export default Profile;
