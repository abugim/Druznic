
var G = [[0.993369, 0], [0.006609, 0.993369]];
// var G = [[0.9935, 0], [0.00656, 0.9935]];
var G2 = numeric.dot(G, G);
var I = [[1, 0], [0, 1]];
var Wo = [[0.0000, 1.0000], [0.006609, 0.993369]];
// var Wo = [[0.0000, 1.0000], [0.00656, 0.9935]];
var C = [[0, 1]];

function L(polos) {
    return (numeric.dot(numeric.dot(qcObservador(polos), numeric.inv(Wo)), numeric.transpose(C)));
}

function polosObservador(L) {
    // console.log(numeric.eig(numeric.sub(G, numeric.dot(L, C))).lambda)
    return numeric.eig(numeric.sub(G, numeric.dot(L, C))).lambda;
}

function qcObservador(polos) {
    var b = Number(-polos.x[0]) + Number(-polos.x[1]);
    var c = Number(-polos.x[0]) * Number(-polos.x[1]) + Number(-polos.y[0]) * Number(-polos.y[1]);
    return numeric.add(numeric.add(G2, numeric.mul(b,G)), numeric.mul(c, I));
}
