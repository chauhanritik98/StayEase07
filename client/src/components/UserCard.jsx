/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const UserCard = ({ user, handleDeleteUser }) => {
  return (
    <div className="relative border border-gray-300 p-5 flex flex-col items-center space-y-3 bg-white rounded-lg shadow-lg">
      <img
        src={
          user.avatar ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        }
        alt="User"
        className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
      />
      <h1 className="text-2xl font-semibold text-gray-800">{user.fullname}</h1>
      <p className="text-gray-600">
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </p>

      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-4 w-full">
          <Link to={`/admin/update-user/${user._id}`} className="w-full">
            <button className="w-full text-blue-700 hover:bg-blue-100 px-4 py-2 rounded-md text-sm transition-colors border border-blue-700">
              Edit
            </button>
          </Link>
          <button
            onClick={() => handleDeleteUser(user._id)}
            className="text-red-700 hover:bg-red-100 px-4 py-2 rounded-md text-sm transition-colors border border-red-700"
          >
            Delete
          </button>
        </div>
        <Link
          to={`/admin/user-profile/${user._id}`}
          className="w-full bg-blue-700 text-white text-center border-2 border-blue-700 py-2 px-4 rounded-lg hover:bg-blue-800 hover:border-blue-800 transition-colors duration-300 font-semibold"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default UserCard;
