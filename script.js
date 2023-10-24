let currentMethod = 'points';  // Default to using points

function switchMethod(method) {
    currentMethod = method;
    if (method === 'points') {
        document.getElementById('pointsInput').style.display = 'block';
        document.getElementById('equationInput').style.display = 'none';
    } else {
        document.getElementById('pointsInput').style.display = 'none';
        document.getElementById('equationInput').style.display = 'block';
    }
}

function calculateSlope() {
    let slope;
    let intercept;
    
    if (currentMethod === 'points') {
        const x1 = parseFloat(document.getElementById('x1').value);
        const x2 = parseFloat(document.getElementById('x2').value);
        const y1 = parseFloat(document.getElementById('y1').value);
        const y2 = parseFloat(document.getElementById('y2').value);

        slope = (y2 - y1) / (x2 - x1);
        intercept = y1 - slope * x1;
    } else {
        const equation = document.getElementById('equation').value;
        const slopeMatch = equation.match(/y\s*=\s*(-?\d*\.?\d*)x/);

        if (slopeMatch && slopeMatch[1]) {
            slope = parseFloat(slopeMatch[1]);
            const interceptMatch = equation.match(/x\s*\+\s*(-?\d*\.?\d*)/);
            intercept = interceptMatch ? parseFloat(interceptMatch[1]) : 0;
        } else {
            document.getElementById('result').innerText = "Invalid equation format!";
            return;
        }
    }

    displayGraph(slope, intercept);
    displayForms(slope, intercept);
}

function displayGraph(m, b) {
    const xValues = math.range(-10, 10, 0.5).toArray();
    const yValues = xValues.map(x => m * x + b);

    const data = [{
        x: xValues,
        y: yValues,
        type: 'scatter'
    }];

    Plotly.newPlot('graph', data, {
        title: 'Graph of the Line',
        xaxis: { title: 'x' },
        yaxis: { title: 'y' }
    });
}

function displayForms(m, b) {
    document.getElementById('slopeInterceptForm').innerText = `y = ${m}x + ${b}`;
    
    const pointSlope = `y - y1 = ${m}(x - x1)`;
    document.getElementById('pointSlopeForm').innerText = pointSlope;

    const standard = `${m}x - y = ${-b}`;
    document.getElementById('standardForm').innerText = standard;
}
