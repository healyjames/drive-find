import { signIn, signOut } from "@/auth"
import { Button } from "../button/button"
import { GithubIcon } from "../icons/icon"

const LoginProviderComponent = (props: {children?: React.ReactNode}) => {
  return(
      <button className={`p-4 w-full border flex flex-row flex-nowrap justify-center gap-4 hover:bg-primary-light hover:border-primary-light`}>
          {props.children}
      </button>
  )
}

export function GitHubSignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof LoginProviderComponent>) {
  return (
    <form
      action={async () => {
        "use server"
        await signIn(provider)
      }}
    >
      <LoginProviderComponent>
          <p>GitHub</p>
          <GithubIcon />
      </LoginProviderComponent>
    </form>
  )
}

export function SignOut(props: React.ComponentPropsWithRef<typeof Button>) {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
      className="w-full"
    >
      <Button {...props}>
        Sign Out
      </Button>
    </form>
  )
}