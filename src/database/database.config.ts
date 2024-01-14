import mysql, { Connection } from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

class Database {
    private readonly connection: Connection;

    constructor(host: any, database: any, user: any, password: any) {
        this.connection = mysql.createConnection({ host, database, user, password });
        this.connectDatabase();
    };

    private connectDatabase(): void {
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