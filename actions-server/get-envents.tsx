import prismadb from "@/lib/prismadb";

const getEvents = async () => {
  const events = await prismadb.event.findMany({});

  return events;
};

export default getEvents;
