import csv

with open('As11\citations.withauthors', 'r') as f, \
     open('As11\papers.csv', 'w', newline='') as papers_file, \
     open('As11\citations.csv', 'w', newline='') as citations_file:
    papers_writer = csv.writer(papers_file)
    citations_writer = csv.writer(citations_file)
    papers_writer.writerow(["paper_id", "filename", "authors"])
    citations_writer.writerow(["source", "target"])

    lines = f.readlines()
    i = 0
    while i < len(lines):
        if lines[i].strip() == "***":
            paper_id = lines[i+1].strip()
            filename = lines[i+2].strip()
            authors = []
            citations = []
            i += 3
            while i < len(lines) and lines[i].strip() != "*":
                if not lines[i].strip().startswith("Author"):
                    citations.append(lines[i].strip())
                else:
                    authors.append(lines[i].strip())
                i += 1
            papers_writer.writerow([paper_id, filename, ";".join(authors)])
            for citation in citations:
                citations_writer.writerow([paper_id, citation])
        i += 1