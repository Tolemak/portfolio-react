import React from 'react';
import { LangContext, translations } from '../data/i18n';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  static contextType = LangContext;
  declare context: React.ContextType<typeof LangContext>;

  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info);
  }

  handleReload = () => {
    Object.keys(sessionStorage)
      .filter((key) => key.startsWith('chunk-retry:'))
      .forEach((key) => sessionStorage.removeItem(key));
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const lang = this.context?.lang ?? 'pl';
      const t = translations[lang].errorBoundary;
      return (
        <section className="error-boundary-section" aria-label={t.title}>
          <h1 className="error-boundary-title">{t.title}</h1>
          <p className="error-boundary-message">{t.message}</p>
          <button className="error-boundary-cta" onClick={this.handleReload}>
            {t.cta}
          </button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
