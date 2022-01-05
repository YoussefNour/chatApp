const users = [];

// Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  console.log(users);
  return user;
}

// Get current user
function getCurrentUser(id) {
  return users.find((u) => u.id === id);
}

// User Leaves Chat
function userLeave(id) {
  const index = users.findIndex((u) => u.id === id);
  //   console.log(index);
  if (index) {
    return users.splice(index, 1)[0];
  }
}

// Get Room users
function getRoomUsers(room) {
  //   console.log(users.filter((u) => u.room === room));
  return users.filter((u) => u.room === room);
}

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };
