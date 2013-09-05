"use strict"

var path = require("path")
  , spawn = require("child_process").spawn

var Compiler = module.exports = function () {
    this._closureSpawner = _basicClosureSpawner
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

    proc.once("error", function (err) {
        return cb(err)
    }.bind(this))
}

function _basicClosureSpawner (args) {
    var jarfile = path.resolve(__dirname + "/../support/compiler.jar")
    var javaArgs = ["-jar", jarfile].concat(args)
    return spawn("java", javaArgs)
}
