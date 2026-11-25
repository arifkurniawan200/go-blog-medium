import * as THREE from 'three';

let cachedGradientMap: THREE.DataTexture | null = null;

/**
 * Generates a crisp 3-tone cel-shading gradient map for MeshToonMaterial.
 */
export function getToonGradientMap(): THREE.DataTexture {
  if (cachedGradientMap) return cachedGradientMap;
  const colors = new Uint8Array([95, 175, 255]);
  const tex = new THREE.DataTexture(colors, 3, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  cachedGradientMap = tex;
  return tex;
}

/**
 * Generates a crisp procedural canvas texture for the "AK" cap badge, "?" block face, or coin emblem.
 */
export function createSymbolTexture(
  symbol: string,
  bgColor: string,
  textColor: string,
  borderColor = '#1A1C2C',
  isCircle = false
): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  if (isCircle) {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size * 0.44, 0, Math.PI * 2);
    ctx.fillStyle = bgColor;
    ctx.fill();
    ctx.lineWidth = 14;
    ctx.strokeStyle = borderColor;
    ctx.stroke();
  } else {
    // Question block bevel & corner rivets
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 14;
    ctx.strokeRect(10, 10, size - 20, size - 20);

    const rivetOffset = 32;
    const rivets = [
      [rivetOffset, rivetOffset],
      [size - rivetOffset, rivetOffset],
      [rivetOffset, size - rivetOffset],
      [size - rivetOffset, size - rivetOffset]
    ];
    ctx.fillStyle = borderColor;
    rivets.forEach(([rx, ry]) => {
      ctx.beginPath();
      ctx.arc(rx, ry, 9, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  // Drop shadow for crisp arcade feel
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const fontSize = symbol.length <= 1 ? 150 : symbol.length === 2 ? 112 : 84;
  ctx.font = `900 ${fontSize}px "Arial Black", "Nunito", sans-serif`;

  ctx.fillStyle = borderColor;
  ctx.fillText(symbol, size / 2 + 6, size / 2 + 10);

  ctx.fillStyle = textColor;
  ctx.fillText(symbol, size / 2, size / 2 + 4);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
