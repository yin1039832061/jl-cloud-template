declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

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

declare module '*.styl' {
  const classes: { [key: string]: string };
  export default classes;
}

//获取指定key的数据类型
type GetTypeByKey<T, K extends string> = K extends `${infer R}.${infer P}`
  ? R extends keyof T
    ? GetTypeByKey<T[R], P>
    : never
  : K extends keyof T
  ? T[K]
  : never;
