
import { useQuery } from '@apollo/client';
import ItemScheduleTable from '@components/ItemScheduleTable';
import { GET_DIARIES } from 'graphql/queries/diary';
import { useRouter } from 'next/router';
import React from 'react';

const schedules = () => {

    const router = useRouter();

    const { data, loading } = useQuery(GET_DIARIES, {
        fetchPolicy: 'cache-and-network'
    });

    const onItem = (id) => {
        router.push(`/admin/horario/${id}`);
    }
    if (loading) return <div>Loading....</div>

    return (
        <div className='flex flex-col justify-items-start w-[800px] mx-auto  border-2  drop-shadow-sm mt-24'>
            <div className='flex flex-row w-full px-3 py-4 border-b-2 bg-slate-50'>
                <span className='text-start text-base font-semibold uppercase text-gray-700 w-full'>Nombre</span>
                <span className='text-start text-base font-semibold uppercase text-gray-700 w-full'>número de máquinas</span>
            </div>
            {
                data.getDiaries.map((diary) =>
                    <ItemScheduleTable diary={diary} onItem={() => {
                        onItem(diary.id)
                    }} />
                )
            }

        </div>
    );
};

export default schedules;