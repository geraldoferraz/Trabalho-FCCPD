const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe2@example.com",
      password_hash: "$2a$06$Lu15N0/uTXeC8VLouj.Ep.nC2ZS4ZJ/TDM/ZM8t81jsqW8.nqITAA",
      age: 30,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: "Igor Amaral",
      email: "igoramaral@example.com",
      password_hash: "$2a$06$Lu15N0/uTXeC8VLouj.Ep.nC2ZS4ZJ/TDM/ZM8t81jsqW8.nqITCC",
      age: 21,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: "Luis Adolfo",
      email: "LuisAdolfo@example.com",
      password_hash: "$2a$06$Lu15N0/uTXeC8VLouj.Ep.nC2ZS4ZJ/TDM/ZM8t81jsqW8.nqI1ER",
      age: 24,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: "Enzo de Barros",
      email: "EnzoBarros@example.com",
      password_hash: "$2a$06$Lu15N0/uTXeC8VLouj.Ep.nC2ZS4ZJ/TDM/ZM8t81jsqW8.nqIT90",
      age: 20,
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: "Geraldo Ferraz",
      email: "geraldoferraz@example.com",
      password_hash: "$2a$06$Lu15N0/uTXeC8VLouj.Ep.nC2ZS4ZJ/TDM/ZM8t81jsqW8.nqITGF",
      age: 20,
    },
  });

  const user6 = await prisma.user.create({
    data: {
      name: "Andre luiz",
      email: "andreluiz@example.com",
      password_hash: "$2a$06$Lu15N0/uTXeC8VLouj.Ep.nC2ZS4ZJ/TDM/ZM8t81jsqW8.nqITPP",
      age: 20,
    },
  });


// -------------------------------------    WORKOUTS    --------------------------------------------------------------------


  const workout = await prisma.workouts.create({
    data: {
      userId: user.id,
      training: 'Strength',
      name: 'Chest Day',
      duration: 60,
      description: 'Started with bench press, followed by dumbbell flyes.'
    },
  });

  const workout2 = await prisma.workouts.create({
    data: {
      userId: user2.id,
      training: 'Strength',
      name: 'Leg Day',
      duration: 60,
      description: 'Started with bench press, followed by dumbbell flyes.'
    },
  });

  const workout3 = await prisma.workouts.create({
    data: {
      userId: user3.id,
      training: 'Strength',
      name: 'Back Day',
      duration: 60,
      description: 'Started with bench press, followed by dumbbell flyes.'
    },
  });

  const workout4 = await prisma.workouts.create({
    data: {
      userId: user4.id,
      training: 'Strength',
      name: 'Leg Day',
      duration: 60,
      description: 'Started with bench press, followed by dumbbell flyes.'
    },
  });

  const workout5 = await prisma.workouts.create({
    data: {
      userId: user5.id,
      training: 'Strength',
      name: 'Arms Day',
      duration: 60,
      description: 'Started with bench press, followed by dumbbell flyes.'
    },
  });

  const workout6 = await prisma.workouts.create({
    data: {
      userId: user6.id,
      training: 'Strength',
      name: 'Chest Day',
      duration: 60,
      description: 'Started with bench press, followed by dumbbell flyes.'
    },
  });


// -------------------------------------    WEIGHT    --------------------------------------------------------------------

  const weight = await prisma.weight.create({
    data: {
      userId: user.id,
      currentWeight: 200.5,
      targetWeight: 190.0
    },
  });

  const weight2 = await prisma.weight.create({
    data: {
      userId: user2.id,
      currentWeight: 200.5,
      targetWeight: 190.0
    },
  });

  const weight3 = await prisma.weight.create({
    data: {
      userId: user3.id,
      currentWeight: 200.5,
      targetWeight: 190.0
    },
  });

  const weight4 = await prisma.weight.create({
    data: {
      userId: user4.id,
      currentWeight: 200.5,
      targetWeight: 190.0
    },
  });

  const weight5 = await prisma.weight.create({
    data: {
      userId: user5.id,
      currentWeight: 200.5,
      targetWeight: 190.0
    },
  });

  const weight6 = await prisma.weight.create({
    data: {
      userId: user6.id,
      currentWeight: 200.5,
      targetWeight: 190.0
    },
  });


// -------------------------------------    WATER    --------------------------------------------------------------------


  const water = await prisma.water.create({
    data: {
      userId: user.id,
      amount: 2500.0
    },
  });


  const water2 = await prisma.water.create({
    data: {
      userId: user2.id,
      amount: 2500.0
    },
  });


  const water3 = await prisma.water.create({
    data: {
      userId: user3.id,
      amount: 2500.0
    },
  });

  
  const water4 = await prisma.water.create({
    data: {
      userId: user4.id,
      amount: 2500.0
    },
  });


  const water5 = await prisma.water.create({
    data: {
      userId: user5.id,
      amount: 2500.0
    },
  });


  const water6 = await prisma.water.create({
    data: {
      userId: user6.id,
      amount: 2500.0
    },
  });
}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
