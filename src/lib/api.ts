/**
 * Define an asynchronous function named 'api' that takes three parameters
 * @param path - string (API endpoint path)
 * @param method - string (HTTP method, defaults to 'POST' if not provided)
 * @param body - any (optional request payload)
 * @returns JSON response
 */
export async function api(path: string, method = 'POST', body?: any) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
        method, // HTTP method
        headers: { 
          'Content-Type': 'application/json' // Set content type to JSON
        },
        // Convert the body object to a JSON string if it exists
        body: body ? JSON.stringify(body) : undefined,
    });

    // Parse the response as JSON and return it
    return res.json();
}