/**
 * API Gateway Client
 * Handles all HTTP fetch requests to the C# Backend endpoints.
 */
export async function executeEndpoint(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return {
            status: response.status,
            ok: response.ok,
            data: data
        };
    } catch (error) {
        return {
            status: 0,
            ok: false,
            data: { error: `Execution Error: ${error.message}. Make sure the backend server is running on port 5239!` }
        };
    }
}
