import { createContext, useContext } from 'react';
import authStorage from 'simple-auth-storage';
import type { User, UserLogin, UserRegister } from '../../types';

const UsersContext = createContext<{
	createUser: (user: UserRegister) => Promise<void>;
	validateUser: (userLogin: UserLogin) => Promise<User | null>;
	updateUser: (user: User) => Promise<User | null>;
	getUser: () => User | null;
	isAuthenticated: () => boolean;
	login: (userLogin: UserLogin) => Promise<User | null>;
}>({
	createUser: async () => {},
	validateUser: async () => null,
	updateUser: async () => null,
	getUser: () => null,
	isAuthenticated: () => false,
	login: async () => null,
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
	const fetchUsers = async () => {
		const response = await fetch('http://localhost:3001/users');
		const data = await response.json();
		return data;
	};

	const createUser = async (user: UserRegister) => {
		const checkForDuplicate = await fetchUsers();
		const isDuplicate = checkForDuplicate.some((u: User) => u.email === user.email);
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

	const validateUser = async (userLogin: UserLogin) => {
		const users = await fetchUsers();
		const userFound = users.find(
			(user: UserLogin) => user.email === userLogin.email && user.password === userLogin.password
		);
		if (userFound) {
			return userFound;
		}
		return null;
	};

	const updateUser = async (user: User) => {
		const response = await fetch(`http://localhost:3001/users/${user.id}`, {
			method: 'PUT',
			body: JSON.stringify(user),
		});
		const data = await response.json();
		const token = authStorage.generateToken();
		authStorage.saveUser(data, token);
		return data;
	};

	const login = async (userLogin: UserLogin) => {
		const user = await validateUser(userLogin);
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
