/* eslint-disable array-callback-return */
/* eslint-disable no-return-await */
const { default: prisma } = require('config/prisma');

const DiaryResolvers = {
  Diary: {
    schedules: async (parent) =>
      await prisma.schedule.findMany({
        where: {
          diaryId: parent.id,
        },
      }),
  },
  Schedule: {
    diary: async (parent) =>
      await prisma.diary.findUnique({
        where: {
          id: parent.diaryId,
        },
      }),
    machineUnitsOnSchedule: async (parent) =>
      await prisma.machineUnitOnSchedule.findMany({
        where: {
          scheduleId: parent.id,
        },
      }),
  },
  MachineUnitOnSchedule: {
    schedule: async (parent) =>
      await prisma.schedule.findUnique({
        where: {
          id: parent.scheduleId,
        },
      }),
    machineUnit: async (parent) =>
      await prisma.machineUnit.findUnique({
        where: {
          id: parent.machineUnitId,
        },
      }),
  },
  Query: {
    getDiaries: async () => await prisma.diary.findMany(),
    getMachinesUnitBySchedule: async (parent, args) => {
      const schedules = await prisma.schedule.findMany({
        where: {
          day: args.schedule.day,
          hour: args.schedule.hour,
        },
        include: {
          machineUnitsOnSchedule: {
            where: {
              countAvailable: {
                gt: 0,
              },
            },
            include: {
              machineUnit: {
                include: {
                  machine: true,
                },
              },
            },
          },
        },
      });
      const machinesUnit = [];
      schedules.map((element) => {
        element.machineUnitsOnSchedule.map((element2) => {
          machinesUnit.push(element2.machineUnit);
        });
      });
      return machinesUnit;
    },
    getScheduleAvailable: async () => {
      const schedules = await prisma.schedule.findMany({
        where: {
          machineUnitsOnSchedule: {
            some: {
              countAvailable: {
                gt: 0,
              },
            },
          },
        },
      });

      const result = schedules.reduce((acc, item) => {
        if (
          !acc.find(
            (element) => item.day === element.day && item.hour === element.hour
          )
        ) {
          acc.push(item);
        }
        return acc;
      }, []);

      return result;
    },
  },
  Mutation: {
    createDiary: async (parent, args) => {
      const diary = await prisma.diary.create({
        data: {
          name: args.diary.name,
          machinesCount: args.diary.machinesCount,
          schedules: {
            createMany: {
              data: args.diary.schedules,
            },
          },
        },
        include: {
          schedules: true,
        },
      });

      diary.schedules.forEach(async (element) => {
        await prisma.schedule.update({
          where: {
            id: element.id,
          },
          data: {
            machineUnitsOnSchedule: {
              createMany: {
                data: args.diary.machineUnits,
              },
            },
          },
        });
      });
      return diary;
    },
  },
};

export { DiaryResolvers };
