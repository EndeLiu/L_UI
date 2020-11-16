import React, { useState } from 'react'
import '../../assets/css/sideMenu.scss'


function SideMenuItem (props) {
  const {i, datakey, layer} = props
  const [expand, setExpand] = useState(false)
  const [listHeight, setListHeight] = useState(0)

  const clickItem = (e) => {
    e.stopPropagation()
    let count = 0
    const getCount = (target) => {
      if (target.children) {
        for (const t of target.children) {
          count += 1
          if (t.expand) {
            getCount(t)
          }   
        }
      }  
    }
    getCount(i)
    setListHeight(count * 30)

    if(expand) {
      setExpand(false)
      setListHeight(0)
      if (props.expand) {
        props.expand(count * -1)
      }
    } else {
      setExpand(true)
      if (props.expand) {
        props.expand(count)
      }
      
    }
  }
  const expandFromChild = (count) => {
    setListHeight(count * 30 + listHeight)
  }

  const data = i.children
  i.expand = expand

  const hasChildren = i.children && i.children.length && i.children.length > 0
  const hasChildrenClass = hasChildren ? 'has-children' : ''
  const showClass = expand ? 'li-show': ''
  return (
    <li 
      onClick={(e) => {clickItem(e)}} 
      className={['side-menu-item', hasChildrenClass, showClass].join(' ')} 
      data-layer={layer} 
      data-key={datakey}>
      <div style={{lineHeight: '30px'}}>{i.name}</div>
      <ul className={expand ? 'ul-show': ''} style={{height: listHeight}}>
        {
          data.map((i, index) => <SideMenuItem expand={expandFromChild} i={i} key={index} layer={layer + 1} datakey={i.name} /> )
        } 
      </ul>
    </li> 
  )
}


function SideMenuUI (props) {
  const {data, expand, enter} = props

  return (
    <ul>
      { data.map((i, index) => <SideMenuItem i={i} key={index} layer={0} datakey={'_root'} /> )}
    </ul>
  )
}



const SideMenu = (props) => {
  const size = {
    width: props.width ? props.width : 200,
    height: props.height ? props.height : 500
  }
  const expand = () => {
    console.log('expand')
  }
  const enter = () => {
    console.log('enter')
  }
  return (
    <div className='lui-side-menu l-scroll-area lui-side-menu-theme-dark' 
      style={{width: size.width, height: size.height}}>
      <SideMenuUI data={props.data} expand={expand} enter={enter} />
    </div>
  )
}

export default SideMenu
