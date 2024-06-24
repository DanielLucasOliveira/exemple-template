import Layout from "@/components/template/Layout";
import Finans from "@/components/template/home/Finans";
import useMenuData from "@/data/hook/useMenuData";

export default function Home() {
  const { selectedButton } = useMenuData();

    const componentMap: { [key: string]: JSX.Element } = {
      'Finans': <Finans/>,
      'Invest': <div><h1>Home Invest</h1></div>,
      'Report': <div><h1>Home Report</h1></div>,
    };

  return (

    <Layout>
      {componentMap[selectedButton]}
    </Layout>
  );
}

