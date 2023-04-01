const getTemplate = (data = [], placeholder, selectedId)=>{
    let text = placeholder ?? "Default placeholder"
    const items = data.map(item => {
        let cls = ''
        if (item.code === selectedId){
            text = item.name
            cls = 'selected'
        }
        return `
            <li class="select-item select-item-hover ${cls}" data-type="item" data-id="${item.code}">${item.name}</li>
        `
    })
    return `
<div class="select-backdrop" data-type="backdrop"></div>
<div class="select-input" data-type="input">
    <span class="select-value" data-type="value">${text}</span>
    <i class="fa fa-chevron-down" data-type="arrow"></i>
</div>
<div class="select-dropdown">
  <ul class="select-list">
    ${items.join('')}
  </ul>
</div>
    `
}

export class Select{

    constructor(selector, options) {
        this.el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId

        this.#render()
        this.#setup()
    }
    #render(){
        console.log(this)
        if (this.el != undefined){
            const {placeholder, data} = this.options
            this.el.classList.add('select')
            this.el.innerHTML = getTemplate(data, placeholder, this.selectedId);
        }
    }
    #setup(){
        if (this.el != undefined){
            this.clickHandler = this.clickHandler.bind(this)
            this.el.addEventListener('click', this.clickHandler)
            this.arrow = this.el.querySelector('[data-type="arrow"]')
            this.$value = this.el.querySelector('[data-type="value"]')
        }
    }
    clickHandler(event){
        console.log("click")
        const {type} = event.target.dataset
        if (type === "input"){
            this.toggle()
        }else if(type === "item"){
            const id = event.target.dataset.id
            console.log('code:', id)
            this.select(id)
        } else if (type === "backdrop"){
            this.close()
        }
    }
    get isOpen(){
        return this.el.classList.contains('open')
    }
    get current(){
         return this.options.data.find(item=>item.code === this.selectedId)
    }
    select(id){
        this.selectedId = id;
        this.$value.textContent = this.current.name
        this.el.querySelectorAll(`.select-item`).forEach(elem=>{
            elem.classList.remove('selected')
            elem.classList.add('select-item-hover')
            elem.setAttribute("data-type", "item")
        })
        this.el.querySelector(`[data-id="${id}"]`).classList.add('selected')
        this.el.querySelector(`[data-id="${id}"]`).classList.remove('select-item-hover')
        this.el.querySelector(`[data-id="${id}"]`).removeAttribute("data-type")

        this.options.onSelect ? this.options.onSelect(this.current) : null

        this.close()
    }
    toggle(){
        this.isOpen ? this.close() : this.open()
    }
    open(){
        this.el.classList.add('open')
        this.arrow.classList.add('fa-chevron-up')
        this.arrow.classList.remove('fa-chevron-down')
    }
    close(){
        this.el.classList.remove('open')
        this.arrow.classList.remove('fa-chevron-up')
        this.arrow.classList.add('fa-chevron-down')
    }
    destroy(){
        this.el.removeEventListener('click', this.clickHandler)
        this.el.innerHTML = '';
    }
}