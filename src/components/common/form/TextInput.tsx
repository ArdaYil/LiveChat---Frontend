interface Props {
  children: string;
  error: string;
  onChange: (data: string) => void;
}

const TextInput = ({ children, error, onChange }: Props) => {
  return (
    <div className="text-input-container">
      <input
        className="text-input"
        type="text"
        placeholder={children}
        onChange={(e) => onChange(e.target.value)}
      />
      <p className="input-error">{error}</p>
    </div>
  );
};

export default TextInput;
