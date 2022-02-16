import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import { shuffle } from 'lodash'
import { pageColors } from '../styles/styles.js'

function MainContent() {
  const { data: session, status } = useSession()

  const [color, setColor] = useState()

  useEffect(() => {
    setColor(shuffle(pageColors).pop())
  }, [])

  return (
    <div className="flex-grow text-white">
      <header className="absolute top-5 right-8">
        <div
          className={`flex cursor-pointer items-center space-x-3 rounded-full bg-gray-900 p-1 pr-2 opacity-90 hover:opacity-80`}
        >
          <img
            className="h-10 w-10 rounded-full"
            src={session?.user.image}
            alt=""
          />

          <h2>{session?.user.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`padding-8 flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-gray-900 text-white`}
      >
        {/* <img src="" alt="" /> */}
      </section>
    </div>
  )
}

export default MainContent
