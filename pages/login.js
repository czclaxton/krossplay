import React from 'react'
import { getProviders, signIn } from 'next-auth/react'

function Login({ providers }) {
  return (
    <div className='flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 '>
      <img className='mb-5 w-52' src='https://links.papareact.com/9xl' alt='' />

      {Object.values(providers).map(provider => (
        <div key={provider.name}>
          <button
            className='rounded-full bg-[#18D860] p-5 text-white transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-cyan-500'
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
