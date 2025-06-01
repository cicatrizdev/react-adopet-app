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
}
