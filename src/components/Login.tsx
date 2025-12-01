import { useState } from 'react';
import { Lock, Mail, BarChart3 } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#B38CEB] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#B38CEB] rounded-full blur-3xl"></div>
      </div>

      {/* Logo */}
      <div className="absolute top-12 left-12 z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-[#B38CEB] to-[#9d6fd4] rounded-xl flex items-center justify-center shadow-lg shadow-[#B38CEB]/20">
            <BarChart3 className="w-6 h-6 text-black" strokeWidth={2} />
          </div>
          <div>
            <div className="text-white tracking-tight">SAD-Finance</div>
            <div className="text-xs text-zinc-500">Sistema de Apoio à Decisão</div>
          </div>
        </div>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-zinc-900/40 backdrop-blur-2xl rounded-3xl p-12 shadow-2xl border border-zinc-800/50">
          <div className="mb-10">
            <h1 className="text-white text-center mb-2">Acesso ao Sistema</h1>
            <p className="text-zinc-400 text-center text-sm">Entre com suas credenciais para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm text-zinc-400 block">E-mail corporativo</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/30 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/40 focus:border-[#B38CEB]/40 transition-all"
                  placeholder="usuario@empresa.com"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm text-zinc-400 block">Senha de acesso</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" strokeWidth={1.5} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/30 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-[#B38CEB]/40 focus:border-[#B38CEB]/40 transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button type="button" className="text-sm text-[#B38CEB] hover:text-[#c9a8f0] transition-colors">
                Recuperar senha
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#B38CEB] to-[#9d6fd4] hover:from-[#c9a8f0] hover:to-[#b38ceb] text-black py-4 rounded-xl transition-all duration-300 shadow-lg shadow-[#B38CEB]/20 hover:shadow-[#B38CEB]/40"
            >
              Acessar Sistema
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-zinc-800/50">
            <p className="text-center text-zinc-600 text-xs">
              Análise Inteligente • Sumarização • Correlação • Agrupamento
            </p>
          </div>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-8">
          © 2025 SAD-Finance. Sistema de apoio à decisão financeira.
        </p>
      </div>
    </div>
  );
}
