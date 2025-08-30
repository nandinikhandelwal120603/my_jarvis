export interface Playlist {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  duration: number; // in seconds
  imageUrl?: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  imageUrl?: string;
}

export interface PlaybackState {
  isPlaying: boolean;
  currentTrack: Track | null;
  position: number; // in seconds
  volume: number; // 0-1
  playlist: Playlist | null;
}

export class MockMusicAPI {
  private static playlists: Playlist[] = [
    {
      id: '1',
      name: 'Deep Focus - Ambient Mix',
      description: 'Atmospheric sounds for deep concentration',
      trackCount: 25,
      duration: 4500,
      tracks: [
        {
          id: 't1',
          title: 'Weightless',
          artist: 'Marconi Union',
          album: 'Ambient Sounds',
          duration: 480
        },
        {
          id: 't2',
          title: 'Deep Ocean',
          artist: 'Nature Sounds',
          album: 'Oceanic',
          duration: 600
        }
      ]
    },
    {
      id: '2',
      name: 'Coding Flow - Electronic',
      description: 'Upbeat electronic music for coding sessions',
      trackCount: 18,
      duration: 3600,
      tracks: [
        {
          id: 't3',
          title: 'Codebreaker',
          artist: 'Synthwave Productions',
          album: 'Digital Dreams',
          duration: 320
        },
        {
          id: 't4',
          title: 'Binary Sunset',
          artist: 'Cyber Collective',
          album: 'Future Pulse',
          duration: 280
        }
      ]
    },
    {
      id: '3',
      name: 'Productivity Boost - Lo-fi',
      description: 'Chill lo-fi beats to boost your productivity',
      trackCount: 30,
      duration: 5400,
      tracks: [
        {
          id: 't5',
          title: 'Coffee Shop Vibes',
          artist: 'Lo-Fi Collective',
          album: 'Study Beats',
          duration: 240
        },
        {
          id: 't6',
          title: 'Rainy Day Focus',
          artist: 'Chill Beats',
          album: 'Ambient Study',
          duration: 300
        }
      ]
    },
    {
      id: '4',
      name: 'Creative Session - Instrumental',
      description: 'Inspiring instrumental music for creative work',
      trackCount: 22,
      duration: 4200,
      tracks: [
        {
          id: 't7',
          title: 'Innovation',
          artist: 'Orchestral Inspiration',
          album: 'Creative Minds',
          duration: 360
        },
        {
          id: 't8',
          title: 'Breakthrough',
          artist: 'Epic Score',
          album: 'Achievement',
          duration: 420
        }
      ]
    }
  ];

  private static playbackState: PlaybackState = {
    isPlaying: false,
    currentTrack: null,
    position: 0,
    volume: 0.7,
    playlist: null
  };

  static async getPlaylists(): Promise<Playlist[]> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return [...this.playlists];
  }

  static async getPlaylist(id: string): Promise<Playlist | null> {
    await new Promise(resolve => setTimeout(resolve, 150));
    return this.playlists.find(playlist => playlist.id === id) || null;
  }

  static async playPlaylist(playlistId: string): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const playlist = this.playlists.find(p => p.id === playlistId);
    if (!playlist) throw new Error('Playlist not found');

    this.playbackState = {
      isPlaying: true,
      currentTrack: playlist.tracks[0],
      position: 0,
      volume: this.playbackState.volume,
      playlist
    };

    return { ...this.playbackState };
  }

  static async playTrack(trackId: string): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    let track: Track | null = null;
    let playlist: Playlist | null = null;

    for (const pl of this.playlists) {
      const foundTrack = pl.tracks.find(t => t.id === trackId);
      if (foundTrack) {
        track = foundTrack;
        playlist = pl;
        break;
      }
    }

    if (!track) throw new Error('Track not found');

    this.playbackState = {
      isPlaying: true,
      currentTrack: track,
      position: 0,
      volume: this.playbackState.volume,
      playlist
    };

    return { ...this.playbackState };
  }

  static async pause(): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.playbackState.isPlaying = false;
    return { ...this.playbackState };
  }

  static async resume(): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.playbackState.isPlaying = true;
    return { ...this.playbackState };
  }

  static async stop(): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.playbackState = {
      isPlaying: false,
      currentTrack: null,
      position: 0,
      volume: this.playbackState.volume,
      playlist: null
    };

    return { ...this.playbackState };
  }

  static async setVolume(volume: number): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    this.playbackState.volume = Math.max(0, Math.min(1, volume));
    return { ...this.playbackState };
  }

  static async getPlaybackState(): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { ...this.playbackState };
  }

  static async nextTrack(): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    if (!this.playbackState.playlist || !this.playbackState.currentTrack) {
      return { ...this.playbackState };
    }

    const currentIndex = this.playbackState.playlist.tracks.findIndex(
      track => track.id === this.playbackState.currentTrack!.id
    );

    const nextIndex = (currentIndex + 1) % this.playbackState.playlist.tracks.length;
    
    this.playbackState.currentTrack = this.playbackState.playlist.tracks[nextIndex];
    this.playbackState.position = 0;

    return { ...this.playbackState };
  }

  static async previousTrack(): Promise<PlaybackState> {
    await new Promise(resolve => setTimeout(resolve, 150));
    
    if (!this.playbackState.playlist || !this.playbackState.currentTrack) {
      return { ...this.playbackState };
    }

    const currentIndex = this.playbackState.playlist.tracks.findIndex(
      track => track.id === this.playbackState.currentTrack!.id
    );

    const prevIndex = currentIndex === 0 
      ? this.playbackState.playlist.tracks.length - 1 
      : currentIndex - 1;
    
    this.playbackState.currentTrack = this.playbackState.playlist.tracks[prevIndex];
    this.playbackState.position = 0;

    return { ...this.playbackState };
  }
}