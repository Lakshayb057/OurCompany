/**
 * Utility to optimize image delivery across Cloudinary, CDN, and local assets.
 * Automatically injects Cloudinary auto-format (WebP/AVIF), auto-quality compression,
 * and responsive width transformations to ensure instant image loading on weak networks.
 */
export function getOptimizedImageUrl(url?: string | null, width = 800): string {
  if (!url || typeof url !== 'string') return '';

  const cleanUrl = url.trim();

  // 1. Cloudinary transformation (f_auto = automatic WebP/AVIF, q_auto = smart compression)
  if (cleanUrl.includes('res.cloudinary.com') && cleanUrl.includes('/upload/')) {
    if (cleanUrl.includes('/f_auto') || cleanUrl.includes('/q_auto')) {
      return cleanUrl;
    }
    const transform = `f_auto,q_auto,w_${width},c_limit`;
    return cleanUrl.replace('/upload/', `/upload/${transform}/`);
  }

  return cleanUrl;
}
