let matriz = [];

function crearMatriz() {

    const n = parseInt(document.getElementById("tamano").value);

    if (!n || n <= 0) {
        alert("Ingrese un tamaño válido");
        return;
    }

    let html = "<table>";

    for(let i=0;i<n;i++){

        html += "<tr>";

        for(let j=0;j<n;j++){

            html += `
            <td>
                <input type="number"
                       id="m_${i}_${j}"
                       value="0">
            </td>`;
        }

        html += "</tr>";
    }

    html += "</table>";

    document.getElementById("contenedorMatriz").innerHTML = html;
}

function leerMatriz() {

    const n = parseInt(document.getElementById("tamano").value);

    matriz = [];

    for(let i=0;i<n;i++){

        let fila=[];

        for(let j=0;j<n;j++){

            fila.push(
                parseInt(
                    document.getElementById(`m_${i}_${j}`).value
                )
            );
        }

        matriz.push(fila);
    }

    return matriz;
}

function mostrarMatriz(){

    leerMatriz();

    let texto = "MATRIZ\n\n";

    matriz.forEach(fila=>{
        texto += fila.join("\t") + "\n";
    });

    document.getElementById("salida").textContent = texto;
}

function obtenerSubmatriz(matriz,fila,columna){

    return matriz
        .filter((_,i)=>i!==fila)
        .map(filaActual =>
            filaActual.filter((_,j)=>j!==columna)
        );
}

function determinante(matriz){

    let n = matriz.length;

    if(n===1)
        return matriz[0][0];

    if(n===2)
        return matriz[0][0]*matriz[1][1]
             - matriz[0][1]*matriz[1][0];

    let det = 0;

    for(let j=0;j<n;j++){

        let sub = obtenerSubmatriz(matriz,0,j);

        let cofactor =
            Math.pow(-1,j) *
            determinante(sub);

        det += matriz[0][j] * cofactor;
    }

    return det;
}

function calcularDeterminante() {

    leerMatriz();

    pasos = "";

    const resultado = determinante(matriz);

    document.getElementById("salida").textContent =
        pasos +
        "\n================================\n" +
        "DETERMINANTE FINAL = " +
        resultado;
}
function calcularDeterminante(){

    leerMatriz();

    let n = matriz.length;

    let texto = "SOLUCIÓN\n\n";

    texto +=
    "La matriz de cofactores se calcula mediante:\n" +
    "Cij = (-1)^(i+j) × Mij\n\n";

    let cofactores = [];

    for(let i=0;i<n;i++){

        cofactores[i] = [];

        for(let j=0;j<n;j++){

            let sub = obtenerSubmatriz(matriz,i,j);

            let menor = determinante(sub);

            let signo = Math.pow(-1,i+j);

            let cofactor = signo * menor;

            cofactores[i][j] = cofactor;

            texto +=
                `C${i+1}${j+1} = `
                + `(-1)^(${i+1}+${j+1})`
                + ` × (${menor})`
                + ` = ${cofactor}\n`;
        }
    }

    texto += "\nMATRIZ DE COFACTORES\n";

    cofactores.forEach(fila=>{
        texto += "[ " + fila.join("   ") + " ]\n";
    });

    texto += "\nDETERMINANTE\n";
    texto += determinante(matriz);

    document.getElementById("salida").textContent = texto;
}

function limpiar(){

    document.getElementById("salida").textContent = "";
    document.getElementById("contenedorMatriz").innerHTML = "";
    matriz = [];
}