import React, { Component, FC, ReactNode, useEffect, useState } from 'react'

export interface NoSSRProps {
  children: ReactNode
  onSSR?: ReactNode
}

const DefaultOnSSR = () => <></>

export class C extends Component<NoSSRProps> {
  constructor(props: NoSSRProps) {
    super(props)
  }
  state = {
    canRender: false,
  }

  componentDidMount() {}

  render() {
    const { onSSR, children } = this.props
    const OnSSR = onSSR ? () => <>{onSSR}</> : DefaultOnSSR
    const OnClient = () => <>{children}</>

    if (this.state.canRender) {
      return <OnClient />
    }

    return <OnSSR />
  }
}

export const H: FC<NoSSRProps> = (props) => {
  const { children, onSSR } = props
  const [canRender, setCanrender] = useState(false)
  const OnSSR = onSSR ? () => <>{onSSR}</> : DefaultOnSSR

  const OnClient = () => <>{children}</>
  useEffect(() => {
    !canRender && setCanrender(true)
  }, [canRender])

  if (canRender) {
    return <OnClient />
  }
  return <OnSSR />
}