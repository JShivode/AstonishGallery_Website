// src/components/UserList.tsx

import React from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

interface User {
  id: number;
  name: string;
  email?: string;
  albumCount?: number;
}

interface UserListProps {
  // The array of users to display
  users: User[];

  // A callback function that runs when a user is selected
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItemButton
          key={user.id}
          onClick={() => onUserSelect(user)}
        >
          <ListItemText
            primary={user.name}
            secondary={`Email: ${user.email ?? ''} | Albums: ${user.albumCount ?? 0}`}
          />
        </ListItemButton>
      ))}
    </List>
  );
};

export default UserList;
