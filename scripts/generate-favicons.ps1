Add-Type -AssemblyName System.Drawing

$currentDir = (Get-Location).Path
$srcPath = Join-Path $currentDir 'public\logo-icon.png'
$srcBmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = 10
$minY = 10
$cropW = 389
$cropH = 273

$cropRect = New-Object System.Drawing.Rectangle $minX, $minY, $cropW, $cropH
$croppedBmp = $srcBmp.Clone($cropRect, $srcBmp.PixelFormat)

function MakeSquareIcon([System.Drawing.Bitmap]$source, [int]$size, [string]$outPath, [double]$paddingRatio) {
    $canvas = New-Object System.Drawing.Bitmap $size, $size, ([System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($canvas)
    $g.Clear([System.Drawing.Color]::Transparent)
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $maxW = $size * (1.0 - (2.0 * $paddingRatio))
    $maxH = $size * (1.0 - (2.0 * $paddingRatio))
    $scale = [Math]::Min($maxW / $source.Width, $maxH / $source.Height)
    
    $destW = [int][Math]::Round($source.Width * $scale)
    $destH = [int][Math]::Round($source.Height * $scale)
    $destX = [int][Math]::Round(($size - $destW) / 2.0)
    $destY = [int][Math]::Round(($size - $destH) / 2.0)

    $destRect = New-Object System.Drawing.Rectangle $destX, $destY, $destW, $destH
    $g.DrawImage($source, $destRect, 0, 0, $source.Width, $source.Height, [System.Drawing.GraphicsUnit]::Pixel)
    
    $canvas.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    return $canvas
}

# 1. Generate 48x48
$bmp48 = MakeSquareIcon $croppedBmp 48 (Join-Path $currentDir 'public\favicon-48x48.png') 0.04
Write-Host "Generated favicon-48x48.png"

# 2. Generate 96x96
$bmp96 = MakeSquareIcon $croppedBmp 96 (Join-Path $currentDir 'public\favicon-96x96.png') 0.04
Write-Host "Generated favicon-96x96.png"

# 3. Generate 180x180 (Apple Touch Icon)
$bmp180 = MakeSquareIcon $croppedBmp 180 (Join-Path $currentDir 'public\apple-touch-icon.png') 0.05
Write-Host "Generated apple-touch-icon.png"

# 4. Generate 192x192 (PWA Icon)
$bmp192 = MakeSquareIcon $croppedBmp 192 (Join-Path $currentDir 'public\icon-192.png') 0.05
Write-Host "Generated icon-192.png"

# 5. Generate 512x512
$bmp512 = MakeSquareIcon $croppedBmp 512 (Join-Path $currentDir 'public\icon-512.png') 0.05
Write-Host "Generated icon-512.png"

# 6. Generate favicon.ico from 48x48
$icoPath = Join-Path $currentDir 'public\favicon.ico'
$hIcon = $bmp48.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()
$icon.Dispose()
Write-Host "Generated favicon.ico"

# Clean up
$bmp48.Dispose()
$bmp96.Dispose()
$bmp180.Dispose()
$bmp192.Dispose()
$bmp512.Dispose()
$croppedBmp.Dispose()
$srcBmp.Dispose()
Write-Host "All icons generated successfully!"
