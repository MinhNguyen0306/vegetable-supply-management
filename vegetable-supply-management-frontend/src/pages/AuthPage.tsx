import React, { useState } from 'react';
import SigninForm from "../components/common/auth/SigninForm";
import SignupForm from "../components/common/auth/SignupForm";
import SigninFormProvider from 'src/components/common/auth/SigninFormProvider';
import SignupFormProvider from 'src/components/common/auth/SignupFormProvider';
import Logo from 'src/components/common/Logo';

const actionState = {
  login: "login",
  register: "register",
  loginProvider: "login-provider",
  registerProvider: "register-provider"
}

const AuthPage = ({ authState }: {authState?: string}) => {
  const [action, setAction] = useState<string | undefined>(authState)

  const switchAuthState = (state: string) => setAction(state)

  return (
    <>
      <div className='relative h-screen bg-gradient-to-r from-sky-200 to-sky-500'>
        <div className='h-auto w-full'>
          <Logo />
        </div>
        <div className={`flex justify-center items-center h-auto`}>
          {action === actionState.login && <SigninForm switchAuthState={() => switchAuthState(actionState.register)}/>}
          {action === actionState.register && <SignupForm switchAuthState={() => switchAuthState(actionState.login)}/>}
          {action === actionState.loginProvider && <SigninFormProvider switchAuthState={() => switchAuthState(actionState.registerProvider)}/>}
          {action === actionState.registerProvider && <SignupFormProvider switchAuthState={() => switchAuthState(actionState.loginProvider)}/>}
        </div>
      </div>
      
    </>
  )
}

export default AuthPage
