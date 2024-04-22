import React from 'react'
import { Link } from 'react-router-dom'

export const Login = () => {
  return (
    <div>
        <div>
            <h1>Login as :</h1>
            <div>
                <Link to={'/logscorer'}>Scorer</Link>
            </div>
            <div>
                <Link to={'/logviewer'}>Viewer</Link>
            </div>
        </div>
    </div>
  )
}
