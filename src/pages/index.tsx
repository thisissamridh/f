import { Container } from '@chakra-ui/react';
import React from 'react';
import config from '../../config/general.config';
import LeaderBoardWrapper from '../components/Dashboard/LeaderBoardWrapper';
import SEO from '../components/SEO/SEO';
import { dashboardDataType } from '../interfaces/dashboardStore';
import { dataCalculator } from '../util/dataCalculator';
import { SortByXp } from '../util/sortingData';

export default function Home(props: {
  dashboardData: dashboardDataType[];
  bountyDataJson: any;
  // lastSevenDaysData: receivedXPFromAirtableType[];
}) {
  const { dashboardData } = props;
  console.log('dash data - ', dashboardData.length);
  // console.log('last seven days data - ', lastSevenDaysData);
  // search functionality
  const [data, setData] = React.useState(dashboardData);
  const [wordEntered, setWordEntered] = React.useState('');
  const [searchResult, setSearchResult] = React.useState(false);
  const [sortOrder, setSortOrder] = React.useState(SortByXp.highToLowXp);
  const handleSearch = (event: { target: { value: any } }) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (searchWord === '') {
      setSearchResult(false);
      return setData(dashboardData);
    }

    if (searchWord !== '') {
      setSearchResult(true);
    }

    const newFilter = dashboardData.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    setData(newFilter);
  };

  return (
    <>
      <SEO
        title={`${config.general.name}`}
        description={`${config.general.name} System Dashboard for SuperteamDAO`}
        image={`https://res.cloudinary.com/demonicirfan/image/upload/v1669216518/Frame_910_ofy3nr.png`}
      />
      <main>
        <Container maxW="full" p="0">
          {/* <DashboardHeader
            lastSevenDaysData={lastSevenDaysData}
          /> */}
          <LeaderBoardWrapper
            searchResult={searchResult}
            dashboardData={data}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />
        </Container>
      </main>
    </>
  );
}

export async function getStaticProps() {


  const { personData, bountyDataJson } = await dataCalculator();
  const lastSevenDaysData = {};
  console.log({ personData, bountyDataJson })
  return {
    props: {
      bountyDataJson,
      dashboardData: personData,
      lastSevenDaysData,
    },
    revalidate: 10,
  };
}
