'use client'
import React from 'react'

interface IErrorPageProps {
  error: Error
  reset: () => void
}

const ErrorPage = ({ error, reset }: IErrorPageProps) => {
  return (
    <>
      <div>An unexpected error hs occurred. ---- {error.message}</div>
      <button className="btn btn-error" onClick={() => reset}>
        Reset
      </button>
    </>
  )
}

export default ErrorPage
