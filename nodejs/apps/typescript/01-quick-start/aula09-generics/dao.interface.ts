export interface DaoInterface<T> {
    
    tableName: string;

    insert(T: any): boolean;
    update(T: any): boolean;
    delete(id: number): T;
    find(id: number): T;
    findAll(): Array<T>;
    
}