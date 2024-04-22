interface Props {
  children: string;
  onChange: (data: string) => void;
}

const TextInput = ({ children, onChange }: Props) => {
  return (
    <input
      className="text-input"
      type="text"
      placeholder={children}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
