interface IAppConfig {
    API_BASE_URL: string,
    API_VERSION: string
}

export const APP_CONFIG: IAppConfig = {
    API_BASE_URL: import.meta.env.VITE_REACT_APP_API_BASE_URL,
    API_VERSION: import.meta.env.VITE_REACT_APP_API_VERSION,
}