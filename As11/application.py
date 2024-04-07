import tkinter as tk
from py2neo import Graph
from tkinter import messagebox


# Neo4j connection
graph = Graph("bolt://localhost:7687", auth=("neo4j", "12345678"))

# Function to check if a paper cites another paper
def check_citation(paper_a_id, paper_b_id):
    # Direct citation check
    query = f"MATCH (a:Paper {{paper_id: {paper_a_id}}})-[:CITES]->(b:Paper {{paper_id: {paper_b_id}}}) RETURN b"
    result = graph.run(query).data()
    if result:
        return True

    # Indirect citation check
    query = f"MATCH (a:Paper {{paper_id: {paper_a_id}}})-[:CITES*2..]->(b:Paper {{paper_id: {paper_b_id}}}) RETURN b"
    result = graph.run(query).data()
    if result:
        return True

    return False

# Function to show the classification of a paper
def show_classification(paper_id):
    query = f"MATCH (p:Paper {{paper_id: {paper_id}}})-[:BELONGS_TO]->(c:Category) RETURN c.name"
    result = graph.run(query).data()
    print(result)  # Add this line
    if result:
        categories = [row['c.name'] for row in result]
        classification = "/".join(categories)
        tk.messagebox.showinfo("Paper Classification", f"The classification of '{paper_id}' is: {classification}")
    else:
        tk.messagebox.showwarning("Paper Classification", f"No classification found for '{paper_id}'")

# GUI
def search_paper():
    paper_id = int(entry_paper_id.get())
    query = f"MATCH (p:Paper {{paper_id: {paper_id}}}) RETURN count(p) > 0"
    result = graph.run(query).data()
    print(result)
    if result:
        tk.messagebox.showinfo("Paper Found", f"Paper ID '{paper_id}' found!")
    else:
        tk.messagebox.showwarning("Paper Not Found", f"Paper ID '{paper_id}' not found!")

def check_citation_gui():
    paper_a_id = int(entry_paper_a_id.get())
    paper_b_id = int(entry_paper_b_id.get())
    if check_citation(paper_a_id, paper_b_id):
        tk.messagebox.showinfo("Citation Check", f"N0, Paper ID '{paper_a_id}' cites Paper ID '{paper_b_id}'!")
    else:
        tk.messagebox.showinfo("Citation Check", f"Yes, Paper ID '{paper_a_id}' cites Paper ID '{paper_b_id}'!")

def show_classification_gui():
    paper_id = int(entry_classification.get())
    show_classification(paper_id)

# Main GUI window
root = tk.Tk()
root.title("Paper Search Application")

# Search paper section
label_paper_id = tk.Label(root, text="Enter paper ID:")
label_paper_id.grid(row=0, column=0)
entry_paper_id = tk.Entry(root)
entry_paper_id.grid(row=0, column=1)
btn_search = tk.Button(root, text="Search", command=search_paper)
btn_search.grid(row=0, column=2)

# Citation check section
label_paper_a_id = tk.Label(root, text="Paper A ID:")
label_paper_a_id.grid(row=1, column=0)
entry_paper_a_id = tk.Entry(root)
entry_paper_a_id.grid(row=1, column=1)
label_paper_b_id = tk.Label(root, text="Paper B ID:")
label_paper_b_id.grid(row=2, column=0)
entry_paper_b_id = tk.Entry(root)
entry_paper_b_id.grid(row=2, column=1)
btn_check_citation = tk.Button(root, text="Check Citation", command=check_citation_gui)
btn_check_citation.grid(row=2, column=2)

# Classification section
label_classification = tk.Label(root, text="Paper ID:")
label_classification.grid(row=3, column=0)
entry_classification = tk.Entry(root)
entry_classification.grid(row=3, column=1)
btn_show_classification = tk.Button(root, text="Show Classification", command=show_classification_gui)
btn_show_classification.grid(row=3, column=2)

root.mainloop()
