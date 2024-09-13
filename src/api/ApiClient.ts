
export class ApiClient {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    constructor(baseUrl: string) {
        // TODO: replace this and constructor parameter with getting a value from env
        this.baseUrl = baseUrl;
        this.defaultHeaders = {
            "Content-Type": "application/json",
        };
    }

    async request<T>(
        path: string,
        method: "GET" | "POST" | "PUT" | "DELETE",
        headers?: Record<string, string>,
        body?: any,
    ): Promise<T> {
        const url = `${this.baseUrl}${path}`;
        const options: RequestInit = {
            method,
            headers: {
                ...this.defaultHeaders,
                ...headers
            },
            ...(body ? { body: JSON.stringify(body) } : {})
        };

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`Request failed with\n status:\n${response.status}\n and message:\n${response.statusText}`);
        }

        return response.json() as Promise<T>
    }
}