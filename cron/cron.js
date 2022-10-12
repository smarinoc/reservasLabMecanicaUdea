const { CronJob } = require('cron');
const { default: prisma } = require('config/prisma');

const job = new CronJob('00 00 00 * * 6', async () => {
  await prisma.machineUnitOnSchedule.updateMany({
    where: {
      state: 'busy',
    },
    data: {
      state: {
        set: 'available',
      },
    },
  });
});
job.start();
