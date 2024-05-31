import Input from "./Input";

export default function UserProfile({
  errors,
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
        <Input
          errorMessage={errors.first_name}
          label="First name"
          name="first_name"
          onChange={onInputChange}
          value={selectedUser.first_name}
        />
        <Input
          errorMessage={errors.last_name}
          label="Last name"
          name="last_name"
          onChange={onInputChange}
          value={selectedUser.last_name}
        />
        <Input
          errorMessage={errors.email}
          label="Email"
          name="email"
          onChange={onInputChange}
          type="email"
          value={selectedUser.email}
        />
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
