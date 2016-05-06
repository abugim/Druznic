
var Gaug = [[0.9935, 0, 0.0296], [0.00656, 0.9935, 0.0000967], [0, 0, 0]];
var G2aug = numeric.dot(Gaug, Gaug);
var G3aug = numeric.dot(G2aug, Gaug);
var Haug = [[0], [0], [1]];
var Iaug = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
var WcaugInv = [[0, 0, 1], [50.5049, -5118.3672, 0], [-16.8292, 5151.4339, 0]];
var M = numeric.inv([[-0.0065, 0, 0.0296], [0.00656, -0.0065, 0.0000963], [0.00656, 0.9935, 0.0000963]]);

function K(polos) {
    var k = (numeric.dot([[0, 0, 1]], numeric.dot(WcaugInv, qcSeguidor(polos))));
    return numeric.dot(numeric.add(k, [[0, 0, 1]]) , M);
}

function polosSeguidor(K) {
    console.log(numeric.eig(numeric.sub(Gaug, numeric.dot(Haug, K))).lambda);
    return numeric.eig(numeric.sub(Gaug, numeric.dot(Haug, K))).lambda;
}

function qcSeguidor(polos) {
    var a = Number(polos.x[0]) + Number(polos.x[1]) + Number(polos.x[2]);
    var b = ((Number(polos.x[0]) * Number(polos.x[1]) + Number(polos.y[0]) * Number(polos.y[1]))) + ((Number(polos.x[0]) + Number(polos.x[1])) * Number(polos.x[2]));
    var c = (Number(polos.x[0]) * Number(polos.x[1]) + Number(polos.y[0]) * Number(polos.y[1])) * Number(polos.x[2]);
    return numeric.add(G3aug, numeric.add(numeric.mul(a, G2aug), numeric.add(numeric.mul(b, Gaug), numeric.mul(c, Iaug))));
}
