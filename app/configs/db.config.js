module.exports = {
    // Development
    HOST: "",
    USER: "",
    PASSWORD: "",
    DB: "",
    dialect: "postgres",
    pool: {
        //max: maximum number of connection in pool
        max: 5,
        //min: minimum number of connection in pool
        min: 0,
        //acquire: maximum time, in milliseconds, that pool will try to get connection before throwing error
        acquire: 30000,
        //idle: maximum time, in milliseconds, that a connection can be idle before being released
        idle: 10000
    }
};