class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if (id === null) {
            localStorage.setItem('id', 0)
        }
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {

        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)
    }

    recuperarTodosRegistros() {
        //array despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        //recuperar todas as despesas cadatsradas em localStorage
        for (let i = 1; i <= id; i++) {

            //recuperar a despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            despesas.push(despesa)

            //verificar se podem haver índices que foram removidos/pulados
            if (despesa === null) {
                continue
            }
        }

        return despesas
    }
}

let bd = new Bd()

function cadastrarDespesa() {

    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value)

    if (despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById('modal-titulo').innerHTML = 'Registro inserido com sucesso!'
        document.getElementById('modal-titulo-div').className = 'modal-header text-sucess'
        document.getElementById('modal-conteudo').innerHTML = 'Despesa cadastrada com sucesso!'
        document.getElementById('modal-btn').innerHTML = 'Voltar'
        document.getElementById('modal-btn').className = 'btn btn-success'

        //dialog de sucesso
        $('#registroDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''
    } else {

        document.getElementById('modal-titulo').innerHTML = 'Erro na inclusão do registro.'
        document.getElementById('modal-titulo-div').className = 'modal-header text-danger'
        document.getElementById('modal-conteudo').innerHTML = 'Verifique se todos os campos foram preenchidos corretamente.'
        document.getElementById('modal-btn').innerHTML = 'Voltar e corrigir'
        document.getElementById('modal-btn').className = 'btn btn-danger'

        //dialog de erro
        $('#registroDespesa').modal('show')
    }

}

function carregaListaDespesas() {

    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()

    //selecionando o elemento tbody da tabela
    let tabelaDespesas = document.getElementById('tabelaListaDespesas')

    //percorrer o array, listando cada despesa de forma dinamica
    despesas.forEach(function (d) {

        //criar linha (tr)
        let linha = tabelaDespesas.insertRow()
        //criar as colunas(td)
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        

        //ajustar o tipo
        switch (d.tipo) {
            case '1': d.tipo = 'Aliemntação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })


}










