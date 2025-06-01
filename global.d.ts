declare module '*.png' {
	const content: string;
	export default content;
}

declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.css' {
	const content: string;
	export default content;
}

declare module 'simple-auth-storage' {
	export const generateToken: () => string;
	export const saveUser: (user: User, token: string) => void;
	export const getUser: () => User | null;
	export const isLoggedIn: () => boolean;
}
