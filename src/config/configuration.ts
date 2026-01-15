export default () => ({
    database: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10) || 3306,
        user: process.env.DB_USER,
        pass: process.env.DB_PASS 
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN || '60s',
    },
})