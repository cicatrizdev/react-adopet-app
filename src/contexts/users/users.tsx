import { createContext, useContext } from 'react';
import authStorage from 'simple-auth-storage';
import type { User, UserLogin, UserRegister } from '../../types';
import { fetchData } from '../../utils';

const UsersContext = createContext<{
	createUser: (user: UserRegister) => Promise<User | null>;
	validateUser: (userLogin: UserLogin) => Promise<User | null>;
	updateUser: (user: User) => Promise<User | null>;
	getUser: () => User | null;
	isAuthenticated: () => boolean;
	login: (userLogin: UserLogin) => Promise<User | null>;
}>({
	createUser: async () => null,
	validateUser: async () => null,
	updateUser: async () => null,
	getUser: () => null,
	isAuthenticated: () => false,
	login: async () => null,
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
	const fetchUsers = async () => {
		const data = await fetchData<User[]>('http://localhost:3001/users');
		return data;
	};

	const createUser = async (user: UserRegister) => {
		const checkForDuplicate = await fetchUsers();
		const isDuplicate = checkForDuplicate.some((u: User) => u.email === user.email);
		if (isDuplicate) {
			throw new Error('User already exists');
		}
		const data = await fetchData<User, UserRegister>('http://localhost:3001/users', 'POST', user);
		const token = authStorage.generateToken();
		authStorage.saveUser(data, token);
		return data;
	};

	const validateUser = async (userLogin: UserLogin) => {
		const users = await fetchUsers();
		const userFound = users.find((user: User) => user.email === userLogin.email);
		if (userFound) {
			return userFound;
		}
		return null;
	};

	const updateUser = async (user: User) => {
		const data = await fetchData<User, User>(`http://localhost:3001/users/${user.id}`, 'PUT', user);
		const token = authStorage.generateToken();
		authStorage.saveUser(data, token);
		return data;
	};

	const login = async (userLogin: UserLogin) => {
		const user = await validateUser(userLogin);
		if (user) {
			const token = authStorage.generateToken();
			authStorage.saveUser(user, token);
		}
		return user;
	};

	const getUser = () => {
		const user: User | null = authStorage.getUser();
		return user;
	};

	const isAuthenticated = () => {
		const isLoggedIn: boolean = authStorage.isLoggedIn();
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
