import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { UserDAO } from "./dao";
import "./styles.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) { clearTimeout(timer); }
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };

  const updateSearch = (value) => {
    setSearch(value);
  };

  const debounceUpdateSearch = useCallback(debounce(updateSearch), []);

  useEffect(() => {
    UserDAO.getUsers(search).then((data) => {
      setUsers(data);
    });
  }, [search]);

  return (
    <div className="App">
      <Header
        onChange={(value) => debounceUpdateSearch(value)}
      />
      <div className="contentList">
        {users &&
          users.map((user, index) => {
            return (
              <Card
                key={"user-" + index}
                picture={user.picture}
                name={user.name}
                location={user.location}
              />
            );
          })}
      </div>
    </div>
  );
};

export default App;
