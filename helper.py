from nltk import word_tokenize, sent_tokenize
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
import spacy

class Helper():
    def __init__(self):
        # note: download all modules before --> e.g. python -m spacy download fr_core_news_sm
        self.spacy_module_dict = {
            "en": "en_core_web_sm"
        }

        spacy_module = self.spacy_module_dict["en"]
        self.nlp = spacy.load(spacy_module, disable=['parser', 'ner'])
        self.stemmer = SnowballStemmer()

    def tokenize_words(self, sent: str):
        return word_tokenize(sent, language=self.language)

    def tokenize_sents(self, text: str):
        return sent_tokenize(text, language=self.language)

    def get_stopwords(self):
        return stopwords.words(self.language)

    def lemmatize(self, sent):
        if self.nlp is None:
            return self.tokenize_words(sent)
        sent = self.nlp(sent)
        return [word.lemma_.strip() for word in sent]

    def stem(self, word):
        if self.stemmer is None:
            return word
        return self.stemmer.stem(word)