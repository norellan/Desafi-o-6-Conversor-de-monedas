let resultado = document.getElementById("resultado");
let valorSelectM = "";

function selectMonedas() {
  let selectM = document.getElementById("select-monedas");
  valorSelectM = selectM.options[selectM.selectedIndex].value;
}

async function calcular() {
  let valorPesos = document.getElementById("pesos").value;
  let his_10;

  if (valorPesos === "") {
    alert("Debe ingresar monto en pesos");
  } else if (valorPesos <= 0) {
    alert("Debe ingresar un valor positivo");
  } else if (isNaN(valorPesos)) {
    alert("Debe ingresar numero");
  } else {
    try {
      const divisas = await fetch(`https://mindicador.cl/api/${valorSelectM}`);
      const monedas = await divisas.json();
      if (valorSelectM === "dolar") {
        calculo = (valorPesos / monedas.serie[0].valor).toFixed(2);
        resultado.innerHTML = "Resultado: $ " + calculo;
        his_10 = monedas.serie.splice(0, 10);
        generateData(his_10);
      } else if (valorSelectM === "euro") {
        calculo = (valorPesos / monedas.serie[0].valor).toFixed(2);
        resultado.innerHTML = "Resultado: € " + calculo;
        his_10 = monedas.serie.splice(0, 10);
        generateData(his_10);
      } else if (valorSelectM === "uf") {
        calculo = (valorPesos / monedas.serie[0].valor).toFixed(2);
        resultado.innerHTML = "Resultado: UF " + calculo;
        his_10 = monedas.serie.splice(0, 10);
        generateData(his_10);
      } else {
        alert("Debe seleccionar una moneda");
      }
    } catch (e) {
      alert("Intente la consulta nuevamente");
    }
  }
}

function generateData(his_10) {
  let contGrfica = document.getElementById("stylegrafica");
  let xValues = [];
  let yValues = [];
  for (let i = 0; i < his_10.length; i++) {
    yValues.push(his_10[i].fecha.substring(0, 10));
    xValues.push(his_10[i].valor);
  }
  contGrfica.style.backgroundColor = "rgb(208, 233, 233)";

  new Chart("grafica", {
    type: "line",
    data: {
      labels: yValues.reverse(),
      datasets: [
        {
          fill: false,
          pointRadius: 1,
          borderColor: "rgba(255,0,0,0.5)",
          data: xValues.reverse(),
        },
      ],
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Historico de Valores",
        fontSize: 16,
      },
    },
  });
}
