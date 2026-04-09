from knowledge_system.knowledge_loader import*
from knowledge_system.knowledge_search import*

# LOAD PHIL KNOWLEDGE
philosophy_knowledge = load_knowledge("knowledge/philosophy")
print("Loaded files:", philosophy_knowledge.keys())


def handle_philosophy(user_input):

    # STEP 1 --> SEARCH MY KNOWLEDGE
    results = search_knowledge(user_input, philosophy_knowledge)

    if results:
        response = "Here is what I found in your philosophy notes:\n"
        for path, content in results:
            response += f"\n---{path} ---\n{content}\n"
        return response
    
    return "No relevant philosophy information found."
    

