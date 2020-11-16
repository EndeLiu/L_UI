(function () {
  function SideMenuJS (options) {
    return new Init(options)
  }
  SideMenuJS.prototype = {
    constructor: SideMenuJS,
    init () {
      this.createDom()
      this.listen()
    },
    createDom () {
      const {data, width, height, theme} = this.options
      function parse (list, layer, key) {
        let content = ''
        for (const i of list) {
          const hasChildren = i.children && i.children.length && i.children.length > 0
          content += `
            <li class="side-menu-item ${hasChildren ? 'has-children' : ''}" data-layer="${layer}" data-key="${key}">
              <div style="line-height:30px;">${i.name}</div>
              <ul>${hasChildren ? parse(i.children, layer + 1, i.name) : ''}</ul>
            </li>     
          `
        }
        return content
      }
      const html = `
        <ul>
          ${parse(data, 0, '_root')}
        </ul>
      `

      const container = document.createElement('div')
      container.classList.add('lui-side-menu')
      container.classList.add('l-scroll-area')
      container.classList.add('lui-side-menu-theme-' + theme)
      container.innerHTML = html
      container.style.width = width + 'px'
      container.style.height = height + 'px'
      this.container = container
    },
    listen () {
      const {enter} = this.options
      this.container.addEventListener('click', e => {
        let ul = null
        let li = null
        if (e.target.nodeName === 'LI') {
          li = e.target
          ul = e.target.children[1]
        } else if (e.target.nodeName === 'DIV') {
          li = e.target.parentNode
          ul = e.target.nextElementSibling
        } else {
          return
        }
        const itemCount = ul.children.length
        if (itemCount === 0) {
          enter(li.firstElementChild.textContent, li.dataset.layer, li.dataset.key)
        }

        if (ul.classList.contains('ul-show')) {
          ul.style.height = '0px'
          const parentUl = ul.parentNode.parentNode
          if (parentUl.nodeName === 'UL' && parentUl.classList.contains('ul-show')) {
            const parentHeight = parentUl.style.height.split('px')[0] * 1
            parentUl.style.height = parentHeight - itemCount * 30 + 'px'
          }
          li.classList.remove('li-show')
          ul.classList.remove('ul-show')

          const subs = ul.getElementsByClassName('li-show')
          Array.from(subs).forEach(i => {
            i.classList.remove('li-show')
            i.children[1].classList.remove('ul-show')
            i.children[1].style.height = '0px'
          })
        } else {
          ul.classList.add('ul-show')
          li.classList.add('li-show')
          ul.style.height = itemCount * 30 + 'px'
          const parentUl = ul.parentNode.parentNode
          if (parentUl.nodeName === 'UL' && parentUl.classList.contains('ul-show')) {
            const parentHeight = parentUl.style.height.split('px')[0] * 1
            parentUl.style.height = parentHeight + itemCount * 30 + 'px'
          }
        }
      })
    },
    dom () {
      return this.container
    }
  }
  function Init (options = {}) {
    options = Object.assign({
      data: [],
      width: 200,
      height: 500,
      theme: 'dark',
      enter: (text, layer, key) => { console.log(text, layer, key) }
    }, options)
    this.options = options
    this.init()
  }
  Init.prototype = SideMenuJS.prototype

  window.SideMenuJS = SideMenuJS
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = SideMenuJS
  }
})()
