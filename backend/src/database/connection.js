import pg from 'pg';

const pool = new pg.Pool({
    host:'localhost',
    user:'postgres',
    password:'Leonardo4422',
    database:'mrpersonality',
    port:'5432'
})

export default pool;