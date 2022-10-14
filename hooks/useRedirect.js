import { useRouter } from 'next/router';
import { useState } from 'react';

const useRedirect = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const push = async (url) => {
    setLoading(true);
    await router.push(url);
    setLoading(false);
  };

  return { loading, router, push };
};

export default useRedirect;
