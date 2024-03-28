CREATE KEYSPACE weather
   WITH replication = {'class': 'SimpleStrategy', 'replication_factor' : 2};

use weather;

INSERT INTO temperature_data (weatherstationid, timestamp, temperature) VALUES ( uuid(), toTimestamp(now()), 33.98);
INSERT INTO temperature_data (weatherstationid, timestamp, temperature) VALUES ( uuid(), toTimestamp(now()), 43.98);
INSERT INTO temperature_data (weatherstationid, timestamp, temperature) VALUES ( uuid(), toTimestamp(now()), 39.8);
INSERT INTO temperature_data (weatherstationid, timestamp, temperature) VALUES ( uuid(), toTimestamp(now()), 33,98);
INSERT INTO temperature_data (weatherstationid, timestamp, temperature) VALUES ( uuid(), toTimestamp(now()), 23.90);
INSERT INTO temperature_data (weatherstationid, timestamp, temperature) VALUES ( uuid(), toTimestamp(now()), 31.81);