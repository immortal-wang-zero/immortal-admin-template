import defaultSettings from '@/settings'

const title = defaultSettings.title || '基础后台模板'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
