export default function Sidebar({
  isProfileChanged,
  onUserSelect,
  selectedUser,
  users,
}) {
  return (
    <aside className="w-64 bg-gray-200 p-4">
      <div className="mb-4">
        <span className="block text-lg font-bold">Users</span>
      </div>
      <div className="space-y-2">
        {users.map((user) => {
          const isSelected = selectedUser && selectedUser.id === user.id;

          return (
            <div
              className={`flex cursor-pointer items-center justify-between rounded ${isSelected ? "bg-gray-300" : "bg-gray-100"} p-2 ${isSelected ? "hover:bg-gray-400" : "hover:bg-gray-200"}`}
              key={user.id}
              onClick={() => onUserSelect(user)}
            >
              <span>
                {user.first_name} {user.last_name}
              </span>
              {isProfileChanged && isSelected && (
                <span className="h-2 w-2 rounded-full bg-red-500" />
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
