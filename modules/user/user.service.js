import fs from 'fs';
import bcrypt from 'bcrypt';
// import defaultData from './user.default.data';
import defaultData from '../../dataBaseJson/default.data.json';

const getAllUsers = () => {
  return defaultData.userData;
};

// TODO: validate req.body
const getUser = (id) => {
  const user = defaultData.userData.find((user) => user.id === id);
  return user;
};

const createUser = (user) => {
  const newUser = {
    // This Id is not unique. Since default data file length is used. This is not a problem. This is just a reminder.
    // This will be handled in when validation is implemented Or database. FOR NOW, let's just use the length of the json userData array.
    id: defaultData.userData.length + 1,
    ...user,
    password: bcrypt.hashSync(user.password, 10),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const data = fs.readFileSync('./modules/user/user.default.data.json');
  const users = JSON.parse(data);
  const newUserData = [...users.userData, newUser];
  fs.writeFileSync('./modules/user/user.default.data.json', JSON.stringify({ userData: newUserData }));
  return newUser;
};

const deleteUser = (id) => {
  const user = defaultData.userData.find((user) => user.id === id);
  if (user) {
    const data = fs.readFileSync('./modules/user/user.default.data.json');
    const users = JSON.parse(data);
    const newUserData = users.userData.filter((user) => user.id !== id);
    fs.writeFileSync('./modules/user/user.default.data.json', JSON.stringify({ userData: newUserData }));
  }
  return user;
};

const updateUser = async (id, newUser) => {
  const oldUser = defaultData.userData.find((user) => user.id === id);
  if (oldUser) {
    const data = fs.readFileSync('./modules/user/user.default.data.json');
    const users = JSON.parse(data);
    const newUserData = users.userData.map((user) => {
      if (user.id === id) {
        return {
          id: user.id,
          ...user,
          password: bcrypt.hashSync(user.password, 10),
          updatedAt: new Date().toISOString(),
          ...newUser,
        };
      }
      return user;
    });
    fs.writeFileSync('./modules/user/user.default.data.json', JSON.stringify({ userData: newUserData }));
    return oldUser;
  }
  // returns undefined if user is not found
};

export const getUserByEmail = (email) => {
  const user = defaultData.userData.find((user) => user.email === email);
  return user;
};

const userService = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};

export default userService;
