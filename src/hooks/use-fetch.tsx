// import React, { useState } from "react";

// function useFetch(cb: any, options = {}) {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState(null);

//   const fn = async (...args: any) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const res = await cb(options, ...args);
//       setData(res);
//       setError(null);
//     } catch (error: any) {
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { data, loading, error, fn };
// }

// export default useFetch;

import { useState, useCallback } from "react";

// Define the shape of the object returned by the hook
interface UseFetchReturn<TData, TArgs extends any[]> {
  /** The data returned from the successful API call. Null initially or on error. */
  data: TData | null;
  /** True while the API call is in progress. */
  loading: boolean;
  /** The error object if the API call fails. Null otherwise. */
  error: Error | null;
  /** The function to trigger the API call. It accepts the same arguments as the original async function. */
  execute: (...args: TArgs) => Promise<TData | undefined>;
}

/**
 * A custom React hook to manage the state of an asynchronous function call.
 *
 * @param asyncFunction The asynchronous function to execute (e.g., an API call).
 * @returns An object with data, loading, error, and an execute function.
 */
function useFetch<TData, TArgs extends any[]>(
  asyncFunction: (...args: TArgs) => Promise<TData>
): UseFetchReturn<TData, TArgs> {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Use useCallback to memoize the execute function, preventing unnecessary re-renders.
  const execute = useCallback(
    async (...args: TArgs): Promise<TData | undefined> => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        return result;
      } catch (err: unknown) {
        // Ensure we're always setting an Error object.
        const typedError = err instanceof Error ? err : new Error(String(err));
        setError(typedError);
        return undefined; // Return undefined on failure
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction]
  ); // The dependency array ensures the function is stable if asyncFunction is.

  return { data, loading, error, execute };
}

export default useFetch;
