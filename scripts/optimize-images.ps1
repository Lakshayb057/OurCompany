Add-Type -AssemblyName System.Drawing

function Optimize-Image {
    param (
        [string]$Path,
        [int]$MaxWidth = 1200,
        [int]$Quality = 82
    )

    if (-not (Test-Path $Path)) { return }

    $file = Get-Item $Path
    $oldLength = $file.Length

    # Open image
    $srcImg = [System.Drawing.Image]::FromFile($Path)
    $origW = $srcImg.Width
    $origH = $srcImg.Height

    # Calculate target dimensions
    $targetW = $origW
    $targetH = $origH
    if ($origW > $MaxWidth) {
        $targetW = $MaxWidth
        $targetH = [int]($origH * ($MaxWidth / $origW))
    }

    # Create new bitmap
    $bmp = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality

    $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetW, $targetH)
    $g.DrawImage($srcImg, $destRect)
    $srcImg.Dispose()

    # Determine extension
    $ext = $file.Extension.ToLower()
    $tempPath = $Path + ".optimized"

    if ($ext -in @('.jpg', '.jpeg')) {
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
        $encParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
        $encParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]$Quality)
        $bmp.Save($tempPath, $codec, $encParams)
        $encParams.Dispose()
    } elseif ($ext -eq '.png') {
        $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/png' }
        $bmp.Save($tempPath, $codec, $null)
    }

    $g.Dispose()
    $bmp.Dispose()

    if (Test-Path $tempPath) {
        $newLength = (Get-Item $tempPath).Length
        if ($newLength -lt $oldLength) {
            Move-Item $tempPath $Path -Force
            $savedPct = [math]::Round((($oldLength - $newLength) / $oldLength) * 100, 1)
            Write-Host ("Optimized $Path : " + [math]::Round($oldLength/1KB) + "KB -> " + [math]::Round($newLength/1KB) + "KB (-$savedPct%)")
        } else {
            Remove-Item $tempPath -Force
            Write-Host ("Kept original $Path (already optimal)")
        }
    }
}

# 1. Leadership avatars (max 800px width, 82% quality)
Optimize-Image -Path "public/Ishita.jpeg" -MaxWidth 800 -Quality 82
Optimize-Image -Path "public/Parth.jpeg" -MaxWidth 800 -Quality 82
Optimize-Image -Path "public/lakshay.jpeg" -MaxWidth 800 -Quality 82
Optimize-Image -Path "public/suryansh.jpeg" -MaxWidth 800 -Quality 82
Optimize-Image -Path "public/Diya.jpeg" -MaxWidth 800 -Quality 82
Optimize-Image -Path "public/Diya.jpg" -MaxWidth 800 -Quality 82
Optimize-Image -Path "public/Deepti.jpeg" -MaxWidth 800 -Quality 82
Optimize-Image -Path "public/anshuman.jpeg" -MaxWidth 800 -Quality 82

# 2. General site images
Optimize-Image -Path "public/global-vision.jpg" -MaxWidth 1000 -Quality 82
Optimize-Image -Path "public/universe-banner.jpg" -MaxWidth 1000 -Quality 82

# 3. Process section images (max 900px width, 82% quality)
Get-ChildItem -Path "public/process" -Filter "*.jpg" | ForEach-Object {
    Optimize-Image -Path $_.FullName -MaxWidth 900 -Quality 82
}

# 4. Service domain images (max 900px width, 82% quality)
Get-ChildItem -Path "public/services" -Filter "*.jpg" | ForEach-Object {
    Optimize-Image -Path $_.FullName -MaxWidth 900 -Quality 82
}

# 5. Hero ribbon PNG optimization
Optimize-Image -Path "public/hero-ribbon.png" -MaxWidth 1024

