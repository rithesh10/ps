const AssessmentQuestion = ({ question, options, selectedValue, onChange }) => {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:border-sky-200">
      <h3 className="mb-4 text-sm font-semibold text-slate-800">
        <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-lg bg-sky-100 text-xs font-bold text-sky-700">
          {question.id}
        </span>
        {question.text}
      </h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option, index) => {
          const inputId = `question-${question.id}-${index + 1}`;
          const isSelected = selectedValue === option.value;

          return (
            <label
              key={inputId}
              htmlFor={inputId}
              className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-medium transition ${
                isSelected
                  ? "border-sky-300 bg-sky-600 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-600 hover:border-sky-200 hover:bg-sky-50"
              }`}
            >
              <input
                type="radio"
                id={inputId}
                name={`question-${question.id}`}
                checked={isSelected}
                onChange={() => onChange(question.id, option.value)}
                required
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentQuestion;
