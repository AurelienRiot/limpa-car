import { GetGraphRevenue } from "@/actions-server/get-graph-revenue";
import { GetSalesCount } from "@/actions-server/get-sales-count";
import { GetTotalRevenue } from "@/actions-server/get-total-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { CreditCardIcon, EuroIcon } from "lucide-react";
import dynamic from "next/dynamic";
const DynamicOverview = dynamic(() => import("./components/overview"), {
  ssr: false,
});
import AdminCalendar from "./components/admin-calendar";
import prismadb from "@/lib/prismadb";
import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";
import {
  GetEventCounts,
  GetFreeDays,
  GetFullDays,
  GetPartiallyFullDays,
  GetWeekendDays,
} from "@/components/calendar/get-functions-calendar";
import TestTableau from "./components/test-tableau/test-tableau";

const AdminDashboardPage = async () => {
  const totalRevenue = await GetTotalRevenue();
  const SalesCount = await GetSalesCount();

  const graphRevenue = await GetGraphRevenue();

  const currentDate = new Date();
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({ start, end });
  const saturdaysAndSundays = GetWeekendDays(daysInMonth);

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

  const eventCounts = GetEventCounts(events);

  const partiallyFullDays = GetPartiallyFullDays(eventCounts);
  const fullDays = GetFullDays(eventCounts);
  const freeDays = GetFreeDays(
    daysInMonth,
    saturdaysAndSundays,
    fullDays,
    partiallyFullDays,
  );

  const users = await prismadb.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-2 pt-6 sm:p-8">
        <Heading
          title="Dashboard"
          description="Présentation de votre magasin"
        />
        <Separator />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 ">
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="pl-4 text-base sm:pl-0">
                Revenue Totaux
              </CardTitle>
              <EuroIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="pl-4 text-base sm:pl-0 ">Ventes</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{SalesCount}</div>
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="pl-4 text-base sm:pl-0 ">Autres</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{SalesCount}</div>
            </CardContent>
          </Card>
          <Card className="xl:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="pl-4 text-base sm:pl-0 ">Autres</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
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
            users={users}
          />
          <Card className="col:span-1 p-4 sm:col-span-2 md:col-span-4 xl:col-span-8">
            <CardTitle>{"Vue d'ensemble"}</CardTitle>
            <CardContent className="p-0 sm:pl-2">
              <DynamicOverview data={graphRevenue} />
            </CardContent>
          </Card>
          {/* <Card className="col:span-1 p-4 sm:col-span-2 md:col-span-4">
            <CardTitle>{"Test Tableau"}</CardTitle>
            <CardContent className="p-0 sm:pl-2">
              <TestTableau />
            </CardContent>
          </Card> */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
