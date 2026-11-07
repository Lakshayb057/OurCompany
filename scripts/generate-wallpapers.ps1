Add-Type -AssemblyName System.Drawing

$width = 3840
$height = 2160

# 1. Create 4K 3840x2160 32-bit ARGB Bitmap
$bmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# 2. Fill Background with Deep Obsidian Tech Gradient
$bgRect = New-Object System.Drawing.Rectangle(0, 0, $width, $height)
$topColor = [System.Drawing.Color]::FromArgb(255, 10, 9, 18)
$bottomColor = [System.Drawing.Color]::FromArgb(255, 3, 3, 7)
$linearBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($bgRect, $topColor, $bottomColor, 90.0)
$g.FillRectangle($linearBrush, $bgRect)
$linearBrush.Dispose()

# 3. Add Radiant Radial Glow in the Center (CodeVerse Purple #7C2CF5)
$glowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$glowRect = New-Object System.Drawing.Rectangle([int]($width / 2 - 1300), [int]($height / 2 - 900), 2600, 1800)
$glowPath.AddEllipse($glowRect)
$pgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($glowPath)
$pgb.CenterColor = [System.Drawing.Color]::FromArgb(65, 124, 44, 245)
$pgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 7, 7, 14))
$g.FillPath($pgb, $glowPath)
$pgb.Dispose()
$glowPath.Dispose()

# 4. Add subtle tech floor reflection aura
$floorPath = New-Object System.Drawing.Drawing2D.GraphicsPath
$floorRect = New-Object System.Drawing.Rectangle([int]($width / 2 - 1200), [int]($height / 2 + 320), 2400, 450)
$floorPath.AddEllipse($floorRect)
$fpgb = New-Object System.Drawing.Drawing2D.PathGradientBrush($floorPath)
$fpgb.CenterColor = [System.Drawing.Color]::FromArgb(40, 168, 85, 247)
$fpgb.SurroundColors = @([System.Drawing.Color]::FromArgb(0, 5, 5, 10))
$g.FillPath($fpgb, $floorPath)
$fpgb.Dispose()
$floorPath.Dispose()

# 5. Load hero-ribbon.png (CodeVerse 3D Ribbon Emblem)
$ribbonPath = "E:\family documentes\CodeVerse\public\hero-ribbon.png"
if (Test-Path $ribbonPath) {
    $ribbon = [System.Drawing.Image]::FromFile($ribbonPath)
    
    # Scale to ~920px width preserving aspect ratio
    $targetW = 920
    $targetH = [int]($ribbon.Height * ($targetW / $ribbon.Width))
    
    $destX = [int](($width - $targetW) / 2)
    $destY = [int](($height - $targetH) / 2 - 110)

    # Draw Ribbon Emblem
    $destRect = New-Object System.Drawing.Rectangle($destX, $destY, $targetW, $targetH)
    $g.DrawImage($ribbon, $destRect)
    $ribbon.Dispose()
}

# 6. Render Typography: CODEVERSE
$fontFamily = [System.Drawing.FontFamily]::GenericSansSerif
$font = New-Object System.Drawing.Font($fontFamily, 64, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$subFont = New-Object System.Drawing.Font($fontFamily, 22, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)

$sf = New-Object System.Drawing.StringFormat
$sf.Alignment = [System.Drawing.StringAlignment]::Center
$sf.LineAlignment = [System.Drawing.StringAlignment]::Center

# Text glow shadow
$shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(140, 124, 44, 245))
$textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(252, 255, 255, 255))
$subBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(190, 185, 140, 255))

$textY = [int]($height / 2 + 400)
$g.DrawString("C O D E V E R S E", $font, $shadowBrush, [float]($width / 2), [float]($textY + 4), $sf)
$g.DrawString("C O D E V E R S E", $font, $textBrush, [float]($width / 2), [float]$textY, $sf)

$subY = $textY + 75
$g.DrawString("TURNING IDEAS INTO TECHNOLOGY", $subFont, $subBrush, [float]($width / 2), [float]$subY, $sf)

$shadowBrush.Dispose()
$textBrush.Dispose()
$subBrush.Dispose()
$font.Dispose()
$subFont.Dispose()
$sf.Dispose()

# 7. Save High-Quality PNG
$outPng = "E:\family documentes\CodeVerse\wallpaper-brand.png"
$bmp.Save($outPng, [System.Drawing.Imaging.ImageFormat]::Png)

$pubPng = "E:\family documentes\CodeVerse\public\wallpaper-brand.png"
$bmp.Save($pubPng, [System.Drawing.Imaging.ImageFormat]::Png)

$g.Dispose()
$bmp.Dispose()

Write-Output "Successfully generated: $outPng"
