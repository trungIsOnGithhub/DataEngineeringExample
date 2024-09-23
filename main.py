from runner import TestRunner
from evaluator import TestEvaluator
from data_loader import DataLoader

def main(language, algorithm):

    start_time = time.time()

    test_run = TestRunner(language, algorithm)
    test_run.run()

    print("Execution Time: %s secs" % (time.time() - start_time))


if __name__ == "__main__":
    try:
        opts, args = getopt.getopt(sys.argv[1:], "l:a:")
    except getopt.GetoptError:
        print('main.py -a <algorithm>')
        sys.exit(2)

    supported_languages = list(language_dict.keys())
    supported_algorithms = list(summarizer_dict.keys())
    language = supported_languages[0]
    algorithm = supported_algorithms[0]

    for opt, arg in opts:
        if opt == '-l':
            if arg in supported_languages:
                language = arg
            else:
                print('language not supported - supported languages are ',
                      supported_languages)
                sys.exit(2)
        elif opt == '-a':
            if arg in supported_algorithms:
                algorithm = arg
            else:
                print('algorithm not supported - supported algorithms are ',
                      supported_algorithms)
                sys.exit(2)