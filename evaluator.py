import pandas as pd
from rouge_score import rscorer, scoring

class TestEvaluator:
    def __init__(self):
        self.rscorer = rscorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'], use_stemmer=False)

    def rouge_score_single(self, reference_summary: str, produced_summary: str):
        return self.rscorer.score(reference_summary, produced_summary)

    def get_fmeasure_rouge1_score_single(self, reference_summary: str, produced_summary: str):
        scores = self.rscorer.score(reference_summary, produced_summary)
        return scores["rouge1"].fmeasure

    def add_scores(self, score_dict: dict, score_to_add: scoring.Score):
        score_dict["precision"] += score_to_add.precision
        score_dict["recall"] += score_to_add.recall
        score_dict["fmeasure"] += score_to_add.fmeasure
        return score_dict

    def pretty_print_scores(self, scores: dict[str, scoring.Score]):
        table_rows = list()
        table_index = scores.keys()
        for score in scores.values():
            new_row = [score.precision, score.recall, score.fmeasure]
            table_rows.append(new_row)

        df = pd.DataFrame(
            table_rows, columns=['precision', 'recall', 'f-measure'], index=table_index)
        print(df)