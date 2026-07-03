import { spawn } from 'node:child_process'

export function openUrl(url) {
  const platform = process.platform
  let command
  let args

  if (platform === 'darwin') {
    command = 'open'
    args = [url]
  } else if (platform === 'win32') {
    command = 'cmd'
    args = ['/c', 'start', '""', url]
  } else {
    command = 'xdg-open'
    args = [url]
  }

  try {
    const child = spawn(command, args, {
      stdio: 'ignore',
      detached: true,
    })
    child.unref()
  } catch {
    // best-effort; ignore failures (e.g. headless environment with no opener)
  }
}
