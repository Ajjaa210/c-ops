const friends = [{ id: 'you', name: 'My list', items: [] }];

function getFavourites() {
  return friends;
}

function addFriend(name) {
  const friend = { id: crypto.randomUUID(), name, items: [] };
  friends.push(friend);
  return friend;
}

function addItem(friendId, name, type) {
  const friend = friends.find((entry) => entry.id === friendId);
  if (!friend) return null;
  const item = { id: crypto.randomUUID(), name, type };
  friend.items.push(item);
  return item;
}

function removeFriend(friendId) {
  if (friendId === 'you') return false;
  const friendIndex = friends.findIndex((friend) => friend.id === friendId);
  if (friendIndex === -1) return false;
  friends.splice(friendIndex, 1);
  return true;
}

function removeItem(friendId, itemId) {
  const friend = friends.find((entry) => entry.id === friendId);
  if (!friend) return false;
  const itemIndex = friend.items.findIndex((item) => item.id === itemId);
  if (itemIndex === -1) return false;
  friend.items.splice(itemIndex, 1);
  return true;
}

module.exports = { getFavourites, addFriend, addItem, removeItem, removeFriend };