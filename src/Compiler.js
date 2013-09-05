"use strict"

var Compiler = module.exports = function () {
    this._closureSpawner = null
}

Compiler.prototype.setClosureSpawner = function (spawner) {
    this._closureSpawner = spawner
}

Compiler.prototype.compile = function (job, cb) {
    var proc = this._closureSpawner.call(global, job.compilerArguments())
    proc.once("exit", function (codeOrSig) {
        if (codeOrSig === 0) {
            return cb(null)
        }
    }.bind(this))
}
