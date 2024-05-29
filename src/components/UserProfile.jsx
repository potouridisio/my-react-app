export default function UserProfile({
  isProfileChanged,
  onInputChange,
  selectedUser,
}) {
  return (
    <section className="space-y-6">
      <div className="flex items-center space-x-4">
        <img
          src={selectedUser.avatar}
          alt="Avatar"
          className="h-24 w-24 rounded-full"
        />
        <div>
          <h2 className="text-2xl font-bold">
            {selectedUser.first_name} {selectedUser.last_name}
          </h2>
          <p className="text-gray-600">{selectedUser.email}</p>
        </div>
      </div>
      <form className="space-y-4">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="first-name"
          >
            First Name
          </label>
          <input
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            id="first-name"
            name="first_name"
            onChange={onInputChange}
            type="text"
            value={selectedUser.first_name}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="last-name"
          >
            Last Name
          </label>
          <input
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            id="last-name"
            name="last_name"
            onChange={onInputChange}
            type="text"
            value={selectedUser.last_name}
          />
        </div>
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="mt-1 block w-full rounded border border-gray-300 p-2"
            id="email"
            name="email"
            onChange={onInputChange}
            type="email"
            value={selectedUser.email}
          />
        </div>
        {isProfileChanged && (
          <div className="flex items-center">
            <span className="text-sm text-gray-600">Profile has changes</span>
            <span className="ml-2 h-2 w-2 rounded-full bg-red-500" />
          </div>
        )}
      </form>
    </section>
  );
}
