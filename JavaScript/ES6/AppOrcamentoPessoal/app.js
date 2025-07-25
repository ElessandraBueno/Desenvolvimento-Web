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
            
            //verificar se podem haver índices que foram removidos/pulados
            if (despesa === null) {
                continue
            }

            despesa.id = i
            despesas.push(despesa)
        }

        return despesas
    }

    pesquisar(despesa) {

        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesasFiltradas)

        if(despesa.ano !== ''){
            console.log('Filtro de ano')
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }

        if(despesa.mes !== ''){
            console.log('Filtro de mes')
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if(despesa.dia !== ''){
            console.log('Filtro de dia')
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if(despesa.tipo !== ''){
            console.log('Filtro de tipo')
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if(despesa.descricao !== ''){
            console.log('Filtro de descrição')
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if(despesa.valor !== ''){
            console.log('Filtro de valor')
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
        }

        return despesasFiltradas
        
    }

    remover(id){
        localStorage.removeItem(id)
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

function carregaListaDespesas(despesas = Array(), filtro = false) {

    if(despesas.length == 0 && filtro == false){
        despesas = bd.recuperarTodosRegistros()
    }

    //selecionando o elemento tbody da tabela
    let tabelaDespesas = document.getElementById('tabelaListaDespesas')
    tabelaDespesas.innerHTML = ''

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

        //botao de exclusão
        let btn = document.createElement("button")
        btn.className = 'btn btn-danger'
        btn.innerHTML =  '<i class="fa-solid fa-x"></i>'
        btn.id = 'id_despesa_' + d.id
        btn.onclick = function(){
            //remover a despesa
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)

            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    let despesas = bd.pesquisar(despesa)

    carregaListaDespesas(despesas, true)
}










