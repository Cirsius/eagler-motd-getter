const output = document.getElementById('output')
const iconCtx = document.getElementById('icon').getContext('2d')

function query() {
    const url = document.getElementById('server').value.trim()
    if (!url) return

    iconCtx.clearRect(0, 0, 64, 64)
    const ws = new WebSocket(url)
    ws.binaryType = 'arraybuffer'

    ws.onopen = () => {
        const acceptQuery = document.getElementById('acceptQuery').value.trim() || 'Accept: MOTD'
        ws.send(acceptQuery)
    }

    ws.onmessage = (e) => {
        if (typeof e.data === 'string') {
            output.textContent = JSON.stringify(JSON.parse(e.data), null, 2)
        } else {
            const bytes = new Uint8Array(e.data)
            if (bytes.length === 16384) {
                const img = iconCtx.createImageData(64, 64)
                for (let i = 0; i < 16384; i++) img.data[i] = bytes[i]
                iconCtx.putImageData(img, 0, 0)
            }
        }
    }
}