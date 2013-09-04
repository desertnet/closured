"use strict"

var Compiler = module.exports.Compiler = function () {
    this._closureCommandLineRunner = null
}

Compiler.prototype.setClosureCommandLineRunner = function (runner) {
    this._closureCommandLineRunner = runner
}

Compiler.prototype.compile = function (job, cb) {
    this._closureCommandLineRunner.call(global, [], cb)
}
