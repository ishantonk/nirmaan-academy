/** Utility: narrow unknown input with zod and throw 400-like errors */
export function parseOrThrow<T>(schema: { parse: (d: unknown) => T }, data: unknown): T {
    return schema.parse(data);
}