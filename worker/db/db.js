const { Pool } = require("pg");

const pool = new Pool({
  connectionString: "postgresql://mqtt_parking_postgres_user:uQ5cePqS8GdRddAwgFtpsrg8re3LrZBt@dpg-d7rn1u1j2pic73fenu0g-a.ohio-postgres.render.com/mqtt_parking_postgres?sslmode=require",
  ssl: {
    rejectUnauthorized: false
  }
});

// função padrão pra usar no projeto inteiro
module.exports = {
  query: (text, params) => pool.query(text, params)
};