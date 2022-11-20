import Head from "next/head";
import { HomeHeader } from "components/Header";

// export const getServerSideProps: GetServerSideProps = async function (context) {
//   const welcomeDocName = "sigh";
//   const welcomeDocStruct: BucketItem[] | null = await getDocsStruct(
//     welcomeDocName
//   );

//   const promises = welcomeDocStruct
//     ? welcomeDocStruct.map(async (item) => {
//         const mapItem: MapItemType = [
//           item.name,
//           {
//             docString: await getDoc(welcomeDocName, item.name),
//             lastModified: item.lastModified,
//           },
//         ];
//         return mapItem;
//       })
//     : null;

//   const welcomeDocMap = promises ? await Promise.all(promises) : null;

//   const props: WelcomePageProps = {
//     welcomeDocName,
//     welcomeDocMap: JSON.parse(JSON.stringify(welcomeDocMap)),
//     welcomeDocStruct: welcomeDocStruct
//       ? JSON.parse(JSON.stringify(welcomeDocStruct))
//       : undefined,
//   };

//   return {
//     props,
//   };
// };

export default function Home() {
  return (
    <>
      <Head>
        <title>sigh</title>
      </Head>
      <main
        id="home-contaner"
        className="bg-gradient-from-bl bg-gradient-to-tr dark:from-background-900 dark:via-background-800 dark:to-background-900 from-background-50 via-primary-200 to-background-50 h-screen"
      >
        <HomeHeader />
      </main>
    </>
  );
}
