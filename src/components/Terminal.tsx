import { useEffect, useRef, useState } from 'react'

const ASCII_ART = `
╔═══════════════════════════════════════╗
║     ████████╗███████╗██████╗ ███╗   ███╗
║     ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
║        ██║   █████╗  ██████╔╝██╔████╔██║
║        ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
║        ██║   ███████╗██║  ██║██║ ╚═╝ ██║
║        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
╚═══════════════════════════════════════╝
`

const LOG_MESSAGES = [
  '[INFO] System initialized successfully',
  '[INFO] Loading modules...',
  '[OK] Module core loaded',
  '[OK] Module ui loaded',
  '[OK] Module network loaded',
  '[INFO] Connecting to server...',
  '[OK] Connection established',
  '[INFO] Fetching data...',
  '[OK] Data received (2.4KB)',
  '[INFO] Processing...',
  '[OK] Processing complete',
  '[INFO] Ready for commands',
  '[WARN] High memory usage detected',
  '[INFO] Running garbage collection...',
  '[OK] Memory optimized',
  '[INFO] Waiting for input...',
  '[INFO] Background sync started',
  '[OK] Sync completed',
  '[INFO] Listening on port 8080...',
  '[OK] Server ready',
]

export function Terminal() {
  const [logs, setLogs] = useState<string[]>([
    '[INFO] Terminal widget initialized',
    '[INFO] Starting up...',
  ])
  const logsEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let messageIndex = 0
    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = LOG_MESSAGES[messageIndex % LOG_MESSAGES.length]
        const timestamp = new Date().toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
        const newLogs = [...prev, `[${timestamp}] ${nextLog}`]
        // Keep only last 50 logs to prevent memory issues
        if (newLogs.length > 50) {
          return newLogs.slice(newLogs.length - 50)
        }
        return newLogs
      })
      messageIndex++
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    // Auto-scroll to bottom when new logs are added
    if (logsEndRef.current && typeof logsEndRef.current.scrollIntoView === 'function') {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [logs])

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-gray-900 font-mono text-sm"
      data-testid="terminal-widget"
    >
      {/* Terminal Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <span className="ml-4 text-gray-400 text-xs">terminal — bash — 80x24</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 bg-gray-900 min-h-[400px] max-h-[600px] overflow-y-auto">
        {/* ASCII Art */}
        <pre
          className="text-green-400 text-xs leading-tight mb-6 whitespace-pre overflow-x-auto"
          data-testid="terminal-ascii-art"
        >
          {ASCII_ART}
        </pre>

        {/* Logs */}
        <div className="space-y-1" data-testid="terminal-logs">
          {logs.map((log, index) => (
            <div
              key={`${index}-${log}`}
              className={`${
                log.includes('[ERROR]')
                  ? 'text-red-400'
                  : log.includes('[WARN]')
                    ? 'text-yellow-400'
                    : log.includes('[OK]')
                      ? 'text-green-400'
                      : 'text-gray-300'
              }`}
            >
              <span className="text-gray-500">$ </span>
              {log}
            </div>
          ))}
          <div ref={logsEndRef} />
        </div>

        {/* Cursor */}
        <div className="mt-2 flex items-center gap-2 text-green-400">
          <span className="text-gray-500">$</span>
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" data-testid="terminal-cursor" />
        </div>
      </div>
    </div>
  )
}
