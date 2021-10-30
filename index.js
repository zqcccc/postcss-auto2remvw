const { isRegExp, toFixed } = require("./util")

const defaultConfig = {
  baseSize: { rem: 750, vw: 7.5 },
  precision: 6,
  forceRemProps: ["font", "font-size"],
  keepRuleComment: "no-RemVw-next-line",
  keepFileComment: "auto2remvw-disable",
}
const pxGlobalRegExp = /\b(\d+(\.\d+)?)px\b/g

let cacheGlobalConfig
/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (options = {}) => {
  let config = Object.assign({}, defaultConfig, options)

  cacheGlobalConfig = config

  let isExcludeFile = false

  const getCalcValue = (targetUnit, sourceValue) => {
    const baseSize = config.baseSize[targetUnit]
    // if (!baseSize) return sourceValue

    return sourceValue.replace(pxGlobalRegExp, ($0, $1) => {
      return `${toFixed($1 / baseSize, config.precision)}${targetUnit}`
    })
  }
  return {
    postcssPlugin: "postcss-auto2remvw",

    Once(root, { result }) {
      const filePath = root.source.input.file
      if (!config.baseSize) {
        result.warn("baseSize should be set")
        return
      }
      if (config.exclude) {
        if (!isRegExp(config.exclude)) {
          result.warn("exclude should be RegExp")
          return
        }
        if (filePath.match(config.exclude) !== null) {
          isExcludeFile = true
        }
      }
      if (Array.isArray(config.customConfigs)) {
        config.customConfigs.forEach((schema) => {
          if (!isRegExp(schema.reg)) {
            result.warn("custom config's reg should be a RegExp")
            return
          }
          if (schema.reg.test(filePath)) {
            config = Object.assign({}, config, schema.config)
          }
        })
      }
    },

    Declaration(decl) {
      if (isExcludeFile || !config.baseSize) return
      const pre = decl.prev()
      if (
        pre &&
        pre.type === "comment" &&
        pre.text.trim() === config.keepRuleComment
      ) {
        return
      }
      const px = decl.value
      const rem = getCalcValue("rem", px)
      if (px === rem) return
      if (config.forceRemProps.indexOf(decl.prop) > -1) {
        decl.value = rem
        return
      }
      decl.value = getCalcValue("vw", px)
      decl.cloneBefore({
        prop: decl.prop,
        value: rem,
      })
    },

    Comment(comment) {
      if (comment.text.trim() === config.keepFileComment) {
        isExcludeFile = true
      }
    },
    OnceExit() {
      config = cacheGlobalConfig
    },
  }
}

module.exports.postcss = true
