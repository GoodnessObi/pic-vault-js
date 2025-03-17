const apiKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

export const testNetworkSpeed = async (): Promise<number> => {
  const testImage = `https://api.unsplash.com/photos/random?query=nature&client_id=${apiKey}`
  const startTime = performance.now()

  try {
    await fetch(testImage, { method: 'GET', cache: 'no-cache' })
  } catch (error) {
    console.error('Network test failed:', error)
    return 0 // Assume very slow network
  }

  const duration = performance.now() - startTime
  const speedMbps = (100 * 8) / (duration / 1000) / 1_000 // Convert to Mbps

  console.log(`Measured speed: ${speedMbps.toFixed(2)} Mbps`)
  return speedMbps
}
