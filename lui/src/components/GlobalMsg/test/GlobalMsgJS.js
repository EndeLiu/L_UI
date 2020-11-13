(function () {
  function GlobalMsgJS (options) {
    return new Init(options)
  }
  GlobalMsgJS.prototype = {
    constuctor: GlobalMsgJS,
    init () {
      this.zero()
      this.createDom()
      this.listen()
    },
    zero () {
      this.data = {
        show: false
      }
      this.methods = {} // 内部公共调用挂载的方法
    },
    createDom () {
      const {msg, icon} = this.options

      let iconContent = ''
      if (icon) {
        iconContent = `
          <div className='lui-gloabl-msg-icon'>
            ${icon}
          </div>
        `
      }
      let showControl = ''

      const html = `
        <div>
          <div class=${['lui-gloabl-msg', showControl].join(' ')}>
            ${iconContent}
            <div class='lui-gloabl-msg-content'>
              <span>${msg}</span>
            </div>
          </div>
        </div>
      `
      // ...
      const container = document.createElement('div')
      container.classList.add('lui-gloabl-msg-container')
      container.innerHTML = html
      this.container = container
    },
    listen () {
      const {duration} = this.options
      const {container} = this
      const showClass = 'lui-gloabl-msg-show'
      const hideClass = 'lui-gloabl-msg-hide'
      const msgBody = container.getElementsByClassName('lui-gloabl-msg')[0]

      this.methods.show = () => {
        this.data.show = true
        msgBody.classList.remove(hideClass)
        msgBody.classList.add(showClass)
        setTimeout(() => {
          this.methods.hide()
          setTimeout(() => {
            this.container.remove()
          }, 1000)
        }, duration)
      }
      this.methods.hide = () => {
        this.data.show = false
        msgBody.classList.remove(showClass)
        msgBody.classList.add(hideClass)
      }

    },
    dom () {
      return this.container
    }
  }
  function Init (options = {}) {
    options = Object.assign({
      duration: 1000,
      msg: '',
      icon: ''
    }, options)
    this.options = options
    this.init()
  }
  Init.prototype = GlobalMsgJS.prototype

  window.GlobalMsgJS = GlobalMsgJS
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = GlobalMsgJS
  }
})()