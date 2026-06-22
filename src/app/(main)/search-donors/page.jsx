import SearchDonorsClient from "./SearchDonorsClient";

export const metadata = {
  title: "Search Donors | AyudaRed",
  description: "Search our network of active blood donors by blood group and location.",
};

export default function SearchDonorsPage() {
  return <SearchDonorsClient />;
}
