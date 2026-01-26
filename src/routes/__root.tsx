import {
  Link,
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { SmoothScroll } from '../components/layout/SmoothScroll'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/sections/Footer'
import { ThemeProvider } from '../components/theme-provider'
import { CustomScrollbar } from '../components/ui/CustomScrollbar'
import { LoadingScreen } from '../components/ui/LoadingScreen'
import i18n from '../i18n'
import { useTranslation } from 'react-i18next'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=5',
      },
      {
        title: i18n.t('seo.title'),
      },
      {
        name: 'description',
        content: i18n.t('seo.description'),
      },
      {
        name: 'keywords',
        content: i18n.t('seo.keywords'),
      },
      // Open Graph / Facebook
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:title',
        content: i18n.t('seo.title'),
      },
      {
        property: 'og:description',
        content: i18n.t('seo.description'),
      },
      {
        property: 'og:image',
        content: '/og-image.jpg',
      },
      // Twitter
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      {
        name: 'twitter:title',
        content: i18n.t('seo.title'),
      },
      {
        name: 'twitter:description',
        content: i18n.t('seo.description'),
      },
      {
        name: 'twitter:image',
        content: '/og-image.jpg',
      },
      // Theme Color
      {
        name: 'theme-color',
        content: '#000000',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/favicon.svg',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'manifest',
        href: '/manifest.json',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous', // vital for fonts
      },
    ],
  }),

  component: RootDocument,
  notFoundComponent: NotFound,
})

import { LoadingProvider } from '../context/LoadingContext'

// ... existing imports

function RootDocument() {
  const { i18n } = useTranslation()
  return (
    <html lang={i18n.language}>
      <head>
        <HeadContent />
      </head>
      <body>
        <LoadingProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <LoadingScreen />
            <SmoothScroll>
              <CustomScrollbar />
              <Header />
              <main className="relative min-h-screen">
                <Outlet />
              </main>
              <Footer />
            </SmoothScroll>
            <TanStackDevtools
              config={{
                position: 'bottom-right',
              }}
              plugins={[
                {
                  name: 'Tanstack Router',
                  render: <TanStackRouterDevtoolsPanel />,
                },
              ]}
            />
          </ThemeProvider>
        </LoadingProvider>
        <Scripts />
      </body>
    </html>
  )
}
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-display text-primary mb-4">404</h1>
      <p className="text-body text-muted-foreground mb-8">
        The page you are looking for has been moved or does not exist.
      </p>
      <Link
        to="/"
        className="px-8 py-3 bg-foreground text-background rounded-full font-medium hover:scale-105 transition-transform"
      >
        Go Back Home
      </Link>
    </div>
  )
}
