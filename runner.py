rom evaluator import Evaluator

summarizer_algorithms_dict = {
    "sumbasic": SumBasicSummarizer
}

class TestRunner:
    def __init__(self, algorithm, train_dataset_size=10000):
        self.algorithm = algorithm
        self.train_dataset_size = train_dataset_size

    def setup(self, train_dataset_size):
        print("TestRunner setup() started!")

        self.data_loader = DataLoader()
        self.evaluator = Evaluator()

        if summarizer_algorithms_dict[self.algorithm] is not None:
            summarizer_class = summarizer_algorithms_dict[self.algorithm]
        else:
            summarizer_class = "sumbasic"

        self.dataset = self.data_loader.get_formatted_data("test")

        self.test_data = self.data_loader.get_formatted_data("test")
        if self.algorithm == "nb":
            self.labels = dict()
            self.train_data = self.data_loader.get_formatted_data(
                "train", train_dataset_size)
            self.validation_data = self.data_loader.get_formatted_data(
                "validation")
            self.load_labels(train_dataset_size)
            print("model training...")
            self.summarizer = summarizer_class(
                self.train_data["articles"], self.labels["train"], self.train_data["headlines"], self.validation_data["articles"], self.labels["validation"], self.validation_data["headlines"], language=self.language)
        else:
            self.summarizer = summarizer_class(self.language)
