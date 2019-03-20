
import React, { useState } from 'react';
import { AddUserForm } from './forms/AddUserForm';
import { UserTable } from './tables/UserTable';
import { EditUserForm } from './forms/EditUserForm';
import './App.css';

const App = () => {

  const usersData = [
    { id: 1, name: 'Tania', username: 'floppydiskette' },
    { id: 2, name: 'Max', username: 'maxfarseer' },
  ]

  const [users, setUsers] = useState(usersData);

  const [editing, setEditing] = useState(false);

  const initialFormState = {id: null, name: '', username: '', };

  const [ currentUser, setCurrentUser] = useState(initialFormState);

  const addUser = user => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  }

  const deleteUser = id => {
    setEditing(false);
    setUsers( users.filter ( user => user.id !== id ));
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false);
    setUsers(users.map(user => (user.id === id? updatedUser : user)))
  }

  const editRow = user => {
    setEditing(true);
    setCurrentUser({ ...user });
  }

  return (
    <div className="container">
      <h1>CRUD App with Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
          {/* добавили форму */}
          {editing ? (
            <React.Fragment>
            <h2>Edit user</h2>
              <EditUserForm
                editing={editing}
                currentUser={currentUser}
                updateUser={updateUser}
                setEditing={setEditing}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser}/>
            </React.Fragment>
          )
          }
        
        </div>
        <div className="flex-large">
          <h2>View users</h2>
          {/* добавили таблицу */}
          <UserTable
            users={users}
            deleteUser = {deleteUser}
            editRow = {editRow}
          />
        </div>
      </div>
    </div>
  )
}

export { App }