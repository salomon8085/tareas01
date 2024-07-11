import mysql2 from'mysql2/promise';

const {createPool}=mysql2;

export const pool= createPool({
    host:'172.17.0.2', //host: '192.168.1.77',
    port: 3306,
    user: 'root',
    password: 'myPassword',
    database: 'tasksdb'
});

