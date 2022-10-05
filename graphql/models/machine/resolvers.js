/* eslint-disable no-return-await */
import { uploadCloudinary } from 'cloudinary/config';

const { default: prisma } = require('config/prisma');

const MachineResolvers = {
  Machine: {
    machineUnits: async (parent) =>
      await prisma.machineUnit.findMany({
        where: {
          machineId: parent.id,
        },
      }),
  },

  MachineUnit: {
    machine: async (parent) =>
      await prisma.machine.findUnique({
        where: {
          id: parent.machineId,
        },
      }),
    machineUnitsOnSchedule: async (parent) =>
      await prisma.machineUnitOnSchedule.findMany({
        where: {
          machineUnitId: parent.id,
        },
      }),
    diary: async (parent) =>
      await prisma.diary.findUnique({
        where: {
          id: parent.diaryId,
        },
      }),
  },

  Query: {
    getMachines: async () => await prisma.machine.findMany(),
    getMachinesAvailable: async () =>
      await prisma.machineUnit.findMany({
        where: {
          machineUnitsOnSchedule: {
            every: {
              id: '',
            },
          },
        },
      }),
    getMachineByID: async (parent, args) =>
      await prisma.machine.findUnique({
        where: {
          id: args.id,
        },
      }),
    getMachinesInfo: async () => {
      const resData = await prisma.machineUnit.findMany({
        select: {
          machine: {
            select: {
              name: true,
            },
          },
          location: true,
          serial: true,
          id: true,
          state: true,
        },
      });
      const res = resData.map(async (item) => ({
        location: item.location,
        state: item.state,
        id: item.id,
        serial: item.serial,
        name: item.machine.name,
        reservationCount: String(
          await prisma.reservation.count({
            where: {
              machineUnitId: item.id,
              state: 'completada',
            },
          })
        ),
      }));

      return res;
    },
    getMachineDetails: async (parent, args) => {
      const resData = await prisma.machineUnit.findUnique({
        where: {
          id: args.id,
        },
        select: {
          location: true,
          serial: true,
          machine: {
            select: {
              name: true,
              description: true,
              recommendations: true,
              image: true,
            },
          },
        },
      });

      const res = {
        image: resData.machine.image,
        name: resData.machine.name,
        description: resData.machine.description,
        recommendations: resData.machine.recommendations,
        location: resData.location,
        serial: resData.serial,
      };

      return res;
    },
  },

  Mutation: {
    createMachine: async (parent, args) => {
      const url = await uploadCloudinary(args.machine.image.file);
      return await prisma.machine.create({
        data: {
          ...args.machine,
          image: url,
          machineUnits: {
            create: args.machine.machineUnits,
          },
        },
      });
    },
    updateMachine: async (parent, args) => {
      const url = await uploadCloudinary(args.machine.image.file);
      await prisma.machine.update({
        where: {
          id: args.machine.id,
        },
        data: {
          name: {
            set: args.machine.name,
          },
          image: {
            set: url,
          },
          description: {
            set: args.machine.description,
          },
          recommendations: {
            set: args.machine.recommendations,
          },
          amount: {
            set: args.machine.amount,
          },
        },
      });

      await prisma.machineUnit.deleteMany({
        where: {
          machineId: args.machine.id,
        },
      });

      return await prisma.machine.update({
        where: {
          id: args.machine.id,
        },
        data: {
          machineUnits: {
            create: args.machine.machineUnits,
          },
        },
      });
    },
    deleteMachine: async (parent, args) => {
      await prisma.machineUnit.deleteMany({
        where: {
          machineId: args.id,
        },
      });

      return await prisma.machine.delete({
        where: {
          id: args.id,
        },
      });
    },
    changeMachineUnitState: async (parent, args) => {
      await prisma.machineUnit.update({
        where: {
          id: args.data.id,
        },
        data: {
          state: {
            set: args.data.state,
          },
        },
      });
    },
  },
};

export { MachineResolvers };
