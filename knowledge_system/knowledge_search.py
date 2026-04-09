def search_knowledge(query, knowledge_base):

    results = []

    for filename, content in knowledge_base.items():

        if query.lower() in content.lower():
            results.append((filename, content))

    return results