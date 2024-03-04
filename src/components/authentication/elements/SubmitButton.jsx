const SubmitButton = ({ text, handelSubmit }) => {
  return (
    <div>
      <button className="flex items-center justify-center bg-cyan-600 text-white px-12 py-2 rounded-lg text-sm mt-8 mb-4" onClick={handelSubmit}>
        {text}
      </button>
    </div>
  );
};

export default SubmitButton;
