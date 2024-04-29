import random
from math import radians, cos, sin, sqrt, atan2
from faker import Faker
from py2neo import Graph, Node, Point

fake = Faker()

class TrainStation:
    def __init__(self, longitude, latitude, city):
        self.longitude = longitude
        self.latitude = latitude
        self.city = city

def calculate_distance(station1, station2):
    # approximate radius of earth in km
    R = 6373.0

    lat1 = radians(station1.latitude)
    lon1 = radians(station1.longitude)
    lat2 = radians(station2.latitude)
    lon2 = radians(station2.longitude)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    return distance

cities = [{"city": fake.city(), "longitude": random.uniform(-180, 180), "latitude": random.uniform(-90, 90)} for _ in range(100)]

stations = [TrainStation(**city) for city in cities]

graph = Graph("bolt://localhost:7687", auth=("neo4j", "12345678"))  # replace with your password

for station in stations:
    location = Point(latitude=station.latitude, longitude=station.longitude)
    node = Node("Station", location=location, city=station.city)
    graph.create(node)