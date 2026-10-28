import { useEffect, useState } from 'react'
import './pwa.css'

interface InstallPrompt extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PwaStatus() {
  const [offline, setOffline] = useState(!navigator.onLine)
  const [install, setInstall] = useState<InstallPrompt | null>(null)
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const online = () => setOffline(false)
    const offline = () => setOffline(true)
    const prompt = (event: Event) => {
      event.preventDefault()
      setInstall(event as InstallPrompt)
    }
    const installed = () => setInstall(null)
    window.addEventListener('online', online)
    window.addEventListener('offline', offline)
    window.addEventListener('beforeinstallprompt', prompt)
    window.addEventListener('appinstalled', installed)
    return () => {
      window.removeEventListener('online', online)
      window.removeEventListener('offline', offline)
      window.removeEventListener('beforeinstallprompt', prompt)
      window.removeEventListener('appinstalled', installed)
    }
  }, [])

  useEffect(() => {
    if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return
    let disposed = false
    let registration: ServiceWorkerRegistration | undefined
    const update = () => {
      if (navigator.onLine) void registration?.update().catch(console.error)
    }
    const reload = () => window.location.reload()
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, {
      scope: import.meta.env.BASE_URL, updateViaCache: 'none',
    }).then((result) => {
      if (disposed) return
      registration = result
      if (result.waiting) setWaiting(result.waiting)
      result.addEventListener('updatefound', () => {
        const worker = result.installing
        worker?.addEventListener('statechange', () => {
          if (!disposed && worker.state === 'installed' && navigator.serviceWorker.controller) setWaiting(worker)
        })
      })
    }).catch((error) => console.error('Installation hors connexion indisponible', error))
    window.addEventListener('online', update)
    window.addEventListener('focus', update)
    // Reload only after the user has explicitly accepted the new version.
    const accept = () => navigator.serviceWorker.addEventListener('controllerchange', reload, { once: true })
    window.addEventListener('proxi-accept-update', accept)
    return () => {
      disposed = true
      window.removeEventListener('online', update)
      window.removeEventListener('focus', update)
      window.removeEventListener('proxi-accept-update', accept)
      navigator.serviceWorker.removeEventListener('controllerchange', reload)
    }
  }, [])

  if (!offline && !waiting && (!install || dismissed)) return null
  return (
    <aside className="pwa-status" aria-label="Application ProxiMarché">
      <p role="status">{offline
        ? 'Vous êtes hors connexion. Les écrans restent accessibles ; les images et services en ligne peuvent être indisponibles.'
        : waiting ? 'Une nouvelle version de ProxiMarché est disponible.' : 'Gardez ProxiMarché à portée de main.'}</p>
      {!offline && waiting && <button type="button" onClick={() => {
        window.dispatchEvent(new Event('proxi-accept-update'))
        waiting.postMessage({ type: 'SKIP_WAITING' })
      }}>Mettre à jour</button>}
      {!offline && !waiting && install && <>
        <button type="button" onClick={async () => {
          try { await install.prompt(); await install.userChoice } finally { setInstall(null) }
        }}>Installer l’application</button>
        <button type="button" className="pwa-dismiss" onClick={() => setDismissed(true)}>Plus tard</button>
      </>}
    </aside>
  )
}
