import { useMutation, useQuery } from '@apollo/client';
import ActionsCell from '@components/ActionsCell';
import SelectFilter from '@components/SelectFilter';
import Table from '@components/Table';
import TextFilter from '@components/TextFilter';
import { useLayoutContext } from 'context/LayoutContext';
import { CHANGE_USER_STATE } from 'graphql/mutations/user';
import { GET_USERS_INFO_TABLE_ADMIN } from 'graphql/queries/user';
import React, { useEffect } from 'react';

const UserTableAdmin = () => {
  const layoutContext = useLayoutContext();
  const { data: resData, loading: loadingGetInfo } = useQuery(
    GET_USERS_INFO_TABLE_ADMIN,
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  const [changeUserState, { loading: loadingChange }] =
    useMutation(CHANGE_USER_STATE);

  useEffect(() => {
    layoutContext.setLoading(loadingChange);
  }, [loadingChange]);

  const onChangeUserState = async (data) => {
    await changeUserState({
      variables: {
        data: {
          id: data.id,
          state: data.state,
        },
      },
    });
  };

  if (loadingGetInfo) {
    return <div>Loading....</div>;
  }
  const headers = [
    {
      Header: 'Documento',
      accessor: 'document',
      Filter: TextFilter,
    },
    {
      Header: 'Correo',
      accessor: 'email',
      Filter: TextFilter,
    },
    {
      Header: 'Estado',
      accessor: 'state',
      Filter: SelectFilter,
      filter: 'equals',
      Cell: ActionsCell,
      options: ['habilitado', 'registrado', 'inhabilitado'],
      onsubmit: onChangeUserState,
    },
  ];

  const data = resData?.getUsersInfoTableAdmin;

  if (!data) {
    <div>Loading....</div>;
  }
  return <Table headers={headers} data={data} />;
};

export default UserTableAdmin;
