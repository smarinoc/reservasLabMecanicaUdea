/* eslint-disable no-shadow */
import { useMutation } from '@apollo/client';
import FormMachine from '@components/FormMachine';
import { useLayoutContext } from 'context/LayoutContext';
import { CREATE_MACHINE } from 'graphql/mutations/machine';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

const createMachine = () => {
  const layoutContext = useLayoutContext();
  const [createMachine, { loading }] = useMutation(CREATE_MACHINE);
  const onCreateMachine = async (machine) => {
    await createMachine({
      variables: {
        machine,
      },
    });
    toast.success('Máquina creada');
  };

  useEffect(() => {
    layoutContext.setLoading(loading);
  }, [loading]);

  return <FormMachine onSubmit={onCreateMachine} />;
};

export default createMachine;

createMachine.auth = {
  role: ['admin'],
};
createMachine.title = 'Crear máquina';

export const getServerSideProps = async (contex) => {
  const session = await getSession(contex);
  return {
    props: {
      session,
    },
  };
};
