const NoteSection = () => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">📝 Note</h3>
      <textarea
        className="w-full w-full rounded-lg border border-gray-300 bg-transparent outline-none transition focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:cursor-default disabled:bg-gray-2 data-[active=true]:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark dark:data-[active=true]:border-primary p-2"
        placeholder="Enter your note for this sentence..."
        rows={3}
      />
    </div>
  );
};

export default NoteSection;
