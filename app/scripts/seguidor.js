
var Gaug = [[0.9935, 0, 0.0296], [0.00656, 0.9935, 0.0000967], [0, 0, 0]];
var G2aug = numeric.dot(Gaug, Gaug);
var G3aug = numeric.dot(G2aug, Gaug);
var Haug = [[0], [0], [1]];
var Iaug = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
var WcaugInv = [[0, 0, 1], [50.5049, -5118.3672, 0], [-16.8292, 5151.4339, 0]];
var M = numeric.inv([[-0.0065, 0, 0.0296], [0.00656, -0.0065, 0.0000963], [0.00656, 0.9935, 0.0000963]]);

function K(polos) {
    var k = (numeric.dot([[0, 0, 1]], numeric.dot(WcaugInv, qcSeguidor(polos))));
    return numeric.dot(numeric.add(k, [[0, 0, 1]]), M);
}

function polosSeguidor(K) {
    // console.log(numeric.eig(numeric.sub(Gaug, numeric.dot(Haug, K))).lambda);
    return numeric.eig(numeric.sub(Gaug, numeric.dot(Haug, K))).lambda;
}

function qcSeguidor(polos) {
    var aAug = Number(polos.x[1]) + Number(polos.x[2]) + Number(polos.x[0]);
    var bAug = ((Number(polos.x[1]) * Number(polos.x[2]) + Number(polos.y[1]) * Number(polos.y[2]))) + ((Number(polos.x[1]) + Number(polos.x[2])) * Number(polos.x[0]));
    var cAug = (Number(polos.x[1]) * Number(polos.x[2]) + Number(polos.y[1]) * Number(polos.y[2])) * Number(polos.x[0]);
    return numeric.add(G3aug, numeric.add(numeric.mul(aAug, G2aug), numeric.add(numeric.mul(bAug, Gaug), numeric.mul(cAug, Iaug))));
}
