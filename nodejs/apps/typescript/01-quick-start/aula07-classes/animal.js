"use strict";
var Animal = (function () {
    function Animal(nome) {
        this.nome = nome;
    }
    Animal.prototype.mover = function (distanciaEmMetros) {
        //console.log(`${this.nome} moveu ${distanciaEmMetros}m.`);
        console.log(this.nome + ' moveu ' + distanciaEmMetros + 'm');
    };
    Animal.prototype.getNome = function () {
        return this.nome;
    };
    return Animal;
}());
exports.Animal = Animal;
//# sourceMappingURL=animal.js.map