import { UserAPI } from "../api";

const cache = new Map();

const getUsers = (search) => {
  return new Promise((resolve, _reject) => {
    let users = [];
    const processResult = (response) => {
      let results = response.data.results ?? [];
      users = results.map((item) => {
        return {
          name: [item.name.first, item.name.last].join(" "),
          location: [item.location.state, item.location.country].join(", "),
          picture: item.picture.thumbnail
        };
      });
      if (!cache.has("users")) {
        cache.set("users", JSON.stringify(users));
      }
      
      users = filterBySearch(search, users);
      resolve(users);
      return;
    }

    if (!cache.has("users") && !search) {
      UserAPI.getUsers().then(processResult);
    } else {
      users = JSON.parse(cache.get("users"));
      if (search) {
        users = filterBySearch(search, users);
      }
      resolve(users);
      return;
    }
  });
};

const filterBySearch = (search, users) => {
  if(!search) {
    return users
  }
  return users.filter((user) => {
    return (
      new RegExp(search, "i").test(user.name) ||
      new RegExp(search, "i").test(user.location)
    );
  });
};

export const UserDao = () => ({
  getUsers
});
