import os

def load_knowledge(folder_path):
    knowledge_base = {}
    
    for filename in os.listdir(folder_path):
         if filename.endswith(".txt") or filename.endswith(".md") or filename.endswith(".docx"):
                with open(os.path.join(folder_path, filename), "r", encoding = "utf-8") as f:
                     knowledge_base[filename] = f.read()

    return knowledge_base