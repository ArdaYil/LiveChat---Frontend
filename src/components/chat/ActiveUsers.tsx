import { ChatMessage } from "../../App";

interface Props {
  activeUsers: Map<string, ChatMessage[]>;
}

const ActiveUsers = ({ activeUsers }: Props) => {
  const users = activeUsers.keys();

  const getUsernames = () => {
    const userNames = [];

    while (true) {
      const username = users.next().value;

      if (username) userNames.push(username);
      else return userNames;
    }
  };

  return (
    <div className="user-list">
      <h2 className="user-list__heading">Active users</h2>
      <div className="user-list__users">
        {getUsernames().map((user) => (
          <button className="user-list__users__item">{user}</button>
        ))}
      </div>
    </div>
  );
};

export default ActiveUsers;
