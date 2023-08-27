import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
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

const AdminDashboardPage = async () => {
  const totalRevenue = await getTotalRevenue();
  const SalesCount = await getSalesCount();
  // const stockOrderCount = await getStockOrderCount();
  // const stockSubscriptionCount = await getStockSubscriptionCount();
  const graphRevenue = await getGraphRevenue();

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
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
          {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Produits en stock
            </CardTitle>
            <Package className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockOrderCount}</div>
          </CardContent>
        </Card> */}
          {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">
              Abonnements en stock
            </CardTitle>
            <CalendarSearch className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockSubscriptionCount}</div>
          </CardContent>
        </Card> */}
        </div>
        <Card className="col-span-4 p-4">
          <CardTitle>{"Vue d'ensemble"}</CardTitle>
          <CardContent className="p-0 sm:pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
        <Card className="col-span-4 p-4">
          <CardTitle>Calendrier</CardTitle>
          <CardContent className="p-0 sm:pl-2">
            <p className="sr-only">salut</p>
            <AdminCalendar />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
