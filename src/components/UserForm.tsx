import { FormEvent, useState } from "react";
import useUserStore from "../stores/userStore";
import Button from "./form/Button";
import TextInput from "./form/TextInput";

interface Props {
  onRegister: () => void;
}

const UserForm = ({ onRegister }: Props) => {
  const [visible, setVisible] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { user, setUser } = useUserStore();

  const validate = (username: string) => {
    if (username == "") throw new Error("Username is required");
    if (username.length < 3)
      throw new Error("Username cannot be less than (3) characters");
    if (username.length > 20)
      throw new Error("Username cannot be greater than (20) characters");
  };

  const handleEnter = (e: FormEvent) => {
    e.preventDefault();

    try {
      validate(removeSpaces(user.username));
      setVisible(false);
      setError("");
      onRegister();
    } catch (ex) {
      if (ex instanceof Error) {
        setError(ex.message);
      }
    }
  };

  const removeSpaces = (str: string) => {
    const array = str.split("");
    let newStr = "";

    array.forEach((char) => {
      if (char == " ") return;
      newStr += char;
    });

    return newStr;
  };

  const handleChange = (username: string) =>
    setUser({ username: username.trim() });

  return (
    <form
      style={{ display: visible ? "flex" : "none" }}
      className="user-form"
      onSubmit={handleEnter}
    >
      <header>
        <h1 className="user-form__heading">Enter your name please</h1>
        <TextInput
          className="user-form__input"
          error={error}
          onChange={handleChange}
        >
          Name...
        </TextInput>
      </header>
      <footer>
        <Button type={"submit"} className="user-form__button">
          Enter
        </Button>
      </footer>
    </form>
  );
};

export default UserForm;
