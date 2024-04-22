import { useState } from "react";
import useUserStore from "../stores/userStore";
import Button from "./common/form/Button";
import TextInput from "./common/form/TextInput";

const UserForm = () => {
  const [visible, setVisible] = useState<boolean>(true);

  const { username, setUsername } = useUserStore();

  const validate = (username: string) => {
    if (username == "") throw new Error("Username is required");
    if (username.length < 3)
      throw new Error("Username cannot be less than (3) characters");
    if (username.length > 20)
      throw new Error("Username cannot be greater than (20) characters");
  };

  const handleEnter = () => {
    try {
      validate(username);
      setVisible(false);
    } catch (ex) {}
  };

  const handleChange = (username: string) => setUsername(username);

  return (
    <form style={{ display: visible ? "flex" : "none" }} className="user-form">
      <header>
        <h1 className="user-form__heading">Enter your name please</h1>
        <TextInput onChange={handleChange}>Name...</TextInput>
      </header>
      <footer>
        <Button onClick={handleEnter}>Enter</Button>
      </footer>
    </form>
  );
};

export default UserForm;
