'use client'

import { useEffect } from 'react'

function Hello() {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(
      `%c
  ╦╔═╗╔═╗╔═╗╔╦╗
  ║╚═╗╚═╗╠═╣║║║
  ╩╚═╝╚═╝╩ ╩╩ ╩
  ╔═╗╔═╗╔═╗╦ ╦╦╦═╗
  ╚═╗║╣ ║ ╦╠═╣║╠╦╝
  ╚═╝╚═╝╚═╝╩ ╩╩╩╚═

  Software Engineer & SaaS Founder

  Curious? Check out the source:
  https://github.com/issam-seghir/portfolio.dev

  Give it a star if you like it! ⭐
`,
      'color: #6366f1; font-size: 14px; font-family: monospace;',
    )
  }, [])

  return null
}

export default Hello
