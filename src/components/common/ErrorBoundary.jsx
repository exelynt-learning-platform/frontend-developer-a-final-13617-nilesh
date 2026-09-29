import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ resetErrorBoundary }) => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-5">
      <div className="text-center">
        <h1 className="text-xl font-semibold text-gray-800">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Please reload the page and try again.
        </p>

        <button
          type="button"
          onClick={handleReload}
          className="mt-5 rounded-lg bg-[#354075] px-4 py-2 text-sm font-medium text-white hover:bg-[#2c3565]"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
