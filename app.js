'use strict'

const mapa = document.querySelector('#map')


const getEstado = async ({ target }) => {
    const estado = target.id.replace('BR-', '')
    // const nomeEstado = target.getAttribute('title')
    const dadosEstado = await preencherDados(estado)

    preencherTela(dadosEstado)
}


const preencherTela = async (dadosEstado) => {

    const headerCard = document.createElement('div')
    headerCard.classList.add('card__header')

    const titleHeader = document.createElement('h1')
    titleHeader.textContent = dadosEstado.uf
    titleHeader.classList.add('header__title')

    const contentHeader = document.createElement('div')
    contentHeader.classList.add('header__content')

    const titleContent = document.createElement('h2')
    titleContent.classList.add('content__title')
    titleContent.textContent = dadosEstado.descricao

    const descriptionContent = document.createElement('div')
    descriptionContent.classList.add('content__description')

    const capitalDescription = document.createElement('div')
    capitalDescription.classList.add('description__capital')

    const nameCapital = document.createElement('span')
    nameCapital.classList.add('capital__name')
    nameCapital.textContent = dadosEstado.capital

    const regiaoDescription = document.createElement('div')
    regiaoDescription.classList.add('description__regiao')

    const nameRegiao = document.createElement('span')
    nameRegiao.classList.add('regiao__name')
    nameRegiao.textContent = dadosEstado.regiao

    const contentCard = document.createElement('div')
    contentCard.classList.add('card__content')

    const spanCidades = document.createElement('span')
    spanCidades.textContent = 'CIDADES'
    spanCidades.classList.add('spanContent')

    const contentCidades = document.createElement('div')
    contentCidades.classList.add('cidades-content')

    dadosEstado.cidades.forEach(function (cidade) {
        const cidadeContent = document.createElement('span')
        cidadeContent.classList.add('content__cidade')
        cidadeContent.textContent = cidade

        contentCidades.append(cidadeContent)
    })

    contentCard.append(spanCidades, contentCidades)
    regiaoDescription.append(nameRegiao)
    capitalDescription.append(nameCapital)
    descriptionContent.append(capitalDescription, regiaoDescription)
    contentHeader.append(titleContent, descriptionContent);
    headerCard.append(titleHeader, contentHeader)
    //ADICIONANDO NA TELA
    const card = document.getElementById('card-info')
    card.replaceChildren(headerCard, contentCard)


}

const preencherDados = async (sigla) => {

    const url = `https://api-mapa.onrender.com/v1/senai/cidades?uf=${sigla}`
    const response = await fetch(url)
    const data = await response.json()

    return data

}

mapa.addEventListener('click', getEstado)
