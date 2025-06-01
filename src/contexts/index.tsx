import { PetsProvider } from './pets/pets';
import { UsersProvider } from './users/users';

export const Contexts = ({ children }: { children: React.ReactNode }) => {
	return (
		<UsersProvider>
			<PetsProvider>{children}</PetsProvider>
		</UsersProvider>
	);
};
