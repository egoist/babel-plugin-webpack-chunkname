const trimChunkName = baseDir => {
  return baseDir.replace(/^[./]+|(\.js$)/g, '')
}

function hasMagicComment(node) {
  const { leadingComments } = node
  return (
    leadingComments &&
    leadingComments.length > 0 &&
    leadingComments[0].value.indexOf('webpackChunkName') >= 0
  )
}

function replaceMagicComment(comments, chunkName) {
  comments[0].value = comments[0].value.replace('__CHUNK_NAME__', chunkName)
  return comments
}

function getMagicCommentChunkName(importArgNode, getChunkName) {
  const { quasis, expressions } = importArgNode

  if (!quasis) return getChunkName(importArgNode.value)

  const baseDir = quasis[0].value.cooked
  const hasExpressions = expressions.length > 0
  const chunkName = baseDir + (hasExpressions ? '[request]' : '')
  return getChunkName(chunkName)
}

module.exports = function () {
  return {
    name: 'webpack-chunkname',

    visitor: {
      CallExpression(path, { opts: { getChunkName = trimChunkName } }) {
        if (path.node.callee.type === 'Import') {
          const arg = path.get('arguments')[0]
          if (hasMagicComment(arg.node)) {
            arg.node.leadingComments = replaceMagicComment(
              arg.node.leadingComments,
              getMagicCommentChunkName(arg.node, getChunkName)
            )
          } else {
            arg.addComment(
              'leading',
              ` webpackChunkName: '${getMagicCommentChunkName(
                arg.node,
                getChunkName
              )}' `
            )
          }
        }
      }
    }
  }
}
