
var Gaug = [[0.993369, 0, 0.021148], [0.00656, 0.993369, 0.000070], [0, 0, 0]];
var G2aug = numeric.dot(Gaug, Gaug);
var G3aug = numeric.dot(G2aug, Gaug);
var Haug = [[0], [0], [1]];
var Iaug = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
var WcaugInv = numeric.inv([[0, 0.021148, numeric.dot(G2aug, Haug)[0]], [0, 0.000070, numeric.dot(G2aug, Haug)[1]], [1, 0, numeric.dot(G2aug, Haug)[2]]]);
console.log(WcaugInv);
var M = numeric.inv([[0.993369 - 1, 0, 0.021148], [0.00656, 0.993369 - 1, 0.000070], [0.00656, 0.993369, 0.000070]]);

function K(polos) {
    var k = (numeric.dot([[0, 0, 1]], numeric.dot(WcaugInv, qcSeguidor(polos))));
    return numeric.dot(numeric.add(k, [[0, 0, 1]]), M);
}

function polosSeguidor(K) {
    var Kchapeu = numeric.sub(numeric.dot(K, numeric.inv(M)), [[0,0,1]]);
    console.log(numeric.eig(numeric.sub(Gaug, numeric.dot(Haug, Kchapeu))).lambda);
    return numeric.eig(numeric.sub(Gaug, numeric.dot(Haug, Kchapeu))).lambda;
}

function qcSeguidor(polos) {
    var aAug = Number(-polos.x[0]) + Number(-polos.x[1]) + Number(-polos.x[2]);
    var bAug = ((Number(-polos.x[0]) * Number(-polos.x[1]) + Number(-polos.y[0]) * Number(-polos.y[1]))) + ((Number(-polos.x[0]) + Number(-polos.x[1])) * Number(-polos.x[2]));
    var cAug = (Number(-polos.x[0]) * Number(-polos.x[1]) + Number(-polos.y[0]) * Number(-polos.y[1])) * Number(-polos.x[2]);
    return numeric.add(G3aug, numeric.add(numeric.mul(aAug, G2aug), numeric.add(numeric.mul(bAug, Gaug), numeric.mul(cAug, Iaug))));
}
