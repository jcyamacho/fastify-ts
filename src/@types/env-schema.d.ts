declare module 'env-schema' {
  interface Opts {
    schema: object
    data?: object | Array<object>
    env?: boolean
    dotenv?: boolean
  }
  const loadAndValidateEnvironment: (_opts: Opts) => object
  export = loadAndValidateEnvironment
}
