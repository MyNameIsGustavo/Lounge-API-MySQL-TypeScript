import { Connection, createConnection } from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const {
    DB_HOST,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} = process.env;

class Database {
    private readonly connection: Connection;

    constructor() {
        this.connection = createConnection({
            host: DB_HOST,
            database: DB_DATABASE,
            user: DB_USER,
            password: DB_PASSWORD,
        });
    }

    public connectDatabase(): void {
        this.connection.connect((err) => {
            if (err) {
                console.error('Error connecting to database:', err);
            } else {
                console.log('Connection to the database successful.');
            }
        });
    };

    public closeConnection(): void {
        this.connection.end((err) => {
            if (err) {
                console.error('Error closing database connection:', err);
            } else {
                console.log('Database connection closed.');
            }
        });
    };
}

export default Database;