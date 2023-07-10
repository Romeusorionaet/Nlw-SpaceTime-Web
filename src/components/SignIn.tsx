import { User } from 'lucide-react'

export function SignIn() {
  return (
    <a
      href={`https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`}
      className="flex items-center gap-3 text-left transition-colors hover:text-gray-50"
      rel="noreferrer"
    >
      <p className="maax-w-[148px] loading-snug text-sm">
        <span className="underline">Criar sua conta</span>
        <span className="max-lg:hidden">e salve suas memórias!</span>
      </p>
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 max-MiniMobile:hidden">
        <User className="h-5 w-5 text-gray-500" />
      </div>
    </a>
  )
}
