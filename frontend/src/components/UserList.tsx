// src/components/UserList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemText, Paper, Typography } from '@mui/material';

interface User {
  id: number;
  name: string;
  email: string;
  albumCount: number;
}

interface UserListProps {
  onUserSelect: (user: User) => void;
}

const UserList: React.FC<UserListProps> = ({ onUserSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<User[]>('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching users', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Loading users...</Typography>;
  }

  return (
    <Paper style={{ padding: 16 }}>
      <Typography variant="h6" gutterBottom>
        Users
      </Typography>
      <List>
        {users.map(user => (
          <ListItemButton
            key={user.id}
            onClick={() => onUserSelect(user)}
          >
            <ListItemText 
              primary={user.name} 
              secondary={`Email: ${user.email} | Albums: ${user.albumCount}`} 
            />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
};

export default UserList;
