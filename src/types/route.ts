// Routes List type
export interface IRoutes {
    id: number,
    name: string,
    path: string,
    component: React.LazyExoticComponent<React.FC>,
    isPublic?: boolean;
}