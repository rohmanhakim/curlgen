export default class HeaderHandler {
    tabHeader

    constructor(tabHeader){
        this.tabHeader = tabHeader 
    }

    addHeader() {
        var headerElement = document.createElement("DIV")
        const totalHeader = this.tabHeader.childElementCount
        headerElement.className = "row"
        headerElement.id = `header${totalHeader}`
        headerElement.innerHTML = `<div class="five columns">
              <input id="inputHeaderKey${totalHeader}" class="u-full-width" type="text" placeholder="key">
            </div>
            <div class="five columns">
              <input id="inputHeaderValue${totalHeader}" class="u-full-width" type="text" placeholder="value">
            </div>
            <div class="two columns">
              <button id="buttonRemoveHeader${totalHeader}" data-action="click->main#removeHeader">Remove</button>
            </div>`
    
        this.tabHeader.appendChild(headerElement)
    }

    removeHeader(headerElement) {
        const headerElementToRemove = headerElement
        this.tabHeader.removeChild(headerElementToRemove)
    }
    
    getHeaders() {
        const headerElements = Array.from(this.tabHeader.children)
        
        return headerElements
            .filter(header => (
                header.children[0].firstElementChild.value !== "" 
                || header.children[1].firstElementChild.value !== "" 
            ))
            .map(header => 
                ({ 
                key: `${header.children[0].firstElementChild.value}`, 
                value: `${header.children[1].firstElementChild.value}` 
                })  
            )
    }
}