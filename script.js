function calculateSlope() {
    const x1 = parseFloat(document.getElementById('x1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const y2 = parseFloat(document.getElementById('y2').value);

    const slope = (y2 - y1) / (x2 - x1);

    document.getElementById('result').innerText = `Slope: ${slope}`;
}
