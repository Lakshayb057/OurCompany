Add-Type -AssemblyName System.Drawing

$currentDir = (Get-Location).Path
$srcPath = Join-Path $currentDir 'public\logo-icon.png'
$srcBmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Optical alignment constants
$CX = 185.0
$CY = 148.0
$effWidth = 405.0
$effHeight = 285.0

function RenderAlignedSquareIcon([System.Drawing.Bitmap]$source, [int]$size, [string]$outPath) {
    $canvas = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($canvas)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $avail = $size * 0.88
    $scale = [Math]::Min($avail / $effWidth, $avail / $effHeight)

    $destW = [float]($source.Width * $scale)
    $destH = [float]($source.Height * $scale)
    $destX = [float](($size / 2.0) - ($CX * $scale))
    $destY = [float](($size / 2.0) - ($CY * $scale))

    $g.DrawImage($source, $destX, $destY, $destW, $destH)
    $canvas.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $canvas.Dispose()
}

$sizes = @(16, 32, 48, 96, 180, 192, 512)
foreach ($s in $sizes) {
    $name = "favicon-$($s)x$($s).png"
    if ($s -eq 180) { $name = "apple-touch-icon.png" }
    elseif ($s -eq 192) { $name = "icon-192.png" }
    elseif ($s -eq 512) { $name = "icon-512.png" }
    
    $outPath = Join-Path $currentDir "public\$name"
    RenderAlignedSquareIcon $srcBmp $s $outPath
    Write-Host "Rendered $name ($s x $s)"
}

$srcBmp.Dispose()

# Build 32-bit alpha transparent favicon.ico
node (Join-Path $currentDir 'scripts\build-ico.js')
Write-Host "All icons generated with optical balance and transparent background!"
