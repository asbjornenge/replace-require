import assert from 'assert'
import fs     from 'fs'
import path   from 'path'
import rr     from '../index'

let src = fs.readFileSync(path.resolve(__dirname, './app/app.js'),'utf-8')

it('replaces the entire require statement', () => {
    let __src = rr(src, (target) => {
        if (target.indexOf('.png') >= 0) return "require('yolo')"
    })
    assert(__src.indexOf("var image = require('yolo')") >= 0)
})

it('can replace a require statement with anything', () => {
    let __src = rr(src, (target) => {
        if (target.indexOf('.png') >= 0)  return "\"base64\""
        if (target.indexOf('.styl') >= 0) return "\"body { color : red; }\""
    })
    assert(__src.indexOf("var image = \"base64\"") >= 0)
    assert(__src.indexOf("var style = \"body { color : red; }\"") >= 0)
})

it('works with the readme example', () => {
    let __src = rr("require('foo');require('bar')", (target) => {
        if (target.indexOf('foo') >= 0) return "require('baz')"
    })
    assert(__src == "require('baz');require('bar')")
})
