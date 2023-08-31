import { getGraphRevenue } from "@/actions-server/get-graph-revenue";
import { getSalesCount } from "@/actions-server/get-sales-count";
import { getTotalRevenue } from "@/actions-server/get-total-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import {
  CalendarSearch,
  CreditCardIcon,
  EuroIcon,
  Package,
} from "lucide-react";
import { Overview } from "./components/overview";
import AdminCalendar from "./components/admin-calendar";
import prismadb from "@/lib/prismadb";
import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";
import {
  getEventCounts,
  getFreeDays,
  getFullDays,
  getPartiallyFullDays,
  getWeekendDays,
} from "@/components/calendar/get-functions-calendar";

const AdminDashboardPage = async () => {
  const totalRevenue = await getTotalRevenue();
  const SalesCount = await getSalesCount();

  const graphRevenue = await getGraphRevenue();

  const currentDate = new Date();
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({ start, end });
  const saturdaysAndSundays = getWeekendDays(daysInMonth);

  const events = await prismadb.event.findMany({
    where: {
      dateOfEvent: {
        gte: start,
        lte: end,
      },
    },
    include: {
      user: true,
    },
  });

  const eventCounts = getEventCounts(events);

  const partiallyFullDays = getPartiallyFullDays(eventCounts);
  const fullDays = getFullDays(eventCounts);
  const freeDays = getFreeDays(
    daysInMonth,
    saturdaysAndSundays,
    fullDays,
    partiallyFullDays
  );

  return (
    <div className="flex-col">
      <div className="flex-1 p-2 pt-6 space-y-4 sm:p-8">
        <Heading
          title="Dashboard"
          description="Présentation de votre magasin"
        />
        <Separator />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Revenue Totaux
              </CardTitle>
              <EuroIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Ventes</CardTitle>
              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{SalesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Autres</CardTitle>
              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{SalesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Autres</CardTitle>
              <CreditCardIcon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{SalesCount}</div>
            </CardContent>
          </Card>
          <AdminCalendar
            currentDate={currentDate}
            initialEvents={events}
            initialFreeDays={freeDays}
            initialFullDays={fullDays}
            initialPartiallyFullDays={partiallyFullDays}
            saturdaysAndSundays={saturdaysAndSundays}
          />
          <Card className="p-4 col:span-1 sm:col-span-2 md:col-span-4">
            <CardTitle>{"Vue d'ensemble"}</CardTitle>
            <CardContent className="p-0 sm:pl-2">
              <Overview data={graphRevenue} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
