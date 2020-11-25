exports.seed = function (knex) {
    const db = "cjexpenses";
    const user = "postgres";

    const dropDb = () => knex.raw(`DROP DATABASE IF EXISTS "${db}"`);
    const createDb = () => knex.raw(`CREATE DATABASE "${db}"`);
    const grantUserToDb = () => knex.raw(`GRANT ALL ON DATABASE "${db}" TO ${user}`);

    return dropDb().then(createDb).then(grantUserToDb);
};
