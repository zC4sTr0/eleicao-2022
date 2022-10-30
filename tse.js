const https = require("https");

let url_presidente_primeiro_turno =
  "https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json";

let url_presidente_segundo_turno =
  "https://resultados.tse.jus.br/oficial/ele2022/545/dados-simplificados/br/br-c0001-e000545-r.json";

function alertTerminal() {
  console.log("\007");
}

setInterval(() => {
  https
    .get(url_presidente_segundo_turno, (resp) => {
      process.stdout.write("\033c");
      alertTerminal();
      //variavel para guardar o codigo do site
      let data = "";

      //adiciona conteúdo da web na variavel data
      resp.on("data", (chunk) => {
        data += chunk;
      });

      //bloco que possui código que será executado quando chegar a resposta final
      resp.on("end", () => {
        let resultado_eleicao = JSON.parse(data);
        console.log("--------------------");
        console.log(
          "PORCENTAGEM DE URNAS APURADAS: " + resultado_eleicao.pst + "%"
        );

        console.log(
          resultado_eleicao.cand[0].nm +
            ": " +
            resultado_eleicao.cand[0].pvap +
            "%" +
            " - VOTOS:" +
            resultado_eleicao.cand[0].vap.replace(/(.)(?=(\d{3})+$)/g, "$1.")
        );

        console.log(
          resultado_eleicao.cand[1].nm +
            ": " +
            resultado_eleicao.cand[1].pvap +
            "%" +
            " - VOTOS:" +
            resultado_eleicao.cand[1].vap.replace(/(.)(?=(\d{3})+$)/g, "$1.")
        );

        var diferenca_entre_candidatos =
          resultado_eleicao.cand[0].vap - resultado_eleicao.cand[1].vap;
        console.log(
          "DIFERENÇA ATUAL DE VOTOS: " +
            String(diferenca_entre_candidatos).replace(
              /(.)(?=(\d{3})+$)/g,
              "$1."
            )
        );
      });
    })
    .on("error", (error) => {
      console.log("Error: " + error.message);
    });
}, 1500);
