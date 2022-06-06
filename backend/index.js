let solver = require("./node_modules/javascript-lp-solver")
const express = require('express')
const cors = require('cors');
const app = express();

let corsOptions = {
    orgim: '/',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json())
const port = 50040

app.get('/solver/:id', (req, res) => {
    let conta = req.params.id
    conta = JSON.parse(conta)
    let answerNoFiltred = resolve(conta)
    let answerFiltred = filtred(answerNoFiltred)
    let answer = addTotal(answerFiltred, conta)
    res.send(answer)

})



app.listen(port, () => console.log(`http://localhost:${port}`))

function resolve(conta) {
    model = {
        "optimize": "profit",
        "opType": "max",
        "constraints": {
            "hours": { "max": conta.total_hours },
            "wood": { "max": conta.total_wood }

        },
        "variables": {
            "x1": { "profit": conta.profit_cadeira, "x1": 1, "wood": conta.cost_cadeira, "hours": conta.hours_cadeira },
            "x2": { "profit": conta.profit_mesa, "x2": 1, "wood": conta.cost_mesa, "hours": conta.hours_mesa },
            "x3": { "profit": conta.profit_armario, "x3": 1, "wood": conta.cost_armario, "hours": conta.hours_armario },
            "x4": { "profit": conta.profit_cama, "x4": 1, "wood": conta.cost_cama, "hours": conta.hours_cama }

        },
        "ints": { "x1": 1, "x2": 1, "x3": 1, "x4": 1 }
    }
    let solved = solver.Solve(model);
    solved = Object.entries(solved)
    let result = {}

    let filterResult = e => e[0].startsWith('x') || e[0].includes("result")

    let resultArray = solved.filter(filterResult)
    for (let i of resultArray) {
        Object.defineProperty(result, i[0], {
            writable: true,
            configurable: true,
            enumerable: true,
            value: i[1]
        })
    }
    return result
}

function filtred(awnser) {
    if (!('x1' in awnser)) awnser.x1 = 0
    if (!('x2' in awnser)) awnser.x2 = 0
    if (!('x3' in awnser)) awnser.x3 = 0
    if (!('x4' in awnser)) awnser.x4 = 0

    return awnser
}

function addTotal(answer, conta) {
    answer.total_hours = conta.hours_cadeira * answer.x1 + conta.hours_mesa * answer.x2 + conta.hours_armario * answer.x3 + conta.hours_cama * answer.x4
    answer.total_hours = answer.total_hours.toFixed(2)
    answer.total_wood = (conta.cost_cadeira * answer.x1 + conta.cost_mesa * answer.x2 + conta.cost_armario * answer.x3 + conta.cost_cama * answer.x4).toFixed(2)
    return answer
}