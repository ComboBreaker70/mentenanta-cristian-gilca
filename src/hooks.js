import { useEffect, useState } from 'react'

/** `true` după ce pagina a fost derulată — folosit pentru fundalul header-ului. */
export function useScrolled(offset = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > offset)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [offset])

  return scrolled
}

/** Blochează scroll-ul pe fundal cât timp meniul mobil e deschis. */
export function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}

const SITE_NAME = 'Cristian Gilca'

/**
 * Titlul și descrierea paginii curente.
 *
 * Într-un SPA, `document.title` nu se schimbă singur la navigare — fără asta,
 * toate paginile ar apărea în istoric și în taburi cu același nume.
 */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE_NAME}` : SITE_NAME

    if (!description) return
    const tag = document.querySelector('meta[name="description"]')
    const previous = tag?.getAttribute('content')
    tag?.setAttribute('content', description)

    return () => {
      if (previous) tag?.setAttribute('content', previous)
    }
  }, [title, description])
}
