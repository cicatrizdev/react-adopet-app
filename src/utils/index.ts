type HttpMethod = 'GET' | 'POST' | 'PUT';

export async function fetchData<T, U = undefined>(
	url: string,
	method: HttpMethod = 'GET',
	body?: U,
	headers?: Record<string, string>
): Promise<T> {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json',
			...headers,
		},
		body: body ? JSON.stringify(body) : undefined,
	});

	if (!response.ok) {
		throw new Error(`HTTP error! Status: (${response.status}) - ${response.statusText}`);
	}

	const data: T = await response.json();
	return data;
}
