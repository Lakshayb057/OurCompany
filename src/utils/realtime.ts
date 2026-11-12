import { io, Socket } from 'socket.io-client';

type SyncCallback = (event: { type: string; action: string; data?: any; timestamp?: number }) => void;

class RealtimeSyncManager {
  private socket: Socket | null = null;
  private broadcastChannel: BroadcastChannel | null = null;
  private listeners: Set<SyncCallback> = new Set();
  private lastTimestamp: number = Date.now();
  private pollInterval: any = null;

  constructor() {
    this.initBroadcastChannel();
    this.initSocket();
    this.initFocusAndVisibilityListeners();
    this.startPolling();
  }

  // 1. Cross-tab instantaneous BroadcastChannel
  private initBroadcastChannel() {
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        this.broadcastChannel = new BroadcastChannel('codeverse_realtime_sync');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data && event.data.type) {
            this.notifyListeners(event.data);
          }
        };
      }
    } catch (e) {
      console.warn('[Realtime] BroadcastChannel init note:', e);
    }
  }

  // 2. Socket.io WebSockets connection
  private initSocket() {
    try {
      if (typeof window === 'undefined') return;

      // Connect to the appropriate server URL
      const socketUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : window.location.origin;

      this.socket = io(socketUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
        timeout: 10000,
      });

      this.socket.on('codeverse:sync', (data) => {
        if (data?.timestamp) {
          this.lastTimestamp = data.timestamp;
        }
        this.notifyListeners(data);
      });

      this.socket.on('connect', () => {
        console.log('[Realtime] Socket connected to CodeVerse server:', this.socket?.id);
      });
    } catch (e) {
      console.warn('[Realtime] Socket connection initialized with polling fallback');
    }
  }

  // 3. Tab focus & visibility change trigger
  private initFocusAndVisibilityListeners() {
    if (typeof window === 'undefined') return;

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        this.checkSyncStatus();
      }
    };

    window.addEventListener('focus', onVisible);
    document.addEventListener('visibilitychange', onVisible);
  }

  // 4. Polling loop (ensures serverless deployments on Vercel stay synchronized)
  private startPolling() {
    if (typeof window === 'undefined') return;

    this.pollInterval = setInterval(() => {
      this.checkSyncStatus();
    }, 4000);
  }

  public async checkSyncStatus() {
    try {
      const res = await fetch('/api/v1/sync/status', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.timestamp && json.timestamp > this.lastTimestamp) {
          this.lastTimestamp = json.timestamp;
          this.notifyListeners({ type: 'all', action: 'sync', timestamp: json.timestamp });
        }
      }
    } catch {
      // Ignore background transient network noise
    }
  }

  // Broadcast local change to all other tabs and local listeners
  public broadcastChange(type: string, action: string, data?: any) {
    const payload = { type, action, data, timestamp: Date.now() };
    this.lastTimestamp = payload.timestamp;

    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(payload);
      } catch (e) {}
    }

    if (this.socket && this.socket.connected) {
      try {
        this.socket.emit('codeverse:client_change', payload);
      } catch (e) {}
    }

    this.notifyListeners(payload);
  }

  // Subscribe to real-time events
  public subscribe(cb: SyncCallback): () => void {
    this.listeners.add(cb);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private notifyListeners(event: { type: string; action: string; data?: any; timestamp?: number }) {
    this.listeners.forEach((listener) => {
      try {
        listener(event);
      } catch (e) {
        console.warn('Listener error in realtime manager:', e);
      }
    });
  }

  public destroy() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    if (this.broadcastChannel) this.broadcastChannel.close();
    if (this.socket) this.socket.disconnect();
    this.listeners.clear();
  }
}

export const realtimeSync = new RealtimeSyncManager();
