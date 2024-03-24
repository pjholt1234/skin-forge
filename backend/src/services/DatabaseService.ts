class DatabaseService {
    private static instance: DatabaseService;
    private readonly client: any;

    private constructor(client: any) {
        this.client = client;
    }

    public static getInstance(client?: any): DatabaseService {
        if (!DatabaseService.instance) {
            if (!client) {
                throw new Error('Client must be provided when creating DatabaseService instance');
            }
            DatabaseService.instance = new DatabaseService(client);
        }
        return DatabaseService.instance;
    }

    public getClient() {
        return this.client;
    }
}

export default DatabaseService;