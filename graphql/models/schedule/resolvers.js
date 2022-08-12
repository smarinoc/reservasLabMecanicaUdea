const { default: prisma } = require("config/prisma");

const ScheduleResolvers = {
    SchedulesOnUnitMachine: {
        schedule: async (parent) => await prisma.schedule.findUnique({
            where: {
                id: parent.scheduleId
            }
        }),
        unitMachine: async (parent) => await prisma.unitMachine.findUnique({
            where: {
                id: parent.unitMachineId
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
                    unitMachine: {
                        include: {
                            machine: true
                        }
                    }
                }
            })

            const availableFilter = available.reduce((acc,item)=>{
                var aux=acc.filter(element => element.machine.id===item.unitMachine.machineId)
                if(aux.length===0){
                    acc.push({
                        machine: item.unitMachine.machine,
                        location: item.unitMachine.location
                    });
                }else{
                   if(aux.filter(element => element.location===item.unitMachine.location).length===0){
                    acc.push({
                        machine: item.unitMachine.machine,
                        location: item.unitMachine.location
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