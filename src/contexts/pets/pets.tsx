import { useState, useEffect, createContext, useContext } from 'react';
import type { Pet } from '../../types';
import { fetchData } from '../../utils';

const PetsContext = createContext<{ pets: Pet[] }>({ pets: [] });

export const PetsProvider = ({ children }: { children: React.ReactNode }) => {
	const [pets, setPets] = useState<Pet[]>([]);

	const fetchPets = async () => {
		const data = await fetchData<Pet[]>('http://localhost:3001/pets');
		setPets(data);
	};

	useEffect(() => {
		fetchPets();
	}, []);

	return <PetsContext.Provider value={{ pets }}>{children}</PetsContext.Provider>;
};

export const usePets = () => {
	const context = useContext(PetsContext);
	if (!context) {
		throw new Error('usePets must be used within a PetsProvider');
	}
	return context;
};
