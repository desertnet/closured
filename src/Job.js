"use strict"

var path = require("path")

var Job = module.exports = function () {
    this._sourceFiles = []
    this._outputFile = null
}

Job.prototype.addSourceFile = function (file) {
    this._sourceFiles.push(path.resolve(file))
}

Job.prototype.sourceFiles = function () {
    return this._sourceFiles.slice(0)
}

Job.prototype.sourceFilesArgs = function () {
    if (this.sourceFiles().length === 0) {
        throw new Error("Did not specify any source files to compile.")
    }

    var args = []
    this.sourceFiles().forEach(function (file) {
        args.push("--js", file)
    })
    return args
}

Job.prototype.setOutputFile = function (file) {
    this._outputFile = path.resolve(file)
}

Job.prototype.outputFileArgs = function () {
    if (! this._outputFile) {
        throw new Error("Did not specify an output file to compile to.")
    }

    return ["--js_output_file", this._outputFile]
}
