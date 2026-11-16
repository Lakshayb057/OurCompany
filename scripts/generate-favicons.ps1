Add-Type -AssemblyName System.Drawing
$currentDir = (Get-Location).Path
$srcPath = Join-Path $currentDir 'public\logo-icon.png'
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
Write-Host "Source image dimensions: $($bmp.Width)x$($bmp.Height)"

# 1. 48x48 Favicon (Google recommended standard)
$res48 = New-Object System.Drawing.Bitmap 48, 48
$g48 = [System.Drawing.Graphics]::FromImage($res48)
$g48.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g48.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g48.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g48.DrawImage($bmp, 0, 0, 48, 48)

$fav48Path = Join-Path $currentDir 'public\favicon-48x48.png'
$res48.Save($fav48Path, [System.Drawing.Imaging.ImageFormat]::Png)

# 2. favicon.ico
$icoPath = Join-Path $currentDir 'public\favicon.ico'
$hIcon = $res48.GetHicon()
$icon = [System.Drawing.Icon]::FromHandle($hIcon)
$fs = New-Object System.IO.FileStream($icoPath, [System.IO.FileMode]::Create)
$icon.Save($fs)
$fs.Close()
$icon.Dispose()

$g48.Dispose()
$res48.Dispose()

# 3. 180x180 Apple Touch Icon
$res180 = New-Object System.Drawing.Bitmap 180, 180
$g180 = [System.Drawing.Graphics]::FromImage($res180)
$g180.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g180.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g180.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g180.DrawImage($bmp, 0, 0, 180, 180)

$applePath = Join-Path $currentDir 'public\apple-touch-icon.png'
$res180.Save($applePath, [System.Drawing.Imaging.ImageFormat]::Png)
$g180.Dispose()
$res180.Dispose()

# 4. 192x192 and 512x512 PWA icons
$res192 = New-Object System.Drawing.Bitmap 192, 192
$g192 = [System.Drawing.Graphics]::FromImage($res192)
$g192.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g192.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g192.DrawImage($bmp, 0, 0, 192, 192)
$res192.Save((Join-Path $currentDir 'public\icon-192.png'), [System.Drawing.Imaging.ImageFormat]::Png)
$g192.Dispose()
$res192.Dispose()

$bmp.Dispose()
Write-Host "All Favicon and App Icon files generated successfully in public/ directory!"
