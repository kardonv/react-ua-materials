import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchUsers } from '../redux/user/userActions';
import { Action } from '../redux/user/userTypes';
import { ThunkDispatch } from 'redux-thunk';
import styles from '../styles.module.css';

export function UserContainer(): React.JSX.Element {
  const dispatch = useDispatch<ThunkDispatch<RootState, unknown, Action>>();

  // Access user state from Redux store
  const { loading, users, error } = useSelector((state: RootState) => state.users);

  // Fetch users when component mounts
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <div className={styles.cakeContainer}>
      <h2 className={styles.subtitle}>User Management</h2>

      {loading && (
        <div className={styles.loading}>
          <p>Loading users...</p>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <p>Error: {error}</p>
          <button
            className={styles.button}
            onClick={() => dispatch(fetchUsers())}
          >
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.userList}>
          <h3>Users ({users.length})</h3>
          {users.length > 0 ? (
            <ul>
              {users.map((userId: number, index: number) => (
                <li key={index} className={styles.userItem}>
                  {userId}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found</p>
          )}

          <button
            className={styles.button}
            onClick={() => dispatch(fetchUsers())}
          >
            Refresh Users
          </button>
        </div>
      )}
    </div>
  );
}
