/**
 * 创建page对象
 * @param {String} id
 * @param {String} code
 * @param {Object} props
 * @param {Object} style
 * @param {Object} advanced
 * @param {Array} children
 * @returns {Object}
 */
export function buildPage (id, code, props, style, advanced, children) {
  const page = {
    id: id,
    code: code,
    props: props ? { ...props } : {},
    style: style ? { ...style } : {},
    advanced: advanced ? { ...advanced } : {},
    children: children || []
  }

  return page
}
