export default url => {
  return new Promise(resolve => {
    const img = new window.Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = url;
  });
}
