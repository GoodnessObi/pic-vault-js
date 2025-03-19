const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

interface NetworkInformation extends EventTarget {
  readonly effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
  readonly downlink: number
  readonly rtt: number
  readonly saveData: boolean
  onchange: ((this: NetworkInformation, ev: Event) => any) | null
}

interface NavigatorWithConnection extends Navigator {
  connection?: NetworkInformation
}

const testNetworkSpeed = async (): Promise<number> => {
  const navigatorWithConnection = navigator as NavigatorWithConnection

  if (navigatorWithConnection.connection) {
    const { effectiveType, downlink } = navigatorWithConnection.connection

    if (downlink !== undefined && downlink > 0) {
      return downlink
    }

    if (effectiveType) {
      console.log(`Using effectiveType: ${effectiveType}`)
      switch (effectiveType) {
        case 'slow-2g':
          return 0.5
        case '2g':
          return 1
        case '3g':
          return 2
        case '4g':
          return 5
        default:
          return 1
      }
    }
  }

  // Fallback: Fetch a small test image to estimate speed
  const testImage = `https://api.unsplash.com/photos/random?query=nature&client_id=${apiKey}`
  const startTime = performance.now()

  try {
    const response = await fetch(testImage, { method: 'GET', cache: 'no-cache' })
    const blob = await response.blob()
    const sizeInBits = blob.size * 8
    const durationInSeconds = performance.now() - startTime
    const speedMbps = sizeInBits / durationInSeconds / 1_000_000

    return speedMbps
  } catch (error) {
    console.error('Network test failed:', error)
    return 1
  }
}

let cachedNetworkSpeed: number | null = null
let lastTestTime: number = 0

export const getNetworkSpeed = async (): Promise<number> => {
  const now = Date.now()
  if (cachedNetworkSpeed && now - lastTestTime < 5 * 60 * 1000) {
    return cachedNetworkSpeed
  }

  cachedNetworkSpeed = await testNetworkSpeed()
  lastTestTime = now
  return cachedNetworkSpeed
}
