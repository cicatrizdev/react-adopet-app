import { PetsProvider } from './pets/pets';
import { UsersProvider } from './users/users';

export const Contexts = ({ children }) => {
	return (
		<UsersProvider>
			<PetsProvider>{children}</PetsProvider>
		</UsersProvider>
	);
};
