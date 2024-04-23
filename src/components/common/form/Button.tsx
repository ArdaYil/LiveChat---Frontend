interface Props {
  children: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button = ({ children, className, onClick, type = "button" }: Props) => {
  return (
    <button className={`button ${className}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
