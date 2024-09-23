import nltk
from dataset import load_dataset

class DataLoader():
    def __init__(self, language="de"):
        self.dataset = load_dataset("cnn_dailymail", "3.0.0")

    def split_sentences(self, text : str):
        return nltk.tokenize.sent_tokenize(text)

    def get_formatted_data(self, type : str, train_set_size=None):
        data = self.dataset[type]

        articles = [ self.split_sentences(article["article"]) for article in data ]
        summaries = [ self.split_sentences(article["highlights"]) for article in data]

        if train_set_size:
            return {
                "articles": articles[:train_set_size], "summaries": summaries[:train_set_size], "headlines": None
            }
        else:
            return {
                "articles": articles, "summaries": summaries, "headlines": None
            }

# class CNNCorpusLoader(DataLoader):
#     def __init__(self):
        