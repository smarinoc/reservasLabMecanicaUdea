/* eslint-disable no-shadow */
import { useMutation } from '@apollo/client';
import FormMachine from '@components/FormMachine';
import { CREATE_MACHINE } from 'graphql/mutations/machine';
import { toast } from 'react-toastify';

const createMachine = () => {
  const [createMachine, { loading }] = useMutation(CREATE_MACHINE);
  const onCreateMachine = async (machine) => {
    await createMachine({
      variables: {
        machine,
      },
    });
    toast.success('Máquina creada');
  };

  return <FormMachine onSubmit={onCreateMachine} loading={loading} />;
};

export default createMachine;

createMachine.auth = {
  role: ['admin'],
};
