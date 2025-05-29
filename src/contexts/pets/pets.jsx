import { useState, useEffect, createContext, useContext } from 'react';

const PetsContext = createContext();

export const PetsProvider = ({ children }) => {
	const [pets, setPets] = useState([]);

	const fetchPets = async () => {
		const response = await fetch('http://localhost:3001/pets');
		const data = await response.json();
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
