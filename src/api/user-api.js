import axios from "axios";

const QTY = 20;
const BASE_URL = `https://randomuser.me/api/?results=${QTY}&inc=name,location,picture&nat=br,us,mx,gb,nz,nl,ca`


const getUsers = () => {
  return axios.get(BASE_URL);
};

export const UserApi = () => ({
  getUsers
});
