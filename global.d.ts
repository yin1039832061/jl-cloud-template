declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}
declare type CTX = {
    req?: any;
    res?: any;
    query?: any;
};
type GetTypeByKey<T, K extends string> = K extends `${infer R}.${infer P}`
    ? R extends keyof T
    ? GetTypeByKey<T[R], P>
    : never
    : K extends keyof T
    ? T[K]
    : never;
// declare global {
interface Window {
    __bl?: {
        error: (error: Error, any) => void;
    };
}
// }
// export {};
