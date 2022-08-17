const { default: prisma } = require("config/prisma");

const ScheduleResolvers = {
    SchedulesOnUnitMachine: {
        schedule: async (parent) => await prisma.schedule.findUnique({
            where: {
                id: parent.scheduleId
            }
        }),
        machineUnit: async (parent) => await prisma.machineUnit.findUnique({
            where: {
                id: parent.machineUnitId
            }
        })
    },
    Query: {
        getMachineBySchedule: async (parent, args) => {
            const available = await prisma.schedulesOnUnitMachine.findMany({
                where: {
                    scheduleId: args.scheduleId,
                    state: "Disponible"
                },
                include: {
                    machineUnit: {
                        include: {
                            machine: true
                        }
                    }
                }
            })

            const availableFilter = available.reduce((acc,item)=>{
                var aux=acc.filter(element => element.machine.id===item.machineUnit.machineId)
                if(aux.length===0){
                    acc.push({
                        machine: item.machineUnit.machine,
                        location: item.machineUnit.location
                    });
                }else{
                   if(aux.filter(element => element.location===item.machineUnit.location).length===0){
                    acc.push({
                        machine: item.machineUnit.machine,
                        location: item.machineUnit.location
                    });
                   }
                }
                return acc;
              },[])

             return availableFilter;
        }
    }


}


export { ScheduleResolvers }