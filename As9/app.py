import tkinter as tk
from tkinter import messagebox
from pymongo import MongoClient
from tkinter import ttk


# Establish the connection to the database
client = MongoClient("mongodb://localhost:27017/")
db = client.test

# Create a collection
students = db.students

def create():
    student_id = e1.get()
    student_name = e2.get()
    email = e3.get()
    grade = e4.get()

    student = {"student_id": student_id, "student_name": student_name, "email": email, "grade": grade}

    students.insert_one(student)

    messagebox.showinfo("Information", "Record Created Successfully")



def read():
    for i in tree.get_children():
        tree.delete(i)  # Clear the treeview

    students = db.students.find()  # Get all students

    for student in students:
        tree.insert('', 'end', values=(student["student_id"], student["student_name"], student["email"], student["grade"]))

# ...


def update():
    student_id = e1.get()
    student_name = e2.get()

    students.update_one({"student_id": student_id}, {"$set": {"student_name": student_name}})

    messagebox.showinfo("Information", "Record Updated Successfully")

def delete():
    student_id = e1.get()

    students.delete_one({"student_id": student_id})

    messagebox.showinfo("Information", "Record Deleted Successfully")

root = tk.Tk()
root.title("CRUD application")
root.geometry("800x500")  # Set the window size to 500x500

tk.Label(root, text="Student ID").grid(row=0, column=0)  # Place the label at row 0, column 0
e1 = tk.Entry(root)
e1.grid(row=0, column=1)  # Place the entry at row 0, column 1

tk.Label(root, text="Student Name").grid(row=1, column=0)  # Place the label at row 1, column 0
e2 = tk.Entry(root)
e2.grid(row=1, column=1)  # Place the entry at row 1, column 1

tk.Label(root, text="Email").grid(row=2, column=0)  # Place the label at row 2, column 0
e3 = tk.Entry(root)
e3.grid(row=2, column=1)  # Place the entry at row 2, column 1

tk.Label(root, text="Grade").grid(row=3, column=0)  # Place the label at row 3, column 0
e4 = tk.Entry(root)
e4.grid(row=3, column=1)  # Place the entry at row 3, column 1

b1 = tk.Button(root, text="Create", command=create)
b1.grid(row=6, column=0)  # Place the button at row 4, column 0

b2 = tk.Button(root, text="Read", command=read)
b2.grid(row=6, column=1)  # Place the button at row 4, column 1

b3 = tk.Button(root, text="Update", command=update)
b3.grid(row=7, column=0)  # Place the button at row 5, column 0

b4 = tk.Button(root, text="Delete", command=delete)
b4.grid(row=7, column=1)  # Place the button at row 5, column 1

spacer = tk.Label(root, text="")
spacer.grid(row=8, column=0)

tree = ttk.Treeview(root, column=("column1", "column2", "column3", "column4"), show='headings')
tree.heading("#1", text="Student ID")
tree.heading("#2", text="Student Name")
tree.heading("#3", text="Email")
tree.heading("#4", text="Grade")
tree.grid(row=9, column=0, columnspan=2)

root.mainloop()