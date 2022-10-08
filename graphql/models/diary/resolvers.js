/* eslint-disable array-callback-return */
/* eslint-disable no-return-await */
const { default: prisma } = require('config/prisma');
const schedulesJson = require('res/schedules.json');

const DiaryResolvers = {
  Diary: {
    schedules: async (parent) =>
      await prisma.schedule.findMany({
        where: {
          diaries: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
    machineUnits: async (parent) =>
      await prisma.machineUnit.findMany({
        where: {
          diaries: {
            some: {
              id: parent.id,
            },
          },
        },
      }),
    reservations: async (parent) =>
      await prisma.reservation.findMany({
        where: {
          diaryId: parent.id,
        },
      }),
  },
  Schedule: {
    machineUnitsOnSchedule: async (parent) =>
      await prisma.machineUnitOnSchedule.findMany({
        where: {
          scheduleId: parent.id,
        },
      }),
    reservations: async (parent) =>
      await prisma.reservation.findMany({
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
    getDiariesInfo: async () => {
      const res = await prisma.diary.findMany({
        select: {
          id: true,
          name: true,
          state: true,
          machinesCount: true,
          firstDate: true,
          lastDate: true,
          reservations: true,
        },
      });

      return res.map((item) => ({
        ...item,
        reservationCount: item.reservations.filter(
          (element) => element.state === 'completada'
        ).length,
      }));
    },
    getMachinesUnitBySchedule: async (parent, args) => {
      const aux = await prisma.machineUnitOnSchedule.findMany({
        where: {
          scheduleId: args.id,
          state: 'available',
          machineUnit: {
            state: 'habilitada',
          },
        },
        include: {
          machineUnit: {
            include: {
              machine: true,
            },
          },
        },
      });
      return aux.map((item) => item.machineUnit);
    },
    getAllSchedules: async () => {
      const res = await prisma.schedule.findMany();
      if (res.length === 0) {
        await prisma.schedule.createMany({
          data: schedulesJson.schedules,
        });
      }
      return await prisma.schedule.findMany();
    },
    getScheduleAvailable: async () => {
      const schedules = await prisma.schedule.findMany({
        where: {
          machineUnitsOnSchedule: {
            some: {
              state: 'available',
              diary: {
                state: 'habilitado',
              },
              machineUnit: {
                state: 'habilitada',
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
    getDiaryById: async (parent, args) =>
      await prisma.diary.findUnique({
        where: {
          id: args.id,
        },
        include: {
          schedules: true,
          machineUnits: {
            include: {
              machine: true,
            },
          },
        },
      }),
    validateFormDiary: async (parent, args) => {
      const machineUnitOnSchedule = [];

      for (let i = 0; i < args.machineUnitOnSchedule.schedules.length; i += 1) {
        for (
          let j = 0;
          j < args.machineUnitOnSchedule.machineUnits.length;
          j += 1
        ) {
          machineUnitOnSchedule.push({
            scheduleId: args.machineUnitOnSchedule.schedules[i].id,
            machineUnitId: args.machineUnitOnSchedule.machineUnits[j].id,
          });
        }
      }
      const machineUnitOnScheduleData =
        await prisma.machineUnitOnSchedule.findMany({
          where: {
            NOT: {
              diaryId: args.machineUnitOnSchedule.diaryId,
            },
          },
          select: {
            machineUnitId: true,
            scheduleId: true,
            schedule: {
              select: {
                day: true,
                hour: true,
              },
            },
          },
        });
      const res = machineUnitOnSchedule.map((item) => {
        const find = machineUnitOnScheduleData.find(
          (element) =>
            element.machineUnitId === item.machineUnitId &&
            element.scheduleId === item.scheduleId
        );
        return {
          machineUnitId: item.machineUnitId,
          day: find?.schedule.day,
          hour: find?.schedule.hour,
          isValid: !find,
        };
      });
      return res;
    },
  },
  Mutation: {
    createDiary: async (parent, args) => {
      const machineUnitOnSchedule = [];

      for (let i = 0; i < args.diary.schedules.length; i += 1) {
        for (let j = 0; j < args.diary.machineUnits.length; j += 1) {
          machineUnitOnSchedule.push({
            scheduleId: args.diary.schedules[i].id,
            machineUnitId: args.diary.machineUnits[j].id,
          });
        }
      }

      const diary = await prisma.diary.create({
        data: {
          name: args.diary.name,
          firstDate: args.diary.firstDate,
          lastDate: args.diary.lastDate,
          machinesCount: args.diary.machinesCount,
          schedules: {
            connect: args.diary.schedules,
          },
          machineUnits: {
            connect: args.diary.machineUnits,
          },
          machineUnitOnSchedule: {
            createMany: {
              data: machineUnitOnSchedule,
            },
          },
        },
      });
      return diary;
    },
    createSchedules: async (parent, args) =>
      await prisma.schedule.createMany({
        data: args.schedules,
      }),

    updateDiary: async (parent, args) => {
      const machineUnitOnSchedule = [];

      for (let i = 0; i < args.diary.schedules.length; i += 1) {
        for (let j = 0; j < args.diary.machineUnits.length; j += 1) {
          machineUnitOnSchedule.push({
            scheduleId: args.diary.schedules[i].id,
            machineUnitId: args.diary.machineUnits[j].id,
          });
        }
      }

      const machineUnitOnScheduleData =
        await prisma.machineUnitOnSchedule.findMany({
          where: {
            diaryId: args.diary.id,
          },
        });

      const news = machineUnitOnSchedule.filter((item) => {
        const find = machineUnitOnScheduleData.find(
          (element) =>
            item.machineUnitId === element.machineUnitId &&
            item.scheduleId === element.scheduleId
        );

        return find === undefined;
      });

      const removes = machineUnitOnScheduleData.filter((item) => {
        const find = machineUnitOnSchedule.find(
          (element) =>
            item.machineUnitId === element.machineUnitId &&
            item.scheduleId === element.scheduleId
        );

        return find === undefined;
      });

      await prisma.diary.update({
        where: {
          id: args.diary.id,
        },
        data: {
          name: {
            set: args.diary.name,
          },
          machinesCount: {
            set: args.diary.machinesCount,
          },
          firstDate: {
            set: args.diary.firstDate,
          },
          lastDate: {
            set: args.diary.lastDate,
          },
          schedules: {
            set: args.diary.schedules,
          },
          machineUnits: {
            set: args.diary.machineUnits,
          },
          MachineUnitOnSchedule: {
            createMany: {
              data: news,
            },
            deleteMany: removes,
          },
        },
      });
    },
    deleteDiary: async (parent, args) => {
      await prisma.machineUnitOnSchedule.deleteMany({
        where: {
          diaryId: args.id,
        },
      });
      return await prisma.diary.delete({
        where: {
          id: args.id,
        },
      });
    },
    changeDiaryState: async (parent, args) => {
      await prisma.diary.update({
        where: {
          id: args.data.id,
        },
        data: {
          state: {
            set: args.data.state,
          },
          reservations: {
            updateMany: {
              where: {
                state: 'reservada',
              },
              data: {
                state: {
                  set: 'cancelada',
                },
              },
            },
          },
        },
      });
    },
  },
};

export { DiaryResolvers };
