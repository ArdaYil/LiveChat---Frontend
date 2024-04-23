import { FormEvent, useState } from "react";
import useUserStore from "../stores/userStore";
import Button from "./common/form/Button";
import TextInput from "./common/form/TextInput";

const UserForm = () => {
  const [visible, setVisible] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const { username, setUsername } = useUserStore();

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
      validate(username);
      setVisible(false);
      setError("");
    } catch (ex) {
      if (ex instanceof Error) {
        setError(ex.message);
      }
    }
  };

  const handleChange = (username: string) => setUsername(username);

  return (
    <form
      style={{ display: visible ? "flex" : "none" }}
      className="user-form"
      onSubmit={handleEnter}
    >
      <header>
        <h1 className="user-form__heading">Enter your name please</h1>
        <TextInput error={error} onChange={handleChange}>
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
