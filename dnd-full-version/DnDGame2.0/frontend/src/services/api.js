const baseUrl = import.meta.env.VITE_API_BASE_URL || '';

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || response.statusText);
  }
  return response.json();
}

export async function getCharacters() {
  const response = await fetch(`${baseUrl}/api/character`);
  return handleResponse(response);
}

export async function createCharacter(payload) {
  const response = await fetch(`${baseUrl}/api/character`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function getDomainOptions() {
  const response = await fetch(`${baseUrl}/api/domaindata/options`);
  return handleResponse(response);
}

export async function createCharacterWithAlignment(payload) {
  const response = await fetch(`${baseUrl}/api/character`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}
