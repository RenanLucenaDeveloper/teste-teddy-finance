export function queryParams<T extends Record<string, any>>(params: T): string {
    const query = Object.entries(params)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
        .join("&");
    return query ? `?${query}` : ""
}
