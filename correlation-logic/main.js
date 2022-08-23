
const RAW_FACTS = [
    ['VALUE', '0', '0'],
    ['VALUE', '1', '0'],
    ['VALUE', '2', '0']
]

/*

VALUE(0, 0)
NEXT(0, 1)
VALUE(1, 0)
NEXT(1, 2)
VALUE(2, 0)




*/

/*
[0, 0]
[1, 0]
*/
const RELATIONS = [
    {
        name: 'EQ',
        test: (a, b) => a == b
    },
    {
        name: 'NOT_EQ',
        test: (a, b) => a != b
    },
    {
        name: 'NEXT',
        test: (a, b) => (parseInt(a) + 1) == parseInt(b)
    }
]


// it might be inefficient, build correlation tree on fly instead
const build_fact_relation_map = (facts, factIndex, tokenIndex, deepness) => {
    const root = {
        value: facts[factIndex][tokenIndex],
        connections: []
    }

    for (let factIdx = 0; factIdx < facts.length; factIdx++) {
        for (let factOperandIdx = 0; factOperandIdx < facts[factIdx].length; factOperandIdx++) {
            if (factIdx === factIndex && factOperandIdx === tokenIndex) {
                continue
            }
            
        }
    }
}



/*
1 EAT
2 OK
3 WORK
4 OK
5 WORK
6 OK
7 WALK
8 DECLINE
9 REST
10 OK
1
0
1
0
0
1
0
0
0
1
0
0
0
0
1
*/