#ifndef RANDOM
#define RANDOM
#include <stdlib.h>
#include <time.h>

#define init_random() ({ \
    srand(time(NULL));   \
})
// #ifdef USE_PSEUDO_RANDOM
// from - inclusive, to - exclusive
#define random_int(from, to) ({ rand() % (to - from) + from; })
#define random_bit() random_int(0, 2)

#endif
