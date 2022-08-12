const { default: prisma } = require("config/prisma");

const MachineResolvers = {

    UnitMachine: {
        machine: async (parent)=> await prisma.machine.findUnique({
            where: {
                id: parent.machineId
            }
        }),
        schedulesOnUnitMachine: async (parent) => await prisma.schedulesOnUnitMachine.findMany({
            where: {
                unitMachineId: parent.id
            }
        })
    },

    Query: {
        getMachines: async () => await prisma.machine.findMany(),

        getMachinesAvailable: async () => await prisma.unitMachine.findMany(),

    }

}

export { MachineResolvers }