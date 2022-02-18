import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-midnight '>
      <img className='mb-5 w-44' src='https://links.papareact.com/9xl' alt='' />

      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            className='rounded-full bg-spotify p-5 text-whiteA transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-purpleA'
            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
          >
            Login with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export const getServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
