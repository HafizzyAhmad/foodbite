import React from 'react';
import Layout from '../../elements/layout';
import { common } from '../../styles';
import ArrowHeader from '../../components/headers/arrowheader';
import { FlatList } from 'react-native';
import { StackTabScreenProps } from '../../types/routes/main';
import RecommendedDonor from '../../components/lists/recommended';

const Recommended = ({ navigation }: StackTabScreenProps<'Recommended'>) => {
  const data = [
    {
      userId: 12343,
      providerName: 'Hafizzy Ahmad',
      ratingScore: 2.32,
      totalRators: 5,
      foodDonation: [
        {
          image: '',
          type: 'Donation',
          createdById: 12341,
          donation: {
            name: 'Bantuan Makanan',
            description: 'Makanan untuk anda semua',
          },
          address: 'Simpang Empat Tebuk Haji Sidek',
          postcode: 45300,
          city: 'Sungai Besar',
          state: 'Selangor',
          mobileNumber: '01110001000',
          geoLocation: {
            latitude: 3.2123,
            longitude: 3.2311,
          },
          statusAvailability: {
            startDateTime: '2023-06-26T17:07:53.372Z',
            endDateTime: '2023-07-25T17:07:53.372Z',
            status: 'Submitted',
          },
          items: [
            {
              name: 'Nasi Lemak',
              price: 0.0,
            },
          ],
        },
      ],
      reviews: [
        {
          userId: 234234,
          ratorUserId: 34532,
          ratingValue: 2,
          image: '',
          feedback: 'Penderma yang pemurah',
        },
      ],
    },
  ];

  return (
    <Layout custom={common.basicLayout}>
      <ArrowHeader
        nav={navigation}
        title="Recommended Members"
        disableBack={false}
      />
      <FlatList
        data={data}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        renderItem={data => <RecommendedDonor data={data} nav={navigation} />}
      />
    </Layout>
  );
};

export default Recommended;
