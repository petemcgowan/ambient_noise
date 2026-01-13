import {AudioManager, Player} from 'react-native-audio-playback' // iOS Lib

class SoundManager {
  // --- iOS STATE (Preserved) ---
  private iosPlayers: Map<number | string, Player> = new Map()
  private iosLoadingPromises: Map<number | string, Promise<Player | null>> =
    new Map()

  // --- SHARED STATE ---
  private activeSoundId: number | string | null = null

  public async preloadSounds(sounds: any[]) {
    // ===========================
    // iOS PATH (Parallel Preload - Preserved)
    // ===========================
    console.log(`[SoundManager-iOS] 🚀 Starting Parallel Preload...`)
    const startTime = performance.now()

    try {
      await AudioManager.shared.setupAudioStream({
        sampleRate: 44100,
        channelCount: 2,
      })
      await AudioManager.shared.openAudioStream()
    } catch (e) {}

    const criticalBatch = sounds.slice(0, 4)
    const backgroundBatch = sounds.slice(4)

    await Promise.all(criticalBatch.map(sound => this.loadIosSound(sound)))

    Promise.all(backgroundBatch.map(sound => this.loadIosSound(sound))).then(
      () => {
        const totalTime = (performance.now() - startTime).toFixed(0)
        console.log(
          `[SoundManager-iOS] 🏁 Full Preload Complete in ${totalTime}ms`,
        )
      },
    )
  }

  // --- iOS INTERNAL LOADER (Preserved) ---
  private async loadIosSound(sound: any): Promise<Player | null> {
    const sourceKey = sound.audioFile || sound.remoteAudioUrl
    if (!sourceKey) return null

    if (this.iosPlayers.has(sourceKey)) return this.iosPlayers.get(sourceKey)!
    if (this.iosLoadingPromises.has(sourceKey))
      return this.iosLoadingPromises.get(sourceKey)!

    const loadPromise = (async () => {
      try {
        const player = await AudioManager.shared.loadSound(sourceKey)
        if (player) {
          player.loopSound(true)
          player.setVolume(sound.volume || 1.0)
          this.iosPlayers.set(sourceKey, player)
          return player
        }
      } catch (e) {
        console.error(`[iOS] Failed to load ${sound.id}`, e)
      }
      return null
    })()

    this.iosLoadingPromises.set(sourceKey, loadPromise)
    return loadPromise
  }

  // --- THE PLAY METHOD ---
  public async play(sound: any, volume: number = 1.0) {
    const sourceKey = sound.audioFile || sound.remoteAudioUrl
    if (!sourceKey) return

    this.activeSoundId = sourceKey

    // ===========================
    // iOS PATH (Library - Preserved)
    // ===========================
    let player = this.iosPlayers.get(sourceKey)

    if (!player) {
      player = (await this.loadIosSound(sound)) || undefined
    }

    if (this.activeSoundId !== sourceKey) return

    if (player) {
      this.iosPlayers.forEach((p, k) => {
        if (k !== sourceKey) p.pauseSound()
      })

      player.setVolume(volume)
      player.playSound()
    }
  }

  public pause(requestingSound?: any) {
    const requestingId = requestingSound
      ? requestingSound.audioFile || requestingSound.remoteAudioUrl
      : null

    // Safety check: Don't stop music if the request comes from an old slide
    if (requestingId && requestingId !== this.activeSoundId) return

    if (this.activeSoundId && this.iosPlayers.has(this.activeSoundId)) {
      this.iosPlayers.get(this.activeSoundId)?.pauseSound()
    }
  }
}

export const soundManager = new SoundManager()
