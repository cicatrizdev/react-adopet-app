import { createContext, useContext } from 'react';
import authStorage from 'simple-auth-storage';

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
	const fetchUsers = async () => {
		const response = await fetch('http://localhost:3001/users');
		const data = await response.json();
		return data;
	};

	const createUser = async (user) => {
		const checkForDuplicate = await fetchUsers();
		const isDuplicate = checkForDuplicate.some((u) => u.email === user.email);
		if (isDuplicate) {
			throw new Error('User already exists');
		}
		const response = await fetch('http://localhost:3001/users', {
			method: 'POST',
			body: JSON.stringify(user),
		});
		const data = await response.json();
		const token = authStorage.generateToken(data);
		authStorage.saveUser(data, token);
		return data;
	};

	const validateUser = async (email, password) => {
		const users = await fetchUsers();
		const userFound = users.find((user) => user.email === email && user.password === password);
		if (userFound) {
			return userFound;
		}
		return null;
	};

	const updateUser = async (user) => {
		const response = await fetch(`http://localhost:3001/users/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify(user),
		});
		const data = await response.json();
		const token = authStorage.generateToken();
		authStorage.saveUser(data, token);
		return data;
	};

	const login = async (email, password) => {
		const user = await validateUser(email, password);
		if (user) {
			const token = authStorage.generateToken(user);
			authStorage.saveUser(user, token);
		}
		return user;
	};

	const getUser = () => {
		const user = authStorage.getUser();
		return user;
	};

	const isAuthenticated = () => {
		const isLoggedIn = authStorage.isLoggedIn();
		return isLoggedIn;
	};

	return (
		<UsersContext.Provider
			value={{ createUser, validateUser, updateUser, getUser, login, isAuthenticated }}
		>
			{children}
		</UsersContext.Provider>
	);
};

export const useUsers = () => {
	const context = useContext(UsersContext);
	if (!context) {
		throw new Error('useUsers must be used within a UsersProvider');
	}
	return context;
};
