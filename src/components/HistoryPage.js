import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url('/background.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 40px;
  max-width: 800px;
  width: 90%;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Content = styled.p`
  color: #666;
  line-height: 1.6;
  text-align: justify;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #008CBA;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #007B9A;
  }
`;

const HistoryPage = () => {
  return (
    <PageContainer>
      <ContentContainer>
        <Title>History</Title>
        <Content>
        In the dazzling realm of Pixelonia, where dreams are minted and joy is the ultimate currency, lived Glimmer, a unicorn with a mane that shimmered like a rainbow aurora. Glimmer's special power? A laugh that could turn the gloomiest data blocks into sparkling joy tokens.
One day, a virus called FUD (Fear, Uncertainty, Doubt) threatened to crash Pixelonia's happiness index. Glimmer galloped into action, her hooves leaving trails of glittering code. As she pranced through the digital forests, her infectious giggles transformed grumpy troll-bots into cheerful NFTrees, their branches heavy with fruit-shaped emojis.
Reaching the central blockchain, Glimmer faced the menacing FUD cloud. With a mighty neigh, she released a supernova of joy. The cloud fractured, raining down colorful confetti of positivity across the land.
Pixelonia bloomed anew, each citizen now holding a unique shard of Glimmer's joy – an irreplaceable NFT of pure happiness. The once-gloomy landscape became a vibrant tapestry of delight, proof that in the world of blockchain and beyond, joy is the most powerful protocol of all.
        </Content>
        <BackLink to="/">Back to Main Page</BackLink>
      </ContentContainer>
    </PageContainer>
  );
};

export default HistoryPage;