export default function Header({ errors, isProfileChanged, onSave }) {
  const hasErrors = Object.keys(errors).some((key) => errors[key]);

  return (
    <header className="mb-6 flex justify-end">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
        disabled={!isProfileChanged || hasErrors}
        onClick={onSave}
      >
        Save
      </button>
    </header>
  );
}
