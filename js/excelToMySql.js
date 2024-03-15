const XLSX = require('xlsx');
const mysql = require('mysql2');

const dbConfig = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'command',
    authPlugins: {
        mysql_clear_password: () => () => Buffer.from('password').toString('binary'),
    },
};

const connection = mysql.createConnection(dbConfig);

// Charger le fichier Excel
const workbook = XLSX.readFile('C:/Users/ORUGBY44/Desktop/TABLEAU EXPE FENOUILLET.xlsx');
const sheetName = 'CARTONS ENVOYES';
const worksheet = workbook.Sheets[sheetName];

// Conversion du fichier Excel en tableau d'objets
const data = XLSX.utils.sheet_to_json(worksheet);

data.forEach(row => {
    const sql = `
        INSERT IGNORE INTO expe_fenouillet (date, devis, pack, palette)
        VALUES (?, ?, ?, ?);
    `;

    const values = [row.date, row.devis, row.pack, row.palette];
    console.log(values);

    connection.query(sql, values, (error, results, fields) => {
        if (error) throw error;
        console.log(`Ligne insérée avec succès: ${results.insertId}`);
    });
});

connection.end();
