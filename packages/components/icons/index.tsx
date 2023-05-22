import React, { CSSProperties } from 'react'
import classNames from 'classnames'

import './style/style.css'
import './style/iconfont.css'
import './style/iconfont'


interface IIconProps {
  name: string
  className?: string
  style?: CSSProperties
}

export const Symbol = (props: IIconProps) => {
  const { name, ...rest } = props
  const xlinkHref = '#icon-' + name
  return (
    <svg className="icon" aria-hidden="true" {...rest}>
      <use xlinkHref={xlinkHref}></use>
    </svg>
  )
}

export const FontClass = (props: IIconProps) => {
  const { name, className, ...rest } = props
  const iconName = 'icon-' + name
  return <i className={classNames('iconfont', iconName, className)} {...rest}></i>
}
