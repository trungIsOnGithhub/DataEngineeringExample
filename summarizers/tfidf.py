from sklearn.feature_extraction.text import TfidfVectorizer
from basic_summarizer import BasicSummarizer
import math

class ManualTfidfSummarizer(TemplateSummarizer):
    def __init__(self):
        super().__init__()

        self.num_documents_per_word = {}

    def create_tf_idf_matrix(self, tokenized_sentences: list[list[str]]):
        if (len(self.num_documents_per_word) == 0 and  len(tokenized_sentences[0]) > 0):
            count_documents_per_word(tokenized_sentences)

        num_documents = len(tokenized_sentences)
        tf_idf_matrix = list()

        for sentence in tokenized_sentences
            sentence_word_set = set(sentence)
            tf_idf_table = {}

            for word in sentence:
                if word not in tf_idf_table:
                    word_frequency_in_sentence = sentence.count(word)

                    term_frequency = word_frequency_in_sentence / len(sentence_word_set)

                    inverse_doc_frequency = math.log10(
                        num_documents / float(self.num_documents_per_word[word])
                    )

                    tf_idf = float(term_frequency) * inverse_doc_frequency
                    tf_idf_table[word] = tf_idf

            tf_idf_matrix.append(tf_idf_table)
        return tf_idf_matrix

    def count_documents_per_word(self, tokenized_sentences: list[list[str]]):
        self.num_documents_per_word = {}

        for sentence in tokenized_sentences:
            for word in set(sentence):
                if word in documents_per_word_dict:
                    self.num_documents_per_word[word] += 1
                else:
                    self.num_documents_per_word[word] = 1

        return self.num_documents_per_words