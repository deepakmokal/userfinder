import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserRepo } from "../features/user/userSlice";

const Repos = () => {
  const dispatch = useDispatch();
  const nameOfUser = useSelector((state) => state.user.nameOfUser);
  const { userRepo, loading } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUserRepo(nameOfUser));
  }, [nameOfUser]);

  if (loading) return <div className=" text-3xl">Loading....</div>;

  return (
    <>
      <p className="text-3xl text-slate-900 font-medium mb-1">Latest 5 Repos</p>
      <div>
        {console.log(userRepo)}
        {userRepo.map((innerArray, index) => (
          
          <div key={index}>
            {innerArray.map((repo) => (
              
              <div key={repo.id}>
                <div className="px-4 pb-6 pt-3 my-6 border rounded flex justify-center items-center">
                  <div className="w-1/2">
                    <p className="text-blue-500 text-2xl">{repo.name}<sup className="text-slate-500 text-sm font-bold mx-3">{repo.language}</sup></p>
                    <p className="text-sm my-3">{repo.description} </p>
                    {repo.homepage !== null ? (
                      <a href={repo.homepage} className="bg-slate-800 text-white rounded text-sm py-2 px-4">
                      View Homepage/Demo Website 
                    </a>
                    ) : ''}
                  </div>
                  <div className="w-1/2 flex">
                    <p className="bg-orange-400 text-xs text-white rounded py-1 px-1 ">
                      Stats: {repo.stargazers_count} 
                    </p>
                    <p className="bg-blue-500 text-xs text-white rounded py-1 px-1 mx-2">
                      Watchers: {repo.watchers}
                    </p>
                    <p className="bg-green-500 text-xs text-white rounded py-1 px-1 ">
                      Forks: {repo.forks}
                    </p>
                  </div>
                </div>
              </div>
        ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default Repos;
