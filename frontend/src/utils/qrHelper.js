export function generateQRCodeUrl(text) {
  // Uses QuickChart / Google Chart SVG QR generator URL
  const encoded = encodeURIComponent(text);
  return `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encoded}`;
}
