import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './routes';
import { RouterProvider } from 'react-router';
import { Contexts } from './contexts';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Contexts>
			<RouterProvider router={router} />
		</Contexts>
	</StrictMode>
);
