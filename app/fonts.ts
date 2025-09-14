import localFont from 'next/font/local'

export const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter/Inter_18pt-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-ExtraLight.ttf',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-ExtraBold.ttf',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter/Inter_18pt-Black.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
}) 