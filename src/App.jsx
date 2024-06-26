import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import UserProfile from "./components/UserProfile";
import api from "./lib/api";

export default function App() {
  const [errors, setErrors] = useState({});
  const [isProfileChanged, setIsProfileChanged] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const startFetching = async () => {
      const response = await api.get("users");

      setUsers(response.data.data);
    };

    startFetching();
  }, []);

  useEffect(() => {
    if (selectedUser && users.length > 0) {
      const correspondingUser = users.find(
        (user) => user.id === selectedUser.id,
      );

      const profileChanged = Object.keys(selectedUser).some(
        (key) => selectedUser[key] !== correspondingUser[key],
      );

      setIsProfileChanged(profileChanged);
    }
  }, [selectedUser, users]);

  const validate = (name, value) => {
    let error = "";

    if (!value) {
      error = "This field is required.";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Please enter a valid email address.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    return error;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setSelectedUser({
      ...selectedUser,
      [name]: value,
    });

    validate(name, value);
  };

  const handleSave = () => {
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? selectedUser : user,
    );

    setUsers(updatedUsers);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        isProfileChanged={isProfileChanged}
        onUserSelect={setSelectedUser}
        selectedUser={selectedUser}
        users={users}
      />
      {/* Main Content */}
      <main className="flex-1 bg-white p-6">
        <Header
          errors={errors}
          isProfileChanged={isProfileChanged}
          onSave={handleSave}
        />
        {selectedUser ? (
          <UserProfile
            errors={errors}
            isProfileChanged={isProfileChanged}
            onInputChange={handleInputChange}
            selectedUser={selectedUser}
          />
        ) : (
          <div className="mt-20 text-center text-gray-600">
            Please select a user to view their profile.
          </div>
        )}
      </main>
    </div>
  );
}
