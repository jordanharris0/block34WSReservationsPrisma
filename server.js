const express = require("express");
const app = express();
const PORT = 3001;

const prisma = require("./prisma");

//middleware
app.use(express.json());
app.use(require("morgan")("dev"));

//error handling
app.use((error, req, res, next) => {
  res.status(res.status || 500).send({ error: error });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

//GET ALL CUSTOMERS
app.get("/api/customers", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany();
    res.json(customers);
  } catch (error) {
    next(error);
  }
});

//GET ALL PLACES
app.get("/api/places", async (req, res, next) => {
  try {
    const places = await prisma.place.findMany();
    res.json(places);
  } catch (error) {
    next(error);
  }
});

//GET ALL RESERVATIONS
app.get("/api/reservations", async (req, res, next) => {
  try {
    const reservations = await prisma.reservation.findMany();
    res.json(reservations);
  } catch (error) {
    next(error);
  }
});

//POST
app.post("/api/customers/:id/reservations", async (req, res, next) => {
  try {
    const customerId = +req.params.id;
    console.log(customerId);

    const { placeId, date, partyCount } = req.body;
    const reservation = await prisma.reservation.create({
      data: {
        customerId,
        placeId,
        date,
        partyCount,
      },
    });
    res.json(reservation);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

//DELETE
app.delete(
  "/api/customers/:customerId/reservations/:id",
  async (req, res, next) => {
    try {
      const id = +req.params.id;
      const reservationExists = await prisma.reservation.findFirst({
        where: { id },
      });

      if (!reservationExists) {
        return next({
          status: 404,
          message: `Could not find reservation with id ${id}`,
        });
      }
      await prisma.reservation.delete({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);
