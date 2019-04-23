from threading import Thread
from multiprocessing import Process
from os import remove

from time import time


class IOTest:
    max_workers = 10
    max_lines = 10000000

    max_attempts = 10

    file_location = './data/db'

    worker_model = None

    def __init__(self):
        self.name = self.__class__.__name__

    def write(self, pid):
        p = self.__class__.__name__ + str(pid)
        filename = '%s/%s.txt' % (self.file_location, p)
        with open(filename, 'w') as f:
            for x in xrange(self.max_lines):
                f.write('Nothing signed "THE MGT." would ever be challenged the Midget could always pass himself off as the Management.\n')
        remove(filename)

    def run(self):
        results = []
        print 'Starting', self.name, '...'
        for attempt in xrange(self.max_attempts):
            # Create N workers
            workers = []
            for y in xrange(self.max_workers):
                workers.append(self.worker_model(target=self.write, args=(y,)))

            start_time = time()
            [t.start() for t in workers]
            [t.join() for t in workers]
            elapsed = time() - start_time
            results.append(elapsed)
            print '%s attempt %i of %i took %s seconds to write %i lines to %i files.' % (self.name, attempt+1, self.max_attempts, elapsed, self.max_lines, self.max_workers)

        print '-' * 80
        print self.name, 'results:', [round(x,2) for x in results]
        print 'avg:', sum(results) / len(results)
        print '-' * 80

        return sum(results) / len(results)


class Multithreaded(IOTest):
    worker_model = Thread


class Multiprocessed(IOTest):
    worker_model = Process

thread_avg = Multithreaded().run()
process_avg = Multiprocessed().run()

print '-' * 80
if thread_avg < process_avg:
    print 'Threading is faster.'
else:
    print 'Multiprocessing is faster.'
