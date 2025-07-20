import { ScentType } from 'src/types/ScentType';

function createFillImage(color: string, density: number) {
    const size = 32;
    const cvs = document.createElement('canvas');
    cvs.width = cvs.height = size;
    const ctx = cvs.getContext('2d')!;
    ctx.fillStyle = color;
    const dotCount = Math.floor(density * size * size * 0.02);
    const twoPi = Math.PI * 2;

    for (let i = 0; i < dotCount; i++) {
        const x = Math.random() * size;
        const y = Math.random() * size;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, twoPi);
        ctx.fill();
    }
    return cvs.toDataURL();
}

const imageCache = new Map<ScentType, Map<number, string>>();

function getScentColor(scent: ScentType): string {
    let hue = scent as number * 131;

    while (hue > 360) {
        hue -= 360;
    }

    return `oklch(50%, 0.4, ${hue}deg)`;
}

export function getScentImage(scent: ScentType, density: number): string {
    let scentImages = imageCache.get(scent);
    if (!scentImages) {
        scentImages = new Map();
        imageCache.set(scent, scentImages);
    }

    let scentImage = scentImages.get(density);
    if (!scentImage) {
        const color = getScentColor(scent);
        scentImage = createFillImage(color, density);
        scentImages.set(density, scentImage);
    }

    return scentImage;
}