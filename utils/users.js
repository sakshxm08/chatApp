const users = [];

//Join user to chat

function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);
  return user;
}

//Get current user info
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

//User leaves the chat
function userLeaves(id) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0]; //splice gets the array of the removed elements and updates the original array by deleting those elements
  }
}

//Get room info
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}
module.exports = {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers,
};
