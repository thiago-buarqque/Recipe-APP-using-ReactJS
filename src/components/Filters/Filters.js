export const applyFilters = () => {

}

export const openCloseFiltersBody = () => {
    let $filters_body = document.querySelector('#filters_body')
    $filters_body.classList.toggle('filters_body_opened')
}

export const alternateCheckBoxState = (e) =>{
    let targetId = e.target.getAttribute('id')
    let $div_checkBox = document.querySelector(`#div_${targetId}`)
    $div_checkBox.classList.toggle('div_checkBox__checked')

    const targetValue = e.target.getAttribute('value')
    return targetValue
}