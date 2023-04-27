declare module '@emp-saas/components/AuthWrapper' {
    /// <reference types="react" />
    const AuthWrapper: (props: {
        children: React.ReactNode;
        btnCode: string;
        url?: string;
    }) => JSX.Element;
    export const getAuth: (btnCode: string, url?: string) => { accessable: boolean };
    export default AuthWrapper;
}
declare module '@emp-saas/js/fetch' {
    const axios = {
        post: (...params: any[]) => any,
        get: (...params: any[]) => any,
    };
    export default axios;
}
