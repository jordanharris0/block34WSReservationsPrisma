const prisma = require("../prisma");

const seed = async () => {
  // TODO: Create Customers, Restaurants and Reservations
  const createCustomers = async () => {
    const customers = [
      { name: "Jordan" },
      { name: "Diego" },
      { name: "Apollo" },
      { name: "Creed" },
    ];
    await prisma.customer.createMany({ data: customers });
  };

  const createPlaces = async () => {
    const places = [
      { name: "Papa Ds" },
      { name: "Mi Cocina" },
      { name: "Meso Maya" },
    ];
    await prisma.place.createMany({ data: places });
  };

  const createReservations = async () => {
    const reservations = [
      {
        customerId: 1,
        placeId: 1,
        date: new Date("2024-07-01"),
        partyCount: 10,
      },
      {
        customerId: 2,
        placeId: 2,
        date: new Date("2024-08-01"),
        partyCount: 8,
      },
      {
        customerId: 3,
        placeId: 3,
        date: new Date("2024-09-01"),
        partyCount: 7,
      },
    ];
    await prisma.reservation.createMany({ data: reservations });
  };

  await createCustomers();
  await createPlaces();
  await createReservations();
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
