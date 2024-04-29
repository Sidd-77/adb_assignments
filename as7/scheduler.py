import schedule
import time
import mysql.connector

def job():
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

schedule.every(1).hours.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)