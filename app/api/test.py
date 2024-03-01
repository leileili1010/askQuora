from sentence_transformers import SentenceTransformer, util
import torch

# Initialize the model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Example topics
topics = {
    "Technology": "The study of or technology involving the development and use of technical means and their interrelation with life, society, and the environment.",
    "Science": "The intellectual and practical activity encompassing the systematic study of the structure and behavior of the physical and natural world through observation and experiment.",
    "Health": "The state of being free from illness or injury. It encompasses a range of physical and mental conditions."
}

# Example user question
user_question = "What are the latest trends in artificial intelligence?"

# Encode the question and topics into vectors
question_embedding = model.encode(user_question)
topic_embeddings = {topic: model.encode(description) for topic, description in topics.items()}

# Calculate cosine similarities
similarities = {topic: util.pytorch_cos_sim(question_embedding, embedding)[0][0].item() for topic, embedding in topic_embeddings.items()}

# Sort topics by similarity (from most relevant to least relevant)
sorted_topics = sorted(similarities.items(), key=lambda item: item[1], reverse=True)

print("Topics ordered by relevance:")
for topic, similarity in sorted_topics:
    print(f"{topic}: {similarity}")