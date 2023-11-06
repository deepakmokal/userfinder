import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, updateUsername } from "../features/user/userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser("deepakmokal"));
    dispatch(updateUsername('deepakmokal'))
  }, []);

  const { user, loading } = useSelector((state) => state.user);

  if (loading) return <div className=" text-3xl">Loading....</div>;

  const handleDate = (date) => {
    const createdDate = new Date(date)
    return createdDate.toUTCString();
  }

  return (
    <>
      {user.lemgth === 0
        ? "No records Found"
        : user.map((singleUser) => (
            <div className="px-2 pb-6 pt-3 my-6 border rounded flex" key={singleUser.id}>
              <div className="profile-img">
                <div className="img w-[200px] border rounded mb-2">
                  <img
                    className="w-full"
                    src={singleUser.avatar_url}
                    alt=""
                  />
                </div>
                <a
                  href={singleUser.html_url}
                  target="_blank"
                  className="w-full bg-slate-800 text-white rounded text-sm py-2 block text-center"
                >
                  View Profile
                </a>
              </div>
              <div className="profile-details mx-2 w-full">
                <div className="stats flex gap-2">
                  <p className="bg-slate-800 text-xs text-white rounded py-1 px-2">
                    Public Repos: {singleUser.public_repos}
                  </p>
                  <p className="bg-slate-400 text-xs text-white rounded py-1 px-2">
                    Public Gists: {singleUser.public_gists}
                  </p>
                  <p className="bg-green-400 text-xs text-white rounded py-1 px-2">
                    Followers: {singleUser.followers}
                  </p>
                  <p className="bg-blue-500 text-xs text-white rounded py-1 px-2">
                    Following: {singleUser.following}
                  </p>
                </div>
                <div className="details mt-2">
                  <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-sm dark:border-gray-600">
                      Company:
                      <span className="bg-orange-400 text-xs text-white rounded py-1 px-2 mx-4">
                        {singleUser.company !== null ? singleUser.company : 'No Details provided'}
                      </span>
                    </li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      Website/Blog:
                      <span className="bg-orange-400 text-xs text-white rounded py-1 px-2 mx-4">
                      {singleUser.blog !== null && singleUser.blog !== '' ? singleUser.blog : 'No Details provided'}
                      </span>
                    </li>
                    <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      Location: {singleUser.location !== null ? singleUser.location : 'NOT FOUND'}
                    </li>
                    <li className="w-full px-4 py-2 border-b">
                      Member Since: {handleDate(singleUser.created_at)}
                    </li>
                    <li className="w-full px-4 py-2 rounded-b-sm">
                      Want to be Hired:{" "}
                      <span className="bg-red-500 text-xs text-white rounded py-1 px-2 mx-4">
                        {singleUser.hireable ? 'Yes': 'No'}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default UserProfile;
