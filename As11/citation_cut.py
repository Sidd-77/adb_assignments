import csv

with open('As11\citations.csv', 'r') as input_file, open('As11\citations_subset.csv', 'w', newline='') as output_file:
    reader = csv.reader(input_file)
    writer = csv.writer(output_file)
    for i, row in enumerate(reader):
        if i == 10000:
            break
        writer.writerow(row)