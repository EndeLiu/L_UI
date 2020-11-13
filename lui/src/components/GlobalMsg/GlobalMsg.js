import React, { useState , forwardRef, useImperativeHandle} from 'react'
import '../../assets/css/globalMsg.scss'

function GlobalMsgUI (props) {
  const {msg, show, icon} = props
  const showClass = 'lui-gloabl-msg-show'
  const hideClass = 'lui-gloabl-msg-hide'

  let iconContent = ''
  if (icon) {
    iconContent = `
      <div className='lui-gloabl-msg-icon'>
        ${icon}
      </div>
    `
  }
  let showControl = ''
  if (show) {
    showControl = showClass
  } else if (show === null){
    showControl = ''
  } else {
    showControl = hideClass
  }
  
  return (
    <div>
      <div className={['lui-gloabl-msg', showControl].join(' ')}>
        {iconContent}
        <div className='lui-gloabl-msg-content'>
          <span>{msg}</span>
        </div>
      </div>
    </div>
  )
}

const GlobalMsg = forwardRef((props, ref) => {
  const {msg, icon, duration} = props
  const [showThis, setShowThis] = useState(null)
  useImperativeHandle(ref,() => ({
      showMsg: (flag) => {
        setShowThis(flag)
      }
  }))
  setTimeout(() => {
    if (showThis) {
      setShowThis(false)
    }
  }, duration ? duration : 1000)
  return (
    <div className='lui-gloabl-msg-container' ref={ref}>
      <GlobalMsgUI msg={msg} show={showThis} icon={icon} />
    </div>
  )
})



export default GlobalMsg
