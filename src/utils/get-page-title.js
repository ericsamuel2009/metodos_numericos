import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Metodos Numerico'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
