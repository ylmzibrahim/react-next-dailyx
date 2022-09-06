const TagsSection = ({ tags, title, handleSearch }) => {
  return (
    <section className="w-1/5 h-fit xs:w-full bg-slate-200 dark:bg-slate-800 rounded-2xl px-4 py-2 flex flex-col text-sky-900 dark:text-sky-100">
      <h5 className="mb-2">{title}</h5>
      <div className="flex flex-col xs:flex-row overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-100 space-y-1 xs:space-y-0 xs:space-x-1 pb-2.5">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="bg-slate-400 text-white dark:text-slate-800 text-sm py-1 px-3 rounded-full w-fit"
            onClick={handleSearch}
          >
            {tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default TagsSection;
