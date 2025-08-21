function normalize(expr) {
    return expr.replace(/,/g, '.');
}

let display = document.getElementById("display");

function appendText(t) {
    const s = display.value;
    console.log("s:", s)

    display.value = (s === '0' || s === 'Erro') ? String(t) : s + t;
}
function clearDisplay() { display.value = ''; }
function deleteLast() { display.value = display.value.slice(0, -1); }

function appendNumber(n) {
    console.log("entrou funcao")
    appendText(n);
}
function appendOperator(o) { appendText(o); }
function appendValue(v) { appendText(v); }

function appendDot() {
    let s = display.value;
    const parts = s.split(/[+\-*/()]/);
    const last = parts[parts.length - 1] || '';
    if (!last.includes(',') && !last.includes(',')) {
        if (!last) s += '0';
        display.value = s+',';
    }
}

function toggleSign() {
    let s = display.value;
    if (!s) { display.value('-'); return; }

    const m = s.match(/(\d*\.?\d+)(?!.*\d)/);
    if (m) {
        const i = m.index;
        const n = m[0];
        const before = s.slice(0, i);
        const after = s.slice(i + n.length);

        if (before.endsWith('(-') && after.startsWith(')')) {
            display.valued = before.slice(0, -2) + n + after.slice(1);
        } else {
            display.value = before + '(-' + n + ')' + after;
        }
        return;
    }

    const num = Number(normalize(s));
    if (!Number.isNaN(num)) display.value(String(-num));
}

function calculate() { calculateResult(); }
function calculateResult() {
    const exprRaw = display.value;
    if (!exprRaw) return;
    console.log()
    let expr = exprRaw.replace(/\s+/g, '');
    if (/[*+\-/]$/.test(expr)) expr = expr.slice(0, -1);
    if (!expr) return;

    try {
        const result = Function('return (' + normalize(expr) + ')')(); 
        display.value = String(result);
    } catch {
        display.value ='Erro';
    }
}
