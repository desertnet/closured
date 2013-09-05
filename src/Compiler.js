"use strict"

var Compiler = module.exports = function () {
    this._closureCommandLineRunner = null
}

Compiler.prototype.setClosureCommandLineRunner = function (runner) {
    this._closureCommandLineRunner = runner
}

Compiler.prototype.compile = function (job, cb) {
    var proc = this._closureCommandLineRunner.call(global, job.compilerArguments())
    proc.once("exit", function (codeOrSig) {
        if (codeOrSig === 0) {
            return cb(null)
        }
    }.bind(this))
}
