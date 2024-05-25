interface Props {
  children: string;
  error?: string;
  className?: string;
  dark?: boolean;
  onChange: (data: string) => void;
}

const TextInput = ({
  children,
  error,
  className = "",
  dark,
  onChange,
}: Props) => {
  return (
    <div className={`text-input-container ${className}`}>
      <input
        style={dark ? { backgroundColor: "#3f3f3f", color: "white" } : {}}
        className="text-input"
        type="text"
        placeholder={children}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};

export default TextInput;
