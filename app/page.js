import MyGeoMap from "@/components/Geomap";
import NegaraComponent from "@/components/NegaraTable";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between p-8">
      <h1 className="text-2xl font-bold mb-4">Geomap</h1>
      <MyGeoMap />
      <NegaraComponent />
    </main>
  );
}
