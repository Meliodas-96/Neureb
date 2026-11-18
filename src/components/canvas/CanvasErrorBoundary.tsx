'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class CanvasErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('CanvasErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-slate-950 p-6 select-none">
          <div className="max-w-md w-full p-6 rounded-2xl border border-red-500/40 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-center">
            <div className="w-14 h-14 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center mx-auto mb-4 text-red-400 shadow-lg shadow-red-950/50">
              <AlertCircle className="w-8 h-8" />
            </div>

            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wider mb-2">
              Error de Renderizado 3D / WebGL
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Se produjo un error al inicializar el contexto gráfico WebGL o al cargar el modelo neuroanatómico 3D. Asegúrese de que la aceleración de hardware esté habilitada.
            </p>

            {this.state.error && (
              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono text-red-300/80 text-left mb-5 max-h-24 overflow-y-auto break-all">
                {this.state.error.message || 'Error desconocido en WebGL'}
              </div>
            )}

            <div className="flex items-center gap-2">
              <button
                onClick={this.handleRetry}
                className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-semibold text-xs transition flex items-center justify-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Reintentar
              </button>

              <button
                onClick={this.handleReload}
                className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-medium text-xs transition flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Recargar Página
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
