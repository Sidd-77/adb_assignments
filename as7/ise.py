import mysql
config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'database': 'as7'
}
cnx = mysql.connector.connect(**config)
backup = mysql.connector.backup.Backup(cnx)
backup_filename = 'backup.sql'
backup.to_file(backup_filename)
cnx.close()
