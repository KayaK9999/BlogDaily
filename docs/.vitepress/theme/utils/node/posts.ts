import { parse } from 'date-fns'

function markdown2raw(content: string) {
  return content.replace(/^#+\s+(.*)$/gm, '') // 去除标题
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // 去除加粗语法
    .replace(/(\*|_)(.*?)\1/g, '$2') // 去除斜体语法
    .replace(/(`)(.*?)\1/g, '$2') // 去除行内代码语法
    .replace(/~~(.*?)~~/g, '$1') // 去除删除线语法
    .replace(/!\[(.*?)\]\((.*?)\)/g, '$1') // 去除图片
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // 去除链接
    .replace(/<\/?.+?>/g, '') // 去除 HTML 标签
}

export function getFirstH1(content: string) {
  const match = content.match(/^#\s+(.*)$/m)
  return match ? markdown2raw(match[1]) : ''
}

export function getDescription(content: string, count: number) {
  const match = content.match(/# .*\n([\s\S]+?)\n/m)
  return match
    ? markdown2raw(match[1]).slice(0, count)
    : ''
}

export function parseDate(date: string | number | Date) {
  if (date instanceof Date)
    return date
  if (typeof date === 'number')
    return new Date(date)

  const supportedFormats = [
    'yyyy-M-d',
    'yyyy-MM-dd',
    'yyyy-MM-dd HH:mm',
    'yyyy-MM-dd HH:mm:ss',
    'yyyy/M/d',
    'yyyy/MM/dd',
    'yyyy/MM/dd HH:mm',
    'yyyy/MM/dd HH:mm:ss',
  ]
  for (const format of supportedFormats) {
    const parsed = parse(date, format, new Date())
    if (!Number.isNaN(parsed.getTime()))
      return parsed
  }
  return new Date()
}
